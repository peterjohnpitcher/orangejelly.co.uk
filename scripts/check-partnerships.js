const { client } = require('../src/lib/sanity.client');

async function checkPartnerships() {
  console.log('Checking partnerships data in Sanity...\n');
  
  try {
    // Query for partnerships
    const partnerships = await client.fetch(`
      *[_type == "aboutContent"][0].partnerships[] {
        name,
        description,
        logo,
        url
      }
    `);
    
    if (!partnerships || partnerships.length === 0) {
      console.log('❌ No partnerships found in Sanity');
      console.log('\nThe site is falling back to hardcoded defaults:');
      console.log('- Greene King');
      console.log('- British Institute of Innkeeping');
      console.log('- Federation of Small Businesses');
      console.log('\n✅ Solution: Add partnerships data in Sanity Studio under About Content');
    } else {
      console.log('✅ Found', partnerships.length, 'partnerships in Sanity:');
      partnerships.forEach(p => {
        console.log(`\n- ${p.name}`);
        if (p.description) console.log(`  Description: ${p.description}`);
        if (p.url) console.log(`  URL: ${p.url}`);
        if (p.logo) console.log(`  Has logo: Yes`);
      });
    }
  } catch (error) {
    console.error('Error querying Sanity:', error.message);
  }
}

checkPartnerships();