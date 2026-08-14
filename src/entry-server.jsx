import { renderToString } from "react-dom/server";

import App from "./App";

// Used only at build time by scripts/prerender.mjs to produce the static HTML
// that crawlers and AI engines read before any JavaScript runs.
export function render() {
  return renderToString(<App />);
}
