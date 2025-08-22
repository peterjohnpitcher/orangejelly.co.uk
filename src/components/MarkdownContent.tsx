'use client';

import React from 'react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Custom HTML renderer that preserves the same styling as PortableTextContent
function parseMarkdownToComponents(html: string): React.ReactNode {
  // Create a temporary div to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const processNode = (node: Node, key: number = 0): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const children = Array.from(element.childNodes).map((child, index) => 
        processNode(child, index)
      );
      
      switch (element.tagName.toLowerCase()) {
        case 'h1':
          return <Heading key={key} level={1} className="mt-8 mb-4">{children}</Heading>;
        case 'h2':
          return <Heading key={key} level={2} className="mt-8 mb-4">{children}</Heading>;
        case 'h3':
          return <Heading key={key} level={3} className="mt-6 mb-3">{children}</Heading>;
        case 'h4':
          return <Heading key={key} level={4} className="mt-4 mb-2">{children}</Heading>;
        case 'h5':
          return <Heading key={key} level={5} className="mt-4 mb-2">{children}</Heading>;
        case 'h6':
          return <Heading key={key} level={6} className="mt-4 mb-2">{children}</Heading>;
        case 'p':
          return <Text key={key} className="mb-4">{children}</Text>;
        case 'blockquote':
          return (
            <blockquote key={key} className="border-l-4 border-orange pl-4 italic my-6">
              <Text>{children}</Text>
            </blockquote>
          );
        case 'ul':
          return (
            <ul key={key} className="list-disc list-inside mb-4 space-y-2">
              {children}
            </ul>
          );
        case 'ol':
          return (
            <ol key={key} className="list-decimal list-inside mb-4 space-y-2">
              {children}
            </ol>
          );
        case 'li':
          return (
            <li key={key} className="ml-4 text-charcoal">
              {children}
            </li>
          );
        case 'strong':
        case 'b':
          return <strong key={key} className="font-bold">{children}</strong>;
        case 'em':
        case 'i':
          return <em key={key} className="italic">{children}</em>;
        case 'code':
          if (element.parentElement?.tagName.toLowerCase() === 'pre') {
            // This is a code block, let the pre handle it
            return children;
          }
          return (
            <code key={key} className="bg-gray-100 rounded px-1 py-0.5 text-sm">
              {children}
            </code>
          );
        case 'pre':
          return (
            <pre key={key} className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">
              <code className="text-sm">{children}</code>
            </pre>
          );
        case 'a':
          const href = element.getAttribute('href') || '#';
          const target = href.startsWith('http') ? '_blank' : undefined;
          const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
          return (
            <Link
              key={key}
              href={href}
              target={target}
              rel={rel}
              className="text-orange hover:text-orange-dark underline"
            >
              {children}
            </Link>
          );
        case 'img':
          const src = element.getAttribute('src') || '';
          const alt = element.getAttribute('alt') || '';
          const title = element.getAttribute('title');
          
          return (
            <figure key={key} className="my-8">
              <div className="relative w-full aspect-[4/3]">
                <OptimizedImage
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="rounded-lg object-cover"
                />
              </div>
              {title && (
                <figcaption className="text-center mt-2">
                  <Text size="sm" color="muted">{title}</Text>
                </figcaption>
              )}
            </figure>
          );
        case 'table':
          return (
            <div key={key} className="my-8 overflow-x-auto">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          );
        case 'thead':
          return <thead key={key}>{children}</thead>;
        case 'tbody':
          return <tbody key={key}>{children}</tbody>;
        case 'tr':
          const isHeader = element.parentElement?.tagName.toLowerCase() === 'thead';
          const rowIndex = Array.from(element.parentElement?.children || []).indexOf(element);
          const className = isHeader 
            ? 'bg-orange-light' 
            : rowIndex % 2 === 0 ? 'bg-white' : 'bg-cream';
          return <tr key={key} className={className}>{children}</tr>;
        case 'th':
          return (
            <th key={key} className="border border-charcoal/20 px-4 py-2 text-left font-semibold">
              {children}
            </th>
          );
        case 'td':
          return (
            <td key={key} className="border border-charcoal/20 px-4 py-2">
              {children}
            </td>
          );
        case 'hr':
          return <hr key={key} className="my-8 border-charcoal/20" />;
        case 'br':
          return <br key={key} />;
        default:
          // For unhandled elements, render as div with children
          return <div key={key}>{children}</div>;
      }
    }
    
    return null;
  };
  
  return Array.from(doc.body.childNodes).map((node, index) => 
    processNode(node, index)
  );
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const [processedContent, setProcessedContent] = React.useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function processMarkdown() {
      if (!content) {
        setProcessedContent(null);
        setIsLoading(false);
        return;
      }

      try {
        // Process markdown to HTML
        const result = await remark().use(remarkHtml).process(content);
        const html = result.toString();
        
        // Parse HTML to React components with custom styling
        const components = parseMarkdownToComponents(html);
        setProcessedContent(components);
      } catch (error) {
        console.error('Error processing markdown:', error);
        // Fallback to raw HTML rendering
        setProcessedContent(
          <div dangerouslySetInnerHTML={{ __html: content }} />
        );
      } finally {
        setIsLoading(false);
      }
    }

    processMarkdown();
  }, [content]);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
      </div>
    );
  }

  if (!content || !processedContent) {
    return null;
  }

  return (
    <div className={className}>
      {processedContent}
    </div>
  );
}