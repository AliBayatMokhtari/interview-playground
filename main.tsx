import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/app";

const app = document.getElementById("app")!;
const root = createRoot(app);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
