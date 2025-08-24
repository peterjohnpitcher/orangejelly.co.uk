import BlogPostServer from '@/components/blog/BlogPostServer';
import { type BlogPost as BlogPostType } from '@/lib/blog';

interface BlogPostClientProps {
  post: BlogPostType & {
    isPortableText?: boolean;
    quickAnswer?: string;
    quickStats?: any;
    voiceSearchQueries?: string[];
    localSEO?: any;
    faqs?: any[];
    ctaSettings?: any;
    rawContent?: string;
  };
  relatedPosts: BlogPostType[];
}

// This is now a server component that uses BlogPostServer for markdown processing
export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  return <BlogPostServer post={post} relatedPosts={relatedPosts} />;
}
