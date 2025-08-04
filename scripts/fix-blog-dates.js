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
  
  // Fix date format if it exists
  if (data.date) {
    console.log(`Updating ${file}: date -> publishedDate`);
    data.publishedDate = data.date;
    delete data.date;
  }
  
  // Fix description format if it exists
  if (data.description && !data.excerpt) {
    console.log(`Updating ${file}: description -> excerpt`);
    data.excerpt = data.description;
    delete data.description;
  }
  
  // Fix categories to tags
  if (data.categories && !data.tags) {
    console.log(`Updating ${file}: categories -> tags`);
    data.tags = data.categories;
    delete data.categories;
  }
  
  // Fix keywords to seo.keywords
  if (data.keywords && !data.seo) {
    console.log(`Updating ${file}: keywords -> seo.keywords`);
    data.seo = {
      title: data.title,
      description: data.excerpt,
      keywords: data.keywords
    };
    delete data.keywords;
  }
  
  // Ensure featuredImage is set
  if (!data.featuredImage) {
    data.featuredImage = `/images/blog/${file.replace('.md', '.jpg')}`;
  }
  
  // Rebuild the file
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newContent);
});

console.log('Date and format update complete!');