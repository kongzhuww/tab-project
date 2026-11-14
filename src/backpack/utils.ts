/**
 * 提示词纯文本与变量模板解析工具 (Pure TypeScript, Zero DOM, Zero Vue)
 */

// 提取变量占位符，支持 {{name}} 和 {name}，自动去重
export function extractVariables(template: string): string[] {
  if (!template) return [];
  const matches = new Set<string>();
  const regex = /\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(template)) !== null) {
    const varName = match[1] || match[2];
    if (varName && !/^\d+$/.test(varName)) {
      matches.add(varName.trim());
    }
  }
  return Array.from(matches);
}

// 填充变量占位符
export function fillVariables(template: string, values: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (full, g1, g2) => {
    const varName = (g1 || g2 || "").trim();
    if (values[varName] !== undefined && values[varName] !== "") {
      return values[varName];
    }
    return full;
  });
}
