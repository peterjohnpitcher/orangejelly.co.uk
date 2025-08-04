const fs = require('fs');
const path = require('path');

// Create a simple placeholder SVG
const createPlaceholderSVG = (title, color = '#FF6B35') => {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${color}"/>
  <text x="600" y="315" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
    ${title.substring(0, 30)}${title.length > 30 ? '...' : ''}
  </text>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.8">
    Orange Jelly Limited
  </text>
</svg>`;
};

const blogImagesDir = path.join(__dirname, '../public/images/blog');

// Missing images based on the update script output
const missingImages = [
  { filename: 'fill-pub-tables.svg', title: 'Fill Empty Pub Tables' },
  { filename: 'midweek-pub-offers.svg', title: 'Midweek Pub Offers' },
  { filename: 'empty-pub-tuesday.svg', title: 'Empty Pub Tuesday Nights' },
  { filename: 'monday-night-promotions.svg', title: 'Monday Night Promotions' },
  { filename: 'empty-pub-solutions.svg', title: 'Empty Pub Solutions' }
];

// Create missing images
missingImages.forEach(({ filename, title }, index) => {
  const colors = ['#FF6B35', '#006064', '#FF8C42', '#004D4D', '#FF5722'];
  const color = colors[index % colors.length];
  const svg = createPlaceholderSVG(title, color);
  
  fs.writeFileSync(path.join(blogImagesDir, filename), svg);
  console.log(`Created ${filename}`);
});

console.log('\nMissing images created successfully!');