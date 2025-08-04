import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CategoryList from '@/components/blog/CategoryList';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/blog-md';
import { CollectionPageSchema } from '@/components/CollectionPageSchema';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryTitles: Record<string, string> = {
  'empty-pub-solutions': 'Empty Pub Solutions',
  'social-media': 'Social Media',
  'competition': 'Competition',
  'food-drink': 'Food & Drink',
  'events-promotions': 'Events & Promotions',
};

const categoryDescriptions: Record<string, string> = {
  'empty-pub-solutions': 'Proven strategies to fill empty tables and boost footfall',
  'social-media': 'Make social media work for your pub without wasting hours',
  'competition': 'Stand out from chains and nearby pubs',
  'food-drink': 'Menu strategies that increase sales and profits',
  'events-promotions': 'Events and promotions that actually bring customers in',
};

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const title = categoryTitles[params.category] || params.category;
  const description = categoryDescriptions[params.category] || `Browse all ${title} articles`;

  return {
    title: `${title} - The Licensee's Guide | Orange Jelly`,
    description,
    openGraph: {
      title: `${title} - The Licensee's Guide`,
      description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const posts = getAllPosts();
  const categories = getCategories();
  
  const categoryPosts = posts.filter(post => post.category.slug === params.category);
  
  if (categoryPosts.length === 0) {
    notFound();
  }

  const categoryTitle = categoryTitles[params.category] || params.category;
  const categoryDescription = categoryDescriptions[params.category];

  return (
    <>
      <CollectionPageSchema
        name={`${categoryTitle} - The Licensee's Guide`}
        description={categoryDescription || `Browse all ${categoryTitle} articles`}
        url={`/licensees-guide/category/${params.category}`}
        items={categoryPosts.map(post => ({
          url: `/licensees-guide/${post.slug}`,
          name: post.title,
          description: post.excerpt,
          datePublished: post.publishedDate,
          author: post.author.name,
          image: post.featuredImage.src
        }))}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: "The Licensee's Guide", url: '/licensees-guide' },
          { name: categoryTitle, url: `/licensees-guide/category/${params.category}` }
        ]}
      />
      <BlogLayout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/licensees-guide" className="text-charcoal/60 hover:text-orange transition-colors">
                The Licensee's Guide
              </Link>
            </li>
            <li className="text-charcoal/60">/</li>
            <li className="text-charcoal">{categoryTitle}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <Heading level={1} className="mb-4">
            {categoryTitle}
          </Heading>
          {categoryDescription && (
            <Text size="lg" className="text-charcoal/70 max-w-3xl mx-auto">
              {categoryDescription}
            </Text>
          )}
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <CategoryList categories={categories} currentCategory={params.category} variant="grid" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        </div>
      </BlogLayout>
    </>
  );
}