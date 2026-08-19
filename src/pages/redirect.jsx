import { useEffect } from "react";
import { useLocation } from "react-router";

import { useResolveUrlQuery } from "#/features/urls.js";
import NotFound from "#/pages/+404.jsx";

export const handle = { header: false };

function Page() {
	const code = useLocation().pathname.slice(1);
	const { data, isLoading, isError } = useResolveUrlQuery(code, {
		skip: !code,
	});

	useEffect(() => {
		if (data) {
			globalThis.location.replace(data.url);
		}
	}, [data]);

	if (isError || !code) {
		return <NotFound />;
	}

	return (
		<section className="grid place-items-center px-4 py-24">
			<p className="text-ink-muted">
				{isLoading ? "Resolving short link..." : "Redirecting..."}
			</p>
		</section>
	);
}

export default Page;
