import { writeClient } from '../src/lib/sanity.write-client';

async function fetchArticleSample() {
  try {
    // Fetch another article to examine formatting
    const article = await writeClient.fetch(`
      *[_type == "blogPost" && slug.current == "terrible-online-reviews-damage-control"][0] {
        _id,
        title,
        slug,
        publishedDate,
        content
      }
    `);

    if (!article) {
      console.log('Article not found');
      return;
    }

    console.log('Article found:', article.title);
    console.log('Published:', article.publishedDate);
    console.log('Content structure:');
    console.log(JSON.stringify(article.content, null, 2));

  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchArticleSample();