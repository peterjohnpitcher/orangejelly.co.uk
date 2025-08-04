import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogPostClient from './BlogPostClient';
import { getPostBySlug, getAllPosts } from '@/lib/blog-md';
import { BlogPostingSchema } from '@/components/BlogPostingSchema';
import { FAQSchema } from '@/components/StructuredData';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords || post.tags,
    openGraph: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['Orange Jelly'],
      images: [post.featuredImage.src || '/images/og/default.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      images: [post.featuredImage.src || '/images/og/default.svg'],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different post)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Extract FAQs from content if they exist
  const faqPattern = /##\s*FAQs?\s*\n([\s\S]*?)(?=\n##|$)/i;
  const faqMatch = post.content.match(faqPattern);
  let faqs: Array<{ question: string; answer: string }> = [];
  
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

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        description={post.excerpt}
        content={post.content}
        author={{
          name: post.author.name,
          url: '/about'
        }}
        datePublished={post.publishedDate}
        dateModified={post.updatedDate}
        image={post.featuredImage.src}
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