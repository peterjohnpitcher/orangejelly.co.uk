#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

const articles = [
  {
    slug: 'young-people-wont-come-to-your-pub',
    title: 'Young People Won\'t Come?',
    subtitle: 'Transform Your Pub\'s Appeal'
  },
  {
    slug: 'terrible-online-reviews-damage-control',
    title: 'Bad Reviews?',
    subtitle: 'Turn Critics Into Advocates'
  },
  {
    slug: 'village-pub-dying-village-survival',
    title: 'Dying Village?',
    subtitle: 'Become a Destination'
  },
  {
    slug: 'nobody-books-tables-anymore',
    title: 'No Bookings?',
    subtitle: 'Master Walk-ins & Reservations'
  },
  {
    slug: 'brewery-tie-improve-your-deal',
    title: 'Brewery Tie Issues?',
    subtitle: 'Improve Your Deal Legally'
  },
  {
    slug: 'cash-flow-crisis-breaking-cycle',
    title: 'Cash Flow Crisis?',
    subtitle: 'Break the Cycle'
  },
  {
    slug: 'food-allergies-gdpr-compliance',
    title: 'Compliance Nightmares?',
    subtitle: 'Simple Systems That Work'
  },
  {
    slug: 'kitchen-nightmares-chef-quits',
    title: 'Chef Walked Out?',
    subtitle: 'Crisis Management Guide'
  }
];

function createSVG(title: string, subtitle: string): string {
  // Create SVG with dynamic text
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F7931E;stop-opacity:1" />
    </linearGradient>
    <pattern id="pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="2" fill="white" opacity="0.1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-gradient)"/>
  <rect width="1200" height="630" fill="url(#pattern)"/>
  
  <!-- Dark overlay for text contrast -->
  <rect width="1200" height="630" fill="black" opacity="0.3"/>
  
  <!-- Icon/Symbol -->
  <circle cx="600" cy="200" r="60" fill="none" stroke="white" stroke-width="4" opacity="0.3"/>
  <text x="600" y="220" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" fill="white" opacity="0.3">?</text>
  
  <!-- Main Title -->
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="56" font-weight="bold" text-anchor="middle" fill="white">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="white" opacity="0.9">
    ${subtitle}
  </text>
  
  <!-- Bottom branding -->
  <text x="600" y="550" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="white" opacity="0.7">
    The Licensee's Guide | Orange Jelly
  </text>
</svg>`;
}

// Create the SVGs
const outputDir = path.join(process.cwd(), 'public', 'images', 'blog');

articles.forEach(article => {
  const svg = createSVG(article.title, article.subtitle);
  const filePath = path.join(outputDir, `${article.slug}.svg`);
  
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${article.slug}.svg`);
});

console.log('\n✅ All blog SVGs created successfully!');