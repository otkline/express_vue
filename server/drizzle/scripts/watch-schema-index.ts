import chokidar from 'chokidar';
import { readdirSync, writeFileSync } from 'fs';
import { dirname, resolve, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaDir = resolve(__dirname, '../schema');
const indexFile = resolve(schemaDir, 'index.ts');

const generateIndex = () => {
  const files = readdirSync(schemaDir)
    .filter((file) => extname(file) === '.ts' && file !== 'index.ts');

  const exports = files
    .map((file) => `export * from './${basename(file, '.ts')}';`)
    .join('\n');

  writeFileSync(indexFile, exports + '\n');
  console.log(`[schema/index.ts] を再生成しました (${new Date().toLocaleTimeString()})`);
};

// 初回実行
generateIndex();

// ファイル監視開始
chokidar
  .watch(schemaDir, { ignoreInitial: true })
  .on('add', generateIndex)
  .on('unlink', generateIndex)
  .on('change', generateIndex);
