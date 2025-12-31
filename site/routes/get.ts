import { marked } from "marked";
import type { Request, Response } from "express";

import { formatDate, html } from "../../lib/helper.ts";
import { baseTemplate } from "../templates/base.ts";

export type Entry = {
  id: number;
  title: string;
  content: string;
  modified_at: string;
  [k: string]: unknown;
};

export type ContentTypes = "maincontent" | "newscontent";

function getContent(req: Request, type: ContentTypes) {
  try {
    const stmt = req.db.prepare(
      "SELECT title, content, modified_at FROM entries WHERE type = ? AND private = 0 LIMIT 1",
    );
    const entry = stmt.get(type);
    return entry as Entry;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return {} as Entry;
  }
}

const template = (mainEntry: Entry, newsEntry: Entry) =>
  html`
    ${newsEntry
      ? html`
        <div class="md-content mb-4 mt-6">
          ${marked.parse(newsEntry.content) as string}
        </div>
        <div class="text-sm text-dark-muted mb-4">
          <p><time datetime="${newsEntry
            .modified_at}">${formatDate(newsEntry.modified_at)}</time></p>
        </div>
        <hr class="border-dark-border mb-4" />
      `
      : ""}
    <div class="grid grid-cols-1 md:grid-cols-[1fr_12rem] md:items-center gap-8">
      <div class="md-content">
        ${marked.parse(mainEntry.content) as string}
      </div>
      <!-- Desktop image column -->
      <div class="flex items-center justify-center">
        <img
          src="/static/me-small.jpeg"
          alt="small false color colorized portray photo of myself"
          class="rounded-lg w-48 h-auto"
        />
      </div>
    </div>
    </div>
  `;

export default (req: Request, res: Response) => {
  const mainEntry = getContent(req, "maincontent");
  const newsEntry = getContent(req, "newscontent");
  const content = template(mainEntry, newsEntry);

  const html = baseTemplate(mainEntry.title, content, mainEntry.modified_at);
  res.send(html);
};
