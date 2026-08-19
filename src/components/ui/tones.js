import { tv } from "#/lib/tv.js";

export const tones = tv({
	slots: {
		surface: "",
		rule: "bg-linear-to-r",
	},
	variants: {
		tone: {
			accent: {
				surface: "bg-accent-soft text-accent",
				rule: "from-accent to-accent/20",
			},
			warm: {
				surface: "bg-warm-soft text-warm",
				rule: "from-warm to-warm/20",
			},
			positive: {
				surface: "bg-positive-soft text-positive",
				rule: "from-positive to-positive/20",
			},
			neutral: {
				surface: "bg-canvas text-ink-muted",
				rule: "from-line-strong to-line-strong/20",
			},
		},
	},
	defaultVariants: { tone: "accent" },
});
