import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { writeClient } from '../src/lib/sanity.write-client';

async function testWritePermission() {
  try {
    console.log('🔍 Testing Sanity API token...');
    console.log('Token exists:', !!process.env.SANITY_API_TOKEN);
    console.log('Token length:', process.env.SANITY_API_TOKEN?.length || 0);
    
    // Test read access first
    const posts = await writeClient.fetch(`
      *[_type == "blogPost"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        slug
      }
    `);
    
    console.log('✅ Read access working');
    console.log('Found posts:', posts.length);
    
    if (posts.length > 0) {
      const testPost = posts[0];
      console.log('Testing write on:', testPost.title);
      
      // Try a simple patch that shouldn't change anything
      const result = await writeClient
        .patch(testPost._id)
        .set({ 
          // Add a custom field that shouldn't affect anything
          lastFormattingCheck: new Date().toISOString()
        })
        .commit();
      
      console.log('✅ Write access working');
      console.log('Update result ID:', result._id);
    }
    
  } catch (error) {
    console.error('❌ Error testing permissions:', error);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

testWritePermission();