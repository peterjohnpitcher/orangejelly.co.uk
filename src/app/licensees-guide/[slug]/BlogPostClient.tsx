import BlogPostServer from '@/components/blog/BlogPostServer';
import { BlogPost as BlogPostType } from '@/lib/content-source';

interface BlogPostClientProps {
  post: BlogPostType;
  relatedPosts: BlogPostType[];
}

// This is now a server component that uses BlogPostServer for markdown processing
export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  return <BlogPostServer post={post} relatedPosts={relatedPosts} />;
}