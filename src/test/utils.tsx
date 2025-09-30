import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement } from 'react';
import { vi } from 'vitest';

// Setup Next.js mocks
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Custom render function
export function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    // Add providers here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { userEvent };

// Test data factories
export const createMockService = (overrides = {}) => ({
  _id: 'service-1',
  title: 'Test Service',
  description: 'Test description',
  price: '75',
  features: ['Feature 1', 'Feature 2'],
  ...overrides,
});

export const createMockBlogPost = (overrides = {}) => ({
  _id: 'post-1',
  title: 'Test Blog Post',
  slug: { current: 'test-blog-post' },
  excerpt: 'Test excerpt',
  publishedAt: '2024-01-01',
  author: {
    name: 'Test Author',
    image: null,
  },
  ...overrides,
});
