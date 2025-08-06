// Load env variables
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const { client } = require('../src/lib/sanity.client');
const { urlFor } = require('../src/lib/sanity.client');
const { aboutContentQuery } = require('../src/lib/sanity.queries');

async function verifyAboutImage() {
  console.log('Verifying About Page Image Fix...\n');

  try {
    // Fetch the complete about content
    const aboutContent = await client.fetch(aboutContentQuery);
    
    if (!aboutContent) {
      console.log('❌ No about content found');
      return;
    }

    console.log('✅ About content found\n');

    // Check founder section details
    const founder = aboutContent.founderSection;
    if (!founder) {
      console.log('❌ No founder section found');
      return;
    }

    console.log('📋 Founder Section Details:');
    console.log('- Name:', founder.name);
    console.log('- Role:', founder.role);
    console.log('- Has bio:', !!founder.bio);
    console.log('- Has quote:', !!founder.quote);
    
    console.log('\n🖼️ Image Status:');
    if (founder.image) {
      console.log('✅ Image object exists');
      
      if (founder.image.asset) {
        console.log('✅ Asset reference exists');
        console.log('- Asset ID:', founder.image.asset._id);
        console.log('- Asset URL:', founder.image.asset.url);
        
        // Test urlFor function
        try {
          const imageUrl = urlFor(founder.image).url();
          console.log('\n✅ urlFor() function works:');
          console.log('- Generated URL:', imageUrl);
        } catch (error) {
          console.log('\n❌ urlFor() function failed:', error.message);
        }
      } else {
        console.log('❌ No asset reference found');
      }
    } else {
      console.log('❌ No image found');
    }

    // Compare with how it looks in the actual component
    console.log('\n🔍 Testing component logic:');
    if (founder.image?.asset) {
      console.log('✅ Component condition (founder.image?.asset) would pass');
      console.log('- The OptimizedImage component would receive:', urlFor(founder.image).url());
    } else {
      console.log('❌ Component would fall back to SVG');
    }

  } catch (error) {
    console.error('Error verifying:', error);
  }
}

// Run verification
verifyAboutImage();