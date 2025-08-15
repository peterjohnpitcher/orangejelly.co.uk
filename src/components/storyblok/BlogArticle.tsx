'use client';

import { storyblokEditable } from '@storyblok/react';
import {
  render,
  NODE_HEADING,
  NODE_PARAGRAPH,
  NODE_UL,
  NODE_OL,
  NODE_LI,
  NODE_CODEBLOCK,
} from 'storyblok-rich-text-react-renderer';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import OptimizedImage from '@/components/OptimizedImage';
import Container from '@/components/Container';
import Section from '@/components/Section';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import QuickAnswer from '@/components/blog/QuickAnswer';
import RelatedPosts from '@/components/blog/RelatedPosts';
import StickyCTA from '@/components/blog/StickyCTA';
import { format } from 'date-fns';

interface StoryblokRichTextNode {
  type: string;
  content?: StoryblokRichTextNode[];
  text?: string;
  attrs?: Record<string, any>;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
}

interface BlogArticleProps {
  blok: {
    _uid: string;
    title: string;
    excerpt: string;
    content: any; // Storyblok Rich Text
    featured_image?: string;
    featured_image_alt?: string;
    published_date?: string;
    updated_date?: string;
    quick_answer?: string;
    voice_queries?: string[];
    category?: string;
    tags?: string[];
    cta_primary?: string;
    whatsapp_message?: string;
    seo?: {
      meta_title?: string;
      meta_description?: string;
      keywords?: string;
    };
  };
  slug: string;
}

/**
 * Storyblok Blog Article Component
 * Renders blog content from Storyblok with all the Orange Jelly features
 */
export default function BlogArticle({ blok, slug }: BlogArticleProps) {
  // Format dates
  const publishedDate = blok.published_date
    ? format(new Date(blok.published_date), 'MMMM d, yyyy')
    : null;

  const updatedDate = blok.updated_date
    ? format(new Date(blok.updated_date), 'MMMM d, yyyy')
    : null;

  // Extract headings for table of contents
  const extractHeadings = (richText: any) => {
    const headings: Array<{ id: string; text: string; level: number }> = [];

    if (richText?.content) {
      richText.content.forEach((node: StoryblokRichTextNode) => {
        if (node.type === 'heading' && node.content?.[0]?.text) {
          const text = node.content[0].text;
          const id = text.toLowerCase().replace(/\s+/g, '-');
          headings.push({
            id,
            text,
            level: node.attrs?.level || 2,
          });
        }
      });
    }

    return headings;
  };

  const headings = extractHeadings(blok.content);

  // Custom renderer for rich text with Orange Jelly components
  const customRender = (content: any) => {
    return render(content, {
      nodeResolvers: {
        [NODE_HEADING]: (children: any, props: any) => {
          const level = props?.level || 2;
          const text = typeof children === 'string' ? children : '';
          const id = text.toLowerCase().replace(/\s+/g, '-');

          return (
            <Heading
              key={id}
              level={level as 1 | 2 | 3 | 4 | 5 | 6}
              className={level === 2 ? 'mt-8 mb-4' : 'mt-6 mb-3'}
            >
              {children}
            </Heading>
          );
        },
        [NODE_PARAGRAPH]: (children: any) => {
          return <Text className="mb-4">{children}</Text>;
        },
        [NODE_UL]: (children: any) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        [NODE_OL]: (children: any) => (
          <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        blockquote: (children: any) => (
          <blockquote className="border-l-4 border-orange pl-4 italic my-6">
            <Text>{children}</Text>
          </blockquote>
        ),
        [NODE_CODEBLOCK]: (children: any, props: any) => (
          <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">
            <code className="text-sm">{children}</code>
          </pre>
        ),
      },
    });
  };

  return (
    <article {...storyblokEditable(blok)}>
      {/* Hero Section */}
      <Section background="cream" padding="large">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {blok.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange text-white rounded-full text-sm">
                  {blok.category}
                </span>
              </div>
            )}

            {/* Title */}
            <Heading level={1} className="mb-4">
              {blok.title}
            </Heading>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-6">
              {publishedDate && (
                <time dateTime={blok.published_date}>Published {publishedDate}</time>
              )}
              {updatedDate && updatedDate !== publishedDate && <span>• Updated {updatedDate}</span>}
            </div>

            {/* Excerpt */}
            {blok.excerpt && (
              <Text size="lg" className="text-charcoal/80 mb-6">
                {blok.excerpt}
              </Text>
            )}

            {/* Share Buttons */}
            <ShareButtons
              url={`https://www.orangejelly.co.uk/licensees-guide/${slug}`}
              title={blok.title}
            />
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {blok.featured_image && (
        <Section padding="small">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <OptimizedImage
                  src={blok.featured_image}
                  alt={blok.featured_image_alt || blok.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Quick Answer for Voice Search */}
      {blok.quick_answer && (
        <Section padding="small">
          <Container>
            <div className="max-w-4xl mx-auto">
              <QuickAnswer answer={blok.quick_answer} />
            </div>
          </Container>
        </Section>
      )}

      {/* Main Content */}
      <Section padding="large">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Table of Contents - Desktop */}
              {headings.length > 3 && (
                <aside className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-24">
                    <TableOfContents selector="article" />
                  </div>
                </aside>
              )}

              {/* Article Content */}
              <div className={headings.length > 3 ? 'lg:col-span-9' : 'lg:col-span-12'}>
                <div className="prose prose-lg max-w-none">{customRender(blok.content)}</div>

                {/* Tags */}
                {blok.tags && blok.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-charcoal/10">
                    <div className="flex flex-wrap gap-2">
                      <Text size="sm" className="text-charcoal/60">
                        Tags:
                      </Text>
                      {blok.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-cream rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {blok.category && (
        <Section background="cream" padding="large">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* RelatedPosts would need to fetch actual posts */}
              {/* To be implemented when posts are available from Storyblok */}
            </div>
          </Container>
        </Section>
      )}

      {/* Sticky CTA */}
      <StickyCTA />
    </article>
  );
}
