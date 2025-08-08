import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@sanity/client';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function updateNavigationWhatsApp() {
  console.log('🔄 Updating WhatsApp CTA message in navigation...\n');
  
  try {
    // Fetch current navigation
    const navigation = await client.fetch(`*[_id == "navigation"][0]`);
    
    if (!navigation) {
      console.error('❌ Navigation document not found');
      return;
    }
    
    console.log('Current WhatsApp message:', navigation.whatsappCta?.text);
    
    // Update the WhatsApp CTA text
    const updated = await client
      .patch('navigation')
      .set({
        'whatsappCta.text': "Hi Peter, I'd like to chat about my pub"
      })
      .commit();
    
    console.log('\n✅ Successfully updated WhatsApp message!');
    console.log('New message:', updated.whatsappCta?.text);
    
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.message.includes('token')) {
      console.error('\n⚠️  You need to set SANITY_API_TOKEN in .env.local with write permissions');
    }
  }
}

updateNavigationWhatsApp();