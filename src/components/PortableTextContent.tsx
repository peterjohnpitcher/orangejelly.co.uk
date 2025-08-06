'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.client';

interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  level?: number;
  listItem?: string;
  markDefs?: Array<any>;
}

interface PortableTextImage {
  _type: 'image';
  asset?: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface PortableTextCodeBlock {
  _type: 'codeBlock';
  language?: string;
  code: string;
}

interface PortableTextComparisonTable {
  _type: 'comparisonTable';
  title?: string;
  rows: Array<{
    option: string;
    cost: string;
    time: string;
    results: string;
  }>;
}

type PortableTextValue = PortableTextBlock | PortableTextImage | PortableTextCodeBlock | PortableTextComparisonTable;

interface PortableTextContentProps {
  value: PortableTextValue[];
}

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <Heading level={1} className="mt-8 mb-4">{children}</Heading>,
    h2: ({ children }: { children?: React.ReactNode }) => <Heading level={2} className="mt-8 mb-4">{children}</Heading>,
    h3: ({ children }: { children?: React.ReactNode }) => <Heading level={3} className="mt-6 mb-3">{children}</Heading>,
    h4: ({ children }: { children?: React.ReactNode }) => <Heading level={4} className="mt-4 mb-2">{children}</Heading>,
    normal: ({ children }: { children?: React.ReactNode }) => {
      // Check if the text starts with # (markdown header)
      // Handle both string children and array of children with spans
      let textContent = '';
      
      if (typeof children === 'string') {
        textContent = children;
      } else if (Array.isArray(children)) {
        // Extract text from span elements
        textContent = children.map(child => {
          if (typeof child === 'string') return child;
          if (child?.props?.text) return child.props.text;
          if (child?.props?.children) return child.props.children;
          return '';
        }).join('');
      }
      
      // Check for markdown headers
      if (textContent.startsWith('#')) {
        const level = textContent.match(/^#+/)?.[0].length || 1;
        const text = textContent.replace(/^#+\s*/, '');
        const HeadingLevel = level as 1 | 2 | 3 | 4 | 5 | 6;
        return <Heading level={HeadingLevel} className="mt-8 mb-4">{text}</Heading>;
      }
      
      return <Text className="mb-4">{children}</Text>;
    },
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-orange pl-4 italic my-6">
        <Text>{children}</Text>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => {
      // Parse markdown bold syntax in list items
      const processedChildren = React.Children.map(children, child => {
        if (typeof child === 'string') {
          const parts = child.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });
        }
        return child;
      });
      return <li className="ml-4 text-charcoal">{processedChildren}</li>;
    },
    number: ({ children }: { children?: React.ReactNode }) => {
      // Parse markdown bold syntax in list items
      const processedChildren = React.Children.map(children, child => {
        if (typeof child === 'string') {
          const parts = child.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });
        }
        return child;
      });
      return <li className="ml-4 text-charcoal">{processedChildren}</li>;
    },
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">{children}</code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className="text-orange hover:text-orange-dark underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset) return null;
      
      // Get image dimensions from Sanity
      const imageUrl = urlFor(value).url();
      
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[4/3]">
            <OptimizedImage
              src={imageUrl}
              alt={value.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="rounded-lg object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center mt-2">
              <Text size="sm" color="muted">{value.caption}</Text>
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: { value: PortableTextCodeBlock }) => (
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">
        <code className="text-sm" data-language={value.language}>
          {value.code}
        </code>
      </pre>
    ),
    comparisonTable: ({ value }: { value: PortableTextComparisonTable }) => {
      if (!value?.rows || value.rows.length === 0) return null;
      
      return (
        <div className="my-8 overflow-x-auto">
          {value.title && (
            <Heading level={3} className="mb-4">{value.title}</Heading>
          )}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-light">
                <th className="border border-charcoal/20 px-4 py-2 text-left font-semibold">
                  Option/Method
                </th>
                <th className="border border-charcoal/20 px-4 py-2 text-left font-semibold">
                  Cost
                </th>
                <th className="border border-charcoal/20 px-4 py-2 text-left font-semibold">
                  Time
                </th>
                <th className="border border-charcoal/20 px-4 py-2 text-left font-semibold">
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-cream'}>
                  <td className="border border-charcoal/20 px-4 py-2 font-medium">
                    {row.option}
                  </td>
                  <td className="border border-charcoal/20 px-4 py-2">
                    {row.cost}
                  </td>
                  <td className="border border-charcoal/20 px-4 py-2">
                    {row.time}
                  </td>
                  <td className="border border-charcoal/20 px-4 py-2">
                    {row.results}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default function PortableTextContent({ value }: PortableTextContentProps) {
  if (!value || !Array.isArray(value)) {
    return null;
  }
  
  return <PortableText value={value} components={components} />;
}