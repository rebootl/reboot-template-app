import { renderMessage } from "./messages.js";

const locale = {
  "en": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Entries",
      "settings": "Settings",
      "users": "Users",
      "logout": "Logout",
    },
  },
  "de": {
    "nav": {
      "dashboard": "Dashboard",
      "entries": "Einträge",
      "settings": "Einstellungen",
      "users": "Benutzer",
      "logout": "Abmelden",
    },
  },
};

export default ({ content, req }) => {

  const ref = req.path || '';
  const currentLanguage = req.lang || 'en';
  const loggedIn = req.locals.loggedIn || false;
  const messageType = req.query.messageType || null;
  
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin - RevampIT</title>
    <meta name="description" content="Admin interface for RevampIT" />
    <!--<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>-->
    <link rel="stylesheet" href="/admin/static/tailwind.css" />
    <script src="/admin/static/nav-dropdown.js" defer></script>
  </head>
  <body class="antialiased">
    <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1 items-center gap-4">
            <a href="/admin" class="flex items-center gap-2">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-green-600">
                <span class="text-white font-bold text-xl">R</span>
              </div>
              <span class="text-xl font-bold text-gray-900">Admin</span>
            </a>
          </div>
          <div class="items-center lg:flex lg:gap-x-12">
          ${
  loggedIn
    ? `
            <a href="/admin" class="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200">${
      locale[currentLanguage].nav.dashboard
    }</a>
            <a href="/admin/entries" class="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200">${
      locale[currentLanguage].nav.entries
    }</a>
            <!--
            <a href="/admin/settings" class="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200">${
      locale[currentLanguage].nav.settings
    }</a>
            <a href="/admin/users" class="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200">${
      locale[currentLanguage].nav.users
    }</a>
            -->
            <a href="/admin/logout" class="text-sm font-semibold leading-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">${
      locale[currentLanguage].nav.logout
    }</a>
          `
    : ``
}
            <div class="relative group nav-dropdown-parent">
              <button id="lang-switcher-trigger" class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-600" aria-haspopup="true" aria-expanded="false">
                <span id="current-lang">${currentLanguage.toUpperCase()}</span>
                <svg id="lang-switcher-chevron" class="w-4 h-4 ml-1 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div id="lang-dropdown" class="hidden absolute right-0 top-full pt-3 z-50 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-900/5">
                <a href="/set-lang?lang=en&ref=${ref}" class="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200">EN</a>
                <a href="/set-lang?lang=de&ref=${ref}" class="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200">DE</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main class="pt-20 min-h-screen">
        ${
  messageType
    ? `
        <div class="px-4 sm:px-6 lg:px-8 pt-8">
          <div class="max-w-7xl mx-auto">
            ${renderMessage(messageType, currentLanguage)}
          </div>
        </div>`
    : ""
}

        ${content}

      </main>
      <!-- Footer -->
      <footer class="bg-gray-900 text-white">
        <div class="container mx-auto px-4 py-12">
          <div class="mt-8 text-center text-gray-400">
            <p>&copy; 2024 RevampIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>
`};
