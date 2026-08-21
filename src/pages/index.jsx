import { Form } from "@base-ui/react/form";
import IconBolt from "@iconify-react/material-symbols/bolt-rounded";
import IconCheck from "@iconify-react/material-symbols/check-circle-rounded";
import IconEditNote from "@iconify-react/material-symbols/edit-note-rounded";
import IconGroup from "@iconify-react/material-symbols/group-rounded";
import IconLink from "@iconify-react/material-symbols/link-rounded";

import { ShortenedPopup } from "#/components/shortened.jsx";
import { Button } from "#/components/ui/button.jsx";
import {
	AccentRule,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	IconTile,
} from "#/components/ui/card.jsx";
import { Eyebrow } from "#/components/ui/divider.jsx";
import { FieldControl, FieldRoot } from "#/components/ui/field.jsx";
import { useShortenUrlMutation } from "#/features/urls.js";
import { base } from "#/lib/base.js";

const features = /** @type {const} */ ([
	{
		icon: IconBolt,
		tone: "accent",
		title: "Easy Create",
		description:
			"Generate a short link with a single click, or from the API when you need it in a pipeline.",
	},
	{
		icon: IconEditNote,
		tone: "positive",
		title: "Custom Slugs",
		description:
			"Keep your links readable. Pick the ending yourself instead of shipping random characters.",
	},
	{
		icon: IconGroup,
		tone: "warm",
		title: "Team Ready",
		description:
			"Shared workspaces, per-member permissions, and one analytics view for the whole team.",
	},
]);

const insights = [
	"Geographic distribution maps",
	"Device and browser breakdown",
	"UTM parameter tracking",
];

function Hero() {
	const [shorten, { data, isLoading, reset, error }] = useShortenUrlMutation();
	const shortened = data && `${base}/${data.encoded}`;

	/** @param {{ url: string }} values */
	function submit({ url }) {
		void shorten({ url });
	}

	const errors =
		error && "data" in error
			? /** @type {{ results?: Record<string, string> }} */ (error.data)
					?.results
			: undefined;

	return (
		<section className="min-h-dvh grid place-items-center px-4 py-16 text-center">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
				<h1 className="text-4xl font-black tracking-tight text-balance text-ink sm:text-5xl md:text-6xl">
					Shorten URLs. <span className="text-accent">Share easily.</span>
				</h1>
				<p className="max-w-xl text-lg text-pretty text-ink-muted">
					Turn long, unwieldy URLs into short links your team can paste
					anywhere, then watch how they perform.
				</p>
				<div className="flex flex-wrap justify-center gap-3">
					<Button
						size="lg"
						nativeButton={false}
						render={<a href="/register" />}
					>
						Get Started
					</Button>
					<Button
						variant="secondary"
						size="lg"
						nativeButton={false}
						render={<a href="#features" />}
					>
						Learn More
					</Button>
				</div>
				<Card
					elevation="raised"
					className="mt-6 w-full"
				>
					<CardContent className="p-3!">
						<Form
							className="flex flex-col gap-3 sm:flex-row"
							errors={errors}
							onFormSubmit={submit}
						>
							<FieldRoot
								name="url"
								className="flex-1"
							>
								<FieldControl
									type="url"
									size="lg"
									required
									placeholder="https://example.com/a/very/long/path"
									leading={<IconLink className="size-[1.25em]" />}
									className="border-transparent bg-canvas"
								/>
							</FieldRoot>
							<Button
								type="submit"
								size="lg"
								disabled={isLoading}
							>
								Shorten
							</Button>
						</Form>
					</CardContent>
				</Card>

				<ShortenedPopup
					link={shortened}
					onClose={reset}
				/>
			</div>
		</section>
	);
}

function Features() {
	return (
		<section
			id="features"
			className="bg-surface px-4 py-16 sm:py-24"
		>
			<div className="mx-auto flex max-w-5xl flex-col gap-12">
				<div className="flex flex-col gap-2">
					<Eyebrow>Features</Eyebrow>
					<h2 className="text-3xl font-bold tracking-tight text-ink">
						Everything a short link should do
					</h2>
				</div>
				<ul className="grid gap-6 lg:grid-cols-3">
					{features.map(({ icon: Icon, tone, title, description }) => (
						<li key={title}>
							<Card
								interactive
								className="h-full"
							>
								<CardHeader className="gap-4">
									<IconTile tone={tone}>
										<Icon className="size-[1.5em]" />
									</IconTile>
									<CardTitle className="text-xl">{title}</CardTitle>
									<CardDescription>{description}</CardDescription>
								</CardHeader>
								<CardContent>
									<AccentRule tone={tone} />
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

const bars = [40, 65, 35, 80, 55, 95, 70, 45, 85, 60, 30, 75];

/** @param {number} index */
function barAt(index) {
	if (index >= 8) {
		return "max-md:hidden min-lg:hidden";
	}

	if (index >= 6) {
		return "max-sm:hidden";
	}

	return "";
}

function Insights() {
	return (
		<section className="px-4 py-16 sm:py-24">
			<div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
				<Card
					elevation="raised"
					className="overflow-hidden"
				>
					<CardContent className="flex h-64 items-end gap-3 p-4 sm:h-96 sm:p-8 lg:gap-2 *:rounded-t-control *:bg-linear-to-t *:from-accent-soft *:to-accent">
						{bars.map((height, index) => (
							<div
								key={height}
								style={{ height: `${height}%` }}
								className={`flex-1 ${barAt(index)}`}
								aria-hidden
							/>
						))}
					</CardContent>
				</Card>
				<div className="flex flex-col gap-5">
					<Eyebrow>Data driven insights</Eyebrow>
					<h2 className="text-3xl font-bold tracking-tight text-balance text-ink">
						See how your links perform, in real time
					</h2>
					<p className="text-pretty text-ink-muted">
						Every click is a data point. The dashboard shows where traffic comes
						from, who is engaging, and which links are actually doing work.
					</p>
					<ul className="flex flex-col gap-3">
						{insights.map((item) => (
							<li
								key={item}
								className="flex items-center gap-3 text-ink"
							>
								<IconCheck className="size-[1.25em] text-accent" />
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function Page() {
	return (
		<>
			<Hero />
			<Features />
			<Insights />
		</>
	);
}

export default Page;
