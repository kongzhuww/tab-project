(function(){"use strict";function U(e,n,o={}){const a=JSON.stringify(e),r=JSON.stringify(n),f=JSON.stringify(o);return`
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

  // 1. 资产映射表与路径解析器 (拦截相对路径 404)
  var __WE_ASSET_MAP__ = ${a};
  var __WE_ENTRY_DIR__ = ${r};

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
  window._weUserProperties = ${f};

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
`}let v=[];function _(e){return v.push(e),e}function b(){for(const e of v)URL.revokeObjectURL(e);v=[]}function w(e){return String(e||"").replace(/\\/g,"/").replace(/^\.\//,"").replace(/^\/+/,"").toLowerCase()}function h(e,n){const o=String(n||"").trim().replace(/^['"]|['"]$/g,"");if(!o||/^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(o))return"";const[a]=o.split(/[?#]/);if(!a)return"";const r=o.startsWith("/")?"":w(e).split("/").slice(0,-1).join("/"),f=`${r?`${r}/`:""}${a.replace(/^\/+/,"")}`.split("/"),c=[];for(const p of f)!p||p==="."||(p===".."?c.pop():c.push(p));return c.join("/").toLowerCase()}let m=null,E=!1;async function L(e){b();const n=document.getElementById("wallpaper-root");if(!n)return;n.replaceChildren();const o=Array.isArray(e.files)?e.files:[];let a=o.find(c=>{const p=w(c.path);return p.endsWith(".mp4")||p.endsWith(".webm")||p.endsWith(".mkv")});if(!a&&e.entry&&(a=o.find(c=>w(c.path)===w(e.entry))),!a?.file)return;const r=document.createElement("video");r.id="we-active-video",r.autoplay=!0,r.loop=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("webkit-playsinline","true"),r.style.width="100%",r.style.height="100%",r.style.objectFit="cover",r.style.display="block",r.style.pointerEvents="none";const f=_(URL.createObjectURL(a.file));r.src=f,n.appendChild(r);try{await r.play()}catch(c){console.warn("[Video Wallpaper] Autoplay warning:",c)}}async function k(e){b();const n=document.getElementById("wallpaper-root");if(!n||(n.replaceChildren(),typeof e.entry!="string"))return;const o=e.entry,a=Array.isArray(e.files)?e.files:[],r=new Map,f={};for(const t of a){const l=w(t.path);if(r.set(l,t),t.file instanceof Blob){const i=_(URL.createObjectURL(new Blob([t.file],{type:t.mime||t.file.type||"application/octet-stream"})));f[l]=i}}function c(t,l){const i=h(t,l);return f[i]||l}function p(t,l){let i=String(t||"");for(const y of[...i.matchAll(/url\(([^)]+)\)/gi)]){const d=y[1].trim().replace(/^['"]|['"]$/g,""),g=c(l,d);i=i.replace(y[0],`url(${JSON.stringify(g)})`)}return i}function P(t,l,i,y){for(const d of t.querySelectorAll(l)){const g=d.getAttribute(i);g&&d.setAttribute(i,c(y,g))}}const S=r.get(w(o));if(!S?.file||!(S.file instanceof Blob))return;const u=new DOMParser().parseFromString(await S.file.text(),"text/html"),M=w(o).split("/").slice(0,-1).join("/"),A=u.createElement("script");A.textContent=U(f,M,e.properties||{}),u.head.prepend(A);for(const t of u.querySelectorAll('link[rel~="stylesheet"][href]')){const l=t.getAttribute("href")||"",i=r.get(h(o,l));if(i?.file instanceof Blob){const y=p(await i.file.text(),i.path),d=u.createElement("style");d.textContent=y,t.parentNode?.replaceChild(d,t)}}for(const t of Array.from(u.querySelectorAll("script[src]"))){const l=t.getAttribute("src")||"",i=r.get(h(o,l));if(i?.file instanceof Blob){const y=await i.file.text(),d=u.createElement("script");d.textContent=y,t.parentNode?.replaceChild(d,t)}}P(u,"img[src],source[src],video[src],audio[src]","src",o),P(u,"audio[data-src],video[data-src],img[data-src]","data-src",o),P(u,"link[href]","href",o);for(const t of u.querySelectorAll("[style]"))t.setAttribute("style",p(t.getAttribute("style")||"",o));for(const t of u.querySelectorAll("style"))t.textContent=p(t.textContent||"",o);const s=document.createElement("iframe");s.id="we-wallpaper-iframe",s.title=e.name||"Web Wallpaper",s.sandbox.add("allow-scripts","allow-pointer-lock","allow-same-origin"),s.setAttribute("allow","autoplay *"),s.allow="autoplay",s.style.width="100%",s.style.height="100%",s.style.border="none",s.style.display="block",s.src=_(URL.createObjectURL(new Blob([`<!doctype html>
${u.documentElement.outerHTML}`],{type:"text/html"}))),m=e.properties||null,s.addEventListener("load",()=>{m&&s.contentWindow?.postMessage({type:"WE_USER_PROPERTIES",properties:m},"*"),E&&s.contentWindow?.postMessage({type:"WE_SET_PAUSED",isPaused:!0},"*")},{once:!0}),n.appendChild(s)}window.addEventListener("message",e=>{if(e.source!==window.parent)return;const n=e.data;if(!n)return;if(n.type==="web"){try{window.parent.postMessage({type:"WE_SANDBOX_ACK"},"*")}catch{}k(n).catch(console.error);return}if(n.type==="video"){try{window.parent.postMessage({type:"WE_SANDBOX_ACK"},"*")}catch{}L(n).catch(console.error);return}if(n.type==="WE_USER_PROPERTIES"&&(m=n.properties),n.type==="WE_SET_PAUSED"){E=!!n.isPaused;const a=document.querySelector("#we-active-video");a&&(E?a.pause():a.play().catch(()=>{}))}const o=document.querySelector("#we-wallpaper-iframe");o?.contentWindow&&o.contentWindow.postMessage(n,"*")}),window.addEventListener("pagehide",b);try{window.parent.postMessage({type:"WE_SANDBOX_READY"},"*")}catch{}})();
