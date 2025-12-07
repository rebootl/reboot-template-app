import type { Request, Response } from "express";
// import { SQLOutputValue } from "node:sqlite";

// import locale from "./locale.ts";
// import template from "./template.ts";
import { baseTemplate } from "../templates/base.ts";

// export type NewsData = Record<string, SQLOutputValue> | null | undefined;

// function getNewsData(
//   req: Request,
// ): NewsData {
//   const language = req.lang || "en";
//   try {
//     const stmt = req.db.prepare(
//       "SELECT * FROM entries WHERE type = ? AND draft = 0 AND language = ? ORDER BY created_at DESC LIMIT 1",
//     );
//     const latestEntry = stmt.get("news", language);
//     return latestEntry;
//   } catch (error) {
//     console.error("Error fetching blog entries:", error);
//     return null;
//   }
// }

const content = `
  <section class="section">
    <div class="container">
      <h1 class="title">Welcome to Reboot Framework!</h1>
      <p class="subtitle">
        This is the default homepage. You can customize it by editing the template files.
      </p>
    </div>
  </section>
`;

export default (_req: Request, res: Response) => {
  // const language = req.lang || "en";
  // const newsData = getNewsData(req);

  // const content = template(
  //   locale[language] || locale.en,
  //   newsData,
  // );
  const html = baseTemplate(content /*, req */);
  res.send(html);
};
