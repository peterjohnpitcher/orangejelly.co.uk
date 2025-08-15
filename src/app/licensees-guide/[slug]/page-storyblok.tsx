import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSingleBlogPost, getAllBlogPosts } from '@/lib/hybrid-content-source';
import BlogArticle from '@/components/storyblok/BlogArticle';
import { COMPANY } from '@/lib/constants';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getSingleBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
    };
  }

  const { content } = post;
  const seo = content.seo || {};

  return {
    title: seo.meta_title || content.title,
    description: seo.meta_description || content.excerpt,
    keywords: seo.keywords,
    authors: [{ name: 'Peter Pitcher' }],
    publisher: COMPANY.name,
    openGraph: {
      title: seo.meta_title || content.title,
      description: seo.meta_description || content.excerpt,
      type: 'article',
      publishedTime: content.published_date,
      modifiedTime: content.updated_date,
      authors: ['Peter Pitcher'],
      images: content.featured_image
        ? [
            {
              url: content.featured_image,
              alt: content.featured_image_alt || content.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.meta_title || content.title,
      description: seo.meta_description || content.excerpt,
    },
    alternates: {
      canonical: `https://www.orangejelly.co.uk/licensees-guide/${params.slug}`,
    },
  };
}

/**
 * Blog Post Page Component - Using Storyblok
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getSingleBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // The post from Storyblok has the content in the 'content' field
  // Cast it to the expected shape for the BlogArticle component
  const blogContent = post.content as any;

  return <BlogArticle blok={blogContent} slug={params.slug} />;
}
