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
            // Main Content
            S.listItem()
              .title('Blog Posts')
              .icon(() => '📝')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .filter('_type == "blogPost"')
              ),
            S.listItem()
              .title('Services')
              .icon(() => '🛠️')
              .child(
                S.documentList()
                  .title('Services')
                  .filter('_type == "service"')
              ),
            S.listItem()
              .title('Service Details')
              .icon(() => '📋')
              .child(
                S.documentList()
                  .title('Service Details')
                  .filter('_type == "serviceDetail"')
              ),
            S.listItem()
              .title('Service Packages')
              .icon(() => '📦')
              .child(
                S.documentList()
                  .title('Service Packages')
                  .filter('_type == "servicePackage"')
                  .defaultOrdering([{field: 'order', direction: 'asc'}])
              ),
            S.listItem()
              .title('Case Studies')
              .icon(() => '📊')
              .child(
                S.documentList()
                  .title('Case Studies')
                  .filter('_type == "caseStudy"')
              ),
            S.listItem()
              .title('Landing Pages')
              .icon(() => '🚀')
              .child(
                S.documentList()
                  .title('Landing Pages')
                  .filter('_type == "landingPage"')
              ),
            S.listItem()
              .title('Landing Page Content')
              .icon(() => '📄')
              .child(
                S.documentList()
                  .title('Landing Page Content')
                  .filter('_type == "landingPageContent"')
              ),
            S.listItem()
              .title('Error Pages')
              .icon(() => '⚠️')
              .child(
                S.documentList()
                  .title('Error Pages')
                  .filter('_type == "errorPage"')
              ),
            
            S.divider(),
            
            // Marketing & Trust Elements
            S.listItem()
              .title('CTA Messages')
              .icon(() => '📢')
              .child(
                S.documentList()
                  .title('CTA Messages')
                  .filter('_type == "ctaMessage"')
              ),
            S.listItem()
              .title('Social Proof')
              .icon(() => '⭐')
              .child(
                S.documentList()
                  .title('Social Proof')
                  .filter('_type == "socialProof"')
              ),
            S.listItem()
              .title('Trust Badges')
              .icon(() => '🏆')
              .child(
                S.documentList()
                  .title('Trust Badges')
                  .filter('_type == "trustBadge"')
              ),
            S.listItem()
              .title('Trust Bar')
              .icon(() => '📊')
              .child(
                S.editor()
                  .schemaType('trustBar')
                  .documentId('trustBar')
              ),
            S.listItem()
              .title('ROI Calculator')
              .icon(() => '🧮')
              .child(
                S.editor()
                  .schemaType('roiCalculator')
                  .documentId('roiCalculator')
              ),
            S.listItem()
              .title('Content Blocks')
              .icon(() => '🧱')
              .child(
                S.documentList()
                  .title('Content Blocks')
                  .filter('_type == "contentBlock"')
              ),
            
            S.divider(),
            
            // Page Content (Singletons)
            S.listItem()
              .title('Homepage Content')
              .icon(() => '🏠')
              .child(
                S.editor()
                  .schemaType('homepageContent')
                  .documentId('homepageContent')
              ),
            S.listItem()
              .title('About Content')
              .icon(() => 'ℹ️')
              .child(
                S.editor()
                  .schemaType('aboutContent')
                  .documentId('aboutContent')
              ),
            S.listItem()
              .title('Services Page Content')
              .icon(() => '🛠️')
              .child(
                S.editor()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
              ),
            S.listItem()
              .title('Footer Content')
              .icon(() => '🦶')
              .child(
                S.editor()
                  .schemaType('footerContent')
                  .documentId('footerContent')
              ),
            
            S.divider(),
            
            // SEO & Navigation
            S.listItem()
              .title('Navigation')
              .icon(() => '🧭')
              .child(
                S.editor()
                  .schemaType('navigation')
                  .documentId('navigation')
              ),
            S.listItem()
              .title('Breadcrumb Paths')
              .icon(() => '🍞')
              .child(
                S.documentList()
                  .title('Breadcrumb Paths')
                  .filter('_type == "breadcrumbPaths"')
              ),
            S.listItem()
              .title('SEO Metadata')
              .icon(() => '🔍')
              .child(
                S.documentList()
                  .title('SEO Metadata')
                  .filter('_type == "seoMetadata"')
              ),
            S.listItem()
              .title('Related Links')
              .icon(() => '🔗')
              .child(
                S.documentList()
                  .title('Related Links')
                  .filter('_type == "relatedLinks"')
              ),
            S.listItem()
              .title('WhatsApp Templates')
              .icon(() => '💬')
              .child(
                S.documentList()
                  .title('WhatsApp Templates')
                  .filter('_type == "whatsappTemplates"')
              ),
            
            S.divider(),
            
            // Resources
            S.listItem()
              .title('Authors')
              .icon(() => '👤')
              .child(
                S.documentList()
                  .title('Authors')
                  .filter('_type == "author"')
              ),
            S.listItem()
              .title('Categories')
              .icon(() => '📁')
              .child(
                S.documentList()
                  .title('Categories')
                  .filter('_type == "category"')
              ),
            S.listItem()
              .title('FAQs')
              .icon(() => '❓')
              .child(
                S.documentList()
                  .title('FAQs')
                  .filter('_type == "faq"')
              ),
            S.listItem()
              .title('Contact FAQs')
              .icon(() => '💬')
              .child(
                S.documentList()
                  .title('Contact FAQs')
                  .filter('_type == "contactFAQ"')
              ),
            S.listItem()
              .title('Services FAQs')
              .icon(() => '🛠️❓')
              .child(
                S.documentList()
                  .title('Services FAQs')
                  .filter('_type == "servicesFAQ"')
                  .defaultOrdering([{field: 'category', direction: 'asc'}, {field: 'order', direction: 'asc'}])
              ),
            S.listItem()
              .title('Testimonials')
              .icon(() => '⭐')
              .child(
                S.documentList()
                  .title('Testimonials')
                  .filter('_type == "testimonial"')
              ),
            S.listItem()
              .title('Claims & Metrics')
              .icon(() => '📊')
              .child(
                S.documentList()
                  .title('Claims & Metrics')
                  .filter('_type == "claims"')
              ),
            S.listItem()
              .title('Results Metrics')
              .icon(() => '📈')
              .child(
                S.editor()
                  .schemaType('resultsMetrics')
                  .documentId('resultsMetrics')
              ),
            
            S.divider(),
            
            // Site Configuration (Singletons)
            S.listItem()
              .title('Company Constants')
              .icon(() => '🏢')
              .child(
                S.editor()
                  .schemaType('companyConstants')
                  .documentId('companyConstants')
              ),
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
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