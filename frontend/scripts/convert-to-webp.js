const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const imageFiles = ['landing-img1.webp', 'landing-img2.webp', 'landing-img3.webp'];

async function convertToWebP() {
  console.log('🔄 이미지 변환 및 최적화 시작...\n');

  for (const filename of imageFiles) {
    const inputPath = path.join(inputDir, filename);
    const baseOutputPath = path.join(inputDir, filename.replace('.webp', ''));

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024).toFixed(2);

      // 모바일용 작은 버전 (640px 너비)
      const mobileOutputPath = `${baseOutputPath}-mobile.webp`;
      await sharp(inputPath).resize(640, null).webp({ quality: 75 }).toFile(mobileOutputPath);

      const mobileStats = fs.statSync(mobileOutputPath);
      const mobileSize = (mobileStats.size / 1024).toFixed(2);

      console.log(`✅ ${filename}`);
      console.log(`   데스크톱: ${originalSize} KB`);
      console.log(`   모바일: ${mobileSize} KB\n`);
    } catch (error) {
      console.error(`❌ ${filename} 변환 실패:`, error.message);
    }
  }

  console.log('✨ 변환 완료!');
}

convertToWebP();
