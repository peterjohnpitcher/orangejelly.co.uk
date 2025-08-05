// GROQ queries for fetching content from Sanity

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
      image
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
      image
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

export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    problem,
    deliverable,
    description,
    features,
    timeEstimate,
    priceBreakdown,
    price,
    timeline,
    highlight,
    example
  }
`;

export const caseStudiesQuery = `
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    subtitle,
    problem,
    failed,
    solution,
    results,
    timeInvestment,
    learnings,
    quote
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    businessName,
    tagline,
    contact {
      email,
      phone,
      whatsapp,
      address
    },
    pricing {
      hourlyRate,
      currency
    },
    metrics,
    socialMedia
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
      image
    },
    quickAnswer,
    voiceSearchQueries,
    quickStats,
    faqs,
    localSEO,
    ctaSettings
  }
`;