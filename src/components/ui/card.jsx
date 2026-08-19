import { tones } from "#/components/ui/tones.js";
import { tv } from "#/lib/tv.js";

/** @import { ComponentProps } from "react" */
/** @import { VariantProps } from "tailwind-variants" */

const card = tv({
	slots: {
		root: "rounded-card border border-line bg-surface",
		header: "flex flex-col gap-1 p-8",
		title: "text-2xl font-semibold tracking-tight text-ink",
		description: "text-sm text-ink-muted",
		content: "p-8 pt-0",
		footer: "flex items-center gap-3 p-8 pt-0",
	},
	variants: {
		elevation: {
			flat: { root: "shadow-card" },
			raised: { root: "shadow-raised" },
		},
		interactive: {
			true: { root: "transition hover:border-line-strong hover:shadow-raised" },
		},
	},
	defaultVariants: { elevation: "flat", interactive: false },
});

const ornament = tv({
	extend: tones,
	slots: {
		surface: "flex size-12 items-center justify-center rounded-tile",
		rule: "h-1 w-12 rounded-full",
	},
});

/** @typedef {VariantProps<typeof tones>} ToneProps */

/** @param {ComponentProps<"div"> & VariantProps<typeof card>} props */
export function Card({ className, elevation, interactive, ...props }) {
	return (
		<div
			className={card({ elevation, interactive }).root({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div">} props */
export function CardHeader({ className, ...props }) {
	return (
		<div
			className={card().header({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"h2">} props */
export function CardTitle({ className, ...props }) {
	return (
		<h2
			className={card().title({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"p">} props */
export function CardDescription({ className, ...props }) {
	return (
		<p
			className={card().description({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div">} props */
export function CardContent({ className, ...props }) {
	return (
		<div
			className={card().content({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div">} props */
export function CardFooter({ className, ...props }) {
	return (
		<div
			className={card().footer({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div"> & ToneProps} props */
export function IconTile({ className, tone, ...props }) {
	return (
		<div
			className={ornament({ tone }).surface({ class: className })}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div"> & ToneProps} props */
export function AccentRule({ className, tone, ...props }) {
	return (
		<div
			aria-hidden
			className={ornament({ tone }).rule({ class: className })}
			{...props}
		/>
	);
}
