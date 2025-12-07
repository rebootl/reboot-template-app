import express from "express";

import authApp from "./auth/auth.ts";

import { createEndpoints } from "../lib/routes.ts";

const app = express();

// static files
app.use("/cms/static", express.static("cms/static"));

// Use the auth app
app.use(authApp);

//
createEndpoints(
  app,
  "./cms/routes",
  "/cms",
);

export default app;
