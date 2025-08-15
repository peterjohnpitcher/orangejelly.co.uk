#!/usr/bin/env npx tsx
/**
 * Creates a proper OpenGraph image (1200x630) for social sharing
 * Uses the Orange Jelly branding colors and logo
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

function createOGImage() {
  // Create canvas with OpenGraph dimensions
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Orange Jelly brand colors
  const orange = '#FF6B35';
  const teal = '#2C5F5F';
  const cream = '#FFF5EB';
  const charcoal = '#2C3E50';

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, orange);
  gradient.addColorStop(1, '#FF8555'); // Lighter orange
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add decorative circles (jelly bubbles)
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = cream;
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1100, 530, 100, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(200, 500, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;

  // Main content area
  const contentX = 100;
  const contentY = height / 2 - 120;

  // Title
  ctx.font = 'bold 72px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Orange Jelly', contentX, contentY);

  // Tagline
  ctx.font = '36px sans-serif';
  ctx.fillStyle = cream;
  ctx.fillText('Fill Empty Pub Tables', contentX, contentY + 60);
  ctx.fillText('With Proven Strategies', contentX, contentY + 110);

  // Key points
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'white';
  const points = [
    '✓ 25-35 quiz attendees weekly',
    '✓ 71% food GP achieved',
    '✓ £75k+ added to business value',
  ];

  points.forEach((point, i) => {
    ctx.fillText(point, contentX, contentY + 180 + i * 35);
  });

  // Website URL
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = teal;
  ctx.fillRect(contentX - 10, height - 100, 400, 50);
  ctx.fillStyle = 'white';
  ctx.fillText('www.orangejelly.co.uk', contentX, height - 65);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(process.cwd(), 'public', 'og-image.png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ OpenGraph image created at: ${outputPath}`);
  console.log(`   Dimensions: ${width}x${height}`);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(2)}KB`);
}

// Check if canvas module is installed
try {
  createOGImage();
} catch (error: any) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log('⚠️  Canvas module not installed.');
    console.log('   To create the OG image, run: npm install canvas');
    console.log('\n   For now, using the existing logo.png as OpenGraph image.');
  } else {
    console.error('Error creating OG image:', error);
  }
}
