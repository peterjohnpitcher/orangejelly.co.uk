const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../content/blog');

// Get all markdown files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContent);
  
  // Update featuredImage to use SVG
  if (data.featuredImage) {
    const oldImage = data.featuredImage;
    const newImage = oldImage.replace('.jpg', '.svg');
    data.featuredImage = newImage;
    console.log(`Updating ${file}: ${oldImage} -> ${newImage}`);
  }
  
  // Update OG images in SEO
  if (data.seo && data.seo.image) {
    data.seo.image = data.seo.image.replace('.jpg', '.svg');
  }
  
  // Rebuild the file
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newContent);
});

console.log('Image extensions updated to SVG!');