import urlsApi from "#/services/urls.js";

export const {
	useListUrlsQuery,
	useResolveUrlQuery,
	useLazyResolveUrlQuery,
	useShortenUrlMutation,
	useUpdateUrlMutation,
	useRemoveUrlMutation,
} = urlsApi;
