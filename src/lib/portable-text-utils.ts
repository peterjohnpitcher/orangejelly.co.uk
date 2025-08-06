// Utility functions for handling Portable Text from Sanity

interface PortableTextChild {
  _type: string;
  text?: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: PortableTextChild[];
}

/**
 * Convert Portable Text blocks to plain text string
 * This is used for structured data and other places where we need plain text
 */
export function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      // Handle non-text blocks
      if (block._type !== 'block' || !block.children) {
        return '';
      }

      // Extract text from all children
      return block.children
        .map((child) => child.text || '')
        .join('');
    })
    .join(' ')
    .trim();
}

/**
 * Convert Portable Text to a simple HTML string
 * Useful for rendering in places that don't support React components
 */
export function portableTextToHTML(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }

      const text = block.children
        .map((child) => {
          let text = child.text || '';
          
          // Apply marks (bold, italic, etc)
          if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark: string) => {
              switch (mark) {
                case 'strong':
                  text = `<strong>${text}</strong>`;
                  break;
                case 'em':
                  text = `<em>${text}</em>`;
                  break;
                case 'code':
                  text = `<code>${text}</code>`;
                  break;
              }
            });
          }
          
          return text;
        })
        .join('');

      // Handle different block styles
      switch (block.style) {
        case 'h1':
          return `<h1>${text}</h1>`;
        case 'h2':
          return `<h2>${text}</h2>`;
        case 'h3':
          return `<h3>${text}</h3>`;
        case 'h4':
          return `<h4>${text}</h4>`;
        case 'blockquote':
          return `<blockquote>${text}</blockquote>`;
        default:
          return `<p>${text}</p>`;
      }
    })
    .join('');
}