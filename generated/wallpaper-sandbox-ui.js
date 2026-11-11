(function(){"use strict";const P=`
(function() {
  if (window.__WE_SHIM_INITIALIZED__) return;
  window.__WE_SHIM_INITIALIZED__ = true;

  // 1. 全局监听器注册表
  window._weAudioCallbacks = [];
  window._weMediaCallbacks = [];
  window._weUserProperties = {};

  // 2. Wallpaper Engine 标准核心接口
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

  // 3. 消息总线：接收父页面传入的鼠标、音频与配置，并合成原生事件
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

    // C. 128 位双声道音频频谱数据推流 (0~63 左声道，64~127 右声道，Float32 归一化)
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
`;let m=[];function y(e){return m.push(e),e}function h(){for(const e of m)URL.revokeObjectURL(e);m=[]}function u(e){return String(e||"").replace(/\\/g,"/").replace(/^\.\//,"").replace(/^\/+/,"")}function v(e,r){const a=String(r||"").trim().replace(/^['"]|['"]$/g,"");if(!a||/^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(a))return"";const[o]=a.split(/[?#]/);if(!o)return"";const t=a.startsWith("/")?"":u(e).split("/").slice(0,-1).join("/"),f=`${t?`${t}/`:""}${o.replace(/^\/+/,"")}`.split("/"),l=[];for(const c of f)!c||c==="."||(c===".."?l.pop():l.push(c));return l.join("/").toLowerCase()}async function L(e){h();const r=document.getElementById("wallpaper-root");if(!r)return;r.replaceChildren();const a=Array.isArray(e.files)?e.files:[];let o=a.find(l=>{const c=u(l.path).toLowerCase();return c.endsWith(".mp4")||c.endsWith(".webm")||c.endsWith(".mkv")});if(!o&&e.entry&&(o=a.find(l=>u(l.path).toLowerCase()===u(e.entry).toLowerCase())),!o?.file)return;const t=document.createElement("video");t.id="we-active-video",t.autoplay=!0,t.loop=!0,t.muted=!0,t.playsInline=!0,t.setAttribute("webkit-playsinline","true"),t.style.width="100%",t.style.height="100%",t.style.objectFit="cover",t.style.display="block",t.style.pointerEvents="none";const f=y(URL.createObjectURL(o.file));t.src=f,r.appendChild(t);try{await t.play()}catch(l){console.warn("[Video Wallpaper] Autoplay warning:",l)}}async function A(e){h();const r=document.getElementById("wallpaper-root");if(!r||(r.replaceChildren(),typeof e.entry!="string"))return;const a=e.entry,o=new Map((Array.isArray(e.files)?e.files:[]).map(n=>[u(n.path).toLowerCase(),n])),t=new Map;async function f(n,w){const i=v(n,w),s=o.get(i);return!s?.file||!(s.file instanceof Blob)?w:(t.has(i)||t.set(i,y(URL.createObjectURL(new Blob([s.file],{type:s.mime||s.file.type||"application/octet-stream"})))),t.get(i))}async function l(n,w){let i=String(n||"");for(const s of[...i.matchAll(/url\(([^)]+)\)/gi)]){const b=await f(w,s[1].trim());i=i.replace(s[0],`url(${JSON.stringify(b)})`)}return i}async function c(n,w,i,s){for(const b of n.querySelectorAll(w)){const g=b.getAttribute(i);g&&b.setAttribute(i,await f(s,g))}}const E=o.get(u(a).toLowerCase());if(!E?.file||!(E.file instanceof Blob))return;const d=new DOMParser().parseFromString(await E.file.text(),"text/html"),_=d.createElement("script");_.textContent=P,d.head.prepend(_);for(const n of d.querySelectorAll('link[rel~="stylesheet"][href]')){const w=n.getAttribute("href")||"",i=o.get(v(a,w));if(i?.file instanceof Blob){const s=await l(await i.file.text(),i.path);n.setAttribute("href",y(URL.createObjectURL(new Blob([s],{type:"text/css"}))))}}await c(d,"img[src],script[src],source[src],video[src],audio[src]","src",a),await c(d,"link[href]","href",a);for(const n of d.querySelectorAll("[style]"))n.setAttribute("style",await l(n.getAttribute("style")||"",a));for(const n of d.querySelectorAll("style"))n.textContent=await l(n.textContent||"",a);const p=document.createElement("iframe");p.id="we-wallpaper-iframe",p.title=e.name||"Web Wallpaper",p.sandbox.add("allow-scripts","allow-pointer-lock"),p.style.width="100%",p.style.height="100%",p.style.border="none",p.style.display="block",p.src=y(URL.createObjectURL(new Blob([`<!doctype html>
${d.documentElement.outerHTML}`],{type:"text/html"}))),r.appendChild(p),e.properties&&p.addEventListener("load",()=>{p.contentWindow?.postMessage({type:"WE_USER_PROPERTIES",properties:e.properties},"*")},{once:!0})}window.addEventListener("message",e=>{if(e.source!==window.parent)return;const r=e.data;if(!r)return;if(r.type==="web"){A(r).catch(console.error);return}if(r.type==="video"){L(r).catch(console.error);return}const a=document.querySelector("#we-wallpaper-iframe");a?.contentWindow&&a.contentWindow.postMessage(r,"*");const o=document.querySelector("#we-active-video");o&&r.type==="WE_SET_PAUSED"&&(r.isPaused?o.pause():o.play().catch(()=>{}))}),window.addEventListener("pagehide",h)})();
