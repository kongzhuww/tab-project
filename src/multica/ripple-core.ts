/**
 * Interactive ASCII Matrix & Wave Ripple Renderer (WebGL2 + 2D Canvas fallback).
 * Adapted from 0DNANCY/agy-claude-style ripple-core.js (MIT License).
 */

export const RIPPLE = {
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
  patchFloor: 0.3,
};

const WAVE_STEP = 1 / 600;
const MAX_ADVANCE = 0.05;
const REST_HEIGHT = 0.003;
const DIGITS = '0123456789';
const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const GLYPHS = DIGITS + LETTERS;
const COVERAGE_TO_THRESHOLD = 0.39;
const INVISIBLE_ALPHA = 0.01;

export interface RipplePalette {
  ink: [number, number, number];
  wave: [number, number, number];
  dark: boolean;
  fontFamily: string;
}

export interface WaveField {
  height: Float32Array;
  active: () => boolean;
  disturb: (column: number, row: number) => void;
  advance: (seconds: number) => void;
}

export interface GlyphField {
  invalidate: () => void;
  busy: () => boolean;
  needsDraw: (now: number, still: boolean) => boolean;
  draw: (now: number, palette: RipplePalette, still: boolean) => void;
  dispose: () => void;
}

export function hash(a: number, b: number): number {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const top = hash(x0, y0) + (hash(x0 + 1, y0) - hash(x0, y0)) * sx;
  const bottom = hash(x0, y0 + 1) + (hash(x0 + 1, y0 + 1) - hash(x0, y0 + 1)) * sx;
  return top + (bottom - top) * sy;
}

export function fractalNoise(x: number, y: number): number {
  return (valueNoise(x, y) * 4 + valueNoise(x * 2.1 + 7, y * 2.1 + 3) * 2 + valueNoise(x * 4.3 + 13, y * 4.3 + 11)) / 7;
}

export function glyphIndex(column: number, row: number, tick: number): number {
  const digit = hash(column * 7 + tick * 13, row * 11 + tick * 3) < RIPPLE.digitRatio;
  const pick = hash(column * 131 + tick, row * 197 + tick * 7);
  return digit ? Math.floor(pick * DIGITS.length) : DIGITS.length + Math.floor(pick * LETTERS.length);
}

function smooth(value: number): number {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

export function cloudClear(x: number, y: number): number {
  const noise = fractalNoise(x / RIPPLE.cloudScale, y / RIPPLE.cloudScale);
  const threshold = 0.5 + (RIPPLE.cloudCoverage - 0.5) * COVERAGE_TO_THRESHOLD;
  const cloud = smooth((noise - threshold + RIPPLE.cloudSoftness) / (2 * RIPPLE.cloudSoftness));
  return 0.22 + 0.78 * cloud;
}

export function patchClear(x: number, y: number): number {
  const noise = fractalNoise(x / RIPPLE.patchScale + 31, y / RIPPLE.patchScale + 17);
  return RIPPLE.patchFloor + (1 - RIPPLE.patchFloor) * smooth((noise - 0.35) / 0.3);
}

export function createWaveField(columns: number, rows: number, random: () => number = Math.random): WaveField {
  const cells = columns * rows;
  const height = new Float32Array(cells);
  const velocity = new Float32Array(cells);
  const speedSquared = new Float32Array(cells);
  const speedFactor = new Float32Array(cells);
  const damping = new Float32Array(cells);
  const seed = random() * 1000;
  const { cellWidth, cellHeight } = RIPPLE;
  const widthSquared = cellWidth * cellWidth;
  const heightSquared = cellHeight * cellHeight;
  let sources: Array<{ column: number; row: number; time: number; duration: number; radiusScale: number; amplitudeScale: number }> = [];
  let moving = false;
  let behind = 0;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = row * columns + column;
      const noise = fractalNoise((column * cellWidth) / RIPPLE.turbulenceScale + seed, (row * cellHeight) / RIPPLE.turbulenceScale + seed);
      speedFactor[cell] = Math.min(1.4, Math.max(0.3, 1 + RIPPLE.turbulence * (noise - 0.5) * 3.2));
      const edge = Math.min(column, row, columns - 1 - column, rows - 1 - row);
      const border = Math.max(0, 1 - edge / RIPPLE.borderCells) ** 2;
      damping[cell] = RIPPLE.damping + border * 12;
    }
  }

  function raiseSpeeds(column: number, row: number) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const cell = r * columns + c;
        const distance = Math.hypot((c - column) * cellWidth, (r - row) * cellHeight);
        const speed = (RIPPLE.speedFar + (RIPPLE.speedNear - RIPPLE.speedFar) * Math.exp(-distance / RIPPLE.speedFalloff)) * speedFactor[cell];
        const squared = speed * speed;
        if (squared > speedSquared[cell]) speedSquared[cell] = squared;
      }
    }
  }

  function drive() {
    for (let s = 0; s < sources.length; s++) {
      const source = sources[s];
      const envelope = Math.sin((Math.PI * source.time) / source.duration);
      const rate = Math.cos(2 * Math.PI * RIPPLE.sourceFrequency * source.time) * 2 * Math.PI * RIPPLE.sourceFrequency;
      const radius = RIPPLE.sourceRadius * source.radiusScale;
      const reachColumns = Math.ceil((radius * 3) / cellWidth);
      const reachRows = Math.ceil((radius * 3) / cellHeight);
      for (let r = Math.max(0, source.row - reachRows); r <= Math.min(rows - 1, source.row + reachRows); r++) {
        for (let c = Math.max(0, source.column - reachColumns); c <= Math.min(columns - 1, source.column + reachColumns); c++) {
          const dx = (c - source.column) * cellWidth;
          const dy = (r - source.row) * cellHeight;
          const gauss = Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius));
          height[r * columns + c] += RIPPLE.sourceAmplitude * source.amplitudeScale * envelope * rate * gauss * WAVE_STEP;
        }
      }
      source.time += WAVE_STEP;
    }
    sources = sources.filter((source) => source.time < source.duration);
  }

  function step() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const cell = r * columns + c;
        const here = height[cell];
        const left = height[c > 0 ? cell - 1 : cell];
        const right = height[c < columns - 1 ? cell + 1 : cell];
        const above = height[r > 0 ? cell - columns : cell];
        const below = height[r < rows - 1 ? cell + columns : cell];
        const laplacian = (left + right - 2 * here) / widthSquared + (above + below - 2 * here) / heightSquared;
        velocity[cell] += (speedSquared[cell] * laplacian - damping[cell] * velocity[cell]) * WAVE_STEP;
      }
    }
    let peak = 0;
    for (let cell = 0; cell < cells; cell++) {
      height[cell] += velocity[cell] * WAVE_STEP;
      height[cell] *= 1 - 0.35 * WAVE_STEP;
      peak = Math.max(peak, Math.abs(height[cell]));
    }
    drive();
    moving = sources.length > 0 || peak > REST_HEIGHT;
    if (!moving) {
      height.fill(0);
      velocity.fill(0);
      speedSquared.fill(0);
    }
  }

  return {
    height,
    active: () => moving,
    disturb(column: number, row: number) {
      if (columns <= 0 || rows <= 0) return;
      const c = Math.max(0, Math.min(columns - 1, Math.floor(column)));
      const r = Math.max(0, Math.min(rows - 1, Math.floor(row)));
      raiseSpeeds(c, r);
      sources.push({
        column: c,
        row: r,
        time: 0,
        duration: (1 + Math.floor(random() * 2)) / RIPPLE.sourceFrequency,
        radiusScale: 0.7 + random() * 1.1,
        amplitudeScale: 0.6 + random() * 0.8,
      });
      moving = true;
    },
    advance(seconds: number) {
      behind += Math.min(seconds, MAX_ADVANCE);
      while (behind >= WAVE_STEP) {
        step();
        behind -= WAVE_STEP;
      }
    },
  };
}

export function parseCssColorToRgb(cssColor: string): [number, number, number] | null {
  const s = String(cssColor || '').trim();
  if (!s) return null;
  if (s[0] === '#') {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16)];
    }
    if (hex.length >= 6) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
  }
  const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(s);
  if (m) return [Math.round(Number(m[1])), Math.round(Number(m[2])), Math.round(Number(m[3]))];
  return null;
}

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
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

interface InternalRenderer {
  data: Uint8Array;
  build: () => void;
  draw: (palette: RipplePalette, dpr: number) => void;
  dispose: () => void;
}

function createWebGL2Renderer(canvas: HTMLCanvasElement, columns: number, rows: number): InternalRenderer | null {
  let gl: WebGL2RenderingContext | null = null;
  try {
    gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: false });
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const atlasCanvas = canvas.ownerDocument.createElement('canvas');
  const atlasContext = atlasCanvas.getContext('2d');
  if (!atlasContext) return null;
  const data = new Uint8Array(columns * rows * 4);
  let program: WebGLProgram | null = null;
  let cellTexture: WebGLTexture | null = null;
  let atlasTexture: WebGLTexture | null = null;
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  let atlasKey = '';

  function compile(type: number, source: string) {
    const sh = gl!.createShader(type);
    if (!sh) throw new Error('shader create failed');
    gl!.shaderSource(sh, source);
    gl!.compileShader(sh);
    if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) throw new Error(gl!.getShaderInfoLog(sh) || 'shader compile error');
    return sh;
  }

  function createTex(unit: number, filter: number) {
    const tex = gl!.createTexture();
    gl!.activeTexture(gl!.TEXTURE0 + unit);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    return tex;
  }

  function build() {
    program = gl!.createProgram()!;
    gl!.attachShader(program, compile(gl!.VERTEX_SHADER, VERTEX_SHADER));
    gl!.attachShader(program, compile(gl!.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl!.linkProgram(program);
    if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) throw new Error(gl!.getProgramInfoLog(program) || 'program link error');
    gl!.useProgram(program);
    uniforms = {};
    for (const name of ['cells', 'atlas', 'size', 'grid', 'cellPixels', 'atlasCell', 'glyphCount', 'ink', 'wave']) {
      uniforms[name] = gl!.getUniformLocation(program, name);
    }
    cellTexture = createTex(0, gl!.NEAREST);
    atlasTexture = createTex(1, gl!.LINEAR);
    gl!.uniform1i(uniforms.cells, 0);
    gl!.uniform1i(uniforms.atlas, 1);
    atlasKey = '';
  }

  function buildAtlas(font: string, dpr: number) {
    const key = font + '|' + dpr;
    if (key === atlasKey) return;
    const width = Math.ceil(RIPPLE.cellWidth * dpr);
    const height = Math.ceil(RIPPLE.cellHeight * dpr);
    atlasCanvas.width = width * GLYPHS.length;
    atlasCanvas.height = height;
    atlasContext!.setTransform(width / RIPPLE.cellWidth, 0, 0, height / RIPPLE.cellHeight, 0, 0);
    atlasContext!.clearRect(0, 0, RIPPLE.cellWidth * GLYPHS.length, RIPPLE.cellHeight);
    atlasContext!.font = `${RIPPLE.fontSize}px ${font}`;
    atlasContext!.textBaseline = 'middle';
    atlasContext!.textAlign = 'center';
    atlasContext!.fillStyle = '#fff';
    for (let i = 0; i < GLYPHS.length; i++) {
      atlasContext!.fillText(GLYPHS[i], i * RIPPLE.cellWidth + RIPPLE.cellWidth / 2, RIPPLE.cellHeight / 2);
    }
    gl!.activeTexture(gl!.TEXTURE1);
    gl!.bindTexture(gl!.TEXTURE_2D, atlasTexture);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, atlasCanvas);
    gl!.uniform2f(uniforms.atlasCell, width, height);
    gl!.uniform1f(uniforms.glyphCount, GLYPHS.length);
    atlasKey = key;
  }

  try {
    build();
  } catch {
    return null;
  }

  return {
    data,
    build,
    draw(palette, dpr) {
      buildAtlas(palette.fontFamily, dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uniforms.size, canvas.width, canvas.height);
      gl!.uniform2f(uniforms.grid, columns, rows);
      gl!.uniform2f(uniforms.cellPixels, RIPPLE.cellWidth * dpr, RIPPLE.cellHeight * dpr);
      gl!.uniform3f(uniforms.ink, palette.ink[0] / 255, palette.ink[1] / 255, palette.ink[2] / 255);
      gl!.uniform3f(uniforms.wave, palette.wave[0] / 255, palette.wave[1] / 255, palette.wave[2] / 255);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, cellTexture);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, columns, rows, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, data);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    },
    dispose() {
      if (program) gl!.deleteProgram(program);
      if (cellTexture) gl!.deleteTexture(cellTexture);
      if (atlasTexture) gl!.deleteTexture(atlasTexture);
    },
  };
}

function create2DRenderer(canvas: HTMLCanvasElement, columns: number, rows: number): InternalRenderer | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const data = new Uint8Array(columns * rows * 4);
  return {
    data,
    build() {},
    draw(palette, dpr) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, columns * RIPPLE.cellWidth, rows * RIPPLE.cellHeight);
      ctx.font = `${RIPPLE.fontSize}px ${palette.fontFamily}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const at = (r * columns + c) * 4;
          const alpha = data[at + 1] / 255;
          if (alpha <= 0) continue;
          const mix = data[at + 2] / 255;
          const rr = Math.round(palette.ink[0] + (palette.wave[0] - palette.ink[0]) * mix);
          const gg = Math.round(palette.ink[1] + (palette.wave[1] - palette.ink[1]) * mix);
          const bb = Math.round(palette.ink[2] + (palette.wave[2] - palette.ink[2]) * mix);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha.toFixed(3)})`;
          ctx.fillText(GLYPHS[data[at]] || '0', c * RIPPLE.cellWidth + RIPPLE.cellWidth / 2, r * RIPPLE.cellHeight + RIPPLE.cellHeight / 2);
        }
      }
    },
    dispose() {},
  };
}

export function createGlyphField(canvas: HTMLCanvasElement, columns: number, rows: number, waves: WaveField): GlyphField {
  const renderer = columns > 0 && rows > 0
    ? createWebGL2Renderer(canvas, columns, rows) || create2DRenderer(canvas, columns, rows)
    : null;
  const { cellWidth, cellHeight } = RIPPLE;
  const cells = columns * rows;
  const glow = new Float32Array(cells);
  const patch = new Float32Array(cells);
  const glyphs = new Uint8Array(cells);
  const cloudColumns = new Map<number, Float32Array>();
  let lastTick = -1;
  let lastDraw = 0;
  let glowing = false;
  let stale = true;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      patch[row * columns + column] = patchClear(column * cellWidth + cellWidth / 2, row * cellHeight + cellHeight / 2);
    }
  }

  function onContextLost(e: Event) { e.preventDefault(); }
  function onContextRestored() {
    renderer?.build();
    stale = true;
  }
  canvas.addEventListener?.('webglcontextlost', onContextLost);
  canvas.addEventListener?.('webglcontextrestored', onContextRestored);

  function tickAt(now: number, still: boolean) {
    return still ? 0 : Math.floor((now / 1000) * RIPPLE.changeRate);
  }

  function cloudColumn(absolute: number): Float32Array {
    let col = cloudColumns.get(absolute);
    if (!col) {
      col = new Float32Array(rows);
      for (let row = 0; row < rows; row++) {
        col[row] = cloudClear(absolute * cellWidth + cellWidth / 2, row * cellHeight + cellHeight / 2);
      }
      cloudColumns.set(absolute, col);
    }
    return col;
  }

  return {
    invalidate() { stale = true; },
    busy: () => waves.active() || glowing,
    needsDraw(now: number, still: boolean) {
      return stale || waves.active() || glowing || tickAt(now, still) !== lastTick;
    },
    draw(now: number, palette: RipplePalette, still: boolean) {
      if (!renderer || columns <= 0 || rows <= 0) return;
      const tick = tickAt(now, still);
      if (tick !== lastTick) {
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            glyphs[row * columns + column] = glyphIndex(column, row, tick);
          }
        }
      }
      const drift = Math.floor(((still ? 0 : now / 1000) * RIPPLE.cloudDrift) / cellWidth);
      for (const abs of cloudColumns.keys()) if (abs < drift) cloudColumns.delete(abs);
      const decay = Math.exp(-Math.min(Math.max(0, (now - lastDraw) / 1000), 0.1) / RIPPLE.glowDecay);
      const idleAlpha = palette.dark ? RIPPLE.idleAlphaDark : RIPPLE.idleAlphaLight;
      const { data } = renderer;

      let brightest = 0;
      for (let column = 0; column < columns; column++) {
        const clouds = cloudColumn(column + drift);
        for (let row = 0; row < rows; row++) {
          const cell = row * columns + column;
          const strength = Math.tanh(RIPPLE.waveGain * Math.abs(waves.height[cell]));
          const shown = Math.max(glow[cell] * decay, strength);
          const lit = shown < 0.01 ? 0 : shown;
          glow[cell] = lit;
          let alpha = idleAlpha * clouds[row];
          if (lit > 0) {
            brightest = Math.max(brightest, lit);
            alpha = Math.min(1, alpha + patch[cell] * (lit * RIPPLE.glowAlpha + strength * RIPPLE.waveAlpha));
          }
          const at = cell * 4;
          data[at] = glyphs[cell];
          data[at + 1] = alpha < INVISIBLE_ALPHA ? 0 : Math.round(alpha * 255);
          data[at + 2] = lit > 0 ? Math.round(strength * 255) : 0;
        }
      }
      renderer.draw(palette, canvas.width / (columns * cellWidth));
      glowing = brightest > 0;
      lastTick = tick;
      lastDraw = now;
      stale = false;
    },
    dispose() {
      canvas.removeEventListener?.('webglcontextlost', onContextLost);
      canvas.removeEventListener?.('webglcontextrestored', onContextRestored);
      renderer?.dispose();
    },
  };
}
