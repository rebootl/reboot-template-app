import type { Request, Response } from "express";

import { marked } from "marked";

import { html } from "../../../../lib/helper.ts";
import { baseTemplate } from "../../../templates/base.ts";
import type { Entry } from "../../get.ts";

function getEntryById(req: Request) {
  const { id } = req.params as { id: string };
  const entryId = Number(id);

  if (Number.isNaN(entryId)) {
    return null;
  }

  try {
    const stmt = req.db.prepare(
      "SELECT id, title, content, modified_at FROM entries WHERE type = ? AND private = 0 AND id = ? LIMIT 1",
    );
    const entry = stmt.get("nerdstuff", entryId);
    return entry as Entry | null;
  } catch (error) {
    console.error(`Error fetching nerd stuff entry ${entryId}:`, error);
    return null;
  }
}

const template = (mainEntry: Entry) =>
  html`
    <div class="md-content mt-6">
      ${marked.parse(mainEntry.content) as string}
    </div>
  `;

export default (req: Request, res: Response) => {
  const entry = getEntryById(req);

  if (!entry) {
    res.status(404).send("Ooops, entry not found.");
    return;
  }

  const content = template(entry);
  const html = baseTemplate(entry.title, content, entry.modified_at);
  res.send(html);
};
