import { use } from "react";

import { fetchApi } from "#/lib/api.js";

// oxlint-disable-next-line import/no-unassigned-import
import "#/style.css";

// oxlint-disable-next-line unicorn/prefer-top-level-await promise/prefer-await-to-then
const fetchHello = fetchApi("/").then(async (res) => res.text());

export function App() {
	const hello = use(fetchHello);

	return <h1>{hello}</h1>;
}
