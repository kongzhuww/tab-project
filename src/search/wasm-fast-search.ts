/**
 * WebAssembly 离线高速模糊搜索引擎桥接层 (Rust + wasm-pack)
 * 支持 Chrome 扩展 MV3 静态资源加载与 Node/纯前端环境的无缝透明降级
 */

import type { SearchSuggestionItem } from './store';
import type { WebCandidate } from './web-ranking';
import { registerFastMarkdownRenderer } from '../utils/markdown-ast';

type WasmExports = typeof import('../wasm/fast-search/fast_search');

let wasmInstance: WasmExports | null = null;
let initPromise: Promise<boolean> | null = null;
let isReady = false;

declare const chrome: any;

/**
 * 异步初始化加载 FastSearch Wasm 模块
 */
export async function initFastSearch(): Promise<boolean> {
  if (isReady) return true;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // 动态载入 wasm-pack 生成的胶水层
      const wasmModule = await import('../wasm/fast-search/fast_search');
      
      // 定位 wasm 文件二进制路径
      let wasmPath: string | URL = '';
      if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
        wasmPath = chrome.runtime.getURL('assets/fast_search_bg.wasm');
      } else {
        wasmPath = new URL('../wasm/fast-search/fast_search_bg.wasm', import.meta.url).href;
      }

      await wasmModule.default(wasmPath);
      wasmInstance = wasmModule;
      isReady = true;

      // 注册全局 Wasm 高性能 Markdown 渲染引擎通道
      registerFastMarkdownRenderer((source) => {
        if (!isReady || !wasmInstance || !source || !source.trim()) return null;
        // 专有语法兜底判定：若包含 LaTeX 公式 ($$) 或 Obsidian 双链 ([[]) 则平滑降级至专有 AST 引擎
        if (source.includes('$$') || source.includes('[[')) {
          return null;
        }
        try {
          return wasmInstance.render_markdown_fast(source);
        } catch (e) {
          console.warn('[FastSearch Wasm] render_markdown_fast 异常，降级至原生:', e);
          return null;
        }
      });

      return true;
    } catch (err) {
      console.warn('[FastSearch Wasm] 暂未加载 Wasm 模块，平滑降级至内置 TypeScript 引擎:', err);
      isReady = false;
      return false;
    }
  })();

  return initPromise;
}

export function isFastSearchReady(): boolean {
  return isReady && wasmInstance !== null;
}

/**
 * 单条匹配快速打分 (Rust Wasm 实现)
 */
export function fastWebMatchScore(query: string, title: string, url: string): number | null {
  if (!isReady || !wasmInstance) return null;
  try {
    return wasmInstance.web_match_score(query, title, url);
  } catch {
    return null;
  }
}

/**
 * 快速文本模糊相似度打分 (Rust Wasm 实现)
 */
export function fastFuzzyMatchScore(query: string, target: string): number | null {
  if (!isReady || !wasmInstance) return null;
  try {
    return wasmInstance.fuzzy_match_score(query, target);
  } catch {
    return null;
  }
}

/**
 * 批量高速排序引擎 (Rust Wasm 密集打分与原地 TopN)
 */
export function fastRankCandidates(query: string, candidates: WebCandidate[], limit = 40): SearchSuggestionItem[] | null {
  if (!isReady || !wasmInstance || !query.trim() || !candidates.length) return null;

  try {
    const candidateMap = new Map<string, WebCandidate>();
    const payload = candidates.map((c, idx) => {
      const id = String(c.item.id || idx);
      candidateMap.set(id, c);
      return {
        id,
        title: c.item.title || '',
        url: c.item.url || '',
        source: c.source,
        visited_at: c.visitedAt || 0,
        fuzzy_match: Boolean(c.fuzzyMatch),
      };
    });

    const jsonStr = JSON.stringify(payload);
    const resultJson = wasmInstance.rank_candidates_fast(query, jsonStr, limit);
    const ranked: Array<{ id: string; score: number; source: string; visited_at: number }> = JSON.parse(resultJson);

    return ranked.map((r) => {
      const orig = candidateMap.get(r.id);
      if (!orig) return null as any;
      return {
        ...orig.item,
        sources: [orig.source],
        launcherLinkId: orig.item.launcherLinkId,
        bookmarkId: orig.item.bookmarkId
      };
    }).filter(Boolean);
  } catch (e) {
    console.warn('[FastSearch Wasm] 批量排序异常，降级至原生:', e);
    return null;
  }
}

/**
 * 高性能 CommonMark / GFM Markdown 解析渲染 (Rust Wasm 实现)
 */
export function fastRenderMarkdown(markdown: string): string | null {
  if (!isReady || !wasmInstance || !markdown) return null;
  try {
    return wasmInstance.render_markdown_fast(markdown);
  } catch (err) {
    console.warn('[FastSearch Wasm] Markdown 渲染异常，平滑降级:', err);
    return null;
  }
}

