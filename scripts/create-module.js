// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('❌ Please provide a module name:');
  console.error('   node scripts/create-module.js persons');
  process.exit(1);
}

const baseDir = path.join(__dirname, '..', 'src', moduleName);
const subDirs = [
  'domain',
  'dto',
  'infrastructure',
  'infrastructure/persistence',
  'infrastructure/persistence/document',
  'infrastructure/persistence/document/entities',
  'infrastructure/persistence/document/mappers',
  'infrastructure/persistence/document/repositories',
];

if (fs.existsSync(baseDir)) {
  console.log(`⚠️ Module '${moduleName}' already exists.`);
  process.exit(1);
}

fs.mkdirSync(baseDir, { recursive: true });
subDirs.forEach((subDir) => {
  fs.mkdirSync(path.join(baseDir, subDir));
});

console.log(
  `✅ Module '${moduleName}' created with subfolders: ${subDirs.join(', ')}`,
);
