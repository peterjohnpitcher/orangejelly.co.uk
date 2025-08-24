// /src/components/MarkdownContent.tsx
// Simple HTML renderer - no markdown processing
// All markdown is processed server-side now

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  // If content is already HTML, just render it
  // This component is now only used for pre-rendered HTML or PortableText output
  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
