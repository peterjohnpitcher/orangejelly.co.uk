// Default image mappings for blog posts
// This provides fallback images when featuredImage is not set in Sanity

export function getDefaultBlogImage(slug: string): string {
  // Map of blog post slugs to their corresponding default images
  const imageMap: Record<string, string> = {
    'beat-chain-pubs': '/images/blog/beat-chain-pubs.svg',
    'christmas-pub-promotion-ideas': '/images/blog/christmas-pub-promotion-ideas.svg',
    'compete-with-wetherspoons': '/images/blog/compete-with-wetherspoons.svg',
    'content-marketing-ideas-pubs': '/images/blog/content-marketing-ideas-pubs.svg',
    'email-marketing-pub-retention': '/images/blog/email-marketing-pub-retention.svg',
    'facebook-marketing-local-pubs': '/images/blog/facebook-marketing-local-pubs.svg',
    'fill-empty-pub-tables': '/images/blog/fill-empty-pub-tables.svg',
    'how-to-run-successful-pub-events': '/images/blog/how-to-run-successful-pub-events.svg',
    'instagram-marketing-for-pubs': '/images/blog/instagram-marketing-for-pubs.svg',
    'live-music-events-for-pubs': '/images/blog/live-music-events-for-pubs.svg',
    'local-pub-marketing': '/images/blog/local-pub-marketing.svg',
    'low-budget-pub-marketing-ideas': '/images/blog/low-budget-pub-marketing-ideas.svg',
    'midweek-pub-offers-that-work': '/images/blog/midweek-pub-offers-that-work.svg',
    'premium-pub-positioning': '/images/blog/premium-pub-positioning.svg',
    'profitable-pub-food-menu-ideas': '/images/blog/profitable-pub-food-menu-ideas.svg',
    'pub-differentiation-strategies': '/images/blog/pub-differentiation-strategies.svg',
    'pub-empty-tuesday-nights': '/images/blog/pub-empty-tuesday-nights.svg',
    'pub-refurbishment-on-budget': '/images/blog/pub-refurbishment-on-budget.svg',
    'quiet-monday-night-promotions': '/images/blog/quiet-monday-night-promotions.svg',
    'quiz-night-ideas': '/images/blog/quiz-night-ideas.svg',
    'recession-proof-pub-strategies': '/images/blog/recession-proof-pub-strategies.svg',
    'seasonal-pub-events-calendar': '/images/blog/seasonal-pub-events-calendar.svg',
    'social-media-strategy-for-pubs': '/images/blog/social-media-strategy-for-pubs.svg',
    'summer-pub-event-ideas': '/images/blog/summer-pub-event-ideas.svg',
    'why-is-my-pub-empty': '/images/blog/why-is-my-pub-empty.svg',
    'pub-health-check-essential-fundamentals-licensee-success': '/images/blog/pub-health-check.svg',
  };

  // Return the mapped image or a default
  return imageMap[slug] || '/images/blog/default.svg';
}

export function getBlogImageSrc(featuredImage: any, slug: string): string {
  // If featuredImage is a string URL (from Sanity), use it directly
  if (typeof featuredImage === 'string' && featuredImage.includes('://')) {
    return featuredImage;
  }

  // If featuredImage is an object with asset.url, use that
  if (featuredImage && typeof featuredImage === 'object' && featuredImage.asset?.url) {
    return featuredImage.asset.url;
  }

  // Otherwise, use the default image based on slug
  return getDefaultBlogImage(slug);
}

export function getBlogImageAlt(featuredImage: any, title: string): string {
  // If featuredImage has alt text, use it
  if (featuredImage && typeof featuredImage === 'object' && featuredImage.alt) {
    return featuredImage.alt;
  }

  // Otherwise, use the post title
  return title;
}
