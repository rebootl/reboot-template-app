import type { Request, Response } from "express";

import baseTemplate from "../../templates/adminBase.js";

function getEntries(req: Request) {
  // const lang = req.lang || "en";
  try {
    const stmt = req.db.prepare(
      "SELECT * FROM entries ORDER BY created_at DESC",
    );
    const entries = stmt.all();
    return entries;
  } catch (error) {
    console.error("Error fetching blog entries:", error);
    return [];
  }
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/admin/login");
    return;
  }
  const entries = getEntries(req);
  // const lang = req.language || "en";
  const content = `
<div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-7xl mx-auto">

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Entries</h2>

        ${
    entries.length === 0
      ? `
          <p class="text-gray-500">No entries found.</p>
        `
      : `
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Type</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-32">Slug</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-48">Title</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-32">Content</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Lang</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Created</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Modified</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">By</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Status</th>
                  <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${
        entries.map((entry) => `
                  <tr>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-16">${entry.id}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-20">
                      <span class="inline-flex px-1 py-1 text-xs font-semibold rounded ${
          entry.type === "blog"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }">${entry.type}</span>
                    </td>
                    <td class="px-3 py-3 text-sm text-gray-900 max-w-32">
                      <div class="truncate font-mono text-xs">${
          entry.slug || entry.id
        }</div>
                    </td>
                    <td class="px-3 py-3 text-sm font-medium text-gray-900 max-w-48">
                      <div class="truncate">${entry.title}</div>
                    </td>
                    <td class="px-3 py-3 text-sm text-gray-900 max-w-32">
                      <div class="truncate">${entry.content}</div>
                    </td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-16">
                      <span class="text-xs font-semibold px-1 py-1 rounded bg-purple-100 text-purple-800">${
          entry.language || "en"
        }</span>
                    </td>
                    <td class="px-3 py-3 whitespace-nowrap text-xs text-gray-500 w-24">${
          new Date(entry.created_at as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        }</td>
                    <td class="px-3 py-3 whitespace-nowrap text-xs text-gray-500 w-24">${
          new Date(entry.modified_at as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        }</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-16">${entry.created_by}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-20">
                      <span class="inline-flex px-1 py-1 text-xs font-semibold rounded ${
          entry.draft
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }">${entry.draft ? "Draft" : "Pub"}</span>
                    </td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900 w-16">
                      <a href="/admin/entries/edit/${entry.id}" class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700">
                        Edit
                      </a>
                    </td>
                  </tr>
                `).join("")
      }
              </tbody>
            </table>
          </div>
        `
  }

        <!-- New Entry Button -->
        <div class="mt-6">
          <a
            href="/admin/entries/new"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Entry
          </a>
        </div>

      </div>
    </div>
  </div>
</div>
`;
  const html = baseTemplate({ req, content });
  res.send(html);
};
