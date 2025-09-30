# CTA Messages Migration Script

## Overview
This migration script extracts all hardcoded CTA (Call-to-Action) messages from the website codebase and creates structured documents in Sanity CMS for centralized management.

## What It Does
- Extracts 18 unique CTA messages from across the site
- Categorizes them by page/section (homepage, services, about, results, landing pages)
- Creates structured `ctaMessage` documents in Sanity
- Preserves all existing content including headings, subheadings, button text, and WhatsApp messages

## Prerequisites
1. Ensure you have the required environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   SANITY_API_TOKEN=your_write_token
   ```

2. Install required dependencies:
   ```bash
   npm install @sanity/client dotenv
   ```

## Running the Migration

### Method 1: Using npm/yarn
```bash
# Using npm
npm run migrate:cta

# Or directly with Node
node -r ts-node/register scripts/migrate-cta-messages.ts
```

### Method 2: Using TypeScript directly
```bash
npx tsx scripts/migrate-cta-messages.ts
```

## CTA Messages Included

### Homepage (3 CTAs)
- Main CTA: "Ready to Turn Your Pub Around?"
- Free Chat Banner: "Stop Struggling. Start Thriving."
- ROI Section: "Ready to Increase Your Revenue?"

### Services Page (2 CTAs)
- Main CTA: "Stop Watching Money Walk Past Your Pub"
- Money Back Guarantee: "30-Day Action Plan Support"

### About Page (2 CTAs)
- Main CTA: "Ready to Transform Your Pub?"
- Visit The Anchor: "Come See The Results Yourself"

### Results Page (2 CTAs)
- Main CTA: "Let's Fix Your Biggest Problem First"
- Get Similar Results: "Ready to Get Similar Results?"

### Landing Pages (5 CTAs)
- Empty Pub Solutions: "How Many Empty Tables Can You Afford Tonight?"
- Quiet Midweek: "How Much Longer Can You Afford Dead Nights?"
- Pub Rescue: "Don't Let Your Pub Become Another Statistic"
- No Budget Marketing: "Empty Pub + No Budget = Big Problem"
- Compete with Chains: "Ready to Show the Chains How It's Done?"

### Generic/Reusable (4 CTAs)
- Transform Your Pub
- Fill Your Tables
- Increase Revenue
- Get Help Now

## CTA Document Structure
Each CTA message document contains:
- `identifier`: Unique slug for retrieval (e.g., 'homepage-main-cta')
- `title`: Internal reference name
- `heading`: Main CTA heading text
- `subheading`: Supporting text (optional)
- `buttonText`: CTA button label
- `buttonAction`: Action type (whatsapp, phone, email, internal, external)
- `actionValue`: WhatsApp message, URL, or other action value
- `bottomText`: Additional text below button (optional)
- `variant`: Visual style (orange, teal, white, cream)
- `usage`: Where this CTA is used (homepage, services, about, etc.)

## Post-Migration Steps

1. **Verify in Sanity Studio**
   - Log into Sanity Studio
   - Navigate to CTA Messages
   - Review all imported CTAs for accuracy

2. **Update Components**
   Update components to fetch CTAs from Sanity instead of hardcoded values:
   ```typescript
   // Example: Fetch CTA by identifier
   const cta = await client.fetch(
     `*[_type == "ctaMessage" && identifier.current == "homepage-main-cta"][0]`
   )
   ```

3. **Test Thoroughly**
   - Test on staging environment first
   - Verify all CTAs render correctly
   - Check WhatsApp links and button actions
   - Ensure proper styling with variants

## Rollback
If needed, you can delete all migrated CTAs with:
```groq
*[_type == "ctaMessage"] 
```

## Benefits of Migration
- ✅ Centralized CTA management in Sanity
- ✅ A/B testing capability
- ✅ Easy updates without code changes
- ✅ Consistent messaging across the site
- ✅ Version history and drafts support
- ✅ Multi-language support ready

## Troubleshooting
- **Authentication Error**: Ensure your `SANITY_API_TOKEN` has write permissions
- **Network Error**: Check your internet connection and Sanity project status
- **Duplicate Error**: The script handles duplicates by updating existing documents
- **Missing Fields**: Check that the `ctaMessage` schema in Sanity matches the structure