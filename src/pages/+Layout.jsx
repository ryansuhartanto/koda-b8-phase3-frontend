import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

import { Footer } from "#/components/footer.jsx";

/**
 * @import { ComponentProps } from "react";
 */

/**
 * @typedef {ComponentProps<"div"> & { header?: boolean }} LayoutProps
 */

/**
 *
 * @param {LayoutProps} props
 * @returns
 */
function Layout({ header = true, className, ...rest }) {
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

			<header>{header && <></>}</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default Layout;
