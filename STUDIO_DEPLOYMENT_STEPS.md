# Sanity Studio Deployment - Step by Step

## ✅ Prerequisites Check
Your studio is ready to deploy! You have:
- ✅ Schemas defined (blogPost, service, caseStudy, etc.)
- ✅ Configuration files (sanity.config.ts, sanity.cli.ts)
- ✅ Project ID: 9brdfanc
- ✅ Content already in Sanity (3 blog posts)

## 🚀 Deployment Steps

### Step 1: Fix NPM Permissions (One Time)
```bash
sudo chown -R $(whoami) ~/.npm
```

### Step 2: Install Sanity CLI Globally
```bash
npm install -g @sanity/cli
```

### Step 3: Navigate to Studio Directory
```bash
cd /Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/sanity-studio
```

### Step 4: Install Dependencies
```bash
npm install sanity @sanity/vision --legacy-peer-deps
```

### Step 5: Deploy the Studio
```bash
npx sanity deploy
```

When prompted:
- **Login**: Use your Sanity account credentials
- **Studio hostname**: Type `orangejelly` (or another name if taken)
- This will create: `https://orangejelly.sanity.studio/`

## 📝 What Happens During Deployment:

1. **Build**: Sanity builds your studio into static files
2. **Upload**: Files are uploaded to Sanity's hosting
3. **URL Creation**: Your studio becomes available at the chosen URL
4. **Authentication**: Sanity handles login/security

## ✅ After Successful Deployment:

Your Studio will be available at:
**https://orangejelly.sanity.studio/**

(Or whatever hostname you chose)

### What You'll See:
- Login screen (use your Sanity account)
- Left sidebar with all your content types
- Your 3 test blog posts ready to edit
- Full editing interface

## 🔧 Troubleshooting:

### If "orangejelly" hostname is taken:
Try alternatives:
- `orangejelly-cms`
- `orangejelly-pub`
- `orangejelly-admin`
- `orange-jelly`

### If npm install fails:
```bash
# Use yarn instead
yarn add sanity @sanity/vision

# Then deploy with
yarn deploy
```

### If deployment fails:
1. Check you're logged in:
   ```bash
   npx sanity login
   ```

2. Verify project access:
   ```bash
   npx sanity projects list
   ```
   You should see project `9brdfanc`

## 🎯 Quick Deploy (Copy & Paste):

Run these commands in order:
```bash
# Fix permissions
sudo chown -R $(whoami) ~/.npm

# Go to studio directory
cd /Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/sanity-studio

# Install and deploy
npm install sanity @sanity/vision --legacy-peer-deps
npx sanity deploy
```

## 📱 After Deployment - Update Your Website:

Once deployed, update the Sanity dashboard with your studio URL:
1. Go to: https://www.sanity.io/manage/project/9brdfanc
2. Find "Custom studio URL" setting
3. Add: `https://orangejelly.sanity.studio/`
4. Save

## ✨ Success!

Once deployed, you'll have:
- 🎨 Full web-based content editor
- 📝 Rich text editing
- 🖼️ Image management
- 👁️ Preview capabilities
- 📱 Mobile-friendly interface
- 🔄 Real-time updates

Your content workflow will be:
1. **You**: Edit in Studio web interface
2. **Claude**: Create drafts via CLI
3. **Review**: Preview drafts before publishing
4. **Publish**: One click to make live
5. **Website**: Automatically shows new content (no deployment needed!)