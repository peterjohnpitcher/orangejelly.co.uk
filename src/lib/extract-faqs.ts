// Extract FAQs from both Markdown and Portable Text content

export interface FAQ {
  question: string;
  answer: string;
}

interface PortableTextChild {
  text?: string;
  [key: string]: unknown;
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: PortableTextChild[];
  [key: string]: unknown;
}

// Extract FAQs from Markdown content
export function extractFAQsFromMarkdown(content: string): FAQ[] {
  const faqs: FAQ[] = [];
  const faqPattern = /##\s*FAQs?\s*\n([\s\S]*?)(?=\n##|$)/i;
  const faqMatch = content.match(faqPattern);

  if (faqMatch) {
    const faqContent = faqMatch[1];
    const faqItemPattern = /###\s*(.+?)\n([\s\S]*?)(?=\n###|$)/g;
    let match;
    while ((match = faqItemPattern.exec(faqContent)) !== null) {
      faqs.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
  }

  return faqs;
}

// Extract FAQs from Portable Text content
export function extractFAQsFromPortableText(blocks: PortableTextBlock[]): FAQ[] {
  const faqs: FAQ[] = [];
  let inFAQSection = false;
  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Check for FAQ section header
    if (block.style === 'h2' && block.children?.[0]?.text?.match(/FAQs?/i)) {
      inFAQSection = true;
      continue;
    }

    // Stop at next h2
    if (inFAQSection && block.style === 'h2' && !block.children?.[0]?.text?.match(/FAQs?/i)) {
      // Save last FAQ if exists
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer.join(' '),
        });
      }
      break;
    }

    if (inFAQSection) {
      // Question (h3)
      if (block.style === 'h3') {
        // Save previous FAQ if exists
        if (currentQuestion && currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion,
            answer: currentAnswer.join(' '),
          });
        }
        // Start new FAQ
        currentQuestion = block.children?.map((c) => c.text).join('') || '';
        currentAnswer = [];
      }
      // Answer (normal text)
      else if (block.style === 'normal' && currentQuestion) {
        const text = block.children?.map((c) => c.text).join('') || '';
        if (text) currentAnswer.push(text);
      }
    }
  }

  // Save last FAQ
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer.join(' '),
    });
  }

  return faqs;
}

// Extract FAQs from any content type
export function extractFAQs(content: string | PortableTextBlock[], isPortableText: boolean): FAQ[] {
  if (isPortableText && Array.isArray(content)) {
    return extractFAQsFromPortableText(content);
  } else if (typeof content === 'string') {
    return extractFAQsFromMarkdown(content);
  }
  return [];
}
