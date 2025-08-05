import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogPostClient from './BlogPostClient';
import { getContentPostBySlug, getContentPosts } from '@/lib/content-source';
import { BlogPostingSchema } from '@/components/BlogPostingSchema';
import { FAQSchema } from '@/components/StructuredData';

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
      images: [post.featuredImage || '/images/og/default.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.featuredImage || '/images/og/default.svg'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getContentPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different post)
  const allPosts = await getContentPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Extract FAQs from content if they exist (only for markdown content)
  let faqs: Array<{ question: string; answer: string }> = [];
  
  if (!post.isPortableText && typeof post.content === 'string') {
    const faqPattern = /##\s*FAQs?\s*\n([\s\S]*?)(?=\n##|$)/i;
    const faqMatch = post.content.match(faqPattern);
    
    if (faqMatch) {
      const faqContent = faqMatch[1];
      const faqItemPattern = /###\s*(.+?)\n([\s\S]*?)(?=\n###|$)/g;
      let match;
      while ((match = faqItemPattern.exec(faqContent)) !== null) {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim()
        });
      }
    }
  }

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        description={post.excerpt}
        content={typeof post.content === 'string' ? post.content : ''}
        author={{
          name: post.author?.name || 'Peter Pitcher',
          url: '/about'
        }}
        datePublished={post.publishedDate}
        dateModified={post.updatedDate}
        image={typeof post.featuredImage === 'string' ? post.featuredImage : (post.featuredImage as any)?.src}
        url={`/licensees-guide/${post.slug}`}
        keywords={post.tags}
        speakableSections={['.prose h2', '.prose h3', '.prose > p:first-of-type']}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
      <BlogLayout>
        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </BlogLayout>
    </>
  );
}