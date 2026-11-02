import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDir, '../..');

export async function loadTsModule(projectRelativePath) {
  // Map known modules to offline precompiled bundles when node_modules/esbuild is not yet installed.
  const knownMap = {
    'src/utils/markdown-ast.ts': '../generated/utils/markdown-ast.js',
    'src/todoist/api-error.ts': '../generated/todoist/api-error.js',
    'src/bilibili/subscription-chapters.ts': '../generated/bilibili/subscription-chapters.js',
  };

  const precompiled = knownMap[projectRelativePath];
  if (precompiled) {
    try {
      const url = new URL(precompiled, import.meta.url);
      return await import(url.href);
    } catch {
      // Fall through to dynamic esbuild compilation
    }
  }

  const esbuild = await import('esbuild');
  const absPath = path.resolve(projectRoot, projectRelativePath);
  const result = await esbuild.build({
    entryPoints: [absPath],
    bundle: true,
    format: 'esm',
    write: false,
    platform: 'node',
    target: 'node20',
    external: ['vue', 'node:*'],
  });
  const code = result.outputFiles[0].text;
  const dataUri = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  return import(dataUri);
}
