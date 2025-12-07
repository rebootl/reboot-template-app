import type { Request, Response } from "express";

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/admin/login");
    return;
  }

  const { title, slug, type, language, content, draft } = req.body;

  // TODO: improve
  // Validate required fields
  if (!title || !type || !language || !content) {
    res.redirect("/admin/entries?messageType=errorMissingFields");
    return;
  }

  try {
    const now = new Date().toISOString();
    const draftValue = draft === "1" ? 1 : 0;

    // FIXME:
    // For now, assume created_by is 1 (admin user)
    // In a real app, you'd get this from the session
    const createdBy = 1;

    const insertStmt = req.db.prepare(`
      INSERT INTO entries (title, slug, type, language, content, draft, created_at, modified_at, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Use provided slug, or temporarily use 'temp' and update with ID after insert
    const tempSlug = slug || "temp";
    const result = insertStmt.run(
      title,
      tempSlug,
      type,
      language,
      content,
      draftValue,
      now,
      now,
      createdBy,
    );

    if (result.changes > 0) {
      const newEntryId = result.lastInsertRowid;

      // If no slug was provided, update with the entry ID
      if (!slug) {
        const updateSlugStmt = req.db.prepare(
          "UPDATE entries SET slug = ? WHERE id = ?",
        );
        updateSlugStmt.run(newEntryId.toString(), newEntryId);
      }
    }

    // Redirect to admin page with success message
    res.redirect("/admin/entries?messageType=successCreate");
  } catch (err) {
    console.error("Database error:", err);
    res.redirect("/admin/entries?messageType=errorDatabase");
  }
};
