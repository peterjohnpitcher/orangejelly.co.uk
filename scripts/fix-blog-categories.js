const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Category mapping
const categoryMapping = {
  'pub-management': 'empty-pub-solutions',
  'pub-promotions': 'events-promotions',
  'marketing': 'social-media',
  'events': 'events-promotions',
  'food': 'food-drink',
  'seasonal': 'events-promotions',
  'budget': 'empty-pub-solutions',
  'competition': 'competition',
  'getting-started': 'empty-pub-solutions'
};

const blogDir = path.join(__dirname, '../content/blog');

// Get all markdown files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContent);
  
  // Map category if needed
  if (data.category && categoryMapping[data.category]) {
    console.log(`Updating ${file}: ${data.category} -> ${categoryMapping[data.category]}`);
    data.category = categoryMapping[data.category];
  } else if (!data.category) {
    console.log(`No category for ${file}, setting to empty-pub-solutions`);
    data.category = 'empty-pub-solutions';
  }
  
  // Rebuild the file
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newContent);
});

console.log('Category update complete!');