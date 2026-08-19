import { Outlet, ScrollRestoration, useMatches } from "react-router";
import { cn } from "tailwind-variants";

import { Footer } from "#/components/footer.jsx";
import { Header } from "#/components/header.jsx";

/**
 * @import { ComponentProps } from "react";
 */

/**
 * @typedef {ComponentProps<"div">} LayoutProps
 */

/**
 *
 * @param {LayoutProps} props
 * @returns
 */
function Layout({ className, ...rest }) {
	const header = !useMatches().some(
		(match) =>
			/** @type {{ header?: boolean }} */ (match.handle)?.header === false,
	);

	return (
		<div
			className={cn([
				"relative min-h-dvh grid grid-rows-[auto_1fr_auto]",
				className,
			])}
			{...rest}
		>
			{/* Background */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-50 overflow-hidden"
			>
				<div className="absolute -top-24 -left-32 size-128 rounded-full bg-accent-soft opacity-70 blur-3xl" />
				<div className="absolute -right-24 -bottom-32 size-96 rounded-full bg-accent-soft opacity-60 blur-3xl" />
			</div>

			<ScrollRestoration />

			<header>{header && <Header />}</header>
			<main className="flex flex-col *:grow">
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default Layout;
