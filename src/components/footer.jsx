export function Footer() {
	return (
		<div className="flex justify-between px-4 py-8 bg-canvas uppercase text-eyebrow text-ink-subtle [&_a]:transition-colors [&_a]:hover:text-ink [&_a]:hover:underline">
			<small className="text-[length:inherit] font-inherit">
				© 2024 ShortLink
			</small>
			<ul className="flex gap-4">
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
