'use client';

import BlogPost from '@/components/blog/BlogPost';
import { BlogPost as BlogPostType } from '@/lib/content-source';

interface BlogPostClientProps {
  post: BlogPostType;
  relatedPosts: BlogPostType[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  return <BlogPost post={post} relatedPosts={relatedPosts} />;
}