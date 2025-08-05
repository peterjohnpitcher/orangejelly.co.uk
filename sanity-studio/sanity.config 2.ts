// Note: This file is a template for Sanity Studio configuration
// To use it, you'll need to install Sanity Studio dependencies:
// npm install sanity @sanity/vision

import { schemaTypes } from './schemas';

const defineConfig = (config: any) => config;
const structureTool = () => ({ name: 'structure' });
const visionTool = () => ({ name: 'vision' });

export default defineConfig({
  name: 'default',
  title: 'Orange Jelly CMS',
  
  // These will be replaced with real values when you create a Sanity project
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'demo-project',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  
  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
  
  // Custom structure for the studio
  structure: (S: any) =>
    S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Blog Posts')
          .child(
            S.documentList()
              .title('Blog Posts')
              .filter('_type == "blogPost"')
          ),
        S.listItem()
          .title('Services')
          .child(
            S.documentList()
              .title('Services')
              .filter('_type == "service"')
          ),
        S.listItem()
          .title('Case Studies')
          .child(
            S.documentList()
              .title('Case Studies')
              .filter('_type == "caseStudy"')
          ),
        S.divider(),
        S.listItem()
          .title('Authors')
          .child(
            S.documentList()
              .title('Authors')
              .filter('_type == "author"')
          ),
        S.listItem()
          .title('Categories')
          .child(
            S.documentList()
              .title('Categories')
              .filter('_type == "category"')
          ),
        S.listItem()
          .title('FAQs')
          .child(
            S.documentList()
              .title('FAQs')
              .filter('_type == "faq"')
          ),
        S.divider(),
        S.listItem()
          .title('Site Settings')
          .child(
            S.editor()
              .schemaType('siteSettings')
              .documentId('siteSettings')
          ),
      ]),
});