#!/usr/bin/env npx tsx
import { promises as fs } from 'fs';
import path from 'path';

// SVG template matching the existing blog image style
function createSVG(title: string): string {
  // Split title into main and subtitle if too long
  let mainTitle = title;
  let subtitle = '';
  
  if (title.length > 40) {
    // Try to split at a colon or dash
    if (title.includes(':')) {
      const parts = title.split(':');
      mainTitle = parts[0].trim();
      subtitle = parts[1]?.trim() || '';
    } else if (title.includes(' - ')) {
      const parts = title.split(' - ');
      mainTitle = parts[0].trim();
      subtitle = parts[1]?.trim() || '';
    } else {
      // Split at word boundary around middle
      const words = title.split(' ');
      const midPoint = Math.ceil(words.length / 2);
      mainTitle = words.slice(0, midPoint).join(' ');
      subtitle = words.slice(midPoint).join(' ');
    }
  }
  
  // If mainTitle is still too long, truncate
  if (mainTitle.length > 50) {
    mainTitle = mainTitle.substring(0, 47) + '...';
  }
  if (subtitle.length > 60) {
    subtitle = subtitle.substring(0, 57) + '...';
  }
  
  // Create SVG with proper text positioning
  if (subtitle) {
    return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FF6B35"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
    ${escapeXml(mainTitle)}
  </text>
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="white" opacity="0.9">
    ${escapeXml(subtitle)}
  </text>
  <text x="600" y="420" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.8">
    Orange Jelly Limited
  </text>
</svg>`;
  } else {
    return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FF6B35"/>
  <text x="600" y="315" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
    ${escapeXml(mainTitle)}
  </text>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.8">
    Orange Jelly Limited
  </text>
</svg>`;
  }
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Blog posts that need images
const blogPosts = [
  { slug: 'compete-with-wetherspoons', title: 'How to Compete with Wetherspoons' },
  { slug: 'beat-chain-pubs', title: 'Independent Pub vs Chains' },
  { slug: 'christmas-pub-promotion-ideas', title: 'Christmas Pub Promotions' },
  { slug: 'content-marketing-ideas-pubs', title: 'Content Marketing for Pubs' },
  { slug: 'email-marketing-pub-retention', title: 'Email Marketing for Pubs' },
  { slug: 'facebook-marketing-local-pubs', title: 'Facebook Marketing for Pubs' },
  { slug: 'how-to-run-successful-pub-events', title: 'Successful Pub Events' },
  { slug: 'instagram-marketing-for-pubs', title: 'Instagram Marketing for Pubs' },
  { slug: 'live-music-events-for-pubs', title: 'Live Music Events' },
  { slug: 'local-pub-marketing', title: 'Local Pub Marketing' },
  { slug: 'low-budget-pub-marketing-ideas', title: 'Low Budget Marketing Ideas' },
  { slug: 'midweek-pub-offers-that-work', title: 'Midweek Pub Offers' },
  { slug: 'premium-pub-positioning', title: 'Premium Pub Positioning' },
  { slug: 'profitable-pub-food-menu-ideas', title: 'Profitable Pub Food' },
  { slug: 'pub-differentiation-strategies', title: 'Pub Differentiation' },
  { slug: 'pub-empty-tuesday-nights', title: 'Empty Tuesday Nights' },
  { slug: 'pub-refurbishment-on-budget', title: 'Budget Refurbishment' },
  { slug: 'quiet-monday-night-promotions', title: 'Monday Night Promotions' },
  { slug: 'quiz-night-ideas', title: 'Quiz Night Ideas' },
  { slug: 'recession-proof-pub-strategies', title: 'Recession-Proof Strategies' },
  { slug: 'seasonal-pub-events-calendar', title: 'Seasonal Events Calendar' },
  { slug: 'social-media-strategy-for-pubs', title: 'Social Media Strategy' },
  { slug: 'summer-pub-event-ideas', title: 'Summer Event Ideas' },
  { slug: 'why-is-my-pub-empty', title: 'Why Is My Pub Empty?' },
];

async function createFeaturedImages() {
  console.log('🎨 Creating Featured Images for Blog Posts\n');
  console.log('=' .repeat(60));
  
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
  
  // Ensure directory exists
  await fs.mkdir(imagesDir, { recursive: true });
  
  let created = 0;
  let skipped = 0;
  
  for (const post of blogPosts) {
    const filePath = path.join(imagesDir, `${post.slug}.svg`);
    
    try {
      // Check if file already exists
      await fs.access(filePath);
      console.log(`⏭️  Skipping: ${post.slug}.svg (already exists)`);
      skipped++;
    } catch {
      // File doesn't exist, create it
      const svg = createSVG(post.title);
      await fs.writeFile(filePath, svg, 'utf-8');
      console.log(`✅ Created: ${post.slug}.svg`);
      created++;
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Created: ${created} images`);
  console.log(`⏭️  Skipped: ${skipped} images (already existed)`);
  console.log(`📁 Location: ${imagesDir}`);
  
  if (created > 0) {
    console.log('\n💡 NEXT STEPS:');
    console.log('1. Review the generated SVG images');
    console.log('2. Optionally create custom designs for key articles');
    console.log('3. The images are already linked in Sanity');
    console.log('4. Test social media sharing to ensure images display correctly');
  }
}

// Run the script
createFeaturedImages().catch(console.error);