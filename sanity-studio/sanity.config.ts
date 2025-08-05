import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Orange Jelly CMS',
  
  // Your actual Sanity project configuration
  projectId: '9brdfanc',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
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
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});