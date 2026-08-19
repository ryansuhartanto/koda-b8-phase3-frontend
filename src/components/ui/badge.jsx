import { tones } from "#/components/ui/tones.js";
import { tv } from "#/lib/tv.js";

/** @import { ComponentProps } from "react" */
/** @import { VariantProps } from "tailwind-variants" */

const badge = tv({
	extend: tones,
	slots: {
		surface:
			"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
	},
	defaultVariants: { tone: "neutral" },
});

/** @param {ComponentProps<"span"> & VariantProps<typeof tones>} props */
export function Badge({ className, tone, ...props }) {
	return (
		<span
			className={badge({ tone }).surface({ class: className })}
			{...props}
		/>
	);
}
