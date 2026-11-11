(function(){"use strict";function S(e,t){const i=JSON.stringify(e),a=JSON.stringify(t);return`
(function() {
  if (window.__WE_SHIM_INITIALIZED__) return;
  window.__WE_SHIM_INITIALIZED__ = true;

  // 1. 资产映射表与路径解析器 (拦截相对路径 404)
  var __WE_ASSET_MAP__ = ${i};
  var __WE_ENTRY_DIR__ = ${a};

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
`}let h=[];function y(e){return h.push(e),e}function g(){for(const e of h)URL.revokeObjectURL(e);h=[]}function u(e){return String(e||"").replace(/\\/g,"/").replace(/^\.\//,"").replace(/^\/+/,"").toLowerCase()}function P(e,t){const i=String(t||"").trim().replace(/^['"]|['"]$/g,"");if(!i||/^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(i))return"";const[a]=i.split(/[?#]/);if(!a)return"";const r=i.startsWith("/")?"":u(e).split("/").slice(0,-1).join("/"),f=`${r?`${r}/`:""}${a.replace(/^\/+/,"")}`.split("/"),s=[];for(const l of f)!l||l==="."||(l===".."?s.pop():s.push(l));return s.join("/").toLowerCase()}let m=null,E=!1;async function L(e){g();const t=document.getElementById("wallpaper-root");if(!t)return;t.replaceChildren();const i=Array.isArray(e.files)?e.files:[];let a=i.find(s=>{const l=u(s.path);return l.endsWith(".mp4")||l.endsWith(".webm")||l.endsWith(".mkv")});if(!a&&e.entry&&(a=i.find(s=>u(s.path)===u(e.entry))),!a?.file)return;const r=document.createElement("video");r.id="we-active-video",r.autoplay=!0,r.loop=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("webkit-playsinline","true"),r.style.width="100%",r.style.height="100%",r.style.objectFit="cover",r.style.display="block",r.style.pointerEvents="none";const f=y(URL.createObjectURL(a.file));r.src=f,t.appendChild(r);try{await r.play()}catch(s){console.warn("[Video Wallpaper] Autoplay warning:",s)}}async function W(e){g();const t=document.getElementById("wallpaper-root");if(!t||(t.replaceChildren(),typeof e.entry!="string"))return;const i=e.entry,a=Array.isArray(e.files)?e.files:[],r=new Map,f={};for(const n of a){const p=u(n.path);if(r.set(p,n),n.file instanceof Blob){const o=y(URL.createObjectURL(new Blob([n.file],{type:n.mime||n.file.type||"application/octet-stream"})));f[p]=o}}function s(n,p){const o=P(n,p);return f[o]||p}function l(n,p){let o=String(n||"");for(const w of[...o.matchAll(/url\(([^)]+)\)/gi)]){const v=w[1].trim().replace(/^['"]|['"]$/g,""),b=s(p,v);o=o.replace(w[0],`url(${JSON.stringify(b)})`)}return o}function A(n,p,o,w){for(const v of n.querySelectorAll(p)){const b=v.getAttribute(o);b&&v.setAttribute(o,s(w,b))}}const _=r.get(u(i));if(!_?.file||!(_.file instanceof Blob))return;const d=new DOMParser().parseFromString(await _.file.text(),"text/html"),M=u(i).split("/").slice(0,-1).join("/"),U=d.createElement("script");U.textContent=S(f,M),d.head.prepend(U);for(const n of d.querySelectorAll('link[rel~="stylesheet"][href]')){const p=n.getAttribute("href")||"",o=r.get(P(i,p));if(o?.file instanceof Blob){const w=l(await o.file.text(),o.path);n.setAttribute("href",y(URL.createObjectURL(new Blob([w],{type:"text/css"}))))}}A(d,"img[src],script[src],source[src],video[src],audio[src]","src",i),A(d,"link[href]","href",i);for(const n of d.querySelectorAll("[style]"))n.setAttribute("style",l(n.getAttribute("style")||"",i));for(const n of d.querySelectorAll("style"))n.textContent=l(n.textContent||"",i);const c=document.createElement("iframe");c.id="we-wallpaper-iframe",c.title=e.name||"Web Wallpaper",c.sandbox.add("allow-scripts","allow-pointer-lock"),c.style.width="100%",c.style.height="100%",c.style.border="none",c.style.display="block",c.src=y(URL.createObjectURL(new Blob([`<!doctype html>
${d.documentElement.outerHTML}`],{type:"text/html"}))),m=e.properties||null,c.addEventListener("load",()=>{m&&c.contentWindow?.postMessage({type:"WE_USER_PROPERTIES",properties:m},"*"),E&&c.contentWindow?.postMessage({type:"WE_SET_PAUSED",isPaused:!0},"*")},{once:!0}),t.appendChild(c)}window.addEventListener("message",e=>{if(e.source!==window.parent)return;const t=e.data;if(!t)return;if(t.type==="web"){W(t).catch(console.error);return}if(t.type==="video"){L(t).catch(console.error);return}if(t.type==="WE_USER_PROPERTIES"&&(m=t.properties),t.type==="WE_SET_PAUSED"){E=!!t.isPaused;const a=document.querySelector("#we-active-video");a&&(E?a.pause():a.play().catch(()=>{}))}const i=document.querySelector("#we-wallpaper-iframe");i?.contentWindow&&i.contentWindow.postMessage(t,"*")}),window.addEventListener("pagehide",g)})();
