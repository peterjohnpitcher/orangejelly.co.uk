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
import QuickAnswer from './QuickAnswer';
import QuickStats from './QuickStats';
import { formatDate } from '@/lib/utils';
import { BlogPost as BlogPostType } from '@/lib/content-source';
import dynamic from 'next/dynamic';

// Lazy load PortableTextContent for Sanity content
const PortableTextContent = dynamic(() => import('@/components/PortableTextContent'), {
  ssr: true
});
import { MESSAGES, URLS } from '@/lib/constants';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts?: BlogPostType[];
}

export default function BlogPost({ post, relatedPosts = [] }: BlogPostProps) {
  // Convert markdown to HTML (only for markdown content)
  const [contentHtml, setContentHtml] = React.useState('');
  
  React.useEffect(() => {
    async function processContent() {
      if (!post.isPortableText && typeof post.content === 'string') {
        const processedContent = await remark()
          .use(remarkHtml)
          .process(post.content);
        setContentHtml(processedContent.toString());
      }
    }
    processContent();
  }, [post.content, post.isPortableText]);
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
              href={`/licensees-guide/category/${post.category}`}
              variant="ghost"
              size="small"
              className="text-orange hover:text-orange-dark font-medium text-sm p-0"
            >
              {post.category}
            </Button>
          </div>
          
          <Heading level={1} className="mb-4">
            {post.title}
          </Heading>
          
          <Text size="lg" color="muted" className="mb-6">
            {post.excerpt}
          </Text>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60 mb-8">
            {post.author && (
              <AuthorInfo 
                author={{
                  name: post.author.name,
                  role: 'Founder & Licensee',
                  bio: post.author.bio || 'Founder of Orange Jelly Limited and licensee of The Anchor pub',
                  image: post.author.image || '/images/peter-pitcher.svg'
                }} 
                variant="compact" 
              />
            )}
            <span>•</span>
            <time dateTime={post.publishedDate}>
              {formatDate(post.publishedDate)}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
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
              src={typeof post.featuredImage === 'string' ? post.featuredImage : (post.featuredImage as any).src}
              alt={typeof post.featuredImage === 'string' ? post.title : (post.featuredImage as any).alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Quick Answer for featured snippets */}
        {post.quickAnswer && (
          <QuickAnswer answer={post.quickAnswer} className="mb-8" />
        )}

        {/* Quick Stats for AI Overview extraction */}
        {post.quickStats && post.quickStats.length > 0 && (
          <QuickStats stats={post.quickStats} className="mb-8" />
        )}

        {/* Main content - removed empty sidebar */}
        <div className="mb-12">
          {post.isPortableText ? (
            <div className="prose prose-lg max-w-none">
              <PortableTextContent value={post.content as any[]} />
            </div>
          ) : (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}
        </div>

        {/* FAQs Section for Voice Search */}
        {post.faqs && post.faqs.length > 0 && (
          <Card variant="bordered" className="mb-12">
            <Heading level={2} className="mb-6 flex items-center gap-2">
              <span>❓</span> Frequently Asked Questions
            </Heading>
            <div className="space-y-4">
              {post.faqs.map((faq, index) => (
                <div key={index} className="border-b border-charcoal/10 last:border-0 pb-4 last:pb-0">
                  <Heading level={3} className="mb-2 flex items-start gap-2">
                    {faq.isVoiceOptimized && <span className="text-orange">🎙️</span>}
                    {faq.question}
                  </Heading>
                  <Text className="text-charcoal/80">
                    {faq.answer}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        )}

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
              href={URLS.whatsapp(
                post.ctaSettings?.whatsappMessage || MESSAGES.whatsapp.blog
              )}
              variant="primary"
              size="large"
              external
            >
              {post.ctaSettings?.primaryCTA || 'Get Free Advice on WhatsApp'}
            </Button>
          </div>
        </Card>

        {/* Author bio */}
        {post.author && (
          <AuthorInfo 
            author={{
              name: post.author.name,
              role: 'Founder & Licensee',
              bio: post.author.bio || 'Founder of Orange Jelly Limited and licensee of The Anchor pub',
              image: post.author.image || '/images/peter-pitcher.svg'
            }} 
            variant="full" 
          />
        )}

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
          <RelatedPosts 
            posts={relatedPosts.map(post => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              publishedDate: post.publishedDate,
              category: {
                name: post.category,
                slug: post.category.toLowerCase().replace(/\s+/g, '-')
              },
              featuredImage: {
                src: typeof post.featuredImage === 'string' ? post.featuredImage : '/images/blog/default.jpg',
                alt: post.title
              },
              author: {
                name: post.author?.name || 'Peter Pitcher'
              },
              readingTime: post.readingTime || 5
            }))} 
          />
        </div>
      )}
    </>
  );
}