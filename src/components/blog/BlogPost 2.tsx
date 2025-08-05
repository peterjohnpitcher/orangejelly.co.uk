'use client';

import React, { useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ShareButtons from './ShareButtons';
import AuthorInfo from './AuthorInfo';
import TableOfContents from './TableOfContents';
import RelatedPosts from './RelatedPosts';
import StickyCTA from './StickyCTA';
import { formatDate } from '@/lib/utils';
import { BlogPost as BlogPostType } from '@/lib/blog';
import { MESSAGES, URLS } from '@/lib/constants';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts?: BlogPostType[];
}

export default function BlogPost({ post, relatedPosts = [] }: BlogPostProps) {
  // Convert markdown to HTML
  const [contentHtml, setContentHtml] = React.useState('');
  
  React.useEffect(() => {
    async function processContent() {
      const processedContent = await remark()
        .use(remarkHtml)
        .process(post.content);
      setContentHtml(processedContent.toString());
    }
    processContent();
  }, [post.content]);
  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const article = document.getElementById('blog-article');
      if (!article) return;

      const totalHeight = article.clientHeight;
      const windowHeight = window.innerHeight;
      const position = window.scrollY;
      const progress = Math.min(100, (position / (totalHeight - windowHeight)) * 100);
      
      const progressBar = document.getElementById('reading-progress');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-cream z-50">
        <div 
          id="reading-progress" 
          className="h-full bg-orange transition-all duration-100 w-0"
        />
      </div>

      {/* Share buttons (floating on desktop) */}
      <ShareButtons 
        url={`/licensees-guide/${post.slug}`} 
        title={post.title}
        variant="floating"
      />

      {/* Sticky CTA */}
      <StickyCTA />

      <article id="blog-article">
        {/* Hero section */}
        <header className="mb-8">
          <div className="mb-6">
            <Button
              href={`/licensees-guide/category/${post.category.slug}`}
              variant="ghost"
              size="small"
              className="text-orange hover:text-orange-dark font-medium text-sm p-0"
            >
              {post.category.name}
            </Button>
          </div>
          
          <Heading level={1} className="mb-4">
            {post.title}
          </Heading>
          
          <Text size="lg" color="muted" className="mb-6">
            {post.excerpt}
          </Text>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60 mb-8">
            <AuthorInfo author={post.author} variant="compact" />
            <span>•</span>
            <time dateTime={post.publishedDate}>
              {formatDate(post.publishedDate)}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>

          {/* Share buttons (inline on mobile) */}
          <div className="lg:hidden mb-6">
            <ShareButtons 
              url={`/licensees-guide/${post.slug}`} 
              title={post.title}
              variant="inline"
            />
          </div>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative aspect-[16/9] mb-8 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
            <OptimizedImage
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Main content - removed empty sidebar */}
        <div className="mb-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Call to action */}
        <Card variant="bordered" className="bg-orange-light mb-12">
          <div className="text-center">
            <Heading level={3} className="mb-4">
              Need Help Implementing These Ideas?
            </Heading>
            <Text className="mb-6 max-w-2xl mx-auto">
              I've proven these strategies work at The Anchor and will start training other pubs from September 2025. 
              Let's chat about your specific situation - no sales pitch, just licensee to licensee.
            </Text>
            <Button
              href={URLS.whatsapp(MESSAGES.whatsapp.blog)}
              variant="primary"
              size="large"
              external
            >
              Get Free Advice on WhatsApp
            </Button>
          </div>
        </Card>

        {/* Author bio */}
        <AuthorInfo author={post.author} variant="full" />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-charcoal/10">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-charcoal/60">Tagged:</span>
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-cream rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </>
  );
}