import IconAddLink from "@iconify-react/material-symbols/add-link-rounded";
import IconApi from "@iconify-react/material-symbols/api-rounded";
import IconArrowBack from "@iconify-react/material-symbols/arrow-back-rounded";
import IconBarChart from "@iconify-react/material-symbols/bar-chart-rounded";
import IconLinkOff from "@iconify-react/material-symbols/link-off-rounded";
import IconWarning from "@iconify-react/material-symbols/warning-rounded";

import { Button } from "#/components/ui/button.jsx";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	IconTile,
} from "#/components/ui/card.jsx";
import { selectIsAuthenticated } from "#/features/auth.js";
import { useAppSelector } from "#/store.js";

const shortcuts = /** @type {const} */ ([
	{
		icon: IconBarChart,
		href: "/dashboard",
		title: "Check Analytics",
		description: "Track your active links and traffic sources in real-time.",
	},
	{
		icon: IconAddLink,
		href: "/",
		title: "New ShortLink",
		description: "Create a brand new architected URL in seconds.",
	},
	{
		icon: IconApi,
		href: "/docs",
		title: "Developer API",
		description: "Integrate our link infrastructure into your apps.",
	},
]);

export const handle = { header: false };

function Page() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	return (
		<section className="grid place-items-center px-4 py-24 text-center">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
				<div className="relative">
					<IconTile
						tone="neutral"
						className="size-24 rounded-full"
					>
						<IconLinkOff className="size-[2.5em]" />
					</IconTile>
					<span className="absolute -top-1 -right-1 grid size-9 place-items-center rounded-tile bg-accent text-white shadow-accent">
						<IconWarning className="size-[1.25em]" />
					</span>
				</div>

				<div className="flex flex-col gap-3">
					<p className="text-5xl font-black tracking-tight text-accent">404</p>
					<h1 className="text-3xl font-bold tracking-tight text-ink">
						Page Not Found
					</h1>
					<p className="text-pretty text-ink-muted">
						The page you&apos;re looking for doesn&apos;t exist. It may have
						been moved, deleted, or the link might be broken.
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-3">
					{isAuthenticated ? (
						<Button render={<a href="/dashboard" />}>
							<IconArrowBack className="size-[1.25em]" />
							Go to Dashboard
						</Button>
					) : (
						<Button render={<a href="/" />}>
							<IconArrowBack className="size-[1.25em]" />
							Go to Landing
						</Button>
					)}
					<Button
						variant="secondary"
						render={<a href="/support" />}
					>
						Report an Issue
					</Button>
				</div>

				<ul className="mt-6 grid w-full gap-6 sm:grid-cols-3">
					{shortcuts.map(({ icon: Icon, href, title, description }) => (
						<li key={title}>
							<Card
								interactive
								className="h-full"
							>
								<CardHeader className="gap-3 p-6 text-left">
									<Icon className="size-6 text-accent" />
									<CardTitle className="text-base">
										<a href={href}>{title}</a>
									</CardTitle>
									<CardDescription>{description}</CardDescription>
								</CardHeader>
							</Card>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Page;
