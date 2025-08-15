
# Storyblok Import Instructions

## 1. Create Space in Storyblok
- Go to https://app.storyblok.com/
- Create a new space called "orangejelly-blogs"
- Select "Start from scratch"

## 2. Set Up Blog Component
- Go to Block Library
- Create new component called "blog_article"
- Add fields as defined in STORYBLOK_MIGRATION_PLAN.md

## 3. Import Content
Use the Storyblok CLI:
```bash
# Install CLI
npm install -g storyblok@latest

# Login with your token
storyblok login --token GkqeSgICQTy1lamlvxO0mgtt

# Import stories
storyblok import ./storyblok-import.json --space [YOUR_SPACE_ID]
```

## 4. Verify Import
- Check all 34 articles imported
- Verify rich text formatting
- Test image display
- Check SEO metadata

## 5. Set Up Webhook (Optional)
For auto-sync with Next.js:
- Settings > Webhooks
- Add webhook URL: https://orangejelly.co.uk/api/revalidate
- Select events: Story published, Story unpublished
