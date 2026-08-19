import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import authApi from "#/services/auth.js";

/** @import { PayloadAction } from "@reduxjs/toolkit" */
/** @import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react" */

/**
 * @typedef AuthState
 * @property {string} [token]
 * @property {string} [email]
 */

/** @type {AuthState} */
const initialState = {
	token: undefined,
	email: undefined,
};

export const authSlice = createSlice({
	name: "auth",

	initialState,
	reducers: {
		set: (
			state,
			/** @type {PayloadAction<{ token: string, email: string }>} */
			{ payload },
		) => {
			state.token = payload.token;
			state.email = payload.email;
		},
		unset: () => initialState,
	},
	selectors: {
		selectIsAuthenticated: (state) => state.token !== undefined,
		selectToken: (state) => state.token,
		selectEmail: (state) => state.email,
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
					state.email = payload.user.email;
				},
			)
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
					state.email = payload.user.email;
				},
			)
			.addMatcher(
				(/** @type {unknown} */ action) =>
					isRejectedWithValue(action) &&
					/** @type {FetchBaseQueryError} */ (action.payload).status === 401,
				() => initialState,
			);
	},
});

export default authSlice.reducer;
export const { set, unset } = authSlice.actions;
export const { selectIsAuthenticated, selectToken, selectEmail } =
	authSlice.selectors;
export const { useLoginMutation, useRegisterMutation } = authApi;
