import type { Request, Response } from "express";

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/admin/login");
    return;
  }

  const entryId = req.params.id;
  const { title, slug, type, language, content, draft, modified_at } = req.body;

  // TODO: Validate required fields

  // Update the entry
  try {
    const updateStmt = req.db.prepare(`
      UPDATE entries
      SET title = ?, slug = ?, type = ?, language = ?, content = ?, draft = ?, modified_at = ?
      WHERE id = ?
      `);

    const draftValue = draft === "1" ? 1 : 0;
    const finalSlug = slug || entryId; // Use entry ID as default if slug is empty
    updateStmt.run(
      title,
      finalSlug,
      type,
      language,
      content,
      draftValue,
      modified_at,
      entryId,
    );

    // Redirect to admin page with success message
    res.redirect("/admin/entries?messageType=successEdit");
  } catch (err) {
    res.redirect("/admin?messageType=errorDatabase");
    console.error("Database error:", err);
  }
};

// // New entry GET route
// app.get("/admin/entries/new", isLoggedIn, (req: Request, res: Response) => {
//   if (!req.locals.loggedIn) {
//     res.redirect("/admin/login");
//     return;
//   }

//   const messageType = req.query.messageType as string;

//   const content = editEntryPageContent({
//     currentLanguage: req.lang || "en",
//     entry: null,
//     isNew: true,
//   });

//   const ref = req.path || "";

//   const html = adminBaseTemplate({
//     content,
//     ref,
//     currentLanguage: req.lang || "en",
//     loggedIn: req.locals.loggedIn,
//     messageType: messageType || "",
//   });

//   res.send(html);
// });

// // New entry POST route
// app.post("/admin/entries/new", isLoggedIn, (req: Request, res: Response) => {
//   if (!req.locals.loggedIn) {
//     res.redirect("/admin/login");
//     return;
//   }

//   const { title, slug, type, language, content, draft } = req.body;
//   let messageType = "";

//   // Validate required fields
//   if (!title || !type || !language || !content) {
//     messageType = "errorValidation";
//   } else {
//     try {
//       const now = new Date().toISOString();
//       const draftValue = draft === "1" ? 1 : 0;

//       // For now, assume created_by is 1 (admin user)
//       // In a real app, you'd get this from the session
//       const createdBy = 1;

//       const insertStmt = req.db.prepare(`
//         INSERT INTO entries (title, slug, type, language, content, draft, created_at, modified_at, created_by)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `);

//       // Use provided slug, or temporarily use 'temp' and update with ID after insert
//       const tempSlug = slug || "temp";
//       const result = insertStmt.run(
//         title,
//         tempSlug,
//         type,
//         language,
//         content,
//         draftValue,
//         now,
//         now,
//         createdBy,
//       );

//       if (result.changes > 0) {
//         const newEntryId = result.lastInsertRowid;

//         // If no slug was provided, update with the entry ID
//         if (!slug) {
//           const updateSlugStmt = req.db.prepare(
//             "UPDATE entries SET slug = ? WHERE id = ?",
//           );
//           updateSlugStmt.run(newEntryId.toString(), newEntryId);
//         }

//         // Redirect to admin page with success message
//         res.redirect("/admin?messageType=successCreate");
//         return;
//       } else {
//         messageType = "errorDatabase";
//       }
//     } catch (err) {
//       messageType = "errorDatabase";
//       console.error("Database error:", err);
//     }
//   }

//   const newEntryContent = editEntryPageContent({
//     entry: null,
//     currentLanguage: req.lang || "en",
//     isNew: true,
//   });

//   const ref = req.path || "";

//   const html = adminBaseTemplate({
//     content: newEntryContent,
//     ref,
//     currentLanguage: req.lang || "en",
//     loggedIn: req.locals.loggedIn,
//     messageType: messageType || "",
//   });

//   res.send(html);
// });

// export default app;
