/**
 * Wallpaper Engine Web API Shim (标准垫片脚本、运行时资源拦截器与原生事件合成器)
 * 注入至壁纸沙盒 iframe 的 <head> 顶部
 * 1. 拦截 fetch, XHR, Image.src, Media.src 动态请求，解决 PixiJS/Three.js 相对路径 404 问题
 * 2. 伪造 Wallpaper Engine 核心全局接口
 * 3. 将父页面转发的鼠标坐标与音频频谱精准合成为原生 DOM 事件派发
 */

export function buildWeShimScript(assetMap: Record<string, string>, entryDir: string): string {
  const jsonAssetMap = JSON.stringify(assetMap);
  const jsonEntryDir = JSON.stringify(entryDir);

  return `
(function() {
  if (window.__WE_SHIM_INITIALIZED__) return;
  window.__WE_SHIM_INITIALIZED__ = true;

  // 1. 资产映射表与路径解析器 (拦截相对路径 404)
  var __WE_ASSET_MAP__ = ${jsonAssetMap};
  var __WE_ENTRY_DIR__ = ${jsonEntryDir};

  function normalizePath(p) {
    return String(p || "").replace(/\\\\/g, "/").replace(/^\\.\\//, "").replace(/^\\/+/, "").toLowerCase();
  }

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
      if (typeof name === 'string' && name.toLowerCase() === 'src') {
        val = resolveAssetUrl(val);
      }
      return origSetAttr.call(this, name, val);
    };
  } catch (e) {
    console.warn('[WE Shim] Asset interception descriptor warning:', e);
  }

  // 4. 全局监听器注册表
  window._weAudioCallbacks = [];
  window._weMediaCallbacks = [];
  window._weUserProperties = {};

  // 5. Wallpaper Engine 标准核心接口
  window.wallpaperPropertyListener = window.wallpaperPropertyListener || {};

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

  // 6. 消息总线：接收父页面传入的鼠标、音频与配置，并合成原生事件
  window.addEventListener('message', function(event) {
    var data = event.data;
    if (!data || typeof data !== 'object') return;

    // A. 鼠标移动合成事件
    if (data.type === 'WE_MOUSE_MOVE') {
      var x = Number(data.x) || 0;
      var y = Number(data.y) || 0;
      var target = document.elementFromPoint(x, y) || document.body || window;
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
      var target = document.elementFromPoint(x, y) || document.body || window;
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
      window._weUserProperties = Object.assign(window._weUserProperties, props);
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
    if (data.type === 'WE_SET_PAUSED') {
      if (window.wallpaperPropertyListener && typeof window.wallpaperPropertyListener.setPaused === 'function') {
        try {
          window.wallpaperPropertyListener.setPaused(Boolean(data.isPaused));
        } catch (e) {}
      }
      return;
    }
  });
})();
`;
}
