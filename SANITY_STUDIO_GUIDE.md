# Sanity Studio Access Guide

## 🎯 Quick Access - Use Sanity's Hosted Studio

### Your Studio URL:
**https://9brdfanc.sanity.studio/**

1. Go to the URL above
2. Log in with your Sanity account
3. You'll see a full content management interface!

## 📝 What You Can Do in the Studio:

### Content Management
- **Create new blog posts** - Full rich text editor
- **Edit existing posts** - The 3 test posts are already there
- **Upload images** - Drag and drop support
- **Save drafts** - Work on content over time
- **Publish/Unpublish** - Control what's live

### Content Organization  
- **Categories** - Manage blog categories
- **Authors** - Edit author profiles
- **Site Settings** - Update business info, pricing
- **FAQs** - Add frequently asked questions

## 🎨 Studio Interface Overview:

### Left Sidebar - Content Types
- **Blog Posts** - All your blog content
- **Services** - Service offerings (ready to use)
- **Case Studies** - Success stories (ready to use)
- **Authors** - Content creators
- **Categories** - Blog categories
- **FAQs** - Questions and answers
- **Site Settings** - Global settings

### Main Area - Content Editor
- **Rich text editing** - Format text, add links, lists
- **Image management** - Upload and crop images
- **SEO fields** - Meta titles, descriptions
- **Preview pane** - See how content looks

### Top Bar - Actions
- **Publish** - Make content live
- **Unpublish** - Remove from site
- **Duplicate** - Copy existing content
- **Delete** - Remove content

## 🔄 Workflow:

### Creating Content (Studio)
1. Click "Blog Posts" → "+" to create new
2. Fill in fields (title, content, etc.)
3. Set status to "Draft" initially
4. Click "Publish" when ready

### Creating Content (CLI)
1. Run `npx tsx scripts/create-content.ts`
2. Follow prompts to create draft
3. Review in Studio
4. Publish when ready

### Previewing Drafts
- **In Studio**: Use preview pane
- **On Site**: `/api/preview?secret=xK9mP2nQ7vL4wB8jF6sT3yR5cA1hG0dZ&slug=your-slug`

## 🚀 Common Tasks:

### Edit a Blog Post
1. Go to Studio
2. Click "Blog Posts"
3. Select post to edit
4. Make changes
5. Click "Publish"

### Create New Blog Post
1. Click "Blog Posts" → "+"
2. Add title, slug, content
3. Select category
4. Add featured image
5. Set to "Published" when ready
6. Click "Publish" button

### Update Site Settings
1. Click "Site Settings"
2. Edit business info, metrics
3. Click "Publish"

## 💡 Tips:

- **Auto-save** - Studio saves drafts automatically
- **Version history** - See all changes over time
- **Real-time preview** - Changes appear instantly
- **Responsive** - Works on mobile/tablet too
- **Keyboard shortcuts** - Cmd+S to save, Cmd+P to publish

## 🔗 Useful Links:

- **Studio**: https://9brdfanc.sanity.studio/
- **Sanity Dashboard**: https://www.sanity.io/manage/project/9brdfanc
- **API Playground**: https://9brdfanc.api.sanity.io/v1/graphql/production/playground

## ⚡ Quick Test:

1. Visit https://9brdfanc.sanity.studio/
2. Click on "Blog Posts"
3. You should see your 3 test posts
4. Click one to edit it
5. Change the title
6. Click "Publish"
7. Visit your site - the change appears!

The Studio provides a full CMS interface - much easier than CLI for content management!