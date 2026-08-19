import { Separator } from "@base-ui/react/separator";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps } from "react" */

const divider = tv({
	base: "bg-line",
	variants: {
		orientation: {
			horizontal: "h-px w-full",
			vertical: "h-full w-px",
		},
	},
	defaultVariants: { orientation: "horizontal" },
});

const labelled = tv({
	slots: {
		root: "flex items-center gap-3",
		label: "text-eyebrow text-ink-subtle uppercase",
	},
});

/** @param {ComponentProps<typeof Separator>} props */
export function Divider({ className, orientation = "horizontal", ...props }) {
	return (
		<Separator
			orientation={orientation}
			className={withState(
				(cls) => divider({ orientation, class: cls }),
				className,
			)}
			{...props}
		/>
	);
}

/** @param {ComponentProps<"div">} props */
export function LabeledDivider({ className, children, ...props }) {
	const styles = labelled();
	return (
		<div
			className={styles.root({ class: className })}
			{...props}
		>
			<Divider className="flex-1" />
			<span className={styles.label()}>{children}</span>
			<Divider className="flex-1" />
		</div>
	);
}

const eyebrow = tv({ base: "text-eyebrow text-accent uppercase" });

/** @param {ComponentProps<"p">} props */
export function Eyebrow({ className, ...props }) {
	return (
		<p
			className={eyebrow({ class: className })}
			{...props}
		/>
	);
}
