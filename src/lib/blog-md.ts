import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, Category, calculateReadingTime, defaultAuthor, getCategoryBySlug, blogCategories } from './blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  title: string;
  excerpt: string;
  publishedDate: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// Get all post slugs
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Category mapping for legacy posts
const categoryMapping: Record<string, string> = {
  'marketing': 'social-media',
  'pub-management': 'empty-pub-solutions',
  'pub-promotions': 'events-promotions',
  'events': 'events-promotions',
  'food': 'food-drink',
  'seasonal': 'events-promotions',
  'budget': 'empty-pub-solutions',
  'undefined': 'empty-pub-solutions',
  'getting-started': 'empty-pub-solutions',
  'competition': 'competition'
};

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const meta = data as BlogPostMeta;
    
    // Map category if needed
    const mappedCategory = categoryMapping[meta.category] || meta.category;
    const category = getCategoryBySlug(mappedCategory);
    
    if (!category) {
      console.error(`Invalid category: ${meta.category} for post: ${slug}`);
      return null;
    }
    
    const post: BlogPost = {
      slug,
      title: meta.title,
      excerpt: meta.excerpt,
      content,
      author: defaultAuthor,
      publishedDate: meta.publishedDate,
      updatedDate: meta.updatedDate,
      category,
      tags: meta.tags,
      featuredImage: meta.featuredImage ? {
        src: meta.featuredImage,
        alt: meta.title
      } : {
        src: '/images/blog/default.svg',
        alt: meta.title
      },
      seo: {
        metaTitle: meta.seo?.title,
        metaDescription: meta.seo?.description || meta.excerpt,
        keywords: meta.seo?.keywords || meta.tags
      },
      readingTime: calculateReadingTime(content)
    };
    
    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
    
  return posts;
}

// Get posts by category
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.slug === categorySlug);
}

// Get recent posts
export function getRecentPosts(limit: number = 5): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

// Get featured posts (most recent from each category)
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  const featured: BlogPost[] = [];
  const categories = new Set<string>();
  
  for (const post of allPosts) {
    if (!categories.has(post.category.slug)) {
      featured.push(post);
      categories.add(post.category.slug);
    }
    if (featured.length >= 5) break;
  }
  
  return featured;
}

// Search posts
export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts();
  const searchTerm = query.toLowerCase();
  
  return allPosts.filter(post => {
    const searchableContent = `
      ${post.title} 
      ${post.excerpt} 
      ${post.content} 
      ${post.tags.join(' ')}
    `.toLowerCase();
    
    return searchableContent.includes(searchTerm);
  });
}

// Get all categories with post counts
export function getCategories(): Category[] {
  const allPosts = getAllPosts();
  const categoryMap = new Map<string, number>();
  
  // Count posts per category
  allPosts.forEach(post => {
    const count = categoryMap.get(post.category.slug) || 0;
    categoryMap.set(post.category.slug, count + 1);
  });
  
  // Return categories that have posts
  return blogCategories.filter(category => 
    categoryMap.has(category.slug) && categoryMap.get(category.slug)! > 0
  );
}