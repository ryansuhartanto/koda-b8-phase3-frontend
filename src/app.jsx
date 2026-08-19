import { lazy } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/es/integration/react";

import LayoutRoot from "#/pages/+Layout.jsx";
import { persistor, store } from "#/store.js";

// oxlint-disable-next-line import/no-unassigned-import
import "#/style.css";

const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutRoot,
		children: [
			{
				index: true,
				Component: lazy(async () => import("#/pages/index.jsx")),
			},
			{
				path: "/login",
				Component: lazy(async () => import("#/pages/login.jsx")),
			},
		],
	},
]);

export function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	);
}
