import IconAdd from "@iconify-react/material-symbols/add-rounded";
import IconLogout from "@iconify-react/material-symbols/logout-rounded";
import { NavLink } from "react-router";

import { Gravatar } from "#/components/gravatar.jsx";
import { Button } from "#/components/ui/button.jsx";
import { Tooltip } from "#/components/ui/tooltip.jsx";
import { selectEmail, selectIsAuthenticated, unset } from "#/features/auth.js";
import { useAppDispatch, useAppSelector } from "#/store.js";

const links = [
	// { to: "/dashboard", label: "Dashboard" },
	// { to: "/analytics", label: "Analytics" },
	{ to: "/links", label: "Links" },
];

export function Header() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const email = useAppSelector(selectEmail);
	const dispatch = useAppDispatch();

	return (
		<div className="h-16">
			<div className="fixed inset-x-0 top-0 z-10 flex h-16 items-center gap-4 border-b border-line bg-surface px-4 sm:gap-8">
				<NavLink
					to="/"
					className="text-lg font-black tracking-tight text-ink"
				>
					ShortLink
				</NavLink>

				{isAuthenticated && (
					<nav>
						<ul className="flex gap-6 text-sm">
							{links.map(({ to, label }) => (
								<li key={to}>
									<NavLink
										to={to}
										className={({ isActive }) =>
											isActive
												? "text-accent font-medium"
												: "text-ink-muted transition-colors hover:text-ink"
										}
									>
										{label}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				)}

				<div className="ml-auto flex items-center gap-2">
					{isAuthenticated ? (
						<>
							<Tooltip
								label="Create New Link"
								className="sm:hidden"
								render={
									<Button
										size="sm"
										aria-label="Create New Link"
										className="max-sm:size-11 max-sm:px-0"
										render={<NavLink to="/create" />}
									>
										<IconAdd className="size-[1.25em]" />
										<span className="max-sm:hidden">Create New Link</span>
									</Button>
								}
							/>
							<Tooltip
								label="Logout"
								render={
									<Button
										variant="ghost"
										shape="icon"
										size="sm"
										aria-label="Logout"
										onClick={() => {
											dispatch(unset());
										}}
									>
										<IconLogout className="size-[1.25em]" />
									</Button>
								}
							/>

							<Tooltip
								label="Profile"
								render={
									<NavLink
										to="/profile"
										aria-label="Profile"
										className="rounded-full transition hover:opacity-80 focus-visible:focus-ring"
									>
										<Gravatar email={email} />
									</NavLink>
								}
							/>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								size="sm"
								render={<NavLink to="/login" />}
							>
								Login
							</Button>
							<Button
								size="sm"
								render={<NavLink to="/register" />}
							>
								Sign Up
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
