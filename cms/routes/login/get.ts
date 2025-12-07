import type { Request, Response } from "express";

import baseTemplate from "../../templates/adminBase.js";

const locale = {
  "en": {
    "login": {
      "title": "Admin Login",
      "subtitle": "Sign in to access the admin panel",
      "usernameLabel": "Username",
      "usernamePlaceholder": "Enter your username",
      "passwordLabel": "Password",
      "passwordPlaceholder": "Enter your password",
      "buttonText": "Sign in",
    },
  },
  "de": {
    "login": {
      "title": "Admin-Login",
      "subtitle": "Melden Sie sich an, um auf das Admin-Panel zuzugreifen",
      "usernameLabel": "Benutzername",
      "usernamePlaceholder": "Geben Sie Ihren Benutzernamen ein",
      "passwordLabel": "Passwort",
      "passwordPlaceholder": "Geben Sie Ihr Passwort ein",
      "buttonText": "Anmelden",
    },
  },
};

export default (req: Request, res: Response) => {
  const currentLanguage = req.lang || "en";
  const content = `
<div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div class="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center w-16 h-16 rounded-xl bg-green-600 mx-auto mb-4">
          <span class="text-white font-bold text-2xl">R</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">${
    locale[currentLanguage].login.title
  }</h1>
        <p class="text-gray-600 mt-2">${
    locale[currentLanguage].login.subtitle
  }</p>
      </div>

      <form action="/admin/login" method="POST" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">${
    locale[currentLanguage].login.usernameLabel
  }</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="${locale[currentLanguage].login.usernamePlaceholder}"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">${
    locale[currentLanguage].login.passwordLabel
  }</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="${locale[currentLanguage].login.passwordPlaceholder}"
          >
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
          >
            ${locale[currentLanguage].login.buttonText}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
  const html = baseTemplate({ req, content });
  res.send(html);
};
