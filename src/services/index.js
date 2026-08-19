import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * @import { BaseQueryApi, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react"
 */

/**
 * @template [T = unknown]
 * @typedef ApiEnvelope
 * @property {boolean} success
 * @property {string} message
 * @property {T} result
 * @property {number} [total]
 */

/**
 * @typedef {FetchBaseQueryMeta & { total?: number }} ApiMeta
 */

const rawBaseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
	prepareHeaders: (headers, { getState }) => {
		const { token } =
			/** @type {import("../store").RootState} */ (getState()).auth;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

/**
 * @template [T = unknown]
 * @param {string | FetchArgs} args
 * @param {BaseQueryApi} api
 * @param {{}} extraOptions
 * @returns {Promise<QueryReturnValue<T, FetchBaseQueryError, ApiMeta>>}
 */
const baseQuery = async (args, api, extraOptions) => {
	const res = await rawBaseQuery(args, api, extraOptions);
	if (res.error) {
		if ("error" in res.error) {
			return res;
		}
		const body = /** @type {Partial<ApiEnvelope>} */ (res.error.data);
		return {
			error: {
				status: "CUSTOM_ERROR",
				data: res.error.data,
				error: body?.message ?? `Request failed (${res.error.status})`,
			},
			meta: res.meta,
		};
	}

	const { data, meta } = res;
	const body = /** @type {ApiEnvelope<T>} */ (data);

	if (!body.success) {
		return {
			error: {
				status: "CUSTOM_ERROR",
				data: body,
				error: body.message,
			},
			meta,
		};
	}

	return {
		data: body.result,
		meta: meta && { ...meta, total: body.total },
	};
};

const api = createApi({
	reducerPath: "api",

	baseQuery,
	endpoints: () => ({}),
	tagTypes: ["auth", "urls"],
});

export default api;
