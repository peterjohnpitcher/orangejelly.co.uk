// Load env variables
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const { client } = require('../src/lib/sanity.client');

async function fixAboutImage() {
  console.log('Fixing About Page Image Issue...\n');

  try {
    // 1. Get the author's image reference
    const author = await client.fetch(`
      *[_type == "author" && name == "Peter Pitcher"][0] {
        _id,
        name,
        image
      }
    `);

    if (!author || !author.image) {
      console.log('❌ No author with image found');
      return;
    }

    console.log('✅ Found author with image');
    console.log('- Author:', author.name);
    console.log('- Image asset:', author.image.asset?._ref);

    // 2. Get the about content document
    const aboutContent = await client.fetch(`
      *[_type == "aboutContent"][0] {
        _id,
        founderSection
      }
    `);

    if (!aboutContent) {
      console.log('❌ No about content found');
      return;
    }

    console.log('\n✅ Found about content');
    console.log('- Document ID:', aboutContent._id);
    console.log('- Current founder image:', aboutContent.founderSection?.image);

    // 3. Update the about content with the author's image
    console.log('\n📝 Updating about content with author image...');
    
    const patch = client
      .patch(aboutContent._id)
      .set({
        'founderSection.image': author.image
      })
      .commit();

    const result = await patch;
    
    console.log('\n✅ Successfully updated about content!');
    console.log('- Updated document ID:', result._id);
    console.log('- New image reference:', result.founderSection?.image);

    // 4. Verify the update
    const updated = await client.fetch(`
      *[_type == "aboutContent"][0] {
        founderSection {
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

    if (updated?.founderSection?.image?.asset?.url) {
      console.log('\n🎉 Verification successful!');
      console.log('- Founder name:', updated.founderSection.name);
      console.log('- Image URL:', updated.founderSection.image.asset.url);
    } else {
      console.log('\n⚠️ Update completed but image URL not found');
    }

  } catch (error) {
    console.error('Error fixing about image:', error);
  }
}

// Run the fix
fixAboutImage();