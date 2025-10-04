const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const inputFile = 'swith-logo.png';

async function convertLogoToWebP() {
  console.log('🔄 로고 WebP 변환 시작...\n');

  const inputPath = path.join(inputDir, inputFile);
  const outputPath = path.join(inputDir, 'swith-logo.webp');

  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);

    await sharp(inputPath).webp({ quality: 90, lossless: true }).toFile(outputPath);

    const webpStats = fs.statSync(outputPath);
    const webpSize = (webpStats.size / 1024).toFixed(2);

    console.log(`✅ ${inputFile} → swith-logo.webp`);
    console.log(`   원본 (PNG): ${originalSize} KB`);
    console.log(`   WebP: ${webpSize} KB`);
    console.log(`   용량 절감: ${((1 - webpSize / originalSize) * 100).toFixed(1)}%\n`);
    console.log('✨ 변환 완료!');
  } catch (error) {
    console.error(`❌ ${inputFile} 변환 실패:`, error.message);
  }
}

convertLogoToWebP();
