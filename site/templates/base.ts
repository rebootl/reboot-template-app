export const baseTemplate = (content: string /*, req: Request */) => {
  // const ref = req.path || '';
  // const currentLanguage = req.lang || 'en';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reboot Framework</title>
        <link rel="stylesheet" href="/styles/main.css" />
      </head>
      <body>
        <div id="app">
          ${content}
        </div>
        <script src="/scripts/main.js"></script>
      </body>
    </html>
`;
};
