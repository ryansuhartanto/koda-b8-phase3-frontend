import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import storage from "redux-persist/es/storage";

import auth from "#/features/auth.js";
import api from "#/services/index.js";

const reducer = persistCombineReducers(
	{
		key: "shortlink",
		storage,
		blacklist: ["api"],

		version: 1,
	},
	{
		[api.reducerPath]: api.reducer,

		auth,
	},
);

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		// oxlint-disable-next-line prefer-spread
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

export const persistor = persistStore(store);

/** @typedef {typeof store} AppStore */
/** @typedef {ReturnType<AppStore['getState']>} RootState */
/** @typedef {AppStore['dispatch']} AppDispatch */

/** @type {ReturnType<typeof useDispatch.withTypes<AppDispatch>>} */
export const useAppDispatch = useDispatch.withTypes();

/** @type {ReturnType<typeof useSelector.withTypes<RootState>>} */
export const useAppSelector = useSelector.withTypes();

/** @type {ReturnType<typeof useStore.withTypes<AppStore>>} */
export const useAppStore = useStore.withTypes();
