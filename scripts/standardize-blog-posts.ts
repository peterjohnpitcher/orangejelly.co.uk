#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Generate a unique key for array items
function generateKey(prefix: string, index: number): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${index}_${random}`;
}

// Generate quick answer based on title and content
function generateQuickAnswer(title: string, content: any[]): string {
  const titleLower = title.toLowerCase();

  // Extract key points from content
  const firstParagraph = content.find(
    (block) => block._type === 'block' && block.style === 'normal' && block.children?.[0]?.text
  );

  const contentText = firstParagraph?.children?.[0]?.text || '';

  // Generate contextual quick answers based on title patterns
  if (titleLower.includes('why is my pub empty')) {
    return 'Empty pubs typically struggle with visibility, atmosphere, or value perception. Common fixes include improving social media presence (60,000+ monthly views achievable), running engaging events like quiz nights (25-35 regular attendees), and ensuring competitive pricing aligned with local market expectations.';
  }

  if (titleLower.includes('quiz')) {
    return 'Successful pub quizzes attract 25-35 regular attendees by maintaining consistency, offering appealing prizes, promoting across social media channels, and creating an inclusive atmosphere. Running weekly quizzes can generate £200-300 additional revenue per session.';
  }

  if (titleLower.includes('food')) {
    return 'Pub food success requires achieving 45-55% gross profit margins through portion control, menu engineering, and waste reduction. Focus on signature dishes, source ingredients strategically, and maintain consistent quality to build reputation and repeat custom.';
  }

  if (titleLower.includes('social media') || titleLower.includes('facebook')) {
    return 'Effective pub social media generates 60,000-70,000 monthly views through consistent posting, engaging content, and community interaction. Post daily updates, showcase events, share customer photos, and respond promptly to comments and messages.';
  }

  if (titleLower.includes('marketing')) {
    return 'Pub marketing success combines digital presence (social media, Google My Business) with traditional methods (posters, local partnerships). Focus on building a database of 300+ opted-in customers and maintaining regular communication through multiple channels.';
  }

  if (titleLower.includes('staff') || titleLower.includes('team')) {
    return 'Effective pub staffing requires clear training, regular communication, and performance incentives. Reduce turnover through competitive wages, flexible scheduling, and team building. Proper staffing can save 25 hours weekly through efficient operations.';
  }

  if (titleLower.includes('customer') || titleLower.includes('retention')) {
    return 'Customer retention improves through consistent service quality, personalized engagement, and loyalty programs. Building a database of 300 regular customers and maintaining regular contact can increase visit frequency by 30-40%.';
  }

  if (titleLower.includes('event')) {
    return 'Successful pub events require 3-4 weeks advance planning, multi-channel promotion, and careful execution. Popular events like quiz nights, live music, and tasting evenings can generate £300-500 additional revenue per session.';
  }

  if (titleLower.includes('cellar') || titleLower.includes('wastage')) {
    return 'Proper cellar management maintains 11-13°C temperature, reduces wastage below 5%, and ensures product quality. Regular line cleaning, stock rotation, and monitoring can save £250 weekly through reduced waste.';
  }

  if (titleLower.includes('pricing') || titleLower.includes('price')) {
    return 'Strategic pub pricing balances competitive positioning with profit margins. Aim for 45-55% GP on food, 70% on drinks. Regular price reviews, competitor analysis, and value perception management are essential for profitability.';
  }

  if (
    titleLower.includes('gp') ||
    titleLower.includes('gross profit') ||
    titleLower.includes('margin')
  ) {
    return 'Target gross profit margins are 45-55% for food and 70% for wet sales. Achieve these through portion control, waste reduction, strategic purchasing, and regular margin analysis. Improving GP by 5% can add £20,000 annual profit.';
  }

  if (titleLower.includes('ai') || titleLower.includes('technology')) {
    return 'AI and technology tools save pubs 25 hours weekly through automated social media, menu optimization, and operational efficiency. Implementation costs are minimal compared to time savings and improved decision-making capabilities.';
  }

  if (titleLower.includes('review') || titleLower.includes('reputation')) {
    return 'Online reputation management requires responding to all reviews within 24 hours, encouraging satisfied customers to leave feedback, and addressing complaints constructively. Maintaining 4+ star ratings can increase footfall by 20-30%.';
  }

  if (
    titleLower.includes('quiet') ||
    titleLower.includes('tuesday') ||
    titleLower.includes('midweek')
  ) {
    return 'Quiet midweek periods improve through targeted promotions, regular events, and community engagement. Successful strategies include quiz nights, food offers, and loyalty programs that can increase Tuesday-Thursday revenue by 40%.';
  }

  if (titleLower.includes('supplier')) {
    return 'Effective supplier management involves comparing prices, negotiating terms, and building relationships. Regular reviews, consolidated ordering, and payment term optimization can reduce costs by 10-15% while maintaining quality.';
  }

  if (titleLower.includes('community') || titleLower.includes('local')) {
    return 'Community engagement drives pub success through local partnerships, charity events, and sports team sponsorships. Active community involvement can increase local customer base by 30% and improve reputation significantly.';
  }

  if (
    titleLower.includes('seasonal') ||
    titleLower.includes('christmas') ||
    titleLower.includes('summer')
  ) {
    return 'Seasonal planning requires 6-8 weeks advance preparation, themed promotions, and staffing adjustments. Successful seasonal campaigns can generate 25-40% revenue increases during peak periods through effective planning and execution.';
  }

  if (titleLower.includes('health check') || titleLower.includes('fundamental')) {
    return 'A pub health check assesses key business fundamentals including gross profit margins (target 45-55%), wet/dry sales ratios, customer retention rates, and operational efficiency. Regular health checks identify improvement opportunities worth £20,000-30,000 annually.';
  }

  // Default fallback
  return `This guide provides proven strategies for improving pub performance based on real experience at The Anchor. Implementation typically shows results within 2-4 weeks, with measurable improvements in revenue and customer satisfaction.`;
}

// Generate FAQs based on article title and content
function generateFAQs(title: string, content: any[]): any[] {
  const titleLower = title.toLowerCase();
  const faqs = [];

  // Universal FAQs that apply to most articles
  const universalFAQs = [
    {
      _key: generateKey('faq', 0),
      _type: 'object',
      question: 'How quickly will I see results?',
      answer:
        'Most strategies show initial results within 2-4 weeks. Quiz nights attract regulars immediately, social media engagement grows within days, and operational improvements like GP optimization show impact in the first month. Full transformation typically takes 3-6 months of consistent implementation.',
      isVoiceOptimized: true,
    },
    {
      _key: generateKey('faq', 1),
      _type: 'object',
      question: 'How much will this cost to implement?',
      answer:
        'Implementation costs vary by strategy. Many improvements like social media optimization and operational changes cost nothing beyond time. Events may require £50-200 initial investment. Professional support is available at £75 per hour plus VAT.',
      isVoiceOptimized: true,
    },
    {
      _key: generateKey('faq', 2),
      _type: 'object',
      question: 'Can this work for my type of pub?',
      answer:
        'Yes, these strategies are proven across wet-led, food-led, and hybrid pubs. The key is adapting the approach to your specific circumstances, customer base, and local market. All strategies come from real-world success at The Anchor.',
      isVoiceOptimized: true,
    },
  ];

  // Topic-specific FAQs
  if (titleLower.includes('empty') || titleLower.includes('quiet')) {
    faqs.push(
      {
        _key: generateKey('faq', 3),
        _type: 'object',
        question: 'What is the main reason pubs are empty?',
        answer:
          "The primary cause is usually poor visibility and communication. Customers don't know what's happening at your pub. Secondary factors include atmosphere, value perception, and competition. Fixing visibility through social media and events typically increases footfall by 30-40%.",
        isVoiceOptimized: true,
      },
      {
        _key: generateKey('faq', 4),
        _type: 'object',
        question: 'Which day of the week is usually quietest?',
        answer:
          'Tuesday is typically the quietest day for most pubs, followed by Monday and Wednesday. Combat this with specific midweek offers, regular events like quiz nights, and targeted social media campaigns. The Anchor increased Tuesday revenue by 40% using these strategies.',
        isVoiceOptimized: true,
      }
    );
  }

  if (titleLower.includes('quiz')) {
    faqs.push(
      {
        _key: generateKey('faq', 3),
        _type: 'object',
        question: 'What night is best for a pub quiz?',
        answer:
          "Tuesday or Wednesday typically work best as they boost quiet midweek trade. Avoid Fridays and Saturdays when you're already busy. The Anchor runs successful Tuesday quizzes with 25-35 regular attendees.",
        isVoiceOptimized: true,
      },
      {
        _key: generateKey('faq', 4),
        _type: 'object',
        question: 'How much should quiz prizes cost?',
        answer:
          'Budget £30-50 for prizes. First prize £20-30, second £10-15, third £5-10. This investment typically generates £200-300 additional revenue per quiz night through food and drink sales.',
        isVoiceOptimized: true,
      }
    );
  }

  if (titleLower.includes('food')) {
    faqs.push(
      {
        _key: generateKey('faq', 3),
        _type: 'object',
        question: 'What food GP should a pub aim for?',
        answer:
          'Target 45-55% gross profit on food. The Anchor improved from 58% to 71% through portion control, menu engineering, and waste reduction. This improvement added £15,000 annual profit.',
        isVoiceOptimized: true,
      },
      {
        _key: generateKey('faq', 4),
        _type: 'object',
        question: 'How can I reduce food waste?',
        answer:
          'Implement portion control, improve stock rotation, use prep lists, and monitor waste daily. The Anchor reduced Sunday lunch waste by £250 weekly through better planning and portion management.',
        isVoiceOptimized: true,
      }
    );
  }

  if (titleLower.includes('social media') || titleLower.includes('facebook')) {
    faqs.push(
      {
        _key: generateKey('faq', 3),
        _type: 'object',
        question: 'How often should pubs post on social media?',
        answer:
          'Post daily on Facebook and Instagram. Share opening times, daily specials, events, and customer photos. The Anchor achieves 60,000-70,000 monthly views with consistent daily posting.',
        isVoiceOptimized: true,
      },
      {
        _key: generateKey('faq', 4),
        _type: 'object',
        question: 'Which social media platform is best for pubs?',
        answer:
          'Facebook remains most effective for pubs, especially for the 35+ demographic. Instagram works well for food photos and younger customers. Focus on one platform properly rather than spreading efforts thin.',
        isVoiceOptimized: true,
      }
    );
  }

  if (titleLower.includes('staff') || titleLower.includes('team')) {
    faqs.push(
      {
        _key: generateKey('faq', 3),
        _type: 'object',
        question: 'How can I reduce staff turnover?',
        answer:
          'Offer competitive wages, flexible scheduling, clear training, and regular feedback. Create team incentives and social events. Reducing turnover saves recruitment costs and improves service consistency.',
        isVoiceOptimized: true,
      },
      {
        _key: generateKey('faq', 4),
        _type: 'object',
        question: 'How many staff do I need per shift?',
        answer:
          'Depends on covers and service style. Generally: 1 staff per 20-30 covers for bar service, 1 per 15-20 for table service. Use sales data to optimize rotas and reduce labor costs to 25-30% of revenue.',
        isVoiceOptimized: true,
      }
    );
  }

  // Add universal FAQs at the end
  faqs.push(...universalFAQs);

  // Ensure we have at least 5 FAQs
  while (faqs.length < 5) {
    faqs.push({
      _key: generateKey('faq', faqs.length),
      _type: 'object',
      question: 'Do you offer payment plans?',
      answer:
        'Yes, payment plans are available to help with cash flow. Services are charged at £75 per hour plus VAT. Contact us to discuss a payment arrangement that works for your business.',
      isVoiceOptimized: false,
    });
  }

  return faqs;
}

// Generate voice search queries based on title
function generateVoiceSearchQueries(title: string): string[] {
  const titleLower = title.toLowerCase();
  const queries = [];

  // Base queries that work for most articles
  queries.push(
    `How do I ${titleLower.replace(/^(why|how|what|when|where|should)/, '').trim()}`,
    `What's the best way to ${titleLower.replace(/^(why|how|what|when|where|should)/, '').trim()}`,
    `How can I improve my pub`,
    `Why is my pub struggling`
  );

  // Add specific queries based on topic
  if (titleLower.includes('empty') || titleLower.includes('quiet')) {
    queries.push(
      'Why is my pub empty',
      'How do I get more customers in my pub',
      'What attracts people to pubs',
      'Why is my pub quiet on weekdays'
    );
  }

  if (titleLower.includes('quiz')) {
    queries.push(
      'How do I run a successful pub quiz',
      'What night should I run a quiz',
      'How much should quiz prizes be',
      'How do I promote a pub quiz'
    );
  }

  if (titleLower.includes('food')) {
    queries.push(
      'What GP should pub food be',
      'How do I reduce food waste in my pub',
      'How do I price pub food',
      'What food sells best in pubs'
    );
  }

  if (titleLower.includes('social media')) {
    queries.push(
      'How often should pubs post on Facebook',
      'What should pubs post on social media',
      'How do I get more Facebook followers for my pub',
      'Does social media work for pubs'
    );
  }

  if (titleLower.includes('staff')) {
    queries.push(
      'How do I find good pub staff',
      'How do I train pub staff',
      'How do I reduce staff costs in my pub',
      'How many staff do I need in my pub'
    );
  }

  // Return unique queries (max 10)
  return [...new Set(queries)].slice(0, 10);
}

// Generate quick stats based on article type
function generateQuickStats(title: string): any[] {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('quiz')) {
    return [
      {
        _key: generateKey('stat', 0),
        _type: 'object',
        label: 'Regular Attendees',
        value: '25-35 people',
        highlight: true,
      },
      {
        _key: generateKey('stat', 1),
        _type: 'object',
        label: 'Revenue per Quiz',
        value: '£200-300',
        highlight: false,
      },
      {
        _key: generateKey('stat', 2),
        _type: 'object',
        label: 'Prize Budget',
        value: '£30-50',
        highlight: false,
      },
    ];
  }

  if (titleLower.includes('food')) {
    return [
      {
        _key: generateKey('stat', 0),
        _type: 'object',
        label: 'Target GP',
        value: '45-55%',
        highlight: true,
      },
      {
        _key: generateKey('stat', 1),
        _type: 'object',
        label: 'Waste Reduction',
        value: '£250/week',
        highlight: false,
      },
      {
        _key: generateKey('stat', 2),
        _type: 'object',
        label: 'GP Improvement',
        value: '58% to 71%',
        highlight: false,
      },
    ];
  }

  if (titleLower.includes('social media') || titleLower.includes('facebook')) {
    return [
      {
        _key: generateKey('stat', 0),
        _type: 'object',
        label: 'Monthly Views',
        value: '60,000-70,000',
        highlight: true,
      },
      {
        _key: generateKey('stat', 1),
        _type: 'object',
        label: 'Database Size',
        value: '300 contacts',
        highlight: false,
      },
      {
        _key: generateKey('stat', 2),
        _type: 'object',
        label: 'Time to Results',
        value: '2-4 weeks',
        highlight: false,
      },
    ];
  }

  if (titleLower.includes('empty') || titleLower.includes('quiet')) {
    return [
      {
        _key: generateKey('stat', 0),
        _type: 'object',
        label: 'Footfall Increase',
        value: '30-40%',
        highlight: true,
      },
      {
        _key: generateKey('stat', 1),
        _type: 'object',
        label: 'Time to Impact',
        value: '2-4 weeks',
        highlight: false,
      },
      {
        _key: generateKey('stat', 2),
        _type: 'object',
        label: 'Investment',
        value: '£50-200',
        highlight: false,
      },
    ];
  }

  if (titleLower.includes('health check') || titleLower.includes('fundamental')) {
    return [
      {
        _key: generateKey('stat', 0),
        _type: 'object',
        label: 'Value Added',
        value: '£75,000-100,000',
        highlight: true,
      },
      {
        _key: generateKey('stat', 1),
        _type: 'object',
        label: 'Target GP',
        value: '45-55%',
        highlight: false,
      },
      {
        _key: generateKey('stat', 2),
        _type: 'object',
        label: 'Time Saved',
        value: '25 hours/week',
        highlight: false,
      },
    ];
  }

  // Default stats for other articles
  return [
    {
      _key: generateKey('stat', 0),
      _type: 'object',
      label: 'Implementation',
      value: '2-4 weeks',
      highlight: true,
    },
    {
      _key: generateKey('stat', 1),
      _type: 'object',
      label: 'ROI',
      value: '200-300%',
      highlight: false,
    },
    {
      _key: generateKey('stat', 2),
      _type: 'object',
      label: 'Support',
      value: '£75/hour',
      highlight: false,
    },
  ];
}

// Generate featured image path based on title
function generateFeaturedImagePath(title: string, slug: string): string {
  // Check if we already have an SVG for this article
  const possiblePaths = [
    `/images/blog/${slug}.svg`,
    `/images/blog/${slug}.png`,
    `/images/blog/${slug}.jpg`,
  ];

  // For now, we'll use a default pattern - in production you'd check if these files exist
  return `/images/blog/${slug}.svg`;
}

async function standardizeBlogPosts() {
  console.log('🔄 Starting blog post standardization...\n');

  try {
    // Fetch all blog posts
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedDate desc) {
        _id,
        _rev,
        title,
        slug,
        status,
        excerpt,
        content,
        quickAnswer,
        voiceSearchQueries,
        quickStats,
        faqs,
        featuredImage,
        category,
        publishedDate,
        updatedDate
      }
    `);

    console.log(`Found ${posts.length} blog posts to process\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const post of posts) {
      console.log(`\n📝 Processing: ${post.title}`);
      console.log(`   ID: ${post._id}`);

      const updates: any = {};

      // 1. Add missing quickAnswer
      if (!post.quickAnswer) {
        updates.quickAnswer = generateQuickAnswer(post.title, post.content || []);
        console.log('   ✅ Generated quick answer');
      }

      // 2. Add missing FAQs
      if (!post.faqs || post.faqs.length === 0) {
        updates.faqs = generateFAQs(post.title, post.content || []);
        console.log(`   ✅ Generated ${updates.faqs.length} FAQs`);
      }

      // 3. Add missing voice search queries
      if (!post.voiceSearchQueries || post.voiceSearchQueries.length === 0) {
        updates.voiceSearchQueries = generateVoiceSearchQueries(post.title);
        console.log(`   ✅ Generated ${updates.voiceSearchQueries.length} voice search queries`);
      }

      // 4. Add missing quick stats
      if (!post.quickStats || post.quickStats.length === 0) {
        updates.quickStats = generateQuickStats(post.title);
        console.log(`   ✅ Generated ${updates.quickStats.length} quick stats`);
      }

      // 5. Add featured image path if missing
      if (!post.featuredImage) {
        const slugValue = post.slug?.current || post.title.toLowerCase().replace(/\s+/g, '-');
        updates.featuredImage = generateFeaturedImagePath(post.title, slugValue);
        console.log(`   ✅ Added featured image path: ${updates.featuredImage}`);
      }

      // 6. Set updated date if missing
      if (!post.updatedDate) {
        updates.updatedDate = new Date().toISOString();
        console.log('   ✅ Added updated date');
      }

      // Apply updates if there are any
      if (Object.keys(updates).length > 0) {
        try {
          await client.patch(post._id).set(updates).commit();

          console.log(`   ✅ Successfully updated with ${Object.keys(updates).length} changes`);
          successCount++;
        } catch (error) {
          console.error(`   ❌ Failed to update: ${error}`);
          errorCount++;
        }
      } else {
        console.log('   ℹ️  No updates needed - already complete');
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 STANDARDIZATION COMPLETE');
    console.log('='.repeat(60));
    console.log(`✅ Successfully updated: ${successCount} posts`);
    console.log(`❌ Failed updates: ${errorCount} posts`);
    console.log(`ℹ️  Already complete: ${posts.length - successCount - errorCount} posts`);

    console.log('\n💡 NEXT STEPS:');
    console.log('1. Create actual featured images for each post (SVG or PNG)');
    console.log('2. Review and refine the generated quick answers');
    console.log('3. Customize FAQs based on actual customer questions');
    console.log('4. Fine-tune voice search queries based on search data');
    console.log('5. Update quick stats with actual performance metrics');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Blog Post Standardization Script');
console.log('=====================================');
console.log('This script will:');
console.log('1. Add missing quick answers (for featured snippets)');
console.log('2. Generate FAQs (for voice search)');
console.log('3. Add voice search queries');
console.log('4. Create quick stats boxes');
console.log('5. Add featured image paths');
console.log('6. Update timestamps');
console.log('=====================================\n');

standardizeBlogPosts();
