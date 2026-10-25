import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive repository root from script location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Accept caller-provided source image or fallback to repository favicon
const sourcePath = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.join(repoRoot, 'public', 'favicon.png');

const outPath = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(repoRoot, 'public', 'favicon.svg');

if (!fs.existsSync(sourcePath)) {
  console.error(`Source image not found: ${sourcePath}`);
  process.exit(1);
}

const b64 = fs.readFileSync(sourcePath).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512" />
</svg>`;

fs.writeFileSync(outPath, svg);
console.log(`Saved SVG favicon to ${outPath} from ${sourcePath}`);
