import IconClose from "@iconify-react/material-symbols/close-rounded";
import IconCopy from "@iconify-react/material-symbols/content-copy-outline-rounded";
import IconDownload from "@iconify-react/material-symbols/download-rounded";
import { useRef } from "react";
import { NavLink } from "react-router";

import QRCode from "#/components/qr.jsx";
import { Button } from "#/components/ui/button.jsx";
import { Popup, PopupClose, PopupFooter } from "#/components/ui/popup.jsx";
import { selectIsAuthenticated } from "#/features/auth.js";
import { useAppSelector } from "#/store.js";

/** @import { RefObject } from "react" */

/** @param {{ link?: string, onClose: () => void }} props */
export function ShortenedPopup({ link, onClose }) {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	/** @type {RefObject<HTMLDivElement | null>} */
	const frame = useRef(null);

	/** @param {string} target */
	function download(target) {
		const svg = frame.current?.querySelector("svg");

		if (!svg) {
			return;
		}

		const href = URL.createObjectURL(
			new Blob([new XMLSerializer().serializeToString(svg)], {
				type: "image/svg+xml",
			}),
		);
		const anchor = document.createElement("a");

		anchor.href = href;
		anchor.download = `${target.split("/").pop() ?? "qr"}.svg`;
		anchor.click();

		URL.revokeObjectURL(href);
	}

	return (
		<Popup
			open={Boolean(link)}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
				}
			}}
			title="Your short link is ready"
			description={
				isAuthenticated
					? "Share it anywhere. Every click is tracked."
					: "Share it anywhere."
			}
		>
			{link && (
				<div
					ref={frame}
					className="relative"
				>
					<QRCode
						text={link}
						className="mx-auto aspect-square h-auto w-full rounded-control bg-white shadow-card"
					/>
					<Button
						variant="secondary"
						shape="icon"
						size="sm"
						aria-label="Download QR code"
						className="absolute top-2 right-2"
						onClick={() => {
							download(link);
						}}
					>
						<IconDownload className="size-[1.25em]" />
					</Button>
				</div>
			)}
			<a
				href={link}
				className="truncate rounded-control bg-accent-soft px-4 py-3 font-medium text-accent underline-offset-4 hover:underline"
			>
				{link}
			</a>
			<PopupFooter>
				<Button
					onClick={() => {
						void navigator.clipboard.writeText(link ?? "");
					}}
				>
					<IconCopy className="size-[1.25em]" />
					Copy link
				</Button>
				{isAuthenticated && (
					<Button
						variant="ghost"
						render={<NavLink to="/links" />}
					>
						View all links
					</Button>
				)}
				<PopupClose
					render={
						<Button
							variant="ghost"
							shape="icon"
							aria-label="Close"
							className="ml-auto"
						>
							<IconClose className="size-[1.25em]" />
						</Button>
					}
				/>
			</PopupFooter>
		</Popup>
	);
}
