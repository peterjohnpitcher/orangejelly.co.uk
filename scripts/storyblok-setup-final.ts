#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Final Setup Script for Storyblok Migration
 * Run this after creating your Storyblok space
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     🚀 STORYBLOK MIGRATION - FINAL SETUP                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);

// Check if migration files exist
function checkMigrationFiles() {
  console.log('📁 Checking migration files...\n');

  const requiredFiles = [
    'storyblok-migration/sanity-blogs-export.json',
    'storyblok-migration/storyblok-import.json',
    'storyblok-migration/IMPORT_INSTRUCTIONS.md',
    'src/lib/storyblok-client.ts',
    'src/components/storyblok/BlogArticle.tsx',
    'src/lib/hybrid-content-source.ts',
  ];

  let allFilesExist = true;

  requiredFiles.forEach((file) => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - MISSING`);
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

// Check environment variables
function checkEnvironment() {
  console.log('\n🔐 Checking environment variables...\n');

  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('  ❌ .env.local file not found');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN',
    'STORYBLOK_PREVIEW_SECRET',
    'STORYBLOK_WEBHOOK_SECRET',
  ];

  let allVarsExist = true;

  requiredVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      console.log(`  ✅ ${varName}`);
    } else {
      console.log(`  ❌ ${varName} - MISSING`);
      allVarsExist = false;
    }
  });

  return allVarsExist;
}

// Generate activation script
function generateActivationScript() {
  console.log('\n📝 Generating activation script...\n');

  const activationScript = `#!/bin/bash

# Orange Jelly - Activate Storyblok for Blogs
# Run this script to switch from Sanity to Storyblok for blog content

echo "🔄 Activating Storyblok for blog content..."

# Backup current blog pages
cp src/app/licensees-guide/[slug]/page.tsx src/app/licensees-guide/[slug]/page-sanity-backup.tsx
cp src/app/licensees-guide/page.tsx src/app/licensees-guide/page-sanity-backup.tsx

# Activate Storyblok versions
cp src/app/licensees-guide/[slug]/page-storyblok.tsx src/app/licensees-guide/[slug]/page.tsx
cp src/app/licensees-guide/page-storyblok.tsx src/app/licensees-guide/page.tsx

echo "✅ Storyblok activated for blog content!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to test locally"
echo "2. Visit http://localhost:3000/licensees-guide"
echo "3. If everything works, deploy to production"
echo ""
echo "To revert back to Sanity:"
echo "cp src/app/licensees-guide/[slug]/page-sanity-backup.tsx src/app/licensees-guide/[slug]/page.tsx"
echo "cp src/app/licensees-guide/page-sanity-backup.tsx src/app/licensees-guide/page.tsx"
`;

  const scriptPath = path.join(process.cwd(), 'activate-storyblok.sh');
  fs.writeFileSync(scriptPath, activationScript);
  fs.chmodSync(scriptPath, '755');

  console.log('  ✅ Created activate-storyblok.sh');

  return true;
}

// Display import statistics
function displayStats() {
  console.log('\n📊 Migration Statistics:\n');

  const exportFile = path.join(process.cwd(), 'storyblok-migration/sanity-blogs-export.json');
  if (fs.existsSync(exportFile)) {
    const data = JSON.parse(fs.readFileSync(exportFile, 'utf-8'));

    console.log(`  Total articles: ${data.length}`);
    console.log(`  Published: ${data.filter((p: any) => p.status === 'published').length}`);
    console.log(`  Draft: ${data.filter((p: any) => p.status === 'draft').length}`);
    console.log(`  With images: ${data.filter((p: any) => p.featuredImage?.asset).length}`);
    console.log(`  With FAQs: ${data.filter((p: any) => p.faqs?.length > 0).length}`);
  }
}

// Main setup function
async function runFinalSetup() {
  console.log('Starting final setup checks...\n');

  // Run all checks
  const filesOk = checkMigrationFiles();
  const envOk = checkEnvironment();
  const scriptCreated = generateActivationScript();

  displayStats();

  console.log('\n' + '='.repeat(60));

  if (filesOk && envOk && scriptCreated) {
    console.log(`
✅ SETUP COMPLETE!

Your Storyblok migration is ready. Here's what to do next:

1. CREATE STORYBLOK SPACE:
   - Go to https://app.storyblok.com/
   - Create new space "orangejelly-blogs"
   - Note the Space ID

2. IMPORT CONTENT:
   npx storyblok login --token GkqeSgICQTy1lamlvxO0mgtt
   npx storyblok import ./storyblok-migration/storyblok-import.json --space [SPACE_ID]

3. ACTIVATE STORYBLOK:
   ./activate-storyblok.sh

4. TEST LOCALLY:
   npm run dev
   Visit http://localhost:3000/licensees-guide

5. CONFIGURE WEBHOOKS (in Storyblok):
   - URL: https://orangejelly.co.uk/api/storyblok-revalidate
   - Secret: orangejelly-webhook-2025
   - Events: Story published, Story unpublished

6. DEPLOY:
   git add .
   git commit -m "Add Storyblok for blog content"
   git push
   vercel --prod

ROLLBACK (if needed):
   cp src/app/licensees-guide/[slug]/page-sanity-backup.tsx src/app/licensees-guide/[slug]/page.tsx
   cp src/app/licensees-guide/page-sanity-backup.tsx src/app/licensees-guide/page.tsx
`);
  } else {
    console.log(`
⚠️  SETUP INCOMPLETE

Please fix the issues above before proceeding.

Missing files? Run:
  npm run export-blogs
  npm run transform-blogs

Missing env vars? Add to .env.local:
  NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=GkqeSgICQTy1lamlvxO0mgtt
  STORYBLOK_PREVIEW_SECRET=orangejelly-preview-2025
  STORYBLOK_WEBHOOK_SECRET=orangejelly-webhook-2025
`);
  }

  console.log('='.repeat(60));
}

// Run the setup
runFinalSetup().catch(console.error);
