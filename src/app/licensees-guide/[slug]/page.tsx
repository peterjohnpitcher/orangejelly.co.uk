import { Suspense } from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import BlogPostClient from './BlogPostClient';
import { getContentPostBySlug, getContentPosts } from '@/lib/content-source';
import { BlogPostingSchema } from '@/components/BlogPostingSchema';
import { FAQSchema } from '@/components/StructuredData';
import EnhancedBlogSchema from '@/components/blog/EnhancedBlogSchema';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import { AsyncErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/Loading';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getContentPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getContentPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords || post.tags,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['Orange Jelly'],
      images: [post.featuredImage || '/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.featuredImage || '/logo.png'],
    },
  };
}

// Async component that fetches data
async function BlogPostPageData({ params }: { params: { slug: string } }) {
  try {
    const post = await getContentPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    // Get related posts (same category, different post)
    const allPosts = await getContentPosts();
    const relatedPosts = allPosts
      .filter((p) => p.category === post.category && p.slug !== post.slug)
      .slice(0, 3);

    // Extract FAQs from content if they exist (only for markdown content)
    let faqs: Array<{ question: string; answer: string }> = [];

    // Use FAQs from Sanity if available, otherwise extract from markdown
    if ((post as any).faqs && (post as any).faqs.length > 0) {
      faqs = (post as any).faqs;
    } else if (!post.isPortableText && typeof post.content === 'string') {
      const faqPattern = /##\s*FAQs?\s*\n([\s\S]*?)(?=\n##|$)/i;
      const faqMatch = post.content.match(faqPattern);

      if (faqMatch) {
        const faqContent = faqMatch[1];
        const faqItemPattern = /###\s*(.+?)\n([\s\S]*?)(?=\n###|$)/g;
        let match;
        while ((match = faqItemPattern.exec(faqContent)) !== null) {
          faqs.push({
            question: match[1].trim(),
            answer: match[2].trim(),
          });
        }
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.orangejelly.co.uk';

    return (
      <>
        <EnhancedBlogSchema
          post={{
            ...post,
            faqs,
            quickAnswer: (post as any).quickAnswer,
            voiceSearchQueries: (post as any).voiceSearchQueries,
            localSEO: (post as any).localSEO,
          }}
          baseUrl={baseUrl}
        />
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: '/' },
            { name: "The Licensee's Guide", url: '/licensees-guide' },
            { name: post.title, url: `/licensees-guide/${post.slug}` },
          ]}
        />
        <BlogPostingSchema
          title={post.title}
          description={post.excerpt}
          content={typeof post.content === 'string' ? post.content : ''}
          author={{
            name: post.author?.name || 'Peter Pitcher',
            url: '/about',
          }}
          datePublished={post.publishedDate}
          dateModified={post.updatedDate}
          image={
            typeof post.featuredImage === 'string'
              ? post.featuredImage
              : (post.featuredImage as any)?.src
          }
          url={`/licensees-guide/${post.slug}`}
          keywords={post.tags}
          speakableSections={[
            '.prose h2',
            '.prose h3',
            '.prose > p:first-of-type',
            '.quick-answer',
          ]}
        />
        {faqs.length > 0 && <FAQSchema faqs={faqs} />}
        <Hero
          title={post.title}
          subtitle={post.excerpt}
          showCTA={false}
          breadcrumbs={[...breadcrumbPaths.licenseesGuide, { label: post.title }]}
        />
        <Section background="white">
          <div className="max-w-6xl mx-auto">
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
          </div>
        </Section>
      </>
    );
  } catch (error) {
    console.error('Error fetching blog post data:', error);
    throw new Error('Failed to load blog post content. Please try again.');
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <AsyncErrorBoundary>
      <Suspense fallback={<PageLoading message="Loading blog post..." />}>
        <BlogPostPageData params={params} />
      </Suspense>
    </AsyncErrorBoundary>
  );
}
