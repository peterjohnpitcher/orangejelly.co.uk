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

// Blog post titles
const blogPosts = [
  'fill-empty-pub-tables',
  'why-is-my-pub-empty',
  'pub-empty-tuesday-nights',
  'quiet-monday-night-promotions',
  'midweek-pub-offers-that-work',
  'compete-with-wetherspoons',
  'beat-chain-pubs',
  'local-pub-marketing',
  'pub-differentiation-strategies',
  'premium-pub-positioning',
  'social-media-strategy-for-pubs',
  'instagram-marketing-for-pubs',
  'facebook-marketing-local-pubs',
  'email-marketing-pub-retention',
  'content-marketing-ideas-pubs',
  'profitable-pub-food-menu-ideas',
  'how-to-run-successful-pub-events',
  'quiz-night-ideas',
  'live-music-events-for-pubs',
  'seasonal-pub-events-calendar',
  'low-budget-pub-marketing-ideas',
  'christmas-pub-promotion-ideas',
  'summer-pub-event-ideas',
  'pub-refurbishment-on-budget',
  'recession-proof-pub-strategies'
];

// Create blog images directory
const blogImagesDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

// Create a default blog image
const defaultSVG = createPlaceholderSVG('The Licensee\'s Guide', '#006064');
fs.writeFileSync(path.join(blogImagesDir, 'default.svg'), defaultSVG);

// Create an SVG for each blog post
blogPosts.forEach((slug, index) => {
  // Convert slug to title
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Vary colors slightly
  const colors = ['#FF6B35', '#006064', '#FF8C42', '#004D4D', '#FF5722'];
  const color = colors[index % colors.length];
  
  const svg = createPlaceholderSVG(title, color);
  const filename = `${slug}.svg`;
  
  fs.writeFileSync(path.join(blogImagesDir, filename), svg);
  console.log(`Created ${filename}`);
});

// Also create OG images directory and default
const ogImagesDir = path.join(__dirname, '../public/images/og');
if (!fs.existsSync(ogImagesDir)) {
  fs.mkdirSync(ogImagesDir, { recursive: true });
}

const ogDefaultSVG = createPlaceholderSVG('Orange Jelly Limited', '#FF6B35');
fs.writeFileSync(path.join(ogImagesDir, 'default.svg'), ogDefaultSVG);
fs.writeFileSync(path.join(ogImagesDir, 'licensees-guide.svg'), createPlaceholderSVG('The Licensee\'s Guide', '#006064'));

console.log('\nBlog images created successfully!');