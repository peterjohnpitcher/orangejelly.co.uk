// /src/lib/markdown/render.ts
export async function renderMarkdownToHtml(md: string): Promise<string> {
  const [{ unified }] = await Promise.all([import('unified')]);
  const remarkParse = (await import('remark-parse')).default;
  const remarkGfm = (await import('remark-gfm')).default; // tables, strikethrough, task lists
  const remarkRehype = (await import('remark-rehype')).default;
  const rehypeSlug = (await import('rehype-slug')).default;
  const rehypeStringify = (await import('rehype-stringify')).default;
  const rehypeSanitize = (await import('rehype-sanitize')).default;

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype /* { allowDangerousHtml: false } */)
    .use(rehypeSlug)
    // Removed rehypeAutolinkHeadings - we just want IDs, not links
    .use(rehypeSanitize) // safer than sanitize:false
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
