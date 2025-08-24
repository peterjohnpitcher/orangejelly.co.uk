// /src/lib/markdown/preprocess.ts
const EMOJI_BULLET = /^([ \t]*)([❌✅✓✗•▪▫►▶▹▸🔥⭐️⭐︎💡👉])\s+(.*)$/u;

export function preprocessMarkdown(src: string): string {
  const lines = src.split(/\r?\n/);
  const out: string[] = [];
  let inEmojiBlock = false;
  let inCodeBlock = false;

  const flushIfNeeded = () => {
    if (out.length && out[out.length - 1].trim() !== '') out.push('');
  };

  for (const line of lines) {
    // Check for code block markers
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      out.push(line);
      continue;
    }

    // Don't process emoji bullets inside code blocks
    if (inCodeBlock) {
      out.push(line);
      continue;
    }

    const m = line.match(EMOJI_BULLET);
    if (m) {
      const indent = m[1];
      const emoji = m[2];
      const rest = m[3];

      if (!inEmojiBlock) {
        // starting an emoji list
        flushIfNeeded();
        inEmojiBlock = true;
      }
      // turn "  ✅ Text" into "  - ✅ Text" (preserving indentation)
      out.push(`${indent}- ${emoji} ${rest}`);
      continue;
    }

    // if we were in a list and hit a non-emoji line, close the list with a blank line (unless already blank)
    if (inEmojiBlock && line.trim() !== '') {
      flushIfNeeded();
      inEmojiBlock = false;
    }

    out.push(line);
  }

  // end with a blank line after a list block for safety
  if (inEmojiBlock) flushIfNeeded();

  return out.join('\n');
}
