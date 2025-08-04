# Full Website Audit: SEO, Standards, and Maintainability

## 1. Executive Summary

This audit provides a comprehensive review of the Orange Jelly website, focusing on SEO, code standards, and overall maintainability. The site is built on a very strong foundation, utilizing Next.js effectively with a robust component-based architecture and excellent use of structured data. The content is high-quality and well-targeted.

The primary recommendations focus on **refactoring and centralizing data handling** to improve maintainability and align with the latest Next.js best practices. Key areas for improvement include:

*   **Metadata Management:** Deprecating the `SEOMeta` component and consolidating metadata generation.
*   **Content Fetching:** Dynamically generating blog posts and sitemaps from the filesystem instead of hardcoding them.
*   **Data Consistency:** Standardizing the frontmatter in blog posts and decoupling page-specific content from components.

By addressing these core architectural points, the website will become significantly more scalable, easier to maintain, and even better optimized for search engines.

## 2. Page and Routing Audit

### 2.1. Findings

*   **Inconsistent Metadata Management:** The site uses multiple methods for managing page metadata. The root `layout.tsx` defines global metadata, some pages (e.g., `/about`, `/contact`) use a `generateMetadata` helper function from `src/lib/metadata.ts`, and blog pages (`/licensees-guide/[slug]`) generate it directly. This creates a fragmented and difficult-to-manage system.
*   **Excellent Structured Data:** The use of various schema types (`FAQPage`, `HowTo`, `Service`, `CollectionPageSchema`, etc.) is a major strength. The data is detailed and correctly implemented on a per-page basis, which is excellent for SEO.
*   **Hardcoded Page Content:** Several key landing pages (e.g., `/`, `/services`, `/about`) contain large, hardcoded arrays and objects for content like FAQs and feature lists. This makes content updates difficult for non-developers and clutters the page components.
*   **Broken Blog Implementation:** The blog-related pages (`/licensees-guide`, `/licensees-guide/category/[category]`, `/licensees-guide/[slug]`) are attempting to fetch data using functions (`getAllPosts`, `getPostBySlug`) from a non-existent `src/lib/blog-md.ts` file. This is a critical bug that prevents the entire blog section from functioning.

### 2.2. Recommendations

*   **Action:** **Centralize Metadata in Pages.**
    *   **Why:** The Next.js App Router is designed for metadata to be handled directly within `layout.tsx` and `page.tsx` files. This co-location of page and metadata is a core principle of the new router.
    *   **How:**
        1.  Deprecate and delete the `src/components/SEOMeta.tsx` and `src/components/CanonicalLink.tsx` components.
        2.  Deprecate and delete the `src/lib/metadata.ts` helper file.
        3.  Move the logic from `generateMetadata` directly into the `metadata` export of each respective page.
        4.  Ensure all pages (static and dynamic) export their own `Metadata` object.

*   **Action:** **Decouple Content from Components.**
    *   **Why:** Separating content from presentation improves maintainability and allows for easier updates.
    *   **How:** For pages with large content objects (like `homepageFAQs` in `src/app/page.tsx`), move this data into a dedicated file (e.g., `src/lib/content/home-content.ts`) and import it into the page component.

## 3. Content and Blog Audit

### 3.1. Findings

*   **Excellent Content Quality:** The blog posts are well-written, in-depth, and provide significant value to the target audience (pub landlords). The topics are highly relevant and demonstrate expertise.
*   **Inconsistent Frontmatter:** The frontmatter in the markdown files is inconsistent. Some posts lack an `seo` object, `tags`, or have other missing fields. This makes parsing and displaying content unreliable.
*   **Hardcoded Slugs:** The URL slugs are derived directly from the markdown filenames (e.g., `why-is-my-pub-empty.md` becomes `/why-is-my-pub-empty`). This is inflexible and can lead to long, non-optimal URLs.
*   **Hardcoded Sitemap:** The `sitemap.ts` file contains a hardcoded list of blog posts. This is a critical maintenance issue; new posts will not be added to the sitemap automatically, harming SEO.

### 3.2. Recommendations

*   **Action:** **Create a Centralized Blog Data Library.**
    *   **Why:** To fix the broken blog and create a single source of truth for all blog-related data.
    *   **How:**
        1.  Create the file `src/lib/blog-md.ts`.
        2.  Implement functions within this file to:
            *   `getPostBySlug(slug)`: Reads a single markdown file, parses the frontmatter and content.
            *   `getAllPosts()`: Reads all files in the `content/blog` directory and returns a sorted array of all post objects.
            *   `getCategories()`: Returns a list of all unique categories.

*   **Action:** **Standardize Frontmatter.**
    *   **Why:** To ensure all posts have consistent data, which simplifies rendering and prevents errors.
    *   **How:** Enforce a standard frontmatter template for all new and existing blog posts. A recommended structure is:

        ```yaml
        ---
        title: "Your Post Title"
        slug: "your-post-slug" # Add this field
        publishedDate: "YYYY-MM-DDTHH:mm:ss.sssZ"
        updatedDate: "YYYY-MM-DDTHH:mm:ss.sssZ"
        category: "your-category-slug"
        tags:
          - tag1
          - tag2
        excerpt: "A short, compelling summary of the post."
        featuredImage: "/images/blog/your-image.svg"
        seo:
          metaTitle: "Your SEO-Optimized Title"
          metaDescription: "Your SEO-Optimized Description"
        ---
        ```

*   **Action:** **Dynamically Generate Sitemap.**
    *   **Why:** To ensure the sitemap is always accurate and up-to-date.
    *   **How:** Modify `src/app/sitemap.ts` to import `getAllPosts` from the new `blog-md.ts` library and generate the blog post URLs dynamically.

## 4. Component Audit

### 4.1. Findings

*   **Excellent Componentization:** The project uses a strong, reusable component model. Components like `Card`, `Button`, and `Section` are well-designed and used consistently.
*   **Strong Accessibility:** Good use of ARIA landmarks (`AriaLandmarks.tsx`) and semantic HTML. The `Navigation` component correctly uses `aria-current`.
*   **Redundant Components:** As noted, `SEOMeta.tsx` and `CanonicalLink.tsx` are redundant. The `SuperHeader.tsx` and `SuperHeaderWrapper.tsx` components also appear to be unused and add unnecessary complexity.
*   **Good Structured Data Components:** The schema components (`BlogPostingSchema`, `ProductSchema`, etc.) are well-implemented and a major asset.
*   **Minor Inconsistencies:** Some minor styling inconsistencies exist. For example, the `WhatsAppButton` has its own styling logic, while the generic `Button` component could likely handle its functionality with the correct props.

### 4.2. Recommendations

*   **Action:** **Refactor and Remove Redundant Components.**
    *   **Why:** To simplify the codebase and reduce maintenance overhead.
    *   **How:** Delete `SEOMeta.tsx`, `CanonicalLink.tsx`, `SuperHeader.tsx`, and `SuperHeaderWrapper.tsx`. Consolidate the logic of `WhatsAppButton` into the main `Button` component by passing appropriate props.

*   **Action:** **Continue Prioritizing Accessibility.**
    *   **Why:** It's a key part of a high-quality user experience and has SEO benefits.
    *   **How:** Ensure all new components are built with accessibility in mind. Regularly audit the site with keyboard navigation and screen readers.

## 5. General Code Standards & Configuration

### 5.1. Findings

*   **Modern Stack:** The project uses up-to-date versions of Next.js, React, and TypeScript.
*   **Strong Security Headers:** The `next.config.js` file defines a robust Content Security Policy (CSP) and other security headers.
*   **Linting in Place:** The `package.json` includes a `lint` script, indicating that ESLint is configured.

### 5.2. Recommendations

*   **Action:** **Enforce Code Formatting with Prettier.**
    *   **Why:** To ensure a consistent code style across the entire project, which improves readability and reduces merge conflicts.
    *   **How:** Add Prettier to the project and configure it to run alongside ESLint. Use a pre-commit hook to automatically format files.

*   **Action:** **Refine Content Security Policy (CSP).**
    *   **Why:** The current CSP in `next.config.js` uses `'unsafe-inline'` and `'unsafe-eval'`, which reduces its effectiveness.
    *   **How:** Investigate removing these directives. This may require refactoring some components to avoid inline styles and scripts. For styles, a nonce-based approach can be used.

## 6. Final Prioritized Action Plan

1.  **Critical (Fixes Broken Functionality):**
    *   Create `src/lib/blog-md.ts` with `getAllPosts` and `getPostBySlug` functions to fix the entire blog section.
    *   Update the blog pages (`/licensees-guide/...`) to correctly use these new functions.

2.  **High Impact (Improves Maintainability & SEO):**
    *   Standardize the frontmatter for all markdown blog posts, adding a `slug` field.
    *   Refactor `sitemap.ts` to dynamically generate URLs from `getAllPosts()`.
    *   Deprecate `SEOMeta.tsx` and `metadata.ts`, moving all metadata generation into the `page.tsx` and `layout.tsx` files.

3.  **Medium Impact (Improves Code Quality & Consistency):**
    *   Decouple hardcoded content from pages like the homepage and services page.
    *   Integrate Prettier for automated code formatting.
    *   Refactor the `WhatsAppButton` to be a variant of the main `Button` component.

4.  **Low Impact (Nice-to-haves):**
    *   Investigate removing `'unsafe-inline'` and `'unsafe-eval'` from the CSP.
    *   Review and customize the `sizes` attribute on `OptimizedImage` components for better performance.
