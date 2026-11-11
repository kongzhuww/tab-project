import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { buildWeShimScript } from '../src/wallpaper/we-shim.ts';

test('WE Shim: intercept dynamic fetch relative path and map to Blob URL', () => {
  const assetMap = {
    'assets/char.png': 'blob:chrome-extension://test-ext/uuid-char',
    'models/model.json': 'blob:chrome-extension://test-ext/uuid-model',
  };
  const scriptContent = buildWeShimScript(assetMap, '');

  let interceptedFetchUrl = '';
  let interceptedImgSrc = '';

  const mockWindow = {
    fetch: (input) => {
      interceptedFetchUrl = input;
      return Promise.resolve({ ok: true });
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    document: {
      elementFromPoint: () => null,
      body: {
        dispatchEvent: () => {},
      },
    },
    HTMLImageElement: function () {},
    HTMLMediaElement: function () {},
    Element: {
      prototype: {
        setAttribute: (name, val) => {},
      },
    },
    console,
  };

  mockWindow.HTMLImageElement.prototype = {};
  Object.defineProperty(mockWindow.HTMLImageElement.prototype, 'src', {
    set: function (val) {
      interceptedImgSrc = val;
    },
    get: function () {
      return interceptedImgSrc;
    },
    configurable: true,
  });

  const context = vm.createContext({
    window: mockWindow,
    document: mockWindow.document,
    HTMLImageElement: mockWindow.HTMLImageElement,
    HTMLMediaElement: mockWindow.HTMLMediaElement,
    Element: mockWindow.Element,
    console,
  });

  vm.runInContext(scriptContent, context);

  // 1. 验证 fetch 被拦截并自动映射
  mockWindow.fetch('assets/char.png');
  assert.strictEqual(interceptedFetchUrl, 'blob:chrome-extension://test-ext/uuid-char');

  // 2. 验证相对路径 ./ 解析
  mockWindow.fetch('./models/model.json');
  assert.strictEqual(interceptedFetchUrl, 'blob:chrome-extension://test-ext/uuid-model');

  // 3. 验证未匹配的外部绝对 URL 不受影响
  mockWindow.fetch('https://api.example.com/data');
  assert.strictEqual(interceptedFetchUrl, 'https://api.example.com/data');

  // 4. 验证 Image.src 属性拦截器
  const img = new mockWindow.HTMLImageElement();
  img.src = 'assets/char.png';
  assert.strictEqual(interceptedImgSrc, 'blob:chrome-extension://test-ext/uuid-char');
});

test('WE Shim: synthetic mouse event generation on WE_MOUSE_MOVE message', () => {
  const scriptContent = buildWeShimScript({}, '');
  let messageHandler = null;
  let dispatchedEvents = [];

  const mockTarget = {
    dispatchEvent: (evt) => {
      dispatchedEvents.push(evt);
    },
  };

  const mockWindow = {
    addEventListener: (type, handler) => {
      if (type === 'message') messageHandler = handler;
    },
    document: {
      elementFromPoint: (x, y) => (x === 120 && y === 240 ? mockTarget : null),
      body: mockTarget,
    },
    HTMLImageElement: function () {},
    HTMLMediaElement: function () {},
    Element: { prototype: { setAttribute: () => {} } },
    MouseEvent: class {
      constructor(type, init) {
        this.type = type;
        this.clientX = init.clientX;
        this.clientY = init.clientY;
      }
    },
    console,
  };
  mockWindow.HTMLImageElement.prototype = {};
  mockWindow.HTMLMediaElement.prototype = {};

  const context = vm.createContext({
    window: mockWindow,
    document: mockWindow.document,
    HTMLImageElement: mockWindow.HTMLImageElement,
    HTMLMediaElement: mockWindow.HTMLMediaElement,
    Element: mockWindow.Element,
    MouseEvent: mockWindow.MouseEvent,
    console,
  });

  vm.runInContext(scriptContent, context);

  assert.ok(typeof messageHandler === 'function', 'Message handler should be bound');

  // 触发鼠标移动消息
  messageHandler({
    data: {
      type: 'WE_MOUSE_MOVE',
      x: 120,
      y: 240,
    },
  });

  assert.ok(dispatchedEvents.length >= 1, 'Synthetic mouse event should be dispatched');
  const mouseEvt = dispatchedEvents.find((e) => e.type === 'mousemove');
  assert.ok(mouseEvt, 'Should dispatch mousemove event');
  assert.strictEqual(mouseEvt.clientX, 120);
  assert.strictEqual(mouseEvt.clientY, 240);
});

test('Audio Visualizer: Logarithmic binning maps 512 raw FFT bins into 64 left + 64 right normalized bands', () => {
  const FFT_SIZE = 1024;
  const BIN_COUNT = FFT_SIZE / 2; // 512
  const BINS_PER_CHANNEL = 64;

  const binBoundaries = [];
  for (let i = 0; i < BINS_PER_CHANNEL; i++) {
    const startIdx = Math.floor(i + Math.pow(i / BINS_PER_CHANNEL, 3.2) * (BIN_COUNT - BINS_PER_CHANNEL));
    const endIdx = Math.min(
      BIN_COUNT - 1,
      Math.max(startIdx, Math.floor((i + 1) + Math.pow((i + 1) / BINS_PER_CHANNEL, 3.2) * (BIN_COUNT - BINS_PER_CHANNEL) - 1))
    );
    binBoundaries.push([startIdx, endIdx]);
  }

  // 模拟具有强烈低频鼓点 (bin 0~8 能量高) 的 raw FFT 频段数据
  const rawLeft = new Uint8Array(BIN_COUNT);
  const rawRight = new Uint8Array(BIN_COUNT);

  rawLeft[2] = 230; // 强低频能量 (~90Hz)
  rawLeft[3] = 200;
  rawRight[2] = 210;

  const outBuffer = new Array(128).fill(0);

  for (let i = 0; i < BINS_PER_CHANNEL; i++) {
    const [start, end] = binBoundaries[i];
    let maxL = 0;
    let maxR = 0;
    for (let k = start; k <= end; k++) {
      if (rawLeft[k] > maxL) maxL = rawLeft[k];
      if (rawRight[k] > maxR) maxR = rawRight[k];
    }
    outBuffer[i] = maxL / 255;
    outBuffer[i + 64] = maxR / 255;
  }

  // 断言总长度恒为 128
  assert.strictEqual(outBuffer.length, 128);

  // 断言所有频段数值严格位于 0.0 ~ 1.0 之间
  for (let i = 0; i < 128; i++) {
    assert.ok(outBuffer[i] >= 0 && outBuffer[i] <= 1.0);
  }

  // 断言低频区间 (前几个 bin) 能有效接收到低音能量，而非被压缩挤出
  assert.ok(outBuffer[1] > 0.5 || outBuffer[2] > 0.5, 'Bass bins should capture low-frequency energy');
});
