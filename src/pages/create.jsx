import { Form } from "@base-ui/react/form";
import IconApi from "@iconify-react/material-symbols/api-rounded";
import IconArrowBack from "@iconify-react/material-symbols/arrow-back-rounded";
import IconBarChart from "@iconify-react/material-symbols/bar-chart-rounded";
import IconBolt from "@iconify-react/material-symbols/bolt-rounded";
import IconLink from "@iconify-react/material-symbols/link-rounded";
import IconVisibility from "@iconify-react/material-symbols/visibility-outline-rounded";
import { useState } from "react";
import { NavLink } from "react-router";

import { ShortenedPopup } from "#/components/shortened.jsx";
import { Button } from "#/components/ui/button.jsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	IconTile,
} from "#/components/ui/card.jsx";
import { Eyebrow } from "#/components/ui/divider.jsx";
import {
	FieldControl,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldRoot,
} from "#/components/ui/field.jsx";
import { useShortenUrlMutation } from "#/features/urls.js";
import { base, host } from "#/lib/base.js";

const perks = /** @type {const} */ ([
	{
		icon: IconBarChart,
		tone: "warm",
		title: "Real-time Analytics",
		description:
			"Track every click, geographical location, and referral source instantly.",
	},
	{
		icon: IconApi,
		tone: "accent",
		title: "Auto-generated QR",
		description:
			"Every link automatically creates a high-resolution QR code for print.",
	},
]);

function Page() {
	const [slug, setSlug] = useState("");
	const [shorten, { data, isLoading, reset, error }] = useShortenUrlMutation();
	const shortened = data && `${base}/${data.encoded}`;

	/** @param {{ url: string, custom: string }} values */
	function submit({ url, custom }) {
		void shorten({ url, custom: custom || undefined });
	}

	const errors =
		error && "data" in error
			? /** @type {{ results?: Record<string, string> }} */ (error.data)
					?.results
			: undefined;

	return (
		<section className="px-4 py-12 sm:py-16">
			<div className="mx-auto flex max-w-2xl flex-col gap-8">
				<div className="flex flex-col gap-3">
					<Button
						variant="link"
						size="sm"
						className="self-start"
						render={<NavLink to="/dashboard" />}
					>
						<IconArrowBack className="size-[1.25em]" />
						Back to Dashboard
					</Button>
					<h1 className="text-3xl font-bold tracking-tight text-ink">
						Create New Short Link
					</h1>
					<p className="text-ink-muted">
						Transform your long URLs into clean, manageable assets.
					</p>
				</div>

				<Card>
					<CardContent className="p-6 sm:p-8">
						<Form
							className="flex flex-col gap-6"
							errors={errors}
							onFormSubmit={submit}
						>
							<FieldRoot name="url">
								<FieldLabel className="text-eyebrow uppercase">
									Destination URL <span className="text-danger">*</span>
								</FieldLabel>
								<FieldControl
									type="url"
									required
									placeholder="https://example.com/your-long-url-here"
									leading={<IconLink className="size-[1.25em]" />}
									className="bg-canvas"
								/>
								<FieldDescription>
									Ensure your URL starts with http:// or https://
								</FieldDescription>
								<FieldError match="valueMissing">
									Enter a destination URL
								</FieldError>
								<FieldError />
							</FieldRoot>

							<FieldRoot name="custom">
								<FieldLabel className="text-eyebrow uppercase">
									Custom slug (optional)
								</FieldLabel>
								<div className="flex overflow-hidden rounded-control border border-line focus-within:border-accent">
									<span className="grid place-items-center bg-canvas px-3.5 text-sm text-ink-muted">
										{host}/
									</span>
									<FieldControl
										value={slug}
										onChange={(event) => {
											setSlug(event.target.value);
										}}
										placeholder="my-custom-slug"
										className="rounded-none border-0 border-l border-line"
									/>
								</div>
								<FieldDescription>
									Leave blank to generate a random unique identifier.
								</FieldDescription>
								<FieldError />
							</FieldRoot>

							<div className="flex flex-col gap-1 rounded-card bg-accent-soft p-4">
								<Eyebrow className="flex items-center gap-2">
									<IconVisibility className="size-[1.25em]" />
									Live preview
								</Eyebrow>
								<p className="text-ink">
									Your short link will be:{" "}
									<span className="font-medium text-accent">
										{base}/{slug || "your-code"}
									</span>
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-3">
								<Button
									type="submit"
									size="lg"
									disabled={isLoading}
								>
									Create Link
									<IconBolt className="size-[1.25em]" />
								</Button>
								<Button
									variant="ghost"
									size="lg"
									render={<NavLink to="/dashboard" />}
								>
									Cancel
								</Button>
							</div>
						</Form>
					</CardContent>
				</Card>

				<ShortenedPopup
					link={shortened}
					onClose={reset}
				/>

				<ul className="grid gap-6 sm:grid-cols-2">
					{perks.map(({ icon: Icon, tone, title, description }) => (
						<li
							key={title}
							className="flex gap-4"
						>
							<IconTile
								tone={tone}
								className="size-10 shrink-0 rounded-full"
							>
								<Icon className="size-[1.25em]" />
							</IconTile>
							<div className="flex flex-col gap-1">
								<CardTitle className="text-base">{title}</CardTitle>
								<CardDescription>{description}</CardDescription>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Page;
