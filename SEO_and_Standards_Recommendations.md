# SEO and Standards Recommendations

This document provides a summary of recommendations for improving the SEO and overall code standards of the Orange Jelly website.

## High-Level Summary

The website is built on a solid foundation with Next.js and demonstrates a good understanding of modern web development practices. The use of structured data is particularly strong. The following recommendations are intended to refine the existing implementation, improve maintainability, and further enhance SEO performance.

## Detailed Recommendations

### 1. Metadata Management

*   **Recommendation:** Deprecate and remove the `src/components/SEOMeta.tsx` component.
*   **Reasoning:** The App Router in Next.js 13+ provides a built-in `metadata` object for managing head tags. The `SEOMeta` component uses the outdated `next/head` and creates duplicate or conflicting meta tags with the `layout.tsx` file. The "voice search optimization" features are not a standard or effective SEO practice.
*   **Action:** Migrate all metadata management to the `metadata` export in `layout.tsx` and individual `page.tsx` files. This centralizes metadata and aligns with current Next.js best practices.

### 2. Blog and Sitemap Generation

*   **Recommendation:** Automate the generation of the sitemap and blog post lists.
*   **Reasoning:** The list of blog posts in `sitemap.ts` is currently hardcoded. This is not maintainable and is prone to human error, as new posts could be missed from the sitemap.
*   **Action:**
    1.  Create a new file, `src/lib/blog-md.ts`, to handle reading and parsing blog posts from the `content/blog` directory. This file should contain functions like `getAllPosts()` and `getPostBySlug()`.
    2.  Update `sitemap.ts` to import the blog post list from `src/lib/blog-md.ts` and dynamically generate the sitemap.

### 3. Content and Data Management

*   **Recommendation:** Decouple page content from component logic.
*   **Reasoning:** The homepage (`src/app/page.tsx`) contains hardcoded content for FAQs and the "problems" section. This makes it more difficult for non-developers to update content and clutters the component.
*   **Action:** Move the `homepageFAQs` and `problems` arrays into a separate file, such as `src/lib/content.ts` or a JSON file, and import them into the component.

### 4. Code Quality and Consistency

*   **Recommendation:** Enforce a consistent code style with a formatter.
*   **Reasoning:** While ESLint is configured, adding a code formatter like Prettier will ensure a consistent style across the entire codebase, reducing cognitive load and improving readability.
*   **Action:** Integrate Prettier into your development workflow. You can configure it to run on save and as a pre-commit hook.

### 5. Image Optimization

*   **Recommendation:** Customize the `sizes` attribute for the `OptimizedImage` component.
*   **Reasoning:** The `OptimizedImage` component is excellent, but the default `sizes` attribute can be further optimized. Providing more specific `sizes` attributes for different image layouts will ensure that the browser downloads the most appropriately sized image, improving performance.
*   **Action:** For each instance of the `OptimizedImage` component, provide a `sizes` attribute that is tailored to the image's layout.

### 6. Security

*   **Recommendation:** Eliminate the use of `'unsafe-inline'` and `'unsafe-eval'` in the Content Security Policy (CSP).
*   **Reasoning:** These directives in your `next.config.js` reduce the effectiveness of your CSP. While they are sometimes necessary for legacy scripts, they should be avoided.
*   **Action:** Refactor your code to avoid inline styles and the use of `eval`. For styles, you can use a nonce-based approach. For scripts, you can refactor your code to avoid `eval`.
