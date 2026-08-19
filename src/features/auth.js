import { createSlice } from "@reduxjs/toolkit";

import authApi from "#/services/auth.js";

/** @import { PayloadAction } from "@reduxjs/toolkit" */

/**
 * @typedef AuthState
 * @property {string} [token]
 */

/** @type {AuthState} */
const initialState = {
	token: undefined,
};

export const authSlice = createSlice({
	name: "auth",

	initialState,
	reducers: {
		set: (
			state,
			/** @type {PayloadAction<{ token: string }>} */
			{ payload },
		) => {
			state.token = payload.token;
		},
		unset: () => initialState,
	},
	selectors: {
		selectIsAuthenticated: (state) => state.token !== undefined,
		selectToken: (state) => state.token,
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
				},
			)
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
				},
			);
	},
});

export default authSlice.reducer;
export const { set, unset } = authSlice.actions;
export const { selectIsAuthenticated, selectToken } = authSlice.selectors;
