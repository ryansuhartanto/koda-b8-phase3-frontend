import { Field } from "@base-ui/react/field";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps, ReactNode } from "react" */
/** @import { VariantProps } from "tailwind-variants" */

const field = tv({
	slots: {
		root: "flex flex-col gap-2",
		label: "text-sm font-medium text-ink",
		control: [
			"w-full rounded-control border border-line bg-surface text-ink transition",
			"placeholder:text-ink-subtle focus-visible:focus-ring focus-visible:border-accent",
			"disabled:bg-canvas disabled:text-ink-subtle data-invalid:border-danger",
		],
		adornment: "absolute flex",
		description: "text-xs text-ink-subtle",
		error: "text-xs font-medium text-danger",
	},
	variants: {
		size: {
			md: { control: "h-11 px-3.5 text-sm" },
			lg: { control: "h-12 px-4 text-base" },
		},
		hasLeading: { true: { control: "pl-10" } },
		hasTrailing: { true: { control: "pr-11" } },
	},
	defaultVariants: { size: "md" },
});

/** @param {ComponentProps<typeof Field.Root>} props */
export function FieldRoot({ className, ...props }) {
	return (
		<Field.Root
			className={withState((cls) => field().root({ class: cls }), className)}
			{...props}
		/>
	);
}

/** @param {ComponentProps<typeof Field.Label>} props */
export function FieldLabel({ className, ...props }) {
	return (
		<Field.Label
			className={withState((cls) => field().label({ class: cls }), className)}
			{...props}
		/>
	);
}

/**
 * `size` shadows the native input attribute of the same name, so it is omitted
 * from the underlying props rather than intersected.
 *
 * @typedef {Omit<ComponentProps<typeof Field.Control>, "size">
 *   & Pick<VariantProps<typeof field>, "size">
 *   & { leading?: ReactNode, trailing?: ReactNode }} FieldControlProps
 */

/** @param {FieldControlProps} props */
export function FieldControl({ className, leading, trailing, size, ...props }) {
	const styles = field({
		size,
		hasLeading: Boolean(leading),
		hasTrailing: Boolean(trailing),
	});

	const control = (
		<Field.Control
			className={withState((cls) => styles.control({ class: cls }), className)}
			{...props}
		/>
	);

	if (!leading && !trailing) {
		return control;
	}

	return (
		<div className="relative flex items-center">
			{leading ? (
				<span
					className={styles.adornment({
						class: "pointer-events-none left-3.5 text-ink-subtle",
					})}
				>
					{leading}
				</span>
			) : null}
			{control}
			{trailing ? (
				<span className={styles.adornment({ class: "right-2" })}>
					{trailing}
				</span>
			) : null}
		</div>
	);
}

/** @param {ComponentProps<typeof Field.Description>} props */
export function FieldDescription({ className, ...props }) {
	return (
		<Field.Description
			className={withState(
				(cls) => field().description({ class: cls }),
				className,
			)}
			{...props}
		/>
	);
}

/** @param {ComponentProps<typeof Field.Error>} props */
export function FieldError({ className, ...props }) {
	return (
		<Field.Error
			className={withState((cls) => field().error({ class: cls }), className)}
			{...props}
		/>
	);
}
