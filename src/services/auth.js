import api from "#/services/index.js";

/**
 * @import { FetchBaseQueryError, FetchBaseQueryMeta, ResultDescription } from "@reduxjs/toolkit/query/react"
 */

/**
 * @typedef Request
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {{ token: string }} Response
 */

/** @type {ResultDescription<"auth", any, any, FetchBaseQueryError, FetchBaseQueryMeta | undefined>} */
const invalidatesTags = [];

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		register: /** @type {typeof build.mutation<Response, Request>} */ (
			build.mutation
		)({
			query: (body) => ({
				url: "/auth/register",
				method: "POST",
				body,
			}),
			invalidatesTags,
		}),
		login: /** @type {typeof build.mutation<Response, Request>} */ (
			build.mutation
		)({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
			invalidatesTags,
		}),
	}),
	overrideExisting: "throw",
});

export default authApi;
