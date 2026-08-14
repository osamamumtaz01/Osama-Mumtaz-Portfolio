import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");

// The production build ships prerendered markup, so hydrate it rather than
// throwing it away and re-rendering. `npm run dev` serves an empty root and
// falls back to a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
