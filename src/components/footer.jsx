export function Footer() {
	return (
		<div className="flex flex-col gap-4 px-4 py-8 sm:flex-row sm:justify-between bg-canvas uppercase text-eyebrow text-ink-subtle [&_a]:transition-colors [&_a]:hover:text-ink [&_a]:hover:underline">
			<small className="text-[length:inherit] font-inherit">
				© 2024 ShortLink
			</small>
			<ul className="flex flex-wrap gap-x-4 gap-y-2">
				<li>
					<a href="">Privacy Policy</a>
				</li>
				<li>
					<a href="">Terms of Service</a>
				</li>
				<li>
					<a href="">API Documentation</a>
				</li>
				<li>
					<a href="">Support</a>
				</li>
			</ul>
		</div>
	);
}
