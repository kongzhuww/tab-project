import esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDir, '../..');

export async function loadTsModule(projectRelativePath) {
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
