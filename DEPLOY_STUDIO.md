# How to Deploy Your Sanity Studio

The Studio URL (https://9brdfanc.sanity.studio/) isn't available yet because the Studio needs to be deployed. Here's how to do it:

## Option 1: Deploy via Sanity.io Website (Easiest)

1. **Go to your Sanity Dashboard**:
   https://www.sanity.io/manage/project/9brdfanc

2. **Click on "Deploy Studio"** or "Studio" tab

3. **Follow the deployment wizard**:
   - Choose "Deploy new Studio"
   - Select "From scratch" or "Basic setup"
   - Click "Deploy"

4. **Wait 2-3 minutes** for deployment

5. **Access your Studio** at:
   https://9brdfanc.sanity.studio/

## Option 2: Use Sanity's Web Terminal

1. **Go to**: https://www.sanity.io/manage/project/9brdfanc/api

2. **Click "Vision"** or **"Groq Playground"**

3. **Use the terminal** at the bottom to run:
   ```
   sanity deploy
   ```

## Option 3: Fix NPM and Deploy Locally

Since you're having NPM permission issues, you need to fix them first:

```bash
# Fix NPM permissions (run in terminal)
sudo chown -R $(whoami) ~/.npm

# Then install Sanity CLI globally
npm install -g @sanity/cli

# Navigate to studio folder
cd sanity-studio

# Deploy the studio
sanity deploy
```

When prompted:
- Studio hostname: Press enter (uses default 9brdfanc)
- Choose a unique hostname if prompted

## What Happens After Deployment:

✅ Studio becomes available at https://9brdfanc.sanity.studio/
✅ You can log in with your Sanity account
✅ All your content (3 blog posts) will be there
✅ Full editing interface available

## Alternative: Manage Content Without Studio

While the Studio is being set up, you can still:

1. **View your content** on the website (already working!)
2. **Use Sanity's Vision tool**:
   - Go to: https://www.sanity.io/manage/project/9brdfanc/api/vision
   - Run queries to see/edit content
   
3. **Use the CLI scripts** I created:
   ```bash
   npx tsx scripts/create-content.ts
   ```

## Quick Check:

The website is already reading from Sanity successfully (you mentioned seeing the articles). The Studio is just the editing interface - your content system is working!

Would you like me to create a temporary web-based editor while you get the Studio deployed?