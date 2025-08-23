import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).process(markdown);

  return result.toString();
}

export function readMarkdownFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Could not read markdown file: ${filePath}`, error);
    return '';
  }
}
