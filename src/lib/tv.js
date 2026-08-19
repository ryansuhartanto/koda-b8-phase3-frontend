/** @import { TWMergeConfig } from "tailwind-variants" */
import { createTV } from "tailwind-variants";

/**
 * @type {TWMergeConfig}
 */
export const twMergeConfig = {
	extend: {
		theme: {
			color: [
				"canvas",
				"surface",
				"line",
				"line-strong",
				"ink",
				"ink-muted",
				"ink-subtle",
				"accent",
				"accent-deep",
				"accent-soft",
				"warm",
				"warm-soft",
				"positive",
				"positive-soft",
				"danger",
			],
			radius: ["control", "card", "tile"],
			shadow: ["card", "raised", "accent"],
			text: ["eyebrow"],
		},
	},
};

export const tv = createTV({ twMergeConfig });

/**
 * @template TState
 * @param {(value?: string) => string} resolve
 * @param {string | ((state: TState) => string | undefined) | undefined} className
 * @returns {string | ((state: TState) => string)}
 */
export function withState(resolve, className) {
	return typeof className === "function"
		? (state) => resolve(className(state))
		: resolve(className);
}
