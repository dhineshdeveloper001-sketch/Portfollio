import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  console.log('No public/assets dir');
  process.exit(0);
}

const files = fs.readdirSync(assetsDir);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const inputPath = path.join(assetsDir, file);
    const parsed = path.parse(file);
    const outputPathWebp = path.join(assetsDir, `${parsed.name}.webp`);
    
    console.log(`Converting ${file} to WebP...`);
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPathWebp)
      .then(() => console.log(`Done: ${outputPathWebp}`))
      .catch(err => console.error(err));
  }
}
