import IconBarChart from "@iconify-react/material-symbols/bar-chart-rounded";
import IconChevronLeft from "@iconify-react/material-symbols/chevron-left-rounded";
import IconChevronRight from "@iconify-react/material-symbols/chevron-right-rounded";
import IconCopy from "@iconify-react/material-symbols/content-copy-outline-rounded";
import IconDelete from "@iconify-react/material-symbols/delete-outline-rounded";
import IconLink from "@iconify-react/material-symbols/link-rounded";
import IconSearch from "@iconify-react/material-symbols/search-rounded";
import { useState } from "react";

import { Button } from "#/components/ui/button.jsx";
import { Card, CardContent } from "#/components/ui/card.jsx";
import { Eyebrow } from "#/components/ui/divider.jsx";
import { FieldControl, FieldRoot } from "#/components/ui/field.jsx";
import { useListUrlsQuery, useRemoveUrlMutation } from "#/features/urls.js";
import { base, host } from "#/lib/base.js";

/** @import { Url } from "#/services/urls.js" */

const PAGE_SIZE = 8;

/** @param {string} value */
function unprefixed(value) {
	const trimmed = value.trim();

	for (const prefix of [`${base}/`, `${host}/`]) {
		if (trimmed.startsWith(prefix)) {
			return trimmed.slice(prefix.length);
		}
	}

	return trimmed;
}

const dates = new Intl.DateTimeFormat(undefined, {
	month: "short",
	day: "numeric",
	year: "numeric",
});

/** @param {{ entry: Url, onRemove: (code: string) => void }} props */
function LinkRow({ entry, onRemove }) {
	return (
		<Card>
			<CardContent className="flex items-center gap-4 p-6">
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<a
						href={`${base}/${entry.encoded}`}
						className="flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
					>
						<IconLink className="size-[1.25em]" />
						{host}/{entry.encoded}
					</a>
					<p className="truncate text-sm text-ink-muted">{entry.url}</p>
					<Eyebrow className="text-ink-subtle">
						{dates.format(new Date(entry.createdAt))}
					</Eyebrow>
				</div>
				<Button
					variant="ghost"
					shape="icon"
					aria-label="Copy short link"
					onClick={() => {
						void navigator.clipboard.writeText(`${base}/${entry.encoded}`);
					}}
				>
					<IconCopy className="size-[1.25em]" />
				</Button>
				<Button
					variant="ghost"
					shape="icon"
					aria-label="Delete short link"
					className="hover:text-danger"
					onClick={() => {
						onRemove(entry.encoded);
					}}
				>
					<IconDelete className="size-[1.25em]" />
				</Button>
			</CardContent>
		</Card>
	);
}

function Page() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const { data, isFetching } = useListUrlsQuery({
		page,
		limit: PAGE_SIZE,
		q: unprefixed(query) || undefined,
	});
	const [remove] = useRemoveUrlMutation();

	const shown = data?.items ?? [];
	const total = data?.total ?? 0;
	const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	const current = Math.min(page, pages);

	return (
		<section className="px-4 py-16">
			<div className="mx-auto flex max-w-3xl flex-col gap-8">
				<div className="flex items-start justify-between gap-4">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold tracking-tight text-ink">
							My Links
						</h1>
						<p className="text-ink-muted">
							Manage and track your shortened digital assets.
						</p>
					</div>
					<div className="flex flex-col items-end gap-1">
						<Eyebrow className="text-ink-subtle">Total active</Eyebrow>
						<p className="text-3xl font-bold text-accent">{total}</p>
					</div>
				</div>

				<FieldRoot name="search">
					<FieldControl
						type="search"
						size="lg"
						value={query}
						placeholder="Search by name or URL..."
						leading={<IconSearch className="size-[1.25em]" />}
						onChange={(event) => {
							setQuery(event.target.value);
							setPage(1);
						}}
					/>
				</FieldRoot>

				{isFetching && (
					<p className="py-16 text-center text-ink-muted">Loading links...</p>
				)}

				{!isFetching &&
					(shown.length === 0 ? (
						<div className="flex flex-col items-center gap-4 py-16 text-center">
							<IconBarChart className="size-10 text-ink-subtle" />
							<p className="text-ink-muted">
								{total === 0
									? "No links yet. Create your first one."
									: "No links match that search."}
							</p>
						</div>
					) : (
						<ul className="flex flex-col gap-4">
							{shown.map((entry) => (
								<li key={entry.encoded}>
									<LinkRow
										entry={entry}
										onRemove={(code) => {
											void remove(code);
										}}
									/>
								</li>
							))}
						</ul>
					))}

				<div className="grid grid-cols-[1fr_auto_1fr] items-center">
					<Button
						variant="ghost"
						size="sm"
						className="justify-self-start"
						disabled={current <= 1}
						onClick={() => {
							setPage(current - 1);
						}}
					>
						<IconChevronLeft className="size-[1.25em]" />
						Prev
					</Button>
					<p className="flex items-center justify-center gap-3 text-sm text-ink-muted">
						<span className="rounded-control bg-accent-soft px-3 py-1 font-medium tabular-nums text-accent">
							{current}
						</span>
						of
						<span className="px-3 py-1 font-medium tabular-nums text-ink-muted">
							{pages}
						</span>
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="justify-self-end"
						disabled={current >= pages}
						onClick={() => {
							setPage(current + 1);
						}}
					>
						Next
						<IconChevronRight className="size-[1.25em]" />
					</Button>
				</div>
			</div>
		</section>
	);
}

export default Page;
