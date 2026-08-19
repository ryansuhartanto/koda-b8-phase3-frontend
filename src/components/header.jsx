import { Avatar } from "@base-ui/react/avatar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { Button } from "#/components/ui/button.jsx";
import { selectEmail, selectIsAuthenticated, unset } from "#/features/auth.js";
import { useAppDispatch, useAppSelector } from "#/store.js";

const links = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/analytics", label: "Analytics" },
	{ to: "/links", label: "Links" },
];

/**
 * @param {{ email: string }} props
 */
function GravatarAvatar({ email }) {
	const [hash, setHash] = useState("");

	// oxlint-disable promise/prefer-await-to-then
	useEffect(() => {
		void crypto.subtle
			.digest("SHA-256", new TextEncoder().encode(email))
			.then((digest) =>
				setHash(
					[...new Uint8Array(digest)]
						.map((byte) => byte.toString(16).padStart(2, "0"))
						.join(""),
				),
			)
			.catch((/** @type {unknown} */ error) => {
				throw error;
			});
	}, [email]);
	// oxlint-enable promise/prefer-await-to-then

	return (
		<Avatar.Root className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-line text-xs font-medium text-ink-muted">
			{hash && (
				<Avatar.Image
					src={`https://gravatar.com/avatar/${hash}?s=64&d=404`}
					width="32"
					height="32"
					className="size-full object-cover"
				/>
			)}
			<Avatar.Fallback>{email[0]?.toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
	);
}

export function Header() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const email = useAppSelector(selectEmail);
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
						<>
							{email && <GravatarAvatar email={email} />}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									dispatch(unset());
								}}
							>
								Logout
							</Button>
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
