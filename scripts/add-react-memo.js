const fs = require('fs');
const path = require('path');

// List of components to add React.memo to
const componentsToMemo = [
  'src/components/Card.tsx',
  'src/components/Heading.tsx',
  'src/components/Grid.tsx',
  'src/components/Section.tsx',
  'src/components/Link.tsx',
  'src/components/Loading.tsx',
  'src/components/ProblemCard.tsx',
  'src/components/ResultCard.tsx',
  'src/components/ServiceCard.tsx',
  'src/components/FAQItem.tsx',
  'src/components/FeatureList.tsx',
  'src/components/Logo.tsx',
  'src/components/TrustBar.tsx',
  'src/components/CTASection.tsx',
  'src/components/WhatsAppButton.tsx',
  'src/components/MobileCTA.tsx',
  'src/components/AnchorBadge.tsx',
  'src/components/blog/AuthorInfo.tsx',
  'src/components/blog/CategoryList.tsx',
  'src/components/blog/RelatedPosts.tsx',
  'src/components/blog/QuickStats.tsx',
  'src/components/blog/QuickAnswer.tsx',
  'src/components/icons/JourneyIcons.tsx',
  'src/components/AggregateRatingSchema.tsx',
  'src/components/BlogPostingSchema.tsx',
];

function addReactMemo(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Skip if already has React.memo
    if (content.includes('memo(') || content.includes('React.memo(')) {
      console.log(`✓ Skipping ${filePath} - already has memo`);
      return;
    }
    
    // Check if it's already importing from react
    const hasReactImport = content.includes("from 'react'");
    const hasDefaultExport = content.includes('export default function');
    
    if (!hasDefaultExport) {
      console.log(`✗ Skipping ${filePath} - no default export function found`);
      return;
    }
    
    // Add memo import
    if (hasReactImport) {
      // Add memo to existing React import
      content = content.replace(
        /import\s*{([^}]+)}\s*from\s*['"]react['"]/,
        (match, imports) => {
          if (!imports.includes('memo')) {
            return `import { ${imports.trim()}, memo } from 'react'`;
          }
          return match;
        }
      );
    } else {
      // Add new import at the beginning
      content = `import { memo } from 'react';\n\n${content}`;
    }
    
    // Replace export default function with memo wrapped version
    content = content.replace(
      /export\s+default\s+function\s+(\w+)/,
      'function $1'
    );
    
    // Add memo export at the end
    const functionNameMatch = content.match(/function\s+(\w+)\s*\(/);
    if (functionNameMatch) {
      const functionName = functionNameMatch[1];
      content = content.trimEnd() + `\n\nexport default memo(${functionName});`;
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`✓ Added React.memo to ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// Process all components
console.log('Adding React.memo to pure components...\n');
componentsToMemo.forEach(addReactMemo);
console.log('\nDone!');