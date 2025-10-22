// scripts/copy-css.js
import fs from 'fs';
import path from 'path';

const files = ['node_modules/@plitzi/plitzi-builder/dist/plitzi-builder.css'];

files.forEach(srcPath => {
  const fileName = path.basename(srcPath);
  const destPath = path.resolve('public', fileName);
  fs.copyFileSync(path.resolve(srcPath), destPath);
  console.log(`Copied ${fileName} to public/`);
});
