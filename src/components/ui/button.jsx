import { Button as BaseButton } from "@base-ui/react/button";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps } from "react" */
/** @import { VariantProps } from "tailwind-variants" */

const button = tv({
	base: [
		"relative inline-flex shrink-0 items-center justify-center rounded-control font-medium whitespace-nowrap cursor-pointer transition focus-visible:focus-ring",
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:cursor-not-allowed",
	],
	variants: {
		variant: {
			primary: [
				"bg-linear-to-br from-accent-deep to-accent text-white shadow-accent",
				"after:absolute after:inset-0 after:rounded-[inherit] after:bg-white after:opacity-0 after:transition-opacity after:pointer-events-none",
				"hover:after:opacity-10 active:after:bg-ink active:after:opacity-15",
			],
			secondary:
				"border border-line bg-surface text-ink shadow-card hover:border-line-strong hover:bg-canvas",
			ghost: "text-ink-muted hover:bg-canvas hover:text-ink",
			link: "px-0! text-accent underline-offset-4 hover:underline",
		},
		shape: { text: "", icon: "" },
		size: { sm: "", md: "", lg: "" },
	},
	compoundVariants: [
		{ shape: "text", size: "sm", class: "h-9 gap-1.5 px-3.5 text-sm" },
		{ shape: "text", size: "md", class: "h-11 gap-2 px-5 text-sm" },
		{ shape: "text", size: "lg", class: "h-12 gap-2 px-6 text-base" },
		{ shape: "icon", size: "sm", class: "size-9" },
		{ shape: "icon", size: "md", class: "size-11" },
		{ shape: "icon", size: "lg", class: "size-12" },
	],
	defaultVariants: { variant: "primary", shape: "text", size: "md" },
});

/**
 * @typedef {ComponentProps<typeof BaseButton> & VariantProps<typeof button>} ButtonBaseProps
 */

/**
 * @typedef {(ButtonBaseProps & { shape?: "text" }) | (ButtonBaseProps & { shape: "icon", "aria-label": string })} ButtonProps
 */

/** @param {ButtonProps} props */
export function Button({ className, variant, size, shape, ...props }) {
	return (
		<BaseButton
			className={withState(
				(cls) => button({ variant, size, shape, class: cls }),
				className,
			)}
			{...props}
		/>
	);
}
