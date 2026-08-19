import { configureStore } from "@reduxjs/toolkit";
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

export const store = configureStore({
	reducer: persistCombineReducers(
		{
			key: "shortlink",
			storage,
		},
		{},
	),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
