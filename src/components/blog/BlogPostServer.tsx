import { type BlogPost as BlogPostType } from '@/lib/content-source';
import BlogPost from './BlogPost';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

interface BlogPostServerProps {
  post: BlogPostType;
  relatedPosts?: BlogPostType[];
}

/**
 * Server component wrapper for BlogPost
 * Processes markdown content server-side for better performance
 */
export default async function BlogPostServer({ post, relatedPosts = [] }: BlogPostServerProps) {
  // Process markdown content server-side if needed
  let processedPost = { ...post };

  if (!post.isPortableText && typeof post.content === 'string') {
    // Process markdown to HTML on the server
    const processedContent = await remark().use(remarkHtml).process(post.content);

    // Add the processed HTML to the post object
    processedPost = {
      ...post,
      contentHtml: processedContent.toString(),
      // Mark that content is pre-processed
      isPreProcessed: true,
    } as BlogPostType & { contentHtml: string; isPreProcessed: boolean };
  }

  return <BlogPost post={processedPost} relatedPosts={relatedPosts} />;
}
