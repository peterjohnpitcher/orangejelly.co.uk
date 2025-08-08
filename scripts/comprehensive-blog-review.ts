#!/usr/bin/env ts-node

import { writeClient } from '../src/lib/sanity.write-client';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Interface for blog post content
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  content: any[];
  status: string;
  quickAnswer?: string;
  excerpt?: string;
  faqs?: Array<{
    question: string;
    answer: string;
    _key?: string;
  }>;
}

// Interface for detected issues
interface Issue {
  field: string;
  blockIndex?: number;
  text: string;
  context: string;
  issueType: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  suggested_fix?: string;
}

// Interface for post report
interface PostReport {
  postId: string;
  title: string;
  slug: string;
  issues: Issue[];
  fixesApplied: boolean;
  errors: string[];
}

// Interface for overall report
interface ComprehensiveReport {
  totalPosts: number;
  postsProcessed: number;
  postsWithIssues: number;
  totalIssues: number;
  issuesByType: { [key: string]: number };
  issuesBySeverity: { [key: string]: number };
  postReports: PostReport[];
  generatedAt: string;
}

// Common pub names to detect (not including The Anchor which is legitimate)
const COMMON_PUB_NAMES = [
  // Traditional names
  'The Red Lion', 'The White Horse', 'The Crown', 'The Royal Oak', 'The George',
  'The Bull', 'The Ship', 'The Coach', 'The Swan', 'The Fox', 'The King\'s Head',
  'The Queen\'s Head', 'The Rose and Crown', 'The White Hart', 'The Black Horse',
  'The Golden Lion', 'The Lamb', 'The Plough', 'The Cross Keys', 'The Duke',
  'The Prince', 'The Star', 'The Bell', 'The Three Horseshoes', 'The Eagle',
  'The Falcon', 'The Hare', 'The Stag', 'The Unicorn', 'The Phoenix',
  
  // Place-based names
  'The Railway', 'The Station', 'The Bridge', 'The Castle', 'The Manor',
  'The Mill', 'The Old Mill', 'The Windmill', 'The Blacksmith', 'The Corner',
  'The Market', 'The Village', 'The Green Man', 'The Wheatsheaf', 'The Chequers',
  
  // Regional variants
  'The Ship Inn', 'The Crown Inn', 'The Rose Inn', 'The Bull Inn',
  'The White Lion', 'The Black Bull', 'The Golden Eagle', 'The Silver Fox',
  
  // Modern names
  'The Tavern', 'The Local', 'The Junction', 'The Hub', 'The Social',
  'The Lounge', 'The Bar', 'The Tap', 'The House', 'The Room'
];

// Patterns for false claims detection
const FALSE_CLAIM_PATTERNS = [
  // Direct client number claims
  {
    pattern: /(hundreds?|dozens?|many|several|multiple|numerous)\s+(of\s+)?pubs?/gi,
    type: 'CLIENT_NUMBERS',
    severity: 'HIGH' as const,
    description: 'Claims about working with multiple pubs'
  },
  {
    pattern: /(\d+)\s+pubs?\s+(we\'ve\s+)?(worked\s+with|helped|assisted)/gi,
    type: 'CLIENT_NUMBERS',
    severity: 'HIGH' as const,
    description: 'Specific numbers of pub clients'
  },
  
  // Direct work claims
  {
    pattern: /(we\'ve?\s+)?(helped|assisted|worked\s+with)\s+[\w\s]*pubs?/gi,
    type: 'DIRECT_WORK',
    severity: 'HIGH' as const,
    description: 'Claims about helping multiple pubs'
  },
  {
    pattern: /(our\s+)?(clients?|customers?)\s+(have|achieved|saw|experienced)/gi,
    type: 'DIRECT_WORK',
    severity: 'HIGH' as const,
    description: 'Claims about client results'
  },
  {
    pattern: /(we\'ve?\s+)?(increased|achieved|grew|delivered|improved)/gi,
    type: 'DIRECT_RESULTS',
    severity: 'HIGH' as const,
    description: 'Claims about achieving results for clients'
  },
  
  // Experience claims
  {
    pattern: /(in\s+our\s+experience|we\'ve?\s+seen|from\s+our\s+work)/gi,
    type: 'EXPERIENCE_CLAIMS',
    severity: 'MEDIUM' as const,
    description: 'Claims about broader experience'
  },
  {
    pattern: /(working\s+with|helping)\s+[\w\s]*pubs?\s+(across|throughout|in)/gi,
    type: 'EXPERIENCE_CLAIMS',
    severity: 'MEDIUM' as const,
    description: 'Claims about geographic reach'
  },
  
  // Case study markers
  {
    pattern: /(case\s+study|success\s+story)(?!\s*:?\s*(the\s+anchor|industry\s+example))/gi,
    type: 'CASE_STUDY',
    severity: 'MEDIUM' as const,
    description: 'Unmarked case studies (should specify if industry example)'
  },
  
  // Subtle implications
  {
    pattern: /(one\s+of\s+our\s+pubs?|a\s+pub\s+we\s+worked?\s+with)/gi,
    type: 'SUBTLE_CLAIMS',
    severity: 'MEDIUM' as const,
    description: 'Subtle implications of multiple clients'
  },
  {
    pattern: /(another\s+pub|other\s+pubs?)\s+(we|that)/gi,
    type: 'SUBTLE_CLAIMS',
    severity: 'MEDIUM' as const,
    description: 'References to other pubs as clients'
  },
  
  // Success metrics without context
  {
    pattern: /(increased|improved|achieved|delivered)\s+[\d%]+/gi,
    type: 'UNCONTEXTUALIZED_METRICS',
    severity: 'LOW' as const,
    description: 'Success metrics without clear attribution'
  }
];

// Function to extract all text from content blocks
function extractAllText(content: any[]): string {
  let allText = '';
  
  if (!content || !Array.isArray(content)) return allText;
  
  for (const block of content) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text && typeof child.text === 'string') {
          allText += child.text + ' ';
        }
      }
    }
  }
  
  return allText;
}

// Function to get surrounding context for a match
function getContext(text: string, matchIndex: number, matchLength: number, contextLength = 100): string {
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + matchLength + contextLength);
  
  let context = text.substring(start, end);
  
  // Add ellipses if truncated
  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';
  
  return context.trim();
}

// Function to check if text is about The Anchor (legitimate)
function isAboutAnchor(context: string): boolean {
  const anchorKeywords = [
    'the anchor', 'anchor pub', 'billy', 'peter', 'our pub',
    'my pub', 'this pub', 'the pub'
  ];
  
  const lowerContext = context.toLowerCase();
  return anchorKeywords.some(keyword => lowerContext.includes(keyword));
}

// Function to detect pub names in text
function detectPubNames(text: string): Issue[] {
  const issues: Issue[] = [];
  
  for (const pubName of COMMON_PUB_NAMES) {
    const regex = new RegExp(`\\b${pubName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = Array.from(text.matchAll(regex));
    
    for (const match of matches) {
      if (match.index !== undefined) {
        const context = getContext(text, match.index, match[0].length);
        
        // Skip if it's clearly marked as an example or hypothetical
        if (context.toLowerCase().includes('example') || 
            context.toLowerCase().includes('hypothetical') ||
            context.toLowerCase().includes('imagine') ||
            context.toLowerCase().includes('typical')) {
          continue;
        }
        
        issues.push({
          field: 'content',
          text: match[0],
          context: context,
          issueType: 'PUB_NAME',
          severity: 'HIGH',
          suggested_fix: `Replace "${match[0]}" with "a typical pub" or similar generic reference`
        });
      }
    }
  }
  
  return issues;
}

// Function to detect false claim patterns
function detectFalseClaims(text: string, field: string): Issue[] {
  const issues: Issue[] = [];
  
  for (const pattern of FALSE_CLAIM_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern.pattern));
    
    for (const match of matches) {
      if (match.index !== undefined) {
        const context = getContext(text, match.index, match[0].length);
        
        // Skip if it's clearly about The Anchor
        if (isAboutAnchor(context)) {
          continue;
        }
        
        // Skip if it's marked as industry research or example
        if (context.toLowerCase().includes('industry research') ||
            context.toLowerCase().includes('industry data') ||
            context.toLowerCase().includes('industry example') ||
            context.toLowerCase().includes('research shows') ||
            context.toLowerCase().includes('studies show')) {
          continue;
        }
        
        issues.push({
          field: field,
          text: match[0],
          context: context,
          issueType: pattern.type,
          severity: pattern.severity,
          suggested_fix: getSuggestedFix(match[0], pattern.type)
        });
      }
    }
  }
  
  return issues;
}

// Function to get suggested fix for different issue types
function getSuggestedFix(text: string, issueType: string): string {
  switch (issueType) {
    case 'CLIENT_NUMBERS':
      return 'Replace with "industry research shows" or "The Anchor\'s experience demonstrates"';
    case 'DIRECT_WORK':
      return 'Replace with "industry examples show" or reference The Anchor specifically';
    case 'DIRECT_RESULTS':
      return 'Replace with "industry data shows pubs achieving" or "The Anchor achieved"';
    case 'EXPERIENCE_CLAIMS':
      return 'Replace with "industry research indicates" or "according to pub industry studies"';
    case 'CASE_STUDY':
      return 'Clarify as "Industry Example:" or "The Anchor Case Study:"';
    case 'SUBTLE_CLAIMS':
      return 'Replace with generic pub references or specify The Anchor';
    case 'PUB_NAME':
      return 'Replace with generic description like "a typical pub" or "a local pub"';
    default:
      return 'Review and clarify the claim\'s attribution';
  }
}

// Function to process a single field of text
function processTextField(text: string, field: string): Issue[] {
  if (!text || typeof text !== 'string') return [];
  
  const issues: Issue[] = [];
  
  // Detect pub names
  issues.push(...detectPubNames(text));
  
  // Detect false claim patterns
  issues.push(...detectFalseClaims(text, field));
  
  return issues;
}

// Function to process content blocks
function processContentBlocks(content: any[], field: string = 'content'): Issue[] {
  const issues: Issue[] = [];
  
  if (!content || !Array.isArray(content)) return issues;
  
  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text && typeof child.text === 'string') {
          const blockIssues = processTextField(child.text, field);
          
          // Add block index to issues
          blockIssues.forEach(issue => {
            issue.blockIndex = i;
          });
          
          issues.push(...blockIssues);
        }
      }
    }
  }
  
  return issues;
}

// Function to apply automatic fixes
async function applyAutomaticFixes(post: BlogPost, issues: Issue[]): Promise<boolean> {
  // For now, we'll be conservative and only apply very safe fixes
  // Most issues will be flagged for manual review
  
  const mutations: any[] = [];
  let hasChanges = false;
  
  try {
    // We could implement safe automatic fixes here, but for this comprehensive review
    // we'll focus on detection and reporting rather than automatic changes
    // This ensures we don't accidentally change legitimate content
    
    if (mutations.length > 0) {
      for (const mutation of mutations) {
        await writeClient.patch(mutation.patch.id).set(mutation.patch.set).commit();
      }
      hasChanges = true;
    }
    
    return hasChanges;
  } catch (error) {
    console.error(`Error applying fixes to "${post.title}":`, error);
    return false;
  }
}

// Function to process a single blog post
async function processBlogPost(post: BlogPost): Promise<PostReport> {
  const report: PostReport = {
    postId: post._id,
    title: post.title,
    slug: post.slug.current,
    issues: [],
    fixesApplied: false,
    errors: []
  };
  
  console.log(`\n🔍 Analyzing: "${post.title}" (${post.slug.current})`);
  
  try {
    // Process main content blocks
    if (post.content) {
      const contentIssues = processContentBlocks(post.content, 'content');
      report.issues.push(...contentIssues);
    }
    
    // Process quick answer
    if (post.quickAnswer) {
      const quickAnswerIssues = processTextField(post.quickAnswer, 'quickAnswer');
      report.issues.push(...quickAnswerIssues);
    }
    
    // Process excerpt
    if (post.excerpt) {
      const excerptIssues = processTextField(post.excerpt, 'excerpt');
      report.issues.push(...excerptIssues);
    }
    
    // Process FAQs
    if (post.faqs && Array.isArray(post.faqs)) {
      for (let i = 0; i < post.faqs.length; i++) {
        const faq = post.faqs[i];
        
        if (faq.question) {
          const questionIssues = processTextField(faq.question, `faqs[${i}].question`);
          report.issues.push(...questionIssues);
        }
        
        if (faq.answer) {
          const answerIssues = processTextField(faq.answer, `faqs[${i}].answer`);
          report.issues.push(...answerIssues);
        }
      }
    }
    
    // Apply automatic fixes if requested (currently disabled for safety)
    if (report.issues.length > 0 && false) { // Set to true to enable auto-fixes
      report.fixesApplied = await applyAutomaticFixes(post, report.issues);
    }
    
    if (report.issues.length > 0) {
      console.log(`  ⚠️  Found ${report.issues.length} potential issue(s)`);
      
      // Show high severity issues immediately
      const highSeverityIssues = report.issues.filter(i => i.severity === 'HIGH');
      if (highSeverityIssues.length > 0) {
        console.log(`  🚨 ${highSeverityIssues.length} HIGH SEVERITY issues found!`);
        highSeverityIssues.forEach((issue, index) => {
          console.log(`    ${index + 1}. ${issue.issueType}: "${issue.text}"`);
          console.log(`       Context: ${issue.context.substring(0, 100)}...`);
        });
      }
    } else {
      console.log(`  ✅ No issues detected`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing "${post.title}":`, error);
    report.errors.push(`Processing error: ${error}`);
  }
  
  return report;
}

// Function to generate detailed report file
function generateReportFile(report: ComprehensiveReport): void {
  const reportPath = path.join(__dirname, '..', `comprehensive-blog-review-${Date.now()}.json`);
  
  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  } catch (error) {
    console.error('❌ Error saving report file:', error);
  }
}

// Function to print summary report
function printSummaryReport(report: ComprehensiveReport): void {
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE BLOG REVIEW REPORT');
  console.log('='.repeat(80));
  
  console.log(`\n📈 OVERALL STATISTICS:`);
  console.log(`   Total blog posts in Sanity: ${report.totalPosts}`);
  console.log(`   Posts processed: ${report.postsProcessed}`);
  console.log(`   Posts with issues: ${report.postsWithIssues}`);
  console.log(`   Total issues found: ${report.totalIssues}`);
  console.log(`   Generated at: ${report.generatedAt}`);
  
  console.log(`\n🚨 ISSUES BY SEVERITY:`);
  Object.entries(report.issuesBySeverity)
    .sort(([,a], [,b]) => b - a)
    .forEach(([severity, count]) => {
      const emoji = severity === 'HIGH' ? '🔴' : severity === 'MEDIUM' ? '🟡' : '🟢';
      console.log(`   ${emoji} ${severity}: ${count}`);
    });
  
  console.log(`\n📋 ISSUES BY TYPE:`);
  Object.entries(report.issuesByType)
    .sort(([,a], [,b]) => b - a)
    .forEach(([type, count]) => {
      console.log(`   ${count}x ${type}`);
    });
  
  console.log(`\n📝 POSTS WITH ISSUES:`);
  console.log('-'.repeat(60));
  
  const postsWithIssues = report.postReports.filter(p => p.issues.length > 0);
  
  if (postsWithIssues.length === 0) {
    console.log('🎉 No issues found in any blog posts!');
  } else {
    postsWithIssues.forEach((postReport, index) => {
      console.log(`\n${index + 1}. "${postReport.title}" (/${postReport.slug})`);
      console.log(`   Post ID: ${postReport.postId}`);
      console.log(`   Issues: ${postReport.issues.length}`);
      
      // Group issues by severity
      const highIssues = postReport.issues.filter(i => i.severity === 'HIGH');
      const mediumIssues = postReport.issues.filter(i => i.severity === 'MEDIUM');
      const lowIssues = postReport.issues.filter(i => i.severity === 'LOW');
      
      if (highIssues.length > 0) {
        console.log(`   🔴 HIGH (${highIssues.length}):`);
        highIssues.forEach((issue, i) => {
          console.log(`      ${i + 1}. ${issue.issueType}: "${issue.text}"`);
          console.log(`         Field: ${issue.field}${issue.blockIndex !== undefined ? ` (block ${issue.blockIndex})` : ''}`);
          console.log(`         Context: ${issue.context.substring(0, 120)}${issue.context.length > 120 ? '...' : ''}`);
          if (issue.suggested_fix) {
            console.log(`         Fix: ${issue.suggested_fix}`);
          }
        });
      }
      
      if (mediumIssues.length > 0) {
        console.log(`   🟡 MEDIUM (${mediumIssues.length}):`);
        mediumIssues.slice(0, 3).forEach((issue, i) => { // Show max 3 for brevity
          console.log(`      ${i + 1}. ${issue.issueType}: "${issue.text}"`);
          console.log(`         Context: ${issue.context.substring(0, 100)}...`);
        });
        if (mediumIssues.length > 3) {
          console.log(`      ... and ${mediumIssues.length - 3} more medium issues`);
        }
      }
      
      if (lowIssues.length > 0) {
        console.log(`   🟢 LOW (${lowIssues.length}): Review for context and accuracy`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('🔑 KEY REMINDERS:');
  console.log('   • Orange Jelly has ONLY worked with The Anchor');
  console.log('   • First external client starts September 2025');
  console.log('   • All claims should reference The Anchor or industry research');
  console.log('   • Case studies should be clearly marked as "Industry Example"');
  console.log('   • Success stories should attribute to The Anchor or industry data');
  console.log('='.repeat(80));
  
  if (postsWithIssues.length > 0) {
    console.log('\n⚠️  NEXT STEPS:');
    console.log('   1. Review HIGH severity issues immediately');
    console.log('   2. Consider applying suggested fixes');
    console.log('   3. Run the script again after making changes');
    console.log('   4. Check the detailed JSON report for full context');
  } else {
    console.log('\n🎉 All blog posts appear to be compliant!');
  }
}

// Main function
async function comprehensiveBlogReview() {
  console.log('🚀 Starting COMPREHENSIVE blog post review...\n');
  console.log('This will check EVERY blog post for false claims about multiple clients.\n');
  
  const startTime = Date.now();
  
  try {
    // Check if we have read access
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required');
    }
    
    // Fetch ALL blog posts
    console.log('📖 Fetching ALL blog posts from Sanity...');
    
    const query = `
      *[_type == "blogPost"] | order(title asc) {
        _id,
        title,
        "slug": slug,
        content,
        status,
        quickAnswer,
        excerpt,
        faqs
      }
    `;
    
    const posts: BlogPost[] = await writeClient.fetch(query);
    console.log(`Found ${posts.length} blog posts total`);
    
    if (posts.length === 0) {
      console.log('❌ No blog posts found in Sanity. Check your configuration.');
      return;
    }
    
    // Initialize report
    const report: ComprehensiveReport = {
      totalPosts: posts.length,
      postsProcessed: 0,
      postsWithIssues: 0,
      totalIssues: 0,
      issuesByType: {},
      issuesBySeverity: { HIGH: 0, MEDIUM: 0, LOW: 0 },
      postReports: [],
      generatedAt: new Date().toISOString()
    };
    
    // Process each post
    console.log(`\n🔍 Processing ${posts.length} blog posts...`);
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`\n[${i + 1}/${posts.length}] Processing "${post.title}"`);
      
      const postReport = await processBlogPost(post);
      report.postReports.push(postReport);
      report.postsProcessed++;
      
      if (postReport.issues.length > 0) {
        report.postsWithIssues++;
        report.totalIssues += postReport.issues.length;
        
        // Count issues by type and severity
        postReport.issues.forEach(issue => {
          report.issuesByType[issue.issueType] = (report.issuesByType[issue.issueType] || 0) + 1;
          report.issuesBySeverity[issue.severity]++;
        });
      }
      
      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log(`\n⏱️  Processing completed in ${duration} seconds`);
    
    // Print summary report
    printSummaryReport(report);
    
    // Generate detailed JSON report
    generateReportFile(report);
    
    console.log('\n✅ Comprehensive blog review completed successfully!');
    
    // Exit with appropriate code
    if (report.issuesBySeverity.HIGH > 0) {
      console.log('\n🚨 HIGH SEVERITY ISSUES FOUND - Review immediately!');
      process.exit(1);
    } else if (report.totalIssues > 0) {
      console.log('\n⚠️  Some issues found - Review when convenient');
      process.exit(0);
    } else {
      console.log('\n🎉 No issues found - All clear!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Error during comprehensive blog review:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  comprehensiveBlogReview();
}

export { comprehensiveBlogReview, processBlogPost };