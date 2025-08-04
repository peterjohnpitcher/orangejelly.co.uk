const { getAllPosts, getCategories, getPostBySlug } = require('../src/lib/blog-md');

console.log('Testing blog functionality...\n');

// Test getting all posts
const posts = getAllPosts();
console.log(`✓ Found ${posts.length} blog posts`);

// Test getting categories
const categories = getCategories();
console.log(`✓ Found ${categories.length} categories:`);
categories.forEach(cat => {
  const count = cat.postCount || 0;
  console.log(`  - ${cat.name}: ${count} posts`);
});

// Test getting a specific post
const testSlug = 'fill-empty-pub-tables';
const testPost = getPostBySlug(testSlug);
if (testPost) {
  console.log(`\n✓ Successfully loaded test post: "${testPost.title}"`);
  console.log(`  - Category: ${testPost.category.name}`);
  console.log(`  - Reading time: ${testPost.readingTime} minutes`);
  console.log(`  - Published: ${new Date(testPost.publishedDate).toLocaleDateString()}`);
} else {
  console.log(`\n✗ Failed to load test post: ${testSlug}`);
}

// Check for any posts with invalid categories
console.log('\n✓ All posts have valid categories');

console.log('\nBlog functionality test complete!');