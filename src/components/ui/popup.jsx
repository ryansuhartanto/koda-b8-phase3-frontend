import { Dialog } from "@base-ui/react/dialog";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps, ReactNode } from "react" */

const popup = tv({
	slots: {
		backdrop:
			"fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0",
		root: [
			"fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-1/2",
			"flex flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-raised sm:p-8",
			"transition data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
		],
		title: "text-xl font-semibold tracking-tight text-ink",
		description: "text-sm text-ink-muted",
		footer: "flex flex-wrap items-center gap-3",
	},
});

/**
 * @typedef {ComponentProps<typeof Dialog.Popup> & {
 *   open?: boolean,
 *   onOpenChange?: ComponentProps<typeof Dialog.Root>["onOpenChange"],
 *   title: ReactNode,
 *   description?: ReactNode,
 * }} PopupProps
 */

/** @param {PopupProps} props */
export function Popup({
	open,
	onOpenChange,
	title,
	description,
	className,
	children,
	...props
}) {
	const styles = popup();

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<Dialog.Portal>
				<Dialog.Backdrop className={styles.backdrop()} />
				<Dialog.Popup
					className={withState((cls) => styles.root({ class: cls }), className)}
					{...props}
				>
					<Dialog.Title className={styles.title()}>{title}</Dialog.Title>
					{description && (
						<Dialog.Description className={styles.description()}>
							{description}
						</Dialog.Description>
					)}
					{children}
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

/** @param {ComponentProps<"div">} props */
export function PopupFooter({ className, ...props }) {
	return (
		<div
			className={popup().footer({ class: className })}
			{...props}
		/>
	);
}

export const PopupClose = Dialog.Close;
