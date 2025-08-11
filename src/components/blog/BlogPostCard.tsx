'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Card from '@/components/Card';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { formatDate } from '@/lib/utils';
import { getBlogImageSrc, getBlogImageAlt } from '@/lib/blog-images';

interface BlogPostCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    publishedDate: string;
    category: {
      name: string;
      slug: string;
    };
    featuredImage:
      | string
      | {
          src?: string;
          alt?: string;
          asset?: {
            _id?: string;
            url?: string;
          };
        };
    author: {
      name: string;
    };
    readingTime: number;
  };
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const postUrl = `/licensees-guide/${post.slug}`;

  if (featured) {
    return (
      <Card variant="bordered" className="overflow-hidden">
        <Link href={postUrl} className="group">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[16/9] md:aspect-auto">
              <OptimizedImage
                src={getBlogImageSrc(post.featuredImage, post.slug)}
                alt={getBlogImageAlt(post.featuredImage, post.title)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                width={0}
                height={0}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-center">
              <div
                className="text-orange hover:text-orange-dark text-sm font-medium mb-2 inline-block cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/licensees-guide/category/${post.category.slug}`;
                }}
              >
                {post.category.name}
              </div>

              <Heading level={2} className="mb-3 group-hover:text-orange transition-colors">
                {post.title}
              </Heading>

              <Text color="muted" className="mb-4 line-clamp-3">
                {post.excerpt}
              </Text>

              <div className="flex items-center gap-4 text-sm text-charcoal/60">
                <span>{post.author.name}</span>
                <span>•</span>
                <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card variant="bordered" className="overflow-hidden h-full flex flex-col">
      <Link href={postUrl} className="group flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <OptimizedImage
            src={getBlogImageSrc(post.featuredImage, post.slug)}
            alt={getBlogImageAlt(post.featuredImage, post.title)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={0}
            height={0}
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div
            className="text-orange hover:text-orange-dark text-sm font-medium mb-2 inline-block cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/licensees-guide/category/${post.category.slug}`;
            }}
          >
            {post.category.name}
          </div>

          <Heading level={3} className="mb-2 group-hover:text-orange transition-colors">
            {post.title}
          </Heading>

          <Text color="muted" className="mb-4 line-clamp-2 flex-grow">
            {post.excerpt}
          </Text>

          <div className="flex items-center gap-3 text-sm text-charcoal/60">
            <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
