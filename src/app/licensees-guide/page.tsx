import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CategoryList from '@/components/blog/CategoryList';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import { getContentPosts, getContentSource } from '@/lib/content-source';
import { getCategories } from '@/lib/blog-md';
import { CollectionPageSchema } from '@/components/CollectionPageSchema';

export const metadata: Metadata = {
  title: "The Licensee's Guide - Expert Pub Management Advice | Orange Jelly",
  description: "Essential guides for pub owners covering marketing, events, food, and business strategy. Practical advice to increase revenue and build thriving local pubs.",
  keywords: ['pub management', 'pub marketing', 'licensee guide', 'pub business advice', 'pub owner tips'],
  openGraph: {
    title: "The Licensee's Guide - Expert Pub Management Advice",
    description: "Essential guides for pub owners covering marketing, events, food, and business strategy.",
    images: ['/images/og/licensees-guide.svg'],
  },
};

export default async function LicenseesGuidePage() {
  let posts: any[] = [];
  let categories: any[] = [];
  const contentSource = getContentSource();
  
  try {
    posts = await getContentPosts();
    categories = getCategories();
    
    // Log content source for debugging
    console.log(`Loading blog posts from: ${contentSource}`);
  } catch (error) {
    console.error('Error loading blog data:', error);
    // Return a fallback UI
    return (
      <>
        <Hero
          title="The Licensee's Guide"
          subtitle="Essential guides for modern pub management"
          showCTA={false}
        />
        <Section background="white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <Text className="text-red-600 text-center">
              Error loading blog posts. Please try refreshing the page.
            </Text>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      {posts.length > 0 && (
        <CollectionPageSchema
          name="The Licensee's Guide"
          description="Essential guides for pub owners covering marketing, events, food, and business strategy. Practical advice to increase revenue and build thriving local pubs."
          url="/licensees-guide"
          items={posts.map(post => ({
            url: `/licensees-guide/${post.slug}`,
            name: post.title,
            description: post.excerpt,
            datePublished: post.publishedDate,
            author: post.author?.name || 'Peter Pitcher',
            image: typeof post.featuredImage === 'string' ? post.featuredImage : '/images/blog/default.svg'
          }))}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: "The Licensee's Guide", url: '/licensees-guide' }
          ]}
        />
      )}
      
      <Hero
        title="The Licensee's Guide"
        subtitle="Proven strategies that increase revenue and build thriving pubs"
        showCTA={false}
        breadcrumbs={breadcrumbPaths.licenseesGuide}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* Lead paragraph */}
        <Text size="lg" align="center" className="max-w-3xl mx-auto mb-12 text-charcoal/70">
          Essential guides for modern pub management. From filling empty pubs to competing with chains, 
          discover practical advice that actually works.
        </Text>

        {/* Category Navigation */}
        <div className="mb-12">
          <CategoryList categories={categories} variant="grid" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard 
              key={post.slug} 
              post={{
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                publishedDate: post.publishedDate,
                category: {
                  name: post.category,
                  slug: post.category.toLowerCase().replace(/\s+/g, '-')
                },
                featuredImage: {
                  src: typeof post.featuredImage === 'string' ? post.featuredImage : '/images/blog/default.svg',
                  alt: post.title
                },
                author: {
                  name: post.author?.name || 'Peter Pitcher'
                },
                readingTime: post.readingTime || 5
              }} 
            />
          ))}
        </div>

        </div>
      </Section>
    </>
  );
}