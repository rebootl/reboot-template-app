const locale = {
  en: {
    title: 'RevampIt Blog',
    description: 'A space for exploring sustainability, open source, and the art of giving technology a second life.'
  },
  de: {
    title: 'RevampIt Blog',
    description: 'Ein Ort, um Nachhaltigkeit, Open Source und die Kunst zu erforschen, Technologie ein zweites Leben zu geben.'
  }
};

function getBlogEntries(req) {
  const lang = req.lang || 'en';
  try {
    const stmt = req.db.prepare('SELECT * FROM entries WHERE type = ? AND draft = 0 AND language = ? ORDER BY created_at DESC');
    const entries = stmt.all('blog', lang);
    return entries;
  } catch (error) {
    console.error('Error fetching blog entries:', error);
    return [];
  }
}

/**
 * The HTML content for the blog page, exported as a template literal function.
 * @param {Object} req - The request object
 * @returns {string} The HTML content
 */
export function pageContent(req) {
  const entries = getBlogEntries(req);
  const lang = req.language || 'en';
  return `
  <main class="pt-20 min-h-screen">
    <section class="bg-gray-200 py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl font-bold mb-4">${locale[lang].title}</h1>
        <p class="text-gray-600">${locale[lang].description}</p>
      </div>
    </section>
    <div class="container mx-auto px-4 py-16">
      <ul class="grid grid-cols-1 gap-8">
        ${entries.map(entry => `
          <li class="bg-white rounded-lg shadow-md overflow-hidden">
            <a href="/blog/${entry.slug}" class="block hover:bg-gray-50">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2">${entry.title}</h2>
                <p class="text-gray-700">${entry.content.substring(0, 100)}...</p>
              </div>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
  </main>`;
}
