#!/usr/bin/env tsx

import { createClient } from '@sanity/client';
import { writeFileSync } from 'fs';

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Define the complete expected schema based on blogPost.ts
interface ExpectedBlogPostSchema {
  // Basic fields
  title: string;
  slug: { current: string };
  status: 'draft' | 'published' | 'scheduled';
  excerpt: string;
  publishedDate: string;

  // AI/Voice Search fields
  quickAnswer: string;
  voiceSearchQueries: string[];
  quickStats: Array<{
    label: string;
    value: string;
    highlight: boolean;
  }>;

  // Content
  content: Array<any>;

  // FAQs
  faqs: Array<{
    question: string;
    answer: string;
    isVoiceOptimized: boolean;
  }>;

  // Local SEO
  localSEO: {
    targetLocation: string;
    nearbyLandmarks: string[];
    localModifiers: string[];
  };

  // SEO fields
  featuredImage: {
    asset: { _ref: string };
    alt: string;
  };
  category: { _ref: string };
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  // CTA settings
  ctaSettings: {
    primaryCTA: string;
    whatsappMessage: string;
    urgency: 'high' | 'medium' | 'low';
  };

  // Meta
  author: { _ref: string };
  updatedDate: string;
}

// Analysis results interface
interface FieldAnalysis {
  fieldName: string;
  present: number;
  missing: number;
  totalPosts: number;
  percentagePresent: number;
  missingPostSlugs: string[];
  sampleValues?: any[];
}

interface PostAnalysis {
  slug: string;
  title: string;
  status: string;
  missingFields: string[];
  incompleteFields: string[];
  totalMissingCount: number;
}

interface SchemaAnalysis {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  fieldAnalysis: FieldAnalysis[];
  postAnalysis: PostAnalysis[];
  criticalIssues: string[];
  recommendations: string[];
}

// Helper functions
function isFieldEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

function analyzeField(posts: any[], fieldPath: string, fieldName: string): FieldAnalysis {
  const analysis: FieldAnalysis = {
    fieldName,
    present: 0,
    missing: 0,
    totalPosts: posts.length,
    percentagePresent: 0,
    missingPostSlugs: [],
    sampleValues: []
  };

  posts.forEach(post => {
    const value = getNestedValue(post, fieldPath);
    if (isFieldEmpty(value)) {
      analysis.missing++;
      analysis.missingPostSlugs.push(post.slug?.current || 'unknown-slug');
    } else {
      analysis.present++;
      if (analysis.sampleValues.length < 3) {
        analysis.sampleValues.push(value);
      }
    }
  });

  analysis.percentagePresent = (analysis.present / analysis.totalPosts) * 100;
  return analysis;
}

async function fetchAllBlogPosts(): Promise<any[]> {
  console.log('🔍 Fetching all blog posts from Sanity...');
  
  const query = `
    *[_type == "blogPost"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      status,
      excerpt,
      publishedDate,
      quickAnswer,
      voiceSearchQueries,
      quickStats,
      content,
      faqs,
      localSEO,
      featuredImage {
        asset,
        alt
      },
      category,
      tags,
      seo,
      ctaSettings,
      author,
      updatedDate,
      _createdAt,
      _updatedAt
    }
  `;

  try {
    const posts = await client.fetch(query);
    console.log(`✅ Fetched ${posts.length} blog posts`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    throw error;
  }
}

function analyzeAllFields(posts: any[]): FieldAnalysis[] {
  console.log('📊 Analyzing field completeness...');

  const fieldMappings = [
    // Basic fields
    { path: 'title', name: 'Title' },
    { path: 'slug.current', name: 'Slug' },
    { path: 'status', name: 'Status' },
    { path: 'excerpt', name: 'Excerpt' },
    { path: 'publishedDate', name: 'Published Date' },
    
    // AI/Voice Search fields
    { path: 'quickAnswer', name: 'Quick Answer (Critical for Featured Snippets)' },
    { path: 'voiceSearchQueries', name: 'Voice Search Queries' },
    { path: 'quickStats', name: 'Quick Stats Box' },
    
    // Content
    { path: 'content', name: 'Main Content' },
    { path: 'faqs', name: 'FAQs (Critical for Voice Search)' },
    
    // Local SEO
    { path: 'localSEO.targetLocation', name: 'Target Location' },
    { path: 'localSEO.nearbyLandmarks', name: 'Nearby Landmarks' },
    { path: 'localSEO.localModifiers', name: 'Local Search Modifiers' },
    
    // SEO fields
    { path: 'featuredImage', name: 'Featured Image' },
    { path: 'featuredImage.alt', name: 'Featured Image Alt Text' },
    { path: 'category', name: 'Category' },
    { path: 'tags', name: 'Tags' },
    { path: 'seo.metaTitle', name: 'Meta Title' },
    { path: 'seo.metaDescription', name: 'Meta Description' },
    { path: 'seo.keywords', name: 'SEO Keywords' },
    
    // CTA settings
    { path: 'ctaSettings.primaryCTA', name: 'Primary CTA' },
    { path: 'ctaSettings.whatsappMessage', name: 'WhatsApp Message' },
    { path: 'ctaSettings.urgency', name: 'CTA Urgency Level' },
    
    // Meta
    { path: 'author', name: 'Author' },
    { path: 'updatedDate', name: 'Updated Date' },
  ];

  return fieldMappings.map(field => 
    analyzeField(posts, field.path, field.name)
  );
}

function analyzeIndividualPosts(posts: any[]): PostAnalysis[] {
  console.log('🔍 Analyzing individual posts...');

  return posts.map(post => {
    const missingFields: string[] = [];
    const incompleteFields: string[] = [];

    // Check basic required fields
    if (isFieldEmpty(post.title)) missingFields.push('title');
    if (isFieldEmpty(post.slug?.current)) missingFields.push('slug');
    if (isFieldEmpty(post.excerpt)) missingFields.push('excerpt');
    if (isFieldEmpty(post.publishedDate)) missingFields.push('publishedDate');

    // Check critical SEO fields
    if (isFieldEmpty(post.quickAnswer)) missingFields.push('quickAnswer (CRITICAL)');
    if (isFieldEmpty(post.featuredImage)) missingFields.push('featuredImage');
    if (isFieldEmpty(post.featuredImage?.alt)) missingFields.push('featuredImage alt text');
    if (isFieldEmpty(post.category)) missingFields.push('category');

    // Check AI/Voice fields
    if (isFieldEmpty(post.voiceSearchQueries)) incompleteFields.push('voiceSearchQueries');
    if (isFieldEmpty(post.quickStats)) incompleteFields.push('quickStats');
    if (isFieldEmpty(post.faqs)) missingFields.push('faqs (CRITICAL for Voice Search)');

    // Check Local SEO
    if (isFieldEmpty(post.localSEO?.targetLocation)) incompleteFields.push('localSEO.targetLocation');
    if (isFieldEmpty(post.localSEO?.nearbyLandmarks)) incompleteFields.push('localSEO.nearbyLandmarks');

    // Check CTA settings
    if (isFieldEmpty(post.ctaSettings?.primaryCTA)) incompleteFields.push('ctaSettings.primaryCTA');
    if (isFieldEmpty(post.ctaSettings?.whatsappMessage)) incompleteFields.push('ctaSettings.whatsappMessage');
    if (isFieldEmpty(post.ctaSettings?.urgency)) incompleteFields.push('ctaSettings.urgency');

    // Check Meta
    if (isFieldEmpty(post.author)) incompleteFields.push('author');
    if (isFieldEmpty(post.tags) || (Array.isArray(post.tags) && post.tags.length === 0)) {
      incompleteFields.push('tags');
    }

    // Check SEO metadata
    if (isFieldEmpty(post.seo?.keywords)) incompleteFields.push('seo.keywords');

    return {
      slug: post.slug?.current || 'unknown-slug',
      title: post.title || 'Untitled',
      status: post.status || 'unknown',
      missingFields,
      incompleteFields,
      totalMissingCount: missingFields.length + incompleteFields.length
    };
  });
}

function generateCriticalIssues(fieldAnalysis: FieldAnalysis[], postAnalysis: PostAnalysis[]): string[] {
  const issues: string[] = [];

  // Check for critical missing fields
  const criticalFields = [
    'Quick Answer (Critical for Featured Snippets)',
    'FAQs (Critical for Voice Search)',
    'Featured Image',
    'Category'
  ];

  criticalFields.forEach(field => {
    const analysis = fieldAnalysis.find(f => f.fieldName === field);
    if (analysis && analysis.percentagePresent < 50) {
      issues.push(`${field} is missing in ${analysis.missing} posts (${analysis.percentagePresent.toFixed(1)}% complete)`);
    }
  });

  // Check for posts with many missing fields
  const postsWithManyIssues = postAnalysis.filter(p => p.totalMissingCount > 8);
  if (postsWithManyIssues.length > 0) {
    issues.push(`${postsWithManyIssues.length} posts have more than 8 missing/incomplete fields`);
  }

  // Check for published posts without critical fields
  const publishedPostsWithIssues = postAnalysis.filter(p => 
    p.status === 'published' && 
    (p.missingFields.includes('quickAnswer (CRITICAL)') || p.missingFields.includes('faqs (CRITICAL for Voice Search)'))
  );
  
  if (publishedPostsWithIssues.length > 0) {
    issues.push(`${publishedPostsWithIssues.length} published posts are missing critical SEO fields (quickAnswer or FAQs)`);
  }

  return issues;
}

function generateRecommendations(fieldAnalysis: FieldAnalysis[], postAnalysis: PostAnalysis[]): string[] {
  const recommendations: string[] = [];

  // Priority recommendations based on analysis
  recommendations.push('IMMEDIATE ACTIONS:');
  
  const quickAnswerAnalysis = fieldAnalysis.find(f => f.fieldName === 'Quick Answer (Critical for Featured Snippets)');
  if (quickAnswerAnalysis && quickAnswerAnalysis.percentagePresent < 80) {
    recommendations.push(`• Add Quick Answer to ${quickAnswerAnalysis.missing} posts - this is CRITICAL for featured snippets`);
  }

  const faqAnalysis = fieldAnalysis.find(f => f.fieldName === 'FAQs (Critical for Voice Search)');
  if (faqAnalysis && faqAnalysis.percentagePresent < 80) {
    recommendations.push(`• Add FAQs to ${faqAnalysis.missing} posts - essential for voice search optimization`);
  }

  recommendations.push('');
  recommendations.push('HIGH PRIORITY:');
  
  const featuredImageAnalysis = fieldAnalysis.find(f => f.fieldName === 'Featured Image');
  if (featuredImageAnalysis && featuredImageAnalysis.percentagePresent < 90) {
    recommendations.push(`• Add featured images to ${featuredImageAnalysis.missing} posts`);
  }

  const categoryAnalysis = fieldAnalysis.find(f => f.fieldName === 'Category');
  if (categoryAnalysis && categoryAnalysis.percentagePresent < 90) {
    recommendations.push(`• Assign categories to ${categoryAnalysis.missing} posts`);
  }

  recommendations.push('');
  recommendations.push('MEDIUM PRIORITY:');
  
  const voiceSearchAnalysis = fieldAnalysis.find(f => f.fieldName === 'Voice Search Queries');
  if (voiceSearchAnalysis && voiceSearchAnalysis.percentagePresent < 70) {
    recommendations.push(`• Add voice search queries to ${voiceSearchAnalysis.missing} posts`);
  }

  const quickStatsAnalysis = fieldAnalysis.find(f => f.fieldName === 'Quick Stats Box');
  if (quickStatsAnalysis && quickStatsAnalysis.percentagePresent < 70) {
    recommendations.push(`• Add quick stats to ${quickStatsAnalysis.missing} posts for AI Overview optimization`);
  }

  const localSEOAnalysis = fieldAnalysis.find(f => f.fieldName === 'Target Location');
  if (localSEOAnalysis && localSEOAnalysis.percentagePresent < 80) {
    recommendations.push(`• Complete local SEO fields for ${localSEOAnalysis.missing} posts`);
  }

  recommendations.push('');
  recommendations.push('WORKFLOW IMPROVEMENTS:');
  recommendations.push('• Create content templates with required fields checklist');
  recommendations.push('• Implement validation rules in Sanity Studio');
  recommendations.push('• Set up automated reminders for missing critical fields');
  recommendations.push('• Create bulk editing workflows for common missing fields');

  return recommendations;
}

async function performAnalysis(): Promise<SchemaAnalysis> {
  console.log('🚀 Starting comprehensive blog schema analysis...');
  
  const posts = await fetchAllBlogPosts();
  
  const analysis: SchemaAnalysis = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    draftPosts: posts.filter(p => p.status === 'draft').length,
    fieldAnalysis: analyzeAllFields(posts),
    postAnalysis: analyzeIndividualPosts(posts),
    criticalIssues: [],
    recommendations: []
  };

  analysis.criticalIssues = generateCriticalIssues(analysis.fieldAnalysis, analysis.postAnalysis);
  analysis.recommendations = generateRecommendations(analysis.fieldAnalysis, analysis.postAnalysis);

  return analysis;
}

function formatReport(analysis: SchemaAnalysis): string {
  const report = [];
  
  report.push('# COMPREHENSIVE BLOG SCHEMA ANALYSIS REPORT');
  report.push(`Generated: ${new Date().toISOString()}`);
  report.push('');
  
  // Executive Summary
  report.push('## EXECUTIVE SUMMARY');
  report.push(`- Total Posts: ${analysis.totalPosts}`);
  report.push(`- Published Posts: ${analysis.publishedPosts}`);
  report.push(`- Draft Posts: ${analysis.draftPosts}`);
  report.push(`- Critical Issues Found: ${analysis.criticalIssues.length}`);
  report.push('');
  
  // Critical Issues
  if (analysis.criticalIssues.length > 0) {
    report.push('## 🚨 CRITICAL ISSUES');
    analysis.criticalIssues.forEach(issue => {
      report.push(`- ${issue}`);
    });
    report.push('');
  }

  // Recommendations
  report.push('## 📋 RECOMMENDATIONS');
  analysis.recommendations.forEach(rec => {
    report.push(rec);
  });
  report.push('');

  // Field Analysis
  report.push('## 📊 FIELD COMPLETENESS ANALYSIS');
  report.push('| Field Name | Present | Missing | % Complete | Sample Values |');
  report.push('|------------|---------|---------|------------|---------------|');
  
  analysis.fieldAnalysis
    .sort((a, b) => a.percentagePresent - b.percentagePresent)
    .forEach(field => {
      const sampleValues = field.sampleValues?.slice(0, 2)
        .map(val => typeof val === 'string' ? `"${val.substring(0, 20)}..."` : JSON.stringify(val).substring(0, 20))
        .join(', ') || 'N/A';
      
      report.push(`| ${field.fieldName} | ${field.present} | ${field.missing} | ${field.percentagePresent.toFixed(1)}% | ${sampleValues} |`);
    });
  
  report.push('');

  // Most Problematic Posts
  report.push('## 🔍 POSTS WITH MOST MISSING DATA');
  report.push('| Post Title | Status | Missing Fields | Incomplete Fields | Total Issues |');
  report.push('|------------|--------|----------------|-------------------|--------------|');
  
  analysis.postAnalysis
    .sort((a, b) => b.totalMissingCount - a.totalMissingCount)
    .slice(0, 20)
    .forEach(post => {
      report.push(`| ${post.title.substring(0, 30)}... | ${post.status} | ${post.missingFields.length} | ${post.incompleteFields.length} | ${post.totalMissingCount} |`);
    });

  report.push('');

  // Detailed Missing Fields by Post
  report.push('## 📝 DETAILED MISSING FIELDS BY POST');
  analysis.postAnalysis
    .filter(post => post.totalMissingCount > 0)
    .sort((a, b) => b.totalMissingCount - a.totalMissingCount)
    .forEach(post => {
      report.push(`### ${post.title} (${post.status})`);
      report.push(`**Slug:** ${post.slug}`);
      
      if (post.missingFields.length > 0) {
        report.push('**Missing (Required):**');
        post.missingFields.forEach(field => {
          report.push(`- ${field}`);
        });
      }
      
      if (post.incompleteFields.length > 0) {
        report.push('**Incomplete (Recommended):**');
        post.incompleteFields.forEach(field => {
          report.push(`- ${field}`);
        });
      }
      
      report.push('');
    });

  return report.join('\n');
}

// Main execution
async function main() {
  try {
    console.log('🔧 Starting blog schema analysis...');
    
    const analysis = await performAnalysis();
    const report = formatReport(analysis);
    
    // Save report to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `/Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/blog-schema-analysis-${timestamp}.md`;
    
    writeFileSync(filename, report);
    
    console.log('');
    console.log('✅ Analysis Complete!');
    console.log(`📄 Report saved to: ${filename}`);
    console.log('');
    console.log('📊 QUICK SUMMARY:');
    console.log(`- Total Posts: ${analysis.totalPosts}`);
    console.log(`- Published: ${analysis.publishedPosts}, Drafts: ${analysis.draftPosts}`);
    console.log(`- Critical Issues: ${analysis.criticalIssues.length}`);
    
    // Show top 3 most incomplete fields
    const topIncompleteFields = analysis.fieldAnalysis
      .sort((a, b) => a.percentagePresent - b.percentagePresent)
      .slice(0, 3);
      
    console.log('\n🚨 Most Incomplete Fields:');
    topIncompleteFields.forEach((field, index) => {
      console.log(`${index + 1}. ${field.fieldName}: ${field.percentagePresent.toFixed(1)}% complete (${field.missing} missing)`);
    });

    // Show posts with most issues
    const topProblematicPosts = analysis.postAnalysis
      .sort((a, b) => b.totalMissingCount - a.totalMissingCount)
      .slice(0, 3);
      
    console.log('\n📝 Posts with Most Missing Data:');
    topProblematicPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}" (${post.totalMissingCount} issues)`);
    });
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

// Run the analysis
if (require.main === module) {
  main();
}

export { main as analyzeBlogSchemas };