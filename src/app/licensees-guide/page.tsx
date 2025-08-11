import { type Metadata } from 'next';
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
  description:
    'Essential guides for pub owners covering marketing, events, food, and business strategy. Practical advice to increase revenue and build thriving local pubs.',
  keywords: [
    'pub management',
    'pub marketing',
    'licensee guide',
    'pub business advice',
    'pub owner tips',
  ],
  openGraph: {
    title: "The Licensee's Guide - Expert Pub Management Advice",
    description:
      'Essential guides for pub owners covering marketing, events, food, and business strategy.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "The Licensee's Guide - Expert Pub Management Advice",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Licensee's Guide - Expert Pub Management Advice",
    description:
      'Essential guides for pub owners covering marketing, events, food, and business strategy.',
    images: ['/opengraph-image'],
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
          items={posts.map((post) => ({
            url: `/licensees-guide/${post.slug}`,
            name: post.title,
            description: post.excerpt,
            datePublished: post.publishedDate,
            author: post.author?.name || 'Peter Pitcher',
            image: typeof post.featuredImage === 'string' ? post.featuredImage : '/logo.png',
          }))}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: "The Licensee's Guide", url: '/licensees-guide' },
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
          <Text size="lg" align="center" className="max-w-3xl mx-auto mb-8 text-charcoal/70">
            Essential guides for modern pub management. From filling empty pubs to competing with
            chains, discover practical advice that actually works.
          </Text>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="text-3xl font-bold text-orange mb-2">25+</div>
              <Text size="sm" className="text-charcoal/70">
                Proven strategies from The Anchor
              </Text>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="text-3xl font-bold text-orange mb-2">71%</div>
              <Text size="sm" className="text-charcoal/70">
                Food GP achieved using these methods
              </Text>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="text-3xl font-bold text-orange mb-2">£75k+</div>
              <Text size="sm" className="text-charcoal/70">
                Added to business value
              </Text>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-3xl mx-auto mb-12">
            <Text className="mb-4">
              Every guide in this collection comes from real experience at The Anchor in Stanwell
              Moor. We've tested these strategies firsthand, measuring their impact on our bottom
              line.
            </Text>
            <Text className="mb-4">
              Whether you're struggling with empty Tuesday nights, competing with Wetherspoons, or
              trying to build a profitable food offering, you'll find honest, practical advice that
              works.
            </Text>
            <Text className="mb-8">
              No theory. No fluff. Just proven methods that have transformed our pub from struggling
              to thriving - and can do the same for yours.
            </Text>
          </div>

          {/* What You'll Learn */}
          <div className="bg-teal-dark/5 rounded-xl p-8 mb-12 max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-6">
              What You'll Learn
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">How to fill your pub on quiet weeknights</Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">Social media strategies that actually drive footfall</Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">Food menu optimization for maximum profit</Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">Event ideas that build loyal communities</Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">Competing with chains without matching prices</Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange mr-3">✓</span>
                <Text size="sm">Budget-friendly marketing that delivers results</Text>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-12">
            <Heading level={2} align="center" className="mb-6">
              Browse by Topic
            </Heading>
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
                    slug: post.category.toLowerCase().replace(/\s+/g, '-'),
                  },
                  featuredImage: post.featuredImage, // Pass the raw featuredImage data
                  author: {
                    name: post.author?.name || 'Peter Pitcher',
                  },
                  readingTime: post.readingTime || 5,
                }}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
