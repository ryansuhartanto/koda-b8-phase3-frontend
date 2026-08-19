import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/es/integration/react";

import LayoutRoot from "#/pages/+Layout.jsx";
import { persistor, store } from "#/store.js";

// oxlint-disable-next-line import/no-unassigned-import
import "#/style.css";

/**
 * @import { LazyRouteFunction, RouteObject } from "react-router";
 */

/**
 * @param {() => Promise<{ default: RouteObject["Component"] }>} load
 * @returns {LazyRouteFunction<RouteObject>}
 */
function page(load) {
	return async () => {
		const { default: Component, ...rest } = await load();
		return { ...rest, Component };
	};
}

const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutRoot,
		children: [
			{
				index: true,
				lazy: page(async () => import("#/pages/index.jsx")),
			},
			{
				path: "/login",
				lazy: page(async () => import("#/pages/login.jsx")),
			},
			{
				path: "/create",
				lazy: page(async () => import("#/pages/create.jsx")),
			},
			{
				path: "/links",
				lazy: page(async () => import("#/pages/links.jsx")),
			},
			{
				path: "/profile",
				lazy: page(async () => import("#/pages/profile.jsx")),
			},
			{
				path: "/register",
				lazy: page(async () => import("#/pages/register.jsx")),
			},
			{
				path: "*",
				lazy: page(async () => import("#/pages/redirect.jsx")),
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
