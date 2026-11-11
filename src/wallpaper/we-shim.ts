/**
 * Wallpaper Engine Web API Shim (标准垫片脚本与原生事件合成器)
 * 注入至壁纸沙盒 iframe 的 <head> 顶部，完美伪造 10 个 Wallpaper Engine 全局接口
 * 并将父页面转发的鼠标坐标与音频频谱精准合成为原生 DOM 事件派发给壁纸内部元素
 */

export const WE_SHIM_SCRIPT_CONTENT = `
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
`;
