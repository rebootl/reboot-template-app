/**
 * Messages template component for admin interface
 * Returns HTML for success/error messages based on message type and language
 * 
 * Available message types:
 * Success: successEdit, successCreate, successDelete, successLogin, successLogout
 * Error: errorNotFound, errorDatabase, errorValidation, errorAuth, errorPermission, errorGeneric
 * 
 * @param {string} messageType - The type of message (e.g., 'successEdit', 'errorDatabase')
 * @param {string} currentLanguage - The current language code (e.g., 'en', 'de')
 * @returns {string} The HTML content for the message or empty string if message type not found
 */

const messages = {
  // Success messages
  successEdit: {
    en: 'Entry updated successfully!',
    de: 'Eintrag erfolgreich aktualisiert!'
  },
  successCreate: {
    en: 'Entry created successfully!',
    de: 'Eintrag erfolgreich erstellt!'
  },
  successDelete: {
    en: 'Entry deleted successfully!',
    de: 'Eintrag erfolgreich gelöscht!'
  },
  successLogin: {
    en: 'Logged in successfully!',
    de: 'Erfolgreich angemeldet!'
  },
  successLogout: {
    en: 'Logged out successfully!',
    de: 'Erfolgreich abgemeldet!'
  },

  // Error messages
  errorNotFound: {
    en: 'Entry not found',
    de: 'Eintrag nicht gefunden'
  },
  errorDatabase: {
    en: 'Database error occurred',
    de: 'Datenbankfehler aufgetreten'
  },
  errorValidation: {
    en: 'All fields are required',
    de: 'Alle Felder sind erforderlich'
  },
  errorAuth: {
    en: 'Authentication failed',
    de: 'Authentifizierung fehlgeschlagen'
  },
  errorPermission: {
    en: 'Permission denied',
    de: 'Zugriff verweigert'
  },
  errorGeneric: {
    en: 'An error occurred',
    de: 'Ein Fehler ist aufgetreten'
  }
};

export const renderMessage = (messageType, currentLanguage = 'en') => {
  if (!messageType || !messages[messageType]) {
    return '';
  }

  const message = messages[messageType];
  const text = message[currentLanguage] || message['en'] || '';
  
  if (!text) {
    return '';
  }

  // Determine if it's a success or error message based on the messageType prefix
  const isSuccess = messageType.startsWith('success');
  const isError = messageType.startsWith('error');

  if (isSuccess) {
    return `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">${text}</div>`;
  } else if (isError) {
    return `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">${text}</div>`;
  }

  // Default to info styling for other message types
  return `<div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">${text}</div>`;
};

/**
 * Convenience function to render multiple messages at once
 * @param {Array} messageTypes - Array of message type strings
 * @param {string} currentLanguage - The current language code
 * @returns {string} Combined HTML for all messages
 */
export const renderMessages = (messageTypes, currentLanguage = 'en') => {
  if (!Array.isArray(messageTypes)) {
    return '';
  }

  return messageTypes
    .map(messageType => renderMessage(messageType, currentLanguage))
    .filter(html => html !== '')
    .join('');
};