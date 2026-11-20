import { d as K, o as j, H as J, f as Q, g as Z, h as ee, b as q } from "./vendor-vue-BbmU9NUg.js";
import { _ as te } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const l = {
  fontSize: 10,
  cellWidth: 7,
  cellHeight: 15,
  changeRate: 2,
  digitRatio: 0.3,
  cloudScale: 100,
  cloudCoverage: 1,
  cloudSoftness: 0.1,
  cloudDrift: 8,
  idleAlphaLight: 0.16,
  idleAlphaDark: 0.15,
  speedNear: 1100,
  speedFar: 80,
  speedFalloff: 240,
  damping: 1,
  borderCells: 6,
  turbulence: 0.45,
  turbulenceScale: 180,
  sourceFrequency: 6,
  sourceRadius: 36,
  sourceAmplitude: 1.4,
  waveGain: 3.5,
  glowDecay: 1.2,
  glowAlpha: 0.3,
  waveAlpha: 0.85,
  patchScale: 60,
  patchFloor: 0.3
}, k = 1 / 600, le = 0.05, ne = 3e-3, B = "0123456789", $ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", H = B + $, oe = 0.39, re = 0.01;
function P(r, n) {
  let o = r * 374761393 + n * 668265263 | 0;
  return o = Math.imul(o ^ o >>> 13, 1274126177) | 0, ((o ^ o >>> 16) >>> 0) / 4294967296;
}
function N(r, n) {
  const o = Math.floor(r), e = Math.floor(n), c = r - o, i = n - e, p = c * c * (3 - 2 * c), h = i * i * (3 - 2 * i), E = P(o, e) + (P(o + 1, e) - P(o, e)) * p, x = P(o, e + 1) + (P(o + 1, e + 1) - P(o, e + 1)) * p;
  return E + (x - E) * h;
}
function O(r, n) {
  return (N(r, n) * 4 + N(r * 2.1 + 7, n * 2.1 + 3) * 2 + N(r * 4.3 + 13, n * 4.3 + 11)) / 7;
}
function ae(r, n, o) {
  const e = P(r * 7 + o * 13, n * 11 + o * 3) < l.digitRatio, c = P(r * 131 + o, n * 197 + o * 7);
  return e ? Math.floor(c * B.length) : B.length + Math.floor(c * $.length);
}
function Y(r) {
  const n = Math.max(0, Math.min(1, r));
  return n * n * (3 - 2 * n);
}
function ie(r, n) {
  const o = O(r / l.cloudScale, n / l.cloudScale), e = 0.5 + (l.cloudCoverage - 0.5) * oe;
  return 0.22 + 0.78 * Y((o - e + l.cloudSoftness) / (2 * l.cloudSoftness));
}
function ce(r, n) {
  const o = O(r / l.patchScale + 31, n / l.patchScale + 17);
  return l.patchFloor + (1 - l.patchFloor) * Y((o - 0.35) / 0.3);
}
function z(r, n, o = Math.random) {
  const e = r * n, c = new Float32Array(e), i = new Float32Array(e), p = new Float32Array(e), h = new Float32Array(e), E = new Float32Array(e), x = o() * 1e3, { cellWidth: u, cellHeight: T } = l, C = u * u, F = T * T;
  let w = [], R = !1, m = 0;
  for (let a = 0; a < n; a++)
    for (let t = 0; t < r; t++) {
      const f = a * r + t, d = O(t * u / l.turbulenceScale + x, a * T / l.turbulenceScale + x);
      h[f] = Math.min(1.4, Math.max(0.3, 1 + l.turbulence * (d - 0.5) * 3.2));
      const s = Math.min(t, a, r - 1 - t, n - 1 - a), g = Math.max(0, 1 - s / l.borderCells) ** 2;
      E[f] = l.damping + g * 12;
    }
  function y(a, t) {
    for (let f = 0; f < n; f++)
      for (let d = 0; d < r; d++) {
        const s = f * r + d, g = Math.hypot((d - a) * u, (f - t) * T), _ = (l.speedFar + (l.speedNear - l.speedFar) * Math.exp(-g / l.speedFalloff)) * h[s], A = _ * _;
        A > p[s] && (p[s] = A);
      }
  }
  function v() {
    for (let a = 0; a < w.length; a++) {
      const t = w[a], f = Math.sin(Math.PI * t.time / t.duration), d = Math.cos(2 * Math.PI * l.sourceFrequency * t.time) * 2 * Math.PI * l.sourceFrequency, s = l.sourceRadius * t.radiusScale, g = Math.ceil(s * 3 / u), _ = Math.ceil(s * 3 / T);
      for (let A = Math.max(0, t.row - _); A <= Math.min(n - 1, t.row + _); A++)
        for (let S = Math.max(0, t.column - g); S <= Math.min(r - 1, t.column + g); S++) {
          const M = (S - t.column) * u, b = (A - t.row) * T, L = Math.exp(-(M * M + b * b) / (2 * s * s));
          c[A * r + S] += l.sourceAmplitude * t.amplitudeScale * f * d * L * k;
        }
      t.time += k;
    }
    w = w.filter((a) => a.time < a.duration);
  }
  function D() {
    for (let t = 0; t < n; t++)
      for (let f = 0; f < r; f++) {
        const d = t * r + f, s = c[d], g = c[f > 0 ? d - 1 : d], _ = c[f < r - 1 ? d + 1 : d], A = c[t > 0 ? d - r : d], S = c[t < n - 1 ? d + r : d], M = (g + _ - 2 * s) / C + (A + S - 2 * s) / F;
        i[d] += (p[d] * M - E[d] * i[d]) * k;
      }
    let a = 0;
    for (let t = 0; t < e; t++)
      c[t] += i[t] * k, c[t] *= 1 - 0.35 * k, a = Math.max(a, Math.abs(c[t]));
    v(), R = w.length > 0 || a > ne, R || (c.fill(0), i.fill(0), p.fill(0));
  }
  return {
    height: c,
    active: () => R,
    disturb(a, t) {
      if (r <= 0 || n <= 0) return;
      const f = Math.max(0, Math.min(r - 1, Math.floor(a))), d = Math.max(0, Math.min(n - 1, Math.floor(t)));
      y(f, d), w.push({
        column: f,
        row: d,
        time: 0,
        duration: (1 + Math.floor(o() * 2)) / l.sourceFrequency,
        radiusScale: 0.7 + o() * 1.1,
        amplitudeScale: 0.6 + o() * 0.8
      }), R = !0;
    },
    advance(a) {
      for (m += Math.min(a, le); m >= k; )
        D(), m -= k;
    }
  };
}
const se = `#version 300 es
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`, de = `#version 300 es
precision highp float;
uniform sampler2D cells;
uniform sampler2D atlas;
uniform vec2 size;
uniform vec2 grid;
uniform vec2 cellPixels;
uniform vec2 atlasCell;
uniform float glyphCount;
uniform vec3 ink;
uniform vec3 wave;
out vec4 color;
void main() {
  vec2 position = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y);
  vec2 cell = min(floor(position / cellPixels), grid - 1.0);
  vec2 local = position - cell * cellPixels;
  vec4 data = texelFetch(cells, ivec2(cell), 0);
  float glyph = floor(data.r * 255.0 + 0.5);
  vec2 inAtlas = vec2(glyph * atlasCell.x + local.x * atlasCell.x / cellPixels.x, local.y * atlasCell.y / cellPixels.y);
  float coverage = texture(atlas, inAtlas / vec2(glyphCount * atlasCell.x, atlasCell.y)).a;
  float alpha = data.g * coverage;
  color = vec4(mix(ink, wave, data.b) * alpha, alpha);
}`;
function he(r, n, o) {
  let e = null;
  try {
    e = r.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !1, preserveDrawingBuffer: !1 });
  } catch {
    e = null;
  }
  if (!e) return null;
  const c = r.ownerDocument.createElement("canvas"), i = c.getContext("2d");
  if (!i) return null;
  const p = new Uint8Array(n * o * 4);
  let h = null, E = null, x = null, u = {}, T = "";
  function C(m, y) {
    const v = e.createShader(m);
    if (!v) throw new Error("shader create failed");
    if (e.shaderSource(v, y), e.compileShader(v), !e.getShaderParameter(v, e.COMPILE_STATUS)) throw new Error(e.getShaderInfoLog(v) || "shader compile error");
    return v;
  }
  function F(m, y) {
    const v = e.createTexture();
    return e.activeTexture(e.TEXTURE0 + m), e.bindTexture(e.TEXTURE_2D, v), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, y), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, y), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), v;
  }
  function w() {
    if (h = e.createProgram(), e.attachShader(h, C(e.VERTEX_SHADER, se)), e.attachShader(h, C(e.FRAGMENT_SHADER, de)), e.linkProgram(h), !e.getProgramParameter(h, e.LINK_STATUS)) throw new Error(e.getProgramInfoLog(h) || "program link error");
    e.useProgram(h), u = {};
    for (const m of ["cells", "atlas", "size", "grid", "cellPixels", "atlasCell", "glyphCount", "ink", "wave"])
      u[m] = e.getUniformLocation(h, m);
    E = F(0, e.NEAREST), x = F(1, e.LINEAR), e.uniform1i(u.cells, 0), e.uniform1i(u.atlas, 1), T = "";
  }
  function R(m, y) {
    const v = m + "|" + y;
    if (v === T) return;
    const D = Math.ceil(l.cellWidth * y), a = Math.ceil(l.cellHeight * y);
    c.width = D * H.length, c.height = a, i.setTransform(D / l.cellWidth, 0, 0, a / l.cellHeight, 0, 0), i.clearRect(0, 0, l.cellWidth * H.length, l.cellHeight), i.font = `${l.fontSize}px ${m}`, i.textBaseline = "middle", i.textAlign = "center", i.fillStyle = "#fff";
    for (let t = 0; t < H.length; t++)
      i.fillText(H[t], t * l.cellWidth + l.cellWidth / 2, l.cellHeight / 2);
    e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, x), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c), e.uniform2f(u.atlasCell, D, a), e.uniform1f(u.glyphCount, H.length), T = v;
  }
  try {
    w();
  } catch {
    return null;
  }
  return {
    data: p,
    build: w,
    draw(m, y) {
      R(m.fontFamily, y), e.viewport(0, 0, r.width, r.height), e.uniform2f(u.size, r.width, r.height), e.uniform2f(u.grid, n, o), e.uniform2f(u.cellPixels, l.cellWidth * y, l.cellHeight * y), e.uniform3f(u.ink, m.ink[0] / 255, m.ink[1] / 255, m.ink[2] / 255), e.uniform3f(u.wave, m.wave[0] / 255, m.wave[1] / 255, m.wave[2] / 255), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, E), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, n, o, 0, e.RGBA, e.UNSIGNED_BYTE, p), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLES, 0, 3);
    },
    dispose() {
      h && e.deleteProgram(h), E && e.deleteTexture(E), x && e.deleteTexture(x);
    }
  };
}
function ue(r, n, o) {
  const e = r.getContext("2d");
  if (!e) return null;
  const c = new Uint8Array(n * o * 4);
  return {
    data: c,
    build() {
    },
    draw(i, p) {
      e.setTransform(p, 0, 0, p, 0, 0), e.clearRect(0, 0, n * l.cellWidth, o * l.cellHeight), e.font = `${l.fontSize}px ${i.fontFamily}`, e.textBaseline = "middle", e.textAlign = "center";
      for (let h = 0; h < o; h++)
        for (let E = 0; E < n; E++) {
          const x = (h * n + E) * 4, u = c[x + 1] / 255;
          if (u <= 0) continue;
          const T = c[x + 2] / 255, C = Math.round(i.ink[0] + (i.wave[0] - i.ink[0]) * T), F = Math.round(i.ink[1] + (i.wave[1] - i.ink[1]) * T), w = Math.round(i.ink[2] + (i.wave[2] - i.ink[2]) * T);
          e.fillStyle = `rgba(${C},${F},${w},${u.toFixed(3)})`, e.fillText(H[c[x]] || "0", E * l.cellWidth + l.cellWidth / 2, h * l.cellHeight + l.cellHeight / 2);
        }
    },
    dispose() {
    }
  };
}
function fe(r, n, o, e) {
  const c = n > 0 && o > 0 ? he(r, n, o) || ue(r, n, o) : null, { cellWidth: i, cellHeight: p } = l, h = n * o, E = new Float32Array(h), x = new Float32Array(h), u = new Uint8Array(h), T = /* @__PURE__ */ new Map();
  let C = -1, F = 0, w = !1, R = !0;
  for (let a = 0; a < o; a++)
    for (let t = 0; t < n; t++)
      x[a * n + t] = ce(t * i + i / 2, a * p + p / 2);
  function m(a) {
    a.preventDefault();
  }
  function y() {
    c?.build(), R = !0;
  }
  r.addEventListener?.("webglcontextlost", m), r.addEventListener?.("webglcontextrestored", y);
  function v(a, t) {
    return t ? 0 : Math.floor(a / 1e3 * l.changeRate);
  }
  function D(a) {
    let t = T.get(a);
    if (!t) {
      t = new Float32Array(o);
      for (let f = 0; f < o; f++)
        t[f] = ie(a * i + i / 2, f * p + p / 2);
      T.set(a, t);
    }
    return t;
  }
  return {
    invalidate() {
      R = !0;
    },
    busy: () => e.active() || w,
    needsDraw(a, t) {
      return R || e.active() || w || v(a, t) !== C;
    },
    draw(a, t, f) {
      if (!c || n <= 0 || o <= 0) return;
      const d = v(a, f);
      if (d !== C)
        for (let M = 0; M < o; M++)
          for (let b = 0; b < n; b++)
            u[M * n + b] = ae(b, M, d);
      const s = Math.floor((f ? 0 : a / 1e3) * l.cloudDrift / i);
      for (const M of T.keys()) M < s && T.delete(M);
      const g = Math.exp(-Math.min(Math.max(0, (a - F) / 1e3), 0.1) / l.glowDecay), _ = t.dark ? l.idleAlphaDark : l.idleAlphaLight, { data: A } = c;
      let S = 0;
      for (let M = 0; M < n; M++) {
        const b = D(M + s);
        for (let L = 0; L < o; L++) {
          const I = L * n + M, G = Math.tanh(l.waveGain * Math.abs(e.height[I])), V = Math.max(E[I] * g, G), U = V < 0.01 ? 0 : V;
          E[I] = U;
          let W = _ * b[L];
          U > 0 && (S = Math.max(S, U), W = Math.min(1, W + x[I] * (U * l.glowAlpha + G * l.waveAlpha)));
          const X = I * 4;
          A[X] = u[I], A[X + 1] = W < re ? 0 : Math.round(W * 255), A[X + 2] = U > 0 ? Math.round(G * 255) : 0;
        }
      }
      c.draw(t, r.width / (n * i)), w = S > 0, C = d, F = a, R = !1;
    },
    dispose() {
      r.removeEventListener?.("webglcontextlost", m), r.removeEventListener?.("webglcontextrestored", y), c?.dispose();
    }
  };
}
const ge = /* @__PURE__ */ K({
  __name: "CipherRippleCanvas",
  setup(r) {
    const n = q(null), o = q(null);
    let e = null, c = null, i = 0, p = 0, h = !1, E = !1, x = 0, u = !1, T = -1, C = -1, F = 0, w = z(0, 0), R = null;
    function m() {
      return typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function y() {
      const s = typeof document < "u" && document.documentElement.dataset.theme === "dark";
      return {
        ink: s ? [136, 146, 159] : [132, 136, 146],
        wave: s ? [127, 166, 255] : [59, 110, 240],
        dark: s,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
      };
    }
    function v() {
      if (clearTimeout(p), p = 0, !(u || h)) {
        if (document.hidden) {
          !E && o.value && o.value.width > 0 && a(performance.now());
          return;
        }
        h = !0, i = requestAnimationFrame(a);
      }
    }
    function D(s) {
      if (u || document.hidden) return;
      const g = 1e3 / l.changeRate;
      p = window.setTimeout(v, g - s % g + 1);
    }
    function a(s) {
      if (i = 0, h = !1, u || !o.value || !R) return;
      const g = m();
      w.advance(g ? 0 : (s - x) / 1e3), x = s, o.value.width > 0 && R.needsDraw(s, g) && (R.draw(s, y(), g), E = !0), R.busy() && !g ? v() : D(s);
    }
    function t() {
      const s = n.value, g = o.value;
      if (!s || !g) return;
      const _ = s.clientWidth, A = s.clientHeight, S = Math.min(window.devicePixelRatio || 1, 2);
      if (_ === T && A === C && S === F) return;
      const M = Math.ceil(_ / l.cellWidth), b = Math.ceil(A / l.cellHeight);
      T = _, C = A, F = S, g.width = Math.round(M * l.cellWidth * S), g.height = Math.round(b * l.cellHeight * S), g.style.width = `${M * l.cellWidth}px`, g.style.height = `${b * l.cellHeight}px`, R?.dispose(), w = z(M, b), R = fe(g, M, b, w), E = !1;
    }
    function f(s) {
      if (s.button !== 0 || m() || !o.value) return;
      const g = o.value.getBoundingClientRect(), _ = Math.floor((s.clientX - g.left) / l.cellWidth), A = Math.floor((s.clientY - g.top) / l.cellHeight);
      x = performance.now(), w.disturb(_, A), v();
    }
    function d() {
      document.hidden ? (clearTimeout(p), p = 0, i && cancelAnimationFrame(i), i = 0, h = !1) : (x = performance.now(), v());
    }
    return j(() => {
      x = performance.now(), t(), v(), c = n.value?.parentElement || null, c?.addEventListener("pointerdown", f, { passive: !0 }), document.addEventListener("visibilitychange", d), typeof ResizeObserver == "function" && n.value && (e = new ResizeObserver(() => {
        t(), v();
      }), e.observe(n.value));
    }), J(() => {
      u = !0, clearTimeout(p), i && cancelAnimationFrame(i), e?.disconnect(), c?.removeEventListener("pointerdown", f), document.removeEventListener("visibilitychange", d), R?.dispose();
    }), (s, g) => (Q(), Z("div", {
      ref_key: "hostEl",
      ref: n,
      class: "cipher-ripple-host",
      "aria-hidden": "true"
    }, [
      ee("canvas", {
        ref_key: "canvasEl",
        ref: o,
        class: "cipher-ripple-canvas",
        "aria-hidden": "true"
      }, null, 512)
    ], 512));
  }
}), ve = /* @__PURE__ */ te(ge, [["__scopeId", "data-v-86b693da"]]);
export {
  ve as default
};
