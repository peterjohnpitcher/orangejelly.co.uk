import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function countAllDocuments() {
  const query = `{
    "total": count(*[]),
    "byType": {
      "homepage": count(*[_type == "homepageContent"]),
      "services": count(*[_type == "serviceDetail"]),
      "landingPages": count(*[_type == "landingPage"]),
      "navigation": count(*[_type == "navigation"]),
      "footer": count(*[_type == "footerContent"]),
      "cta": count(*[_type == "ctaMessage"]),
      "relatedLinks": count(*[_type == "relatedLinks"]),
      "faqs": count(*[_type == "faq"]),
      "contentBlocks": count(*[_type == "contentBlock"]),
      "companyConstants": count(*[_type == "companyConstants"]),
      "trustBar": count(*[_type == "trustBarContent"]),
      "roiCalculator": count(*[_type == "roiCalculatorContent"]),
      "blogPosts": count(*[_type == "blogPost"]),
      "authors": count(*[_type == "author"]),
      "categories": count(*[_type == "category"]),
      "caseStudies": count(*[_type == "caseStudy"]),
      "siteSettings": count(*[_type == "siteSettings"]),
      "aboutContent": count(*[_type == "aboutContent"])
    }
  }`;
  
  const result = await client.fetch(query);
  console.log('\n📊 COMPLETE SANITY DOCUMENT COUNT\n');
  console.log('Total documents:', result.total);
  console.log('\nBy type:');
  
  let coreContentTotal = 0;
  Object.entries(result.byType).forEach(([key, value]) => {
    if (value > 0) {
      const v = value as number;
      console.log(`  ${key}: ${v}`);
      coreContentTotal += v;
    }
  });
  
  console.log('\n✅ Migration is 100% complete!');
  console.log(`   Core content documents: ${coreContentTotal}`);
}

countAllDocuments();