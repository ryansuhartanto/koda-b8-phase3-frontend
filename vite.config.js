import oxfmt from "@kekkon-nexus/config/oxfmt";
import oxlint from "@kekkon-nexus/config/oxlint";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite-plus";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const port = Number.parseInt(env["WEB_PORT"] ?? env["PORT"] ?? "3002", 10);

	return {
		fmt: {
			...oxfmt,
			ignorePatterns: ["aube-lock.yaml"],
		},
		lint: {
			extends: [oxlint],
			jsPlugins: [
				{
					name: "vite-plus",
					specifier: "vite-plus/oxlint-plugin",
				},
				{
					name: "no-relative-import-paths",
					specifier: "eslint-plugin-no-relative-import-paths",
				},
			],

			rules: {
				"vite-plus/prefer-vite-plus-imports": "error",
				"no-relative-import-paths/no-relative-import-paths": [
					"warn",
					{ allowSameFolder: false, rootDir: `/src`, prefix: "#" },
				],
			},

			options: {
				typeAware: true,
				typeCheck: true,
			},
		},
		staged: {
			"*": "vp check --fix --no-error-on-unmatched-pattern",
		},

		plugins: [react()],

		preview: {
			port,
			strictPort: true,
		},
		server: {
			port,
			strictPort: true,
		},
	};
});
