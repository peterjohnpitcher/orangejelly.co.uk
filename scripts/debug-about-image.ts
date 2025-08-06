// Load env variables
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

console.log('Environment check:');
console.log('- NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('- NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('- Has API token:', !!process.env.SANITY_API_TOKEN);

const { client } = require('../src/lib/sanity.client');
const { aboutContentQuery } = require('../src/lib/sanity.queries');

async function debugAboutImage() {
  console.log('\nDebugging About Page Image Issue...\n');

  try {
    // 1. Fetch about content
    const aboutContent = await client.fetch(aboutContentQuery);
    
    if (!aboutContent) {
      console.log('❌ No about content found in Sanity');
      return;
    }

    console.log('✅ About content found');
    console.log('\n📋 Founder Section:');
    console.log('- Name:', aboutContent.founderSection?.name);
    console.log('- Role:', aboutContent.founderSection?.role);
    console.log('- Has bio:', !!aboutContent.founderSection?.bio);
    console.log('- Has quote:', !!aboutContent.founderSection?.quote);
    
    // Check image details
    console.log('\n🖼️ Founder Image Details:');
    if (aboutContent.founderSection?.image) {
      console.log('- Image object exists:', true);
      console.log('- Full image object:', JSON.stringify(aboutContent.founderSection.image, null, 2));
      
      if (aboutContent.founderSection.image.asset) {
        console.log('- Has asset reference:', true);
        console.log('- Asset ID:', aboutContent.founderSection.image.asset._id);
        console.log('- Asset URL:', aboutContent.founderSection.image.asset.url);
      } else {
        console.log('- Has asset reference:', false);
        console.log('⚠️ Image exists but has no asset reference');
      }
    } else {
      console.log('❌ No image found in founderSection');
    }

    // 2. Compare with blog post author
    console.log('\n\n📝 Comparing with Blog Post Author...');
    
    const blogPost = await client.fetch(`
      *[_type == "blogPost" && defined(author->image)][0] {
        title,
        "author": author->{
          name,
          image {
            asset->{
              _id,
              url
            }
          }
        }
      }
    `);

    if (blogPost) {
      console.log('\n✅ Found blog post with author image');
      console.log('- Post title:', blogPost.title);
      console.log('- Author name:', blogPost.author?.name);
      console.log('- Author image:', JSON.stringify(blogPost.author?.image, null, 2));
    } else {
      console.log('❌ No blog posts with author images found');
    }

    // 3. Direct query for author documents
    console.log('\n\n👤 Checking Author Documents...');
    
    const authors = await client.fetch(`
      *[_type == "author"] {
        name,
        image {
          asset->{
            _id,
            url
          }
        }
      }
    `);

    if (authors.length > 0) {
      console.log(`\n✅ Found ${authors.length} author(s):`);
      authors.forEach((author: any, index: number) => {
        console.log(`\nAuthor ${index + 1}:`);
        console.log('- Name:', author.name);
        console.log('- Has image:', !!author.image);
        if (author.image?.asset) {
          console.log('- Image URL:', author.image.asset.url);
        }
      });
    } else {
      console.log('❌ No author documents found');
    }

    // 4. Check if the image asset actually exists
    if (aboutContent.founderSection?.image?.asset?._id) {
      console.log('\n\n🔍 Verifying Image Asset...');
      const assetId = aboutContent.founderSection.image.asset._id;
      
      const asset = await client.fetch(`*[_id == $id][0]`, { id: assetId });
      
      if (asset) {
        console.log('✅ Asset exists in Sanity');
        console.log('- Asset type:', asset._type);
        console.log('- Asset details:', JSON.stringify(asset, null, 2));
      } else {
        console.log('❌ Asset not found in Sanity');
      }
    }

  } catch (error) {
    console.error('Error debugging:', error);
  }
}

// Run the debug script
debugAboutImage();