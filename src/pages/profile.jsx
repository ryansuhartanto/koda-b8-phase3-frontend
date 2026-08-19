import IconLink from "@iconify-react/material-symbols/link-rounded";
import IconLogout from "@iconify-react/material-symbols/logout-rounded";
import IconNotifications from "@iconify-react/material-symbols/notifications-outline-rounded";
import IconShield from "@iconify-react/material-symbols/shield-outline-rounded";
import { useState } from "react";
import { NavLink } from "react-router";

import { Gravatar } from "#/components/gravatar.jsx";
import { Badge } from "#/components/ui/badge.jsx";
import { Button } from "#/components/ui/button.jsx";
import { Card, CardContent, CardTitle } from "#/components/ui/card.jsx";
import { Divider, Eyebrow } from "#/components/ui/divider.jsx";
import { Switch } from "#/components/ui/toggles.jsx";
import { selectEmail, unset } from "#/features/auth.js";
import { useListUrlsQuery } from "#/features/urls.js";
import { useAppDispatch, useAppSelector } from "#/store.js";

function Page() {
	const email = useAppSelector(selectEmail);
	const dispatch = useAppDispatch();
	const { data } = useListUrlsQuery({ limit: 1 });
	const [notifications, setNotifications] = useState(true);

	return (
		<section className="px-4 py-16">
			<div className="mx-auto flex max-w-2xl flex-col gap-4">
				<Eyebrow className="text-ink-subtle">Account management</Eyebrow>

				<Card>
					<CardContent className="flex flex-col gap-8 p-8">
						<div className="flex items-center justify-between">
							<CardTitle>Profile</CardTitle>
							<Badge tone="accent">Pro member</Badge>
						</div>

						<div className="flex items-center gap-5">
							<Gravatar
								email={email}
								size={80}
								className="rounded-card"
							/>
							<div className="flex flex-col gap-1">
								<p className="text-xl font-semibold text-ink">
									{email?.split("@")[0]}
								</p>
								<p className="text-sm text-ink-muted">ShortLink member</p>
							</div>
						</div>

						<dl className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2 rounded-card bg-canvas p-5">
								<dt className="text-eyebrow text-ink-subtle uppercase">
									Email address
								</dt>
								<dd className="truncate text-ink">{email}</dd>
							</div>
							<div className="flex flex-col gap-2 rounded-card bg-canvas p-5">
								<dt className="text-eyebrow text-ink-subtle uppercase">
									Account tenure
								</dt>
								<dd className="text-ink">Member since sign-up</dd>
							</div>
						</dl>

						<div className="flex items-center gap-4 rounded-card bg-linear-to-br from-accent-deep to-accent p-5 text-white shadow-accent">
							<span className="grid size-11 shrink-0 place-items-center rounded-tile bg-white/15">
								<IconLink className="size-[1.25em]" />
							</span>
							<div className="flex flex-col">
								<p className="text-eyebrow uppercase opacity-80">
									Active assets
								</p>
								<p className="text-2xl font-bold">{data?.total ?? 0}</p>
							</div>
							<Button
								variant="secondary"
								size="sm"
								className="ml-auto border-transparent bg-white/15 text-white hover:border-transparent hover:bg-white/25"
								render={<NavLink to="/links" />}
							>
								View links
							</Button>
						</div>

						<ul className="flex flex-col gap-5">
							<li className="flex items-center gap-3">
								<IconNotifications className="size-[1.5em] text-ink-muted" />
								<span className="text-ink">Email Notifications</span>
								<Switch
									checked={notifications}
									onCheckedChange={setNotifications}
									aria-label="Email notifications"
									className="ml-auto"
								/>
							</li>
							<li className="flex items-center gap-3">
								<IconShield className="size-[1.5em] text-ink-muted" />
								<span className="text-ink">Two-Factor Authentication</span>
								<span className="ml-auto text-eyebrow font-medium text-danger uppercase">
									Disabled
								</span>
							</li>
						</ul>

						<Divider />

						<Button
							variant="secondary"
							size="lg"
							onClick={() => {
								dispatch(unset());
							}}
						>
							<IconLogout className="size-[1.25em]" />
							Logout Session
						</Button>
					</CardContent>
				</Card>

				<p className="text-center text-sm text-ink-subtle">
					Your data is encrypted using AES-256 standards.{" "}
					<a
						href="/privacy"
						className="text-accent underline-offset-4 hover:underline"
					>
						Privacy Policy
					</a>
				</p>
			</div>
		</section>
	);
}

export default Page;
