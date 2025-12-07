export default ({ entry, currentLanguage, isNew = false }) => `
<div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">${isNew ? 'New Entry' : 'Edit Entry'}</h1>
      <p class="mt-2 text-sm text-gray-600">${isNew ? 'Create a new entry' : `Entry ID: ${entry.id}`}</p>
    </div>

    <div class="bg-white shadow rounded-lg">
      <form method="POST" action="${isNew ? '/admin/entries/new' : `/admin/entries/edit/${entry.id}`}" class="p-6 space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value="${entry?.title || ''}"
            ${isNew ? 'placeholder="Enter entry title"' : ''}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Slug -->
        <div>
          <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">
            Slug
            <span class="text-xs text-gray-500">(URL identifier & translation group ID)</span>
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value="${entry?.slug || (isNew ? '' : entry?.id || '')}"
            ${isNew ? 'placeholder="Default: entry ID"' : ''}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p class="mt-1 text-xs text-gray-500">
            Use the same slug for different language versions of the same content. Defaults to entry ID if left empty.
          </p>
        </div>

        <!-- Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            id="type"
            name="type"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            ${isNew ? '<option value="">Select type...</option>' : ''}
            <option value="blog" ${entry?.type === 'blog' ? 'selected' : ''}>Blog</option>
            <option value="news" ${entry?.type === 'news' ? 'selected' : ''}>News</option>
            <!--<option value="page" ${entry?.type === 'page' ? 'selected' : ''}>Page</option>
            <option value="project" ${entry?.type === 'project' ? 'selected' : ''}>Project</option>
            <option value="workshop" ${entry?.type === 'workshop' ? 'selected' : ''}>Workshop</option>-->
          </select>
        </div>

        <!-- Language -->
        <div>
          <label for="language" class="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            id="language"
            name="language"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            ${isNew ? '<option value="">Select language...</option>' : ''}
            <option value="en" ${(entry?.language === 'en') || (isNew && currentLanguage === 'en') ? 'selected' : ''}>English</option>
            <option value="de" ${(entry?.language === 'de') || (isNew && currentLanguage === 'de') ? 'selected' : ''}>German</option>
          </select>
        </div>

        <!-- Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ${isNew ? 'placeholder="Enter your content here..."' : ''}
          >${entry?.content || ''}</textarea>
        </div>

        <!-- Draft Status -->
        <div>
          <label class="flex items-center">
            <input
              type="checkbox"
              name="draft"
              value="1"
              ${entry?.draft || isNew ? 'checked' : ''}
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Save as draft</span>
          </label>
        </div>

        <!-- Hidden field for modified_at -->
        ${!isNew ? `<input type="hidden" name="modified_at" value="${new Date().toISOString()}" />` : ''}

        <!-- Action buttons -->
        <div class="flex justify-between pt-6 border-t border-gray-200">
          <a
            href="/admin/entries"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </a>

          <div class="space-x-3">
            <button
              type="submit"
              name="action"
              value="save"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isNew ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}"
            >
              ${isNew ? 'Create Entry' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Entry metadata -->
    ${!isNew ? `
    <div class="mt-6 bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-900 mb-2">Entry Information</h3>
      <div class="text-xs text-gray-600 space-y-1">
        <p><span class="font-medium">Created:</span> ${new Date(entry.created_at).toLocaleString()}</p>
        <p><span class="font-medium">Last Modified:</span> ${new Date(entry.modified_at).toLocaleString()}</p>
        <p><span class="font-medium">Created By:</span> User ID ${entry.created_by}</p>
        <p><span class="font-medium">Slug:</span> <code class="bg-gray-100 px-1 rounded">${entry.slug}</code></p>
      </div>
    </div>
    ` : ''}
  </div>
</div>
`;
