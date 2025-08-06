// GROQ queries for fetching content from Sanity

// Site settings query
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    company,
    contact,
    pricing,
    metrics,
    socialMedia
  }
`;

// Navigation query  
export const navigationQuery = `
  *[_id == "mainNavigation"][0] {
    mainMenu[] | order(order asc) {
      label,
      href,
      external
    },
    mobileMenu[] | order(order asc) {
      label,
      href,
      external
    }
  }
`;

// Services query
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    emoji,
    problem,
    deliverable,
    description,
    features,
    example,
    timeEstimate,
    priceBreakdown,
    price,
    timeline,
    highlight
  }
`;

// Homepage FAQs query
export const homepageFAQsQuery = `
  *[_type == "faq" && page == "home"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    isVoiceOptimized
  }
`;

// Content blocks query
export const contentBlockQuery = `
  *[_type == "contentBlock" && identifier.current == $identifier][0] {
    name,
    type,
    content,
    metadata
  }
`;

// Multiple content blocks query
export const contentBlocksByPageQuery = `
  *[_type == "contentBlock" && metadata.page == $page] | order(metadata.order asc) {
    name,
    "identifier": identifier.current,
    type,
    content,
    metadata
  }
`;

export const blogPostsQuery = `
  *[_type == "blogPost" && status == "published"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedDate,
    category->{
      _id,
      name,
      "slug": slug.current
    },
    tags,
    featuredImage,
    "author": author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedDate,
    updatedDate,
    category->{
      _id,
      name,
      "slug": slug.current
    },
    tags,
    featuredImage,
    seo,
    "author": author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    quickAnswer,
    voiceSearchQueries,
    quickStats,
    faqs,
    localSEO,
    ctaSettings
  }
`;

export const blogPostsByCategoryQuery = `
  *[_type == "blogPost" && category->slug.current == $category && status == "published"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedDate,
    category->{
      _id,
      name,
      "slug": slug.current
    },
    tags,
    featuredImage
  }
`;

export const caseStudiesQuery = `
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    client,
    problem,
    failedAttempts,
    solution,
    results,
    timeInvestment,
    learnings,
    quote,
    relatedService->,
    order
  }
`;

export const faqsQuery = `
  *[_type == "faq" && page == $page] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Draft preview queries (for preview mode)
// About content query
export const aboutContentQuery = `
  *[_type == "aboutContent"][0] {
    _id,
    title,
    heroSection,
    story,
    timeline,
    values,
    founderSection {
      name,
      role,
      bio,
      image {
        asset->{
          _id,
          url
        }
      },
      quote
    },
    teamMembers[] {
      name,
      role,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    partnerships[] {
      name,
      description,
      logo {
        asset->{
          _id,
          url
        }
      },
      url
    },
    whyOrangeJelly
  }
`;

// Footer content query
export const footerContentQuery = `
  *[_type == "footerContent"][0] {
    _id,
    companyInfo,
    quickLinks,
    services,
    legalLinks,
    contactInfo,
    socialLinks,
    newsletter,
    bottomBar
  }
`;

// SEO metadata query
export const seoMetadataQuery = `
  *[_type == "seoMetadata" && page == $page][0] {
    _id,
    page,
    title,
    description,
    keywords,
    openGraph,
    twitter,
    canonicalUrl,
    noIndex,
    structuredData
  }
`;

// Social proof query
export const socialProofQuery = `
  *[_type == "socialProof" && isActive == true] | order(order asc) {
    _id,
    title,
    value,
    timeframe,
    location,
    category,
    displayText
  }
`;

// Trust badges query
export const trustBadgesQuery = `
  *[_type == "trustBadge" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    icon,
    color
  }
`;

export const draftBlogPostQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedDate,
    updatedDate,
    category->{
      _id,
      name,
      "slug": slug.current
    },
    tags,
    featuredImage,
    seo,
    status,
    "author": author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    quickAnswer,
    voiceSearchQueries,
    quickStats,
    faqs,
    localSEO,
    ctaSettings
  }
`;