const base =
	/** @type {string} */ (import.meta.env["VITE_API_URL"]) ??
	"http://localhost:3000";

/**
 *
 * @param {string} path
 * @param {ResponseInit} [init]
 */
export async function fetchApi(path, init) {
	const url = new URL(path, base);
	const res = await fetch(url, init);

	// TODO: Check for error
	return res;
}
