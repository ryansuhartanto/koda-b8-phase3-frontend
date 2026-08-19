import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { tv, withState } from "#/lib/tv.js";

/** @import { ComponentProps, ReactNode } from "react" */

const switchStyles = tv({
	slots: {
		root: [
			"flex h-6 w-11 shrink-0 items-center rounded-full bg-line-strong transition-colors",
			"focus-visible:focus-ring data-checked:bg-accent data-disabled:opacity-50",
		],
		thumb:
			"block size-5 translate-x-0.5 rounded-full bg-surface shadow-card transition-transform data-checked:translate-x-5.5",
	},
});

/** @param {ComponentProps<typeof BaseSwitch.Root>} props */
export function Switch({ className, ...props }) {
	const styles = switchStyles();
	return (
		<BaseSwitch.Root
			className={withState((cls) => styles.root({ class: cls }), className)}
			{...props}
		>
			<BaseSwitch.Thumb className={styles.thumb()} />
		</BaseSwitch.Root>
	);
}

const avatarStyles = tv({
	slots: {
		root: "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-canvas",
		image: "size-full object-cover",
		fallback: "text-xs font-medium text-ink-muted",
	},
});

/**
 * @param {ComponentProps<typeof BaseAvatar.Root> & {
 *   src?: string,
 *   alt?: string,
 *   fallback?: ReactNode,
 * }} props
 */
export function Avatar({ className, src, alt, fallback, ...props }) {
	const styles = avatarStyles();
	return (
		<BaseAvatar.Root
			className={withState((cls) => styles.root({ class: cls }), className)}
			{...props}
		>
			<BaseAvatar.Image
				src={src}
				alt={alt}
				className={styles.image()}
			/>
			<BaseAvatar.Fallback className={styles.fallback()}>
				{fallback}
			</BaseAvatar.Fallback>
		</BaseAvatar.Root>
	);
}
