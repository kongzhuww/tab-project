use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SearchCandidateInput {
    pub id: String,
    pub title: String,
    pub url: String,
    pub source: String,
    #[serde(default)]
    pub visited_at: f64,
    #[serde(default)]
    pub fuzzy_match: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct RankedResultOutput {
    pub id: String,
    pub title: String,
    pub url: String,
    pub source: String,
    pub score: u32,
    pub visited_at: f64,
}

/// 快速字符标准化 (全角转半角、转小写、去除冗余空白)
fn normalize(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut prev_is_space = false;
    for c in input.trim().chars() {
        let normalized = match c {
            // 全角空格
            '\u{3000}' => ' ',
            // 全角 ASCII 字符转换 (！～ 映射到 ! ~)
            '\u{FF01}'..='\u{FF5E}' => char::from_u32(c as u32 - 0xFEE0).unwrap_or(c),
            _ => c,
        };
        for lower in normalized.to_lowercase() {
            if lower.is_whitespace() {
                if !prev_is_space {
                    out.push(' ');
                    prev_is_space = true;
                }
            } else {
                out.push(lower);
                prev_is_space = false;
            }
        }
    }
    out
}

/// 提取主机域名
fn extract_host(url: &str) -> &str {
    let without_proto = if let Some(idx) = url.find("://") {
        &url[idx + 3..]
    } else {
        url
    };
    let host_end = without_proto.find(['/', '?', '#', ':']).unwrap_or(without_proto.len());
    let mut host = &without_proto[..host_end];
    if host.starts_with("www.") {
        host = &host[4..];
    }
    host
}

/// 计算子序列模糊匹配分值 (Fuzzy Subsequence Match)
fn subsequence_score(query: &str, target: &str) -> u32 {
    if query.is_empty() || target.is_empty() {
        return 0;
    }
    let query_chars: Vec<char> = query.chars().collect();
    let target_chars: Vec<char> = target.chars().collect();

    let mut q_idx = 0;
    let mut t_idx = 0;
    let mut consecutive = 0;
    let mut max_consecutive = 0;

    while q_idx < query_chars.len() && t_idx < target_chars.len() {
        if query_chars[q_idx] == target_chars[t_idx] {
            q_idx += 1;
            consecutive += 1;
            if consecutive > max_consecutive {
                max_consecutive = consecutive;
            }
        } else {
            consecutive = 0;
        }
        t_idx += 1;
    }

    if q_idx == query_chars.len() {
        // 完全命中子序列，根据连续命中长度和长度比率打分 (30 ~ 50)
        let ratio = query_chars.len() as f64 / target_chars.len() as f64;
        let bonus = (max_consecutive as f64 * 3.0).min(15.0);
        (30.0 + (ratio * 10.0) + bonus).round() as u32
    } else {
        0
    }
}

/// 核心打分函数：对给定标题与网址进行综合模糊评分
#[wasm_bindgen]
pub fn web_match_score(query: &str, title: &str, url: &str) -> u32 {
    let q = normalize(query);
    if q.is_empty() {
        return 0;
    }
    let t = normalize(title);
    let u = normalize(url);

    // 1. 标题直接全等 / 前缀 / 包含
    let title_score = if t == q {
        100
    } else if t.starts_with(&q) {
        85
    } else if t.contains(&q) {
        70
    } else {
        0
    };

    // 2. 域名全等 / 前缀 / 包含
    let host = extract_host(&u);
    let url_score = if host == q {
        95
    } else if host.starts_with(&q) {
        80
    } else if u.contains(&q) {
        60
    } else {
        0
    };

    if title_score > 0 || url_score > 0 {
        return title_score.max(url_score);
    }

    // 3. 多分词组合判定 (Token All Match)
    let tokens: Vec<&str> = q.split_whitespace().collect();
    if tokens.len() > 1 {
        if tokens.iter().all(|tok| t.contains(tok)) {
            return 55;
        }
        let combined = format!("{} {}", t, u);
        if tokens.iter().all(|tok| combined.contains(tok)) {
            return 45;
        }
    }

    // 4. 连续子序列模糊匹配打分
    let sub_title = subsequence_score(&q, &t);
    let sub_url = subsequence_score(&q, host);
    sub_title.max(sub_url)
}

/// 快速单目标文本模糊匹配分值
#[wasm_bindgen]
pub fn fuzzy_match_score(query: &str, target: &str) -> u32 {
    let q = normalize(query);
    if q.is_empty() {
        return 0;
    }
    let t = normalize(target);
    if t == q {
        return 100;
    }
    if t.starts_with(&q) {
        return 85;
    }
    if t.contains(&q) {
        return 70;
    }
    subsequence_score(&q, &t)
}

/// 批量快速候选排名引擎：在 Rust 内存中一站式打分、过滤、去重与 TopN 排序
#[wasm_bindgen]
pub fn rank_candidates_fast(query: &str, candidates_json: &str, limit: usize) -> Result<String, JsValue> {
    let candidates: Vec<SearchCandidateInput> = serde_json::from_str(candidates_json)
        .map_err(|e| JsValue::from_str(&format!("JSON deserialize error: {}", e)))?;

    let q = normalize(query);
    if q.is_empty() {
        return Ok("[]".to_string());
    }

    let mut ranked: Vec<RankedResultOutput> = Vec::with_capacity(candidates.len());

    for cand in candidates {
        let mut score = web_match_score(&q, &cand.title, &cand.url);
        if score == 0 && cand.fuzzy_match {
            score = 15;
        }
        if score > 0 {
            ranked.push(RankedResultOutput {
                id: cand.id,
                title: cand.title,
                url: cand.url,
                source: cand.source,
                score,
                visited_at: cand.visited_at,
            });
        }
    }

    // 按照 分数降序 -> 访问时间降序 快速原地排序
    ranked.sort_by(|a, b| {
        b.score
            .cmp(&a.score)
            .then_with(|| b.visited_at.partial_cmp(&a.visited_at).unwrap_or(std::cmp::Ordering::Equal))
    });

    if limit > 0 && ranked.len() > limit {
        ranked.truncate(limit);
    }

    serde_json::to_string(&ranked)
        .map_err(|e| JsValue::from_str(&format!("JSON serialize error: {}", e)))
}

/// 高性能 CommonMark / GFM Markdown 解析器 (零拷贝、防 XSS、支持表格/删除线/任务列表/脚注)
#[wasm_bindgen]
pub fn render_markdown_fast(markdown: &str) -> String {
    use pulldown_cmark::{html, Options, Parser};

    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_SMART_PUNCTUATION);
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES);

    let parser = Parser::new_ext(markdown, options);
    let mut html_output = String::with_capacity(markdown.len() * 3 / 2);
    html::push_html(&mut html_output, parser);

    // 为外链自动注入安全跳转属性 target="_blank" rel="noopener noreferrer"
    if html_output.contains("<a href=\"http") {
        html_output = html_output
            .replace("<a href=\"https://", "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"ext-link\" href=\"https://")
            .replace("<a href=\"http://", "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"ext-link\" href=\"http://");
    }

    html_output
}

