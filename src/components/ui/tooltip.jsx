import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps, ReactElement, ReactNode } from "react" */

const tooltip = tv({
	base: [
		"rounded-control bg-ink px-2.5 py-1.5 text-xs font-medium text-surface shadow-raised",
		"transition data-ending-style:opacity-0 data-starting-style:opacity-0",
	],
});

/**
 * @typedef {ComponentProps<typeof BaseTooltip.Popup> & {
 *   label: ReactNode,
 *   render: ReactElement,
 * }} TooltipProps
 */

/** @param {TooltipProps} props */
export function Tooltip({ label, render, className, ...props }) {
	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger render={render} />
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner
					className="z-50"
					sideOffset={8}
				>
					<BaseTooltip.Popup
						className={withState((cls) => tooltip({ class: cls }), className)}
						{...props}
					>
						{label}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
