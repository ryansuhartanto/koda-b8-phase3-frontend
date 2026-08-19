import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// oxlint-disable-next-line import/no-unassigned-import
import "#/style.css";

const router = createBrowserRouter([
	{ path: "/", Component: lazy(async () => import("#/pages/index.jsx")) },
]);

export function App() {
	return <RouterProvider router={router} />;
}
