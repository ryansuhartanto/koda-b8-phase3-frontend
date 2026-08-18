import { createRoot } from "react-dom/client";

import { App } from "#/app";

const node = /** @type {!HTMLElement} */ (document.querySelector("#root"));
const root = createRoot(node);

root.render(<App />);
