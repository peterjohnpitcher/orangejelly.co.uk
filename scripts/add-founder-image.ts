import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
import fetch from 'node-fetch'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImageFromPath(imagePath: string) {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log(`File not found: ${imagePath}`)
      return null
    }

    // Read the file
    const imageBuffer = fs.readFileSync(imagePath)
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'peter-pitcher.jpg'
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

async function addFounderImage() {
  console.log('🖼️  Adding founder image to About Content...\n')

  try {
    // First check if aboutContent exists
    const doc = await client.getDocument('aboutContent')
    
    if (!doc) {
      console.log('❌ No aboutContent document found')
      return
    }

    // Check if image already exists
    if (doc.founderSection?.image?.asset) {
      console.log('✅ Founder image already exists')
      return
    }

    // Try to upload the image from public folder
    const imagePath = path.resolve(process.cwd(), 'public/images/peter-pitcher.jpg')
    console.log(`Attempting to upload image from: ${imagePath}`)
    
    const imageRef = await uploadImageFromPath(imagePath)
    
    if (!imageRef) {
      // If jpg doesn't exist, try png
      const pngPath = path.resolve(process.cwd(), 'public/images/peter-pitcher.png')
      console.log(`Trying PNG format: ${pngPath}`)
      const pngRef = await uploadImageFromPath(pngPath)
      
      if (!pngRef) {
        console.log('❌ Could not find founder image in public/images/')
        console.log('   Please add peter-pitcher.jpg or peter-pitcher.png to public/images/')
        return
      }
      
      // Update with PNG
      await client
        .patch('aboutContent')
        .set({ 'founderSection.image': pngRef })
        .commit()
      
      console.log('✅ Successfully added founder image (PNG) to About Content!')
      return
    }
    
    // Update with JPG
    await client
      .patch('aboutContent')
      .set({ 'founderSection.image': imageRef })
      .commit()
    
    console.log('✅ Successfully added founder image to About Content!')
    
  } catch (error) {
    console.error('❌ Error adding founder image:', error)
    process.exit(1)
  }
}

// Run the script
addFounderImage()