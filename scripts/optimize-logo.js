const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeLogo() {
  const inputPath = path.join(__dirname, '../public/logo.png');
  const outputPath = path.join(__dirname, '../public/logo-optimized.png');
  
  try {
    // First, let's check the metadata
    const metadata = await sharp(inputPath).metadata();
    console.log('Original image metadata:', metadata);
    
    // Optimize the PNG
    await sharp(inputPath)
      .png({
        quality: 85,
        compressionLevel: 9,
        palette: true,
        colors: 64 // Reduce color palette for smaller size
      })
      .toFile(outputPath);
    
    // Check the new file size
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)}KB`);
    console.log(`Optimized size: ${(newSize / 1024).toFixed(2)}KB`);
    console.log(`Reduction: ${(((originalSize - newSize) / originalSize) * 100).toFixed(2)}%`);
    
    // If optimization was successful, replace the original
    if (newSize < originalSize) {
      fs.copyFileSync(outputPath, inputPath);
      fs.unlinkSync(outputPath);
      console.log('Logo optimized successfully!');
    } else {
      fs.unlinkSync(outputPath);
      console.log('Optimization did not reduce file size');
    }
    
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

optimizeLogo();