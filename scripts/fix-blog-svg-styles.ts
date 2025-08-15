#!/usr/bin/env npx tsx
import fs from 'fs';
import path from 'path';

// New articles and their colors (matching existing style - alternating teal/orange)
const articles = [
  { slug: 'young-people-wont-come-to-your-pub', title: "Young People Won't Come?", color: '#006064' }, // teal
  { slug: 'terrible-online-reviews-damage-control', title: 'Terrible Online Reviews?', color: '#FF6B35' }, // orange
  { slug: 'village-pub-dying-village-survival', title: 'Village Pub Dying?', color: '#006064' }, // teal
  { slug: 'nobody-books-tables-anymore', title: 'Nobody Books Tables?', color: '#FF6B35' }, // orange
  { slug: 'brewery-tie-improve-your-deal', title: 'Brewery Tie Problems?', color: '#006064' }, // teal
  { slug: 'cash-flow-crisis-breaking-cycle', title: 'Cash Flow Crisis?', color: '#FF6B35' }, // orange
  { slug: 'food-allergies-gdpr-compliance', title: 'Food Allergies & GDPR', color: '#006064' }, // teal
  { slug: 'kitchen-nightmares-chef-quits', title: 'Kitchen Nightmares?', color: '#FF6B35' }, // orange
];

function createSimpleSVG(title: string, color: string): string {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${color}"/>
  <text x="600" y="315" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
    ${title}
  </text>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.8">
    Orange Jelly Limited
  </text>
</svg>`;
}

async function fixBlogSVGs() {
  console.log('🎨 Fixing blog SVG styles to match existing articles...\n');

  const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');

  for (const article of articles) {
    const svgPath = path.join(imagesDir, `${article.slug}.svg`);
    const svg = createSimpleSVG(article.title, article.color);
    
    // Write the new SVG
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ Updated: ${article.slug}.svg (${article.color === '#006064' ? 'teal' : 'orange'})`);
  }

  console.log('\n✨ All SVGs updated with consistent style!');
  console.log('The new SVGs now match the simple, clean style of existing articles.');
}

// Run the fix
fixBlogSVGs().catch(console.error);