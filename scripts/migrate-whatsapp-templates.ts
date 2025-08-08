#!/usr/bin/env tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is required in .env.local');
  console.log('Get your token from: https://www.sanity.io/manage/project/9brdfanc/api');
  process.exit(1);
}

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function migrateWhatsAppTemplates() {
  console.log('🚀 Starting WhatsApp templates migration to Sanity...\n');

  try {
    const whatsappData = {
      _id: 'whatsapp-templates-main',
      _type: 'whatsappTemplates',
      title: 'Main WhatsApp Templates',
      templates: {
        default: "Hi Peter, got time for a quick chat about my pub?",
        services: "Hi Peter, I'd like to chat about Orange Jelly",
        training: "Hi Peter, I'm interested in AI training for my pub",
        quickWins: "Hi Peter, I'd like to try the 30-day package",
        blog: "Hi Peter, I just read your blog post and need help with my pub",
        notListed: "Hi Peter, I need help with something not on your services list...",
        caseStudies: "Hi Peter, just read your case studies. Can we chat?",
        lostPage: "Hi Peter, I got lost on your site. Can you help me find what I'm looking for?",
        emptyPub: "Hi Peter, I need help filling my empty pub",
        pubRescue: "Hi Peter, my pub needs rescuing - can we talk?",
        roiCalculator: "Hi Peter, I just used your ROI calculator and want to discuss the results",
        contact: "Hi Peter, I'd like to discuss how Orange Jelly can help my pub"
      },
      responseTime: "I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours",
      isActive: true
    };

    // Create or update the document
    const result = await client.createOrReplace(whatsappData);
    console.log('✅ WhatsApp templates migrated successfully!');
    console.log(`📄 Document ID: ${result._id}`);

    console.log('\n🎉 Migration complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Visit https://orangejelly.sanity.studio/');
    console.log('2. Navigate to WhatsApp Templates');
    console.log('3. Review and adjust the templates as needed');
    console.log('4. Update components to fetch templates from Sanity');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateWhatsAppTemplates();