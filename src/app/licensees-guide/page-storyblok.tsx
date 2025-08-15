import { type Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/hybrid-content-source';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: "The Licensee's Guide | Orange Jelly",
  description:
    'Practical advice and proven strategies for pub licensees. Learn from real experience running The Anchor pub.',
  openGraph: {
    title: "The Licensee's Guide",
    description: 'Practical advice and proven strategies for pub licensees.',
    type: 'website',
  },
};

/**
 * Blog Listing Page - Using Storyblok
 */
export default async function LicenseesGuidePage() {
  const posts = await getAllBlogPosts();

  // Group posts by category
  const categorizedPosts = posts.reduce((acc: any, post: any) => {
    const category = post.content?.category || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});

  // Category display names
  const categoryNames: { [key: string]: string } = {
    'empty-pubs': 'Empty Pubs',
    competition: 'Competition',
    marketing: 'Marketing',
    operations: 'Operations',
    finance: 'Finance',
    compliance: 'Compliance',
    general: 'General Advice',
  };

  return (
    <>
      {/* Hero Section */}
      <Section background="orange-light" padding="large">
        <Container>
          <div className="max-w-4xl">
            <Heading level={1} className="mb-4">
              The Licensee's Guide
            </Heading>
            <Text size="xl" className="mb-6">
              Practical advice from running The Anchor. No theory, no fluff - just proven strategies
              that work.
            </Text>
            <Text size="lg" color="muted">
              {posts.length} articles to help you fill tables, boost profits, and survive the tough
              times.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Latest Articles */}
      <Section padding="large">
        <Container>
          <Heading level={2} className="mb-8">
            Latest Articles
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.slice(0, 6).map((post: any) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {post.content?.featured_image && (
                  <div className="relative aspect-[16/9]">
                    <OptimizedImage
                      src={post.content.featured_image}
                      alt={post.content.featured_image_alt || post.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {post.content?.category && (
                    <span className="inline-block px-2 py-1 bg-orange-light text-orange text-xs rounded-full mb-2">
                      {categoryNames[post.content.category]}
                    </span>
                  )}

                  <Heading level={3} className="mb-2">
                    <Link
                      href={`/licensees-guide/${post.slug}`}
                      className="hover:text-orange transition-colors"
                    >
                      {post.name}
                    </Link>
                  </Heading>

                  {post.content?.excerpt && (
                    <Text size="sm" color="muted" className="mb-3">
                      {post.content.excerpt}
                    </Text>
                  )}

                  {post.content?.published_date && (
                    <Text size="xs" color="muted">
                      {format(new Date(post.content.published_date), 'MMM d, yyyy')}
                    </Text>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Articles by Category */}
      {Object.entries(categorizedPosts).map(([category, categoryPosts]: [string, any]) => (
        <Section
          key={category}
          background={category === 'general' ? 'cream' : 'white'}
          padding="large"
        >
          <Container>
            <Heading level={2} className="mb-6">
              {categoryNames[category]}
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryPosts.map((post: any) => (
                <article key={post.slug} className="border-b border-charcoal/10 pb-4">
                  <Heading level={3} className="mb-2">
                    <Link
                      href={`/licensees-guide/${post.slug}`}
                      className="hover:text-orange transition-colors"
                    >
                      {post.name}
                    </Link>
                  </Heading>

                  {post.content?.excerpt && (
                    <Text size="sm" color="muted">
                      {post.content.excerpt}
                    </Text>
                  )}
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA Section */}
      <Section background="teal" padding="large">
        <Container>
          <div className="text-center">
            <Heading level={2} color="white" className="mb-4">
              Need Personal Help?
            </Heading>
            <Text size="lg" color="white" className="mb-6">
              These articles share what worked for us. Your pub might need something different.
            </Text>
            <Link
              href="/contact"
              className="inline-block bg-white text-teal px-8 py-3 rounded-full font-semibold hover:bg-cream transition-colors"
            >
              Get Tailored Advice
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
