import { Avatar } from "@base-ui/react";
import { useEffect, useState } from "react";
import { cn } from "tailwind-variants";

/**
 * @import { ComponentProps } from "react";
 */

/**
 * @param {ComponentProps<typeof Avatar.Root> & { email?: string, size?: number }} props
 */
export function Gravatar({ email, size = 32, className, ...rest }) {
	const [hash, setHash] = useState("");

	// oxlint-disable promise/prefer-await-to-then
	useEffect(() => {
		if (!email) {
			setHash("");
			return;
		}

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
		<Avatar.Root
			style={{ width: size, height: size }}
			className={cn([
				"flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-line text-xs font-medium text-ink-muted",
				className,
			])}
			{...rest}
		>
			{hash && (
				<Avatar.Image
					// Request at 2x for high density displays.
					src={
						email && `https://gravatar.com/avatar/${hash}?s=${size * 2}&d=404`
					}
					width={size}
					height={size}
					className="size-full object-cover"
				/>
			)}
			<Avatar.Fallback>{email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
	);
}
