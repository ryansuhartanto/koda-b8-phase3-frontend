import { NavLink } from "react-router";

import { Button } from "#/components/ui/button.jsx";
import { selectIsAuthenticated, unset } from "#/features/auth.js";
import { useAppDispatch, useAppSelector } from "#/store.js";

const links = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/analytics", label: "Analytics" },
	{ to: "/links", label: "Links" },
];

export function Header() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const dispatch = useAppDispatch();

	return (
		<div className="h-16">
			<div className="fixed inset-x-0 top-0 z-10 flex h-16 items-center gap-8 border-b border-line bg-surface px-4">
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
						<Button
							size="sm"
							onClick={() => {
								dispatch(unset());
							}}
						>
							Logout
						</Button>
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
