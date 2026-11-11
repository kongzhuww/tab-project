/**
 * Wallpaper Engine Web API Shim (标准垫片脚本、运行时资源拦截器与原生事件合成器)
 * 注入至壁纸沙盒 iframe 的 <head> 顶部
 * 1. 内存级 localStorage 垫片，防止沙盒 iframe 报 SecurityError
 * 2. 拦截 fetch, XHR, Image.src, Media.src 动态请求，解决 PixiJS/Three.js/Live2D 相对路径 404 问题
 * 3. 属性监听器 (wallpaperPropertyListener) 的 setter 拦截与默认属性自动回放
 * 4. 自动派发合成点击事件，解锁浏览器 AudioContext/MediaElement 的自动播放
 */

export function buildWeShimScript(
  assetMap: Record<string, string>,
  entryDir: string,
  initialProperties: Record<string, any> = {}
): string {
  const jsonAssetMap = JSON.stringify(assetMap);
  const jsonEntryDir = JSON.stringify(entryDir);
  const jsonInitialProps = JSON.stringify(initialProperties);

  return `
(function() {
  if (window.__WE_SHIM_INITIALIZED__) return;
  window.__WE_SHIM_INITIALIZED__ = true;

  // 0. 内存级 Storage 垫片 (防止沙盒无 allow-same-origin 时读取 localStorage 抛 SecurityError)
  (function initStoragePolyfill() {
    function createMemoryStorage() {
      var store = new Map();
      return {
        getItem: function(k) { return store.has(String(k)) ? store.get(String(k)) : null; },
        setItem: function(k, v) { store.set(String(k), String(v)); },
        removeItem: function(k) { store.delete(String(k)); },
        clear: function() { store.clear(); },
        key: function(i) { var keys = Array.from(store.keys()); return keys[i] !== undefined ? keys[i] : null; },
        get length() { return store.size; }
      };
    }
    var needsPolyfill = false;
    try {
      var testKey = '__we_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
    } catch (e) {
      needsPolyfill = true;
    }
    if (needsPolyfill) {
      try {
        var memLocal = createMemoryStorage();
        var memSession = createMemoryStorage();
        Object.defineProperty(window, 'localStorage', { value: memLocal, configurable: true, writable: true });
        Object.defineProperty(window, 'sessionStorage', { value: memSession, configurable: true, writable: true });
      } catch (_) {}
    }
  })();

  // 0.1 工业级高刷屏降温守护：将 Retina 屏 DPR 强制锁定为 1，直接消除 4K/5K 超大物理 Canvas 像素计算 (直降 75% 像素负荷)
  try {
    Object.defineProperty(window, 'devicePixelRatio', {
      get: function() { return 1; },
      configurable: true
    });
  } catch (_) {}

  // 0.2 帧率自适应节流：动态壁纸锁定在 40 FPS (每帧 ~24ms)，支持暂停队列挂起，消除 120Hz 高刷空转
  var _wePaused = false;
  var _wePendingRafs = [];
  try {
    var _origRaf = window.requestAnimationFrame;
    var _origCancelRaf = window.cancelAnimationFrame;
    var _lastFrameTime = 0;
    var _rafIdCounter = 1;
    var _activeRafMap = new Map();

    if (typeof _origRaf === 'function') {
      window.requestAnimationFrame = function(callback) {
        var id = _rafIdCounter++;
        if (_wePaused) {
          _wePendingRafs.push({ id: id, cb: callback });
          return id;
        }
        var nativeId = _origRaf.call(window, function(timestamp) {
          _activeRafMap.delete(id);
          if (_wePaused) {
            _wePendingRafs.push({ id: id, cb: callback });
            return;
          }
          var elapsed = timestamp - _lastFrameTime;
          if (elapsed < 23) {
            setTimeout(function() {
              if (!_wePaused) callback(performance.now());
            }, 24 - elapsed);
            return;
          }
          _lastFrameTime = timestamp;
          callback(timestamp);
        });
        _activeRafMap.set(id, nativeId);
        return id;
      };

      if (typeof _origCancelRaf === 'function') {
        window.cancelAnimationFrame = function(id) {
          var nativeId = _activeRafMap.get(id);
          if (nativeId !== undefined) {
            _activeRafMap.delete(id);
            _origCancelRaf.call(window, nativeId);
          }
          _wePendingRafs = _wePendingRafs.filter(function(item) { return item.id !== id; });
        };
      }
    }
  } catch (_) {}

  // 0.3 钳制 Canvas 2D 的 shadowBlur 最大值为 12，防止重度全屏高斯模糊拖垮 macOS GPU
  try {
    if (typeof CanvasRenderingContext2D !== 'undefined' && CanvasRenderingContext2D.prototype) {
      var shadowDesc = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'shadowBlur');
      if (shadowDesc && shadowDesc.set) {
        Object.defineProperty(CanvasRenderingContext2D.prototype, 'shadowBlur', {
          get: function() { return shadowDesc.get.call(this); },
          set: function(val) {
            var clamped = Math.min(Math.max(Number(val) || 0, 0), 12);
            return shadowDesc.set.call(this, clamped);
          },
          configurable: true
        });
      }
    }
  } catch (_) {}

  // 0.3 裁剪隐藏子面板计算：当壁纸处于全屏桌面模式时，跳过无界面的子面板循环
  if (typeof document !== 'undefined') {
    var optimizeSubPanels = function() {
      try {
        var noop = function() {};
        if (typeof window['drawAdv'] === 'function') window['drawAdv'] = noop;
        if (typeof window['drawDiff'] === 'function') window['drawDiff'] = noop;
        if (typeof window['drawVal'] === 'function') window['drawVal'] = noop;
        if (typeof window['drawIdx'] === 'function') window['drawIdx'] = noop;
        if (typeof window['agentsTick'] === 'function') window['agentsTick'] = noop;
      } catch (_) {}
    };
    if (typeof document.addEventListener === 'function') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(optimizeSubPanels, 150);
        setTimeout(optimizeSubPanels, 500);
      });
    }
  }

  // 1. 资产映射表与路径解析器 (拦截相对路径 404)
  var __WE_ASSET_MAP__ = ${jsonAssetMap};
  var __WE_ENTRY_DIR__ = ${jsonEntryDir};

  function resolveAssetUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
    var trimmed = rawUrl.trim();
    if (/^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(trimmed)) return trimmed;

    var clean = trimmed.split(/[?#]/)[0];
    if (!clean) return trimmed;

    var base = clean.startsWith('/') ? '' : __WE_ENTRY_DIR__;
    var parts = (base ? base + '/' : '') + clean.replace(/^\\/+/, '');
    var segments = parts.split('/');
    var stack = [];
    for (var i = 0; i < segments.length; i++) {
      var s = segments[i];
      if (!s || s === '.') continue;
      if (s === '..') stack.pop();
      else stack.push(s);
    }
    var key = stack.join('/').toLowerCase();
    return __WE_ASSET_MAP__[key] || trimmed;
  }

  // 2. 运行时网络请求拦截 (fetch & XHR)
  if (typeof window.fetch === 'function') {
    var _origFetch = window.fetch;
    window.fetch = function(input, init) {
      if (typeof input === 'string') {
        input = resolveAssetUrl(input);
      } else if (input && typeof input.url === 'string') {
        var resolved = resolveAssetUrl(input.url);
        if (resolved !== input.url && typeof Request === 'function') {
          input = new Request(resolved, input);
        }
      }
      return _origFetch.call(this, input, init);
    };
  }

  if (typeof XMLHttpRequest !== 'undefined' && XMLHttpRequest.prototype) {
    var _origXhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      var resolved = resolveAssetUrl(url);
      return _origXhrOpen.call(this, method, resolved, async, user, password);
    };
  }

  // 3. 动态图片与媒体标签拦截 (new Image().src, HTMLMediaElement.src)
  try {
    var imgProto = HTMLImageElement.prototype;
    var desc = Object.getOwnPropertyDescriptor(imgProto, 'src');
    if (desc && desc.set) {
      Object.defineProperty(imgProto, 'src', {
        set: function(val) {
          return desc.set.call(this, resolveAssetUrl(val));
        },
        get: function() {
          return desc.get.call(this);
        },
        configurable: true
      });
    }

    var mediaProto = HTMLMediaElement.prototype;
    var mediaDesc = Object.getOwnPropertyDescriptor(mediaProto, 'src');
    if (mediaDesc && mediaDesc.set) {
      Object.defineProperty(mediaProto, 'src', {
        set: function(val) {
          return mediaDesc.set.call(this, resolveAssetUrl(val));
        },
        get: function() {
          return mediaDesc.get.call(this);
        },
        configurable: true
      });
    }

    var origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, val) {
      if (typeof name === 'string' && (name.toLowerCase() === 'src' || name.toLowerCase() === 'data-src')) {
        val = resolveAssetUrl(val);
      }
      return origSetAttr.call(this, name, val);
    };
  } catch (e) {
    console.warn('[WE Shim] Asset interception descriptor warning:', e);
  }

  // 4. 全局监听器注册表与属性存储
  window._weAudioCallbacks = [];
  window._weMediaCallbacks = [];
  window._weUserProperties = ${jsonInitialProps};

  var _rawPropertyListener = {};

  // 拦截 wallpaperPropertyListener 的 set 赋值 (针对 wp.js 覆盖全局变量的场景)
  Object.defineProperty(window, 'wallpaperPropertyListener', {
    get: function() {
      return _rawPropertyListener;
    },
    set: function(newVal) {
      _rawPropertyListener = newVal || {};
      // 一旦壁纸脚本覆盖赋值并注册了 applyUserProperties，立刻主动注入初始属性
      if (typeof _rawPropertyListener.applyUserProperties === 'function' && window._weUserProperties) {
        try {
          _rawPropertyListener.applyUserProperties(window._weUserProperties);
        } catch (e) {
          console.error('[WE Shim] applyUserProperties on setter error:', e);
        }
      }
    },
    configurable: true
  });

  window.wallpaperRegisterAudioListener = function(callback) {
    if (typeof callback === 'function') {
      window._weAudioCallbacks.push(callback);
    }
  };

  window.wallpaperRegisterMediaIntegrationListener = function(callback) {
    if (typeof callback === 'function') {
      window._weMediaCallbacks.push(callback);
    }
  };

  window.wallpaperRegisterMediaStatusListener = function(callback) {
    if (typeof callback === 'function') {
      window._weMediaCallbacks.push(callback);
    }
  };

  window.wallpaperRegisterMediaThumbnailListener = function(callback) {};
  window.wallpaperRegisterMediaTimelineListener = function(callback) {};

  window.wallpaperRequestRandomFileForProperty = function(propertyName, callback) {
    if (typeof callback === 'function') {
      callback(propertyName, '');
    }
  };

  // 5. 自动唤醒音频状态机 (解决 HALOFLUX 等等待首次用户手势点击解锁 Audio 的逻辑)
  function triggerAudioUnlockGesture() {
    try {
      var evtInit = { bubbles: true, cancelable: true, clientX: 10, clientY: 10 };
      var targets = [document.body, document.documentElement, window].filter(Boolean);
      targets.forEach(function(t) {
        try {
          if (typeof PointerEvent === 'function') t.dispatchEvent(new PointerEvent('pointerdown', evtInit));
          t.dispatchEvent(new MouseEvent('click', evtInit));
        } catch (_) {}
      });
    } catch (_) {}
  }

  if (typeof setTimeout === 'function') {
    if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(triggerAudioUnlockGesture, 100);
        setTimeout(triggerAudioUnlockGesture, 600);
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(triggerAudioUnlockGesture, 100);
          setTimeout(triggerAudioUnlockGesture, 600);
        });
      }
    } else {
      setTimeout(triggerAudioUnlockGesture, 100);
    }
  }

  // 6. 消息总线：接收父页面传入的鼠标、音频与配置，并合成原生事件
  var _cachedEventTarget = null;
  function getEventTarget() {
    if (_cachedEventTarget && _cachedEventTarget.isConnected) return _cachedEventTarget;
    var target = null;
    if (typeof document !== 'undefined') {
      if (typeof document.querySelector === 'function') {
        try { target = document.querySelector('canvas') || document.body; } catch (_) {}
      }
      if (!target) target = document.body || document;
    }
    _cachedEventTarget = target || window;
    return _cachedEventTarget;
  }

  window.addEventListener('message', function(event) {
    var data = event.data;
    if (!data || typeof data !== 'object') return;

    // A. 鼠标移动合成事件 (直接复用主画布/Body目标，彻底移除 elementFromPoint 消除强制同步回流 Forced Reflow)
    if (data.type === 'WE_MOUSE_MOVE') {
      var x = Number(data.x) || 0;
      var y = Number(data.y) || 0;
      var target = getEventTarget();
      var init = {
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        pageX: x,
        pageY: y,
        bubbles: true,
        cancelable: true
      };
      try {
        target.dispatchEvent(new MouseEvent('mousemove', init));
        if (typeof PointerEvent === 'function') {
          target.dispatchEvent(new PointerEvent('pointermove', init));
        }
      } catch (e) {}
      return;
    }

    // B. 鼠标点击/按下合成事件
    if (data.type === 'WE_MOUSE_DOWN' || data.type === 'WE_MOUSE_UP' || data.type === 'WE_CLICK') {
      var x = Number(data.x) || 0;
      var y = Number(data.y) || 0;
      var target = getEventTarget();
      var evtName = data.type === 'WE_MOUSE_DOWN' ? 'mousedown' : (data.type === 'WE_MOUSE_UP' ? 'mouseup' : 'click');
      var init = {
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        pageX: x,
        pageY: y,
        bubbles: true,
        cancelable: true,
        button: 0
      };
      try {
        target.dispatchEvent(new MouseEvent(evtName, init));
      } catch (e) {}
      return;
    }

    // C. 128 位双声道音频频谱数据推流
    if (data.type === 'WE_AUDIO_DATA') {
      var audio = data.audio;
      if (Array.isArray(audio) || (audio && audio.length === 128)) {
        for (var i = 0; i < window._weAudioCallbacks.length; i++) {
          try {
            window._weAudioCallbacks[i](audio);
          } catch (e) {
            console.error('[WE Shim] Audio callback error:', e);
          }
        }
      }
      return;
    }

    // D. 属性调节热更新 (applyUserProperties)
    if (data.type === 'WE_USER_PROPERTIES') {
      var props = data.properties || {};
      window._weUserProperties = Object.assign(window._weUserProperties || {}, props);
      if (window.wallpaperPropertyListener && typeof window.wallpaperPropertyListener.applyUserProperties === 'function') {
        try {
          window.wallpaperPropertyListener.applyUserProperties(props);
        } catch (e) {
          console.error('[WE Shim] applyUserProperties error:', e);
        }
      }
      return;
    }

    // E. 媒体播放状态热更新
    if (data.type === 'WE_MEDIA_STATUS') {
      for (var j = 0; j < window._weMediaCallbacks.length; j++) {
        try {
          window._weMediaCallbacks[j](data.media);
        } catch (e) {}
      }
      return;
    }

    // F. 页面挂起/恢复省电控制
    if (data.type === 'WE_SET_PAUSED' || data.type === 'WE_PAUSE') {
      var shouldPause = Boolean(data.isPaused || data.paused);
      _wePaused = shouldPause;
      if (!_wePaused && _wePendingRafs.length > 0) {
        var toResume = _wePendingRafs.slice();
        _wePendingRafs = [];
        for (var k = 0; k < toResume.length; k++) {
          window.requestAnimationFrame(toResume[k].cb);
        }
      }
      if (window.wallpaperPropertyListener && typeof window.wallpaperPropertyListener.setPaused === 'function') {
        try {
          window.wallpaperPropertyListener.setPaused(shouldPause);
        } catch (e) {}
      }
      return;
    }
  });
})();
`;
}
