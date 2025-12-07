/**
 * Returns the entry not found error page content to be inserted into the admin base template.
 * @param {Object} params
 * @param {string} params.currentLanguage - The current language
 * @returns {string} The HTML content for the entry not found page.
 */
export const entryNotFoundPageContent = ({ currentLanguage }) => `
<div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Entry Not Found</h1>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      The entry you're looking for could not be found. It may have been deleted or the URL is incorrect.
    </div>
    <a href="/admin" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Admin Dashboard
    </a>
  </div>
</div>
`;
