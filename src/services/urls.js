import api from "#/services/index.js";

/**
 * @import { FetchBaseQueryError, FetchBaseQueryMeta, ResultDescription } from "@reduxjs/toolkit/query/react"
 */

/**
 * @typedef Url
 * @property {string} url
 * @property {string} encoded
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef ShortenRequest
 * @property {string} url
 * @property {string} [custom]
 */

/**
 * @typedef ListRequest
 * @property {number} [page]
 * @property {number} [limit]
 * @property {string} [q]
 */

/**
 * @typedef ListResponse
 * @property {Url[]} items
 * @property {number} total
 */

/**
 * @typedef UpdateRequest
 * @property {string} code
 * @property {string} url
 * @property {string} [custom]
 */

/** @type {ResultDescription<"urls", any, any, FetchBaseQueryError, FetchBaseQueryMeta | undefined>} */
const invalidatesTags = [{ type: "urls", id: "LIST" }];

const urlsApi = api.injectEndpoints({
	endpoints: (build) => ({
		listUrls:
			/** @type {typeof build.query<ListResponse, ListRequest | void>} */ (
				build.query
			)({
				query: (params) => ({ url: "/urls", params: params ?? {} }),
				transformResponse: (
					/** @type {Url[]} */ items,
					/** @type {import("#/services/index.js").ApiMeta | undefined} */ meta,
				) => ({ items, total: meta?.total ?? items.length }),
				providesTags: (result) => [
					...(result?.items ?? []).map(({ encoded }) => /** @type {const} */ ({
						type: "urls",
						id: encoded,
					})),
					/** @type {const} */ ({ type: "urls", id: "LIST" }),
				],
			}),
		resolveUrl: /** @type {typeof build.query<Url, string>} */ (build.query)({
			query: (code) => `/urls/${code}`,
			providesTags: (_result, _error, code) => [{ type: "urls", id: code }],
		}),
		shortenUrl: /** @type {typeof build.mutation<Url, ShortenRequest>} */ (
			build.mutation
		)({
			query: (body) => ({
				url: "/urls",
				method: "POST",
				body,
			}),
			invalidatesTags,
		}),
		updateUrl: /** @type {typeof build.mutation<Url, UpdateRequest>} */ (
			build.mutation
		)({
			query: ({ code, url, custom }) => ({
				url: `/urls/${code}`,
				method: "PATCH",
				body: { url, custom },
			}),
			invalidatesTags,
		}),
		removeUrl: /** @type {typeof build.mutation<null, string>} */ (
			build.mutation
		)({
			query: (code) => ({
				url: `/urls/${code}`,
				method: "DELETE",
			}),
			invalidatesTags,
		}),
	}),
	overrideExisting: "throw",
});

export default urlsApi;
