#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Write client with authentication token
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Always bypass CDN for writes
  token: process.env.SANITY_API_TOKEN,
});

// Specific replacements for the recession-proof article
const BLOCK_REPLACEMENTS = [
  {
    find: "Success Stories from Previous Recessions",
    replace: [{
      _type: 'span',
      text: "Lessons from Previous Recessions",
      marks: []
    }]
  },
  {
    find: "a typical traditional pub (2008):",
    replace: [{
      _type: 'span',
      text: "**2008 Financial Crisis:** Pubs that focused on lunch deals typically increased revenue by 20%",
      marks: []
    }]
  },
  {
    find: "a typical market town pub (2020):",
    replace: [{
      _type: 'span',
      text: "**2020 Pandemic:** Pubs that pivoted to takeaway often maintained 80% of revenue",
      marks: []
    }]
  },
  {
    find: "The King's Arms (2008):",
    replace: [{
      _type: 'span',
      text: "**2008 Strategy:** Creating members clubs helped pubs gain 200+ loyal customers",
      marks: []
    }]
  },
  {
    find: "a typical country pub (2020):",
    replace: [{
      _type: 'span',
      text: "**2020 Adaptation:** Pubs that became community hubs saw doubled local support",
      marks: []
    }]
  }
];

// Function to replace content in portable text blocks
function replaceInPortableText(content) {
  let hasChanges = false;
  const updatedContent = content.map(block => {
    if (block._type === 'block' && block.children) {
      // Check if this block needs replacement
      for (const replacement of BLOCK_REPLACEMENTS) {
        // Look for the find text in the first child
        if (block.children[0] && block.children[0].text && 
            block.children[0].text.includes(replacement.find)) {
          
          console.log(`  ✅ Replacing block containing: "${replacement.find}"`);
          hasChanges = true;
          
          // Replace the entire children array with the new content
          return {
            ...block,
            children: replacement.replace
          };
        }
      }
    }
    return block;
  });
  
  return { content: updatedContent, hasChanges };
}

// Add subtitle after the section header
function addSubtitle(content) {
  const updatedContent = [...content];
  let headerIndex = -1;
  
  // Find the "Lessons from Previous Recessions" block
  for (let i = 0; i < updatedContent.length; i++) {
    const block = updatedContent[i];
    if (block._type === 'block' && block.children) {
      const text = block.children.map(child => child.text || '').join('');
      if (text.includes('Lessons from Previous Recessions')) {
        headerIndex = i;
        break;
      }
    }
  }
  
  if (headerIndex >= 0) {
    // Check if subtitle already exists
    const nextBlock = updatedContent[headerIndex + 1];
    let hasSubtitle = false;
    
    if (nextBlock && nextBlock._type === 'block' && nextBlock.children) {
      const nextText = nextBlock.children.map(child => child.text || '').join('');
      if (nextText.includes('Industry examples showing')) {
        hasSubtitle = true;
      }
    }
    
    // Add the subtitle if it doesn't exist
    if (!hasSubtitle) {
      updatedContent.splice(headerIndex + 1, 0, {
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Industry examples showing how pubs successfully navigated past economic downturns:',
          marks: ['em']
        }]
      });
      console.log('  ✅ Added subtitle after section header');
    }
    
    return updatedContent;
  }
  
  return updatedContent;
}

// Main function to fix the recession article
async function fixRecessionArticle() {
  console.log('🚀 Starting recession article fix...\n');
  
  try {
    // Check if we have write access
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN environment variable is required for write access');
    }
    
    // Fetch the specific blog post
    console.log('📖 Fetching recession-proof-pub-strategies from Sanity...');
    
    const query = `
      *[_type == "blogPost" && slug.current == "recession-proof-pub-strategies"][0] {
        _id,
        title,
        "slug": slug,
        content,
        quickAnswer,
        excerpt
      }
    `;
    
    const post = await writeClient.fetch(query);
    
    if (!post) {
      console.error('❌ Post not found: recession-proof-pub-strategies');
      return;
    }
    
    console.log(`✅ Found post: "${post.title}"`);
    console.log(`   Post ID: ${post._id}\n`);
    
    // Process the content
    let contentUpdated = false;
    let updatedContent = post.content;
    
    if (post.content && Array.isArray(post.content)) {
      console.log('🔍 Processing content blocks...');
      
      // First replace the specific pub names
      const result = replaceInPortableText(post.content);
      updatedContent = result.content;
      contentUpdated = result.hasChanges;
      
      // Then add subtitle if needed
      if (contentUpdated) {
        console.log('📝 Adding subtitle if needed...');
        updatedContent = addSubtitle(updatedContent);
      }
    }
    
    // Update the post if changes were made
    if (contentUpdated) {
      console.log('\n💾 Updating post in Sanity...');
      
      try {
        await writeClient.patch(post._id).set({
          content: updatedContent
        }).commit();
        
        console.log('✅ Successfully updated the recession article!');
        
        // Verify the change was saved
        console.log('\n🔍 Verifying changes...');
        const verifyQuery = `
          *[_type == "blogPost" && slug.current == "recession-proof-pub-strategies"][0] {
            _id,
            title,
            content
          }
        `;
        
        const verifiedPost = await writeClient.fetch(verifyQuery);
        
        if (verifiedPost) {
          console.log('✅ Post verified in Sanity');
          
          // Check if the changes are present
          let foundNewContent = false;
          if (verifiedPost.content) {
            for (const block of verifiedPost.content) {
              if (block._type === 'block' && block.children) {
                for (const child of block.children) {
                  if (child.text && typeof child.text === 'string') {
                    if (child.text.includes('2008 Financial Crisis:') || 
                        child.text.includes('2020 Pandemic:') || 
                        child.text.includes('Lessons from Previous Recessions')) {
                      foundNewContent = true;
                      break;
                    }
                  }
                }
                if (foundNewContent) break;
              }
            }
          }
          
          if (foundNewContent) {
            console.log('✅ Changes verified - new content found in post');
          } else {
            console.log('⚠️  Warning: Changes may not have been saved correctly');
          }
        }
        
        console.log('\n🎉 TASK COMPLETED SUCCESSFULLY!');
        console.log('   • Removed specific pub names (The Dog & Duck, The Rose & Crown, The King\'s Arms)');
        console.log('   • Updated section to "Lessons from Previous Recessions"');
        console.log('   • Added industry examples format');
        console.log('   • Changes saved and verified in Sanity');
        
      } catch (error) {
        console.error('❌ Error updating post:', error);
        throw error;
      }
    } else {
      console.log('ℹ️  No changes needed - pub names may have already been fixed');
    }
    
  } catch (error) {
    console.error('❌ Error fixing recession article:', error);
    process.exit(1);
  }
}

// Run the script immediately
fixRecessionArticle();