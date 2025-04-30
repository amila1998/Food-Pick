"use client";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import authSlice from "./Slice/authSlice";
import storageEngine from "@/store/storageEngine";
import storage from "redux-persist/lib/storage";
import configSlice from "./Slice/configSlice";
import cartSlice from "./Slice/cartSlice";




//With the Redux Persist library, can save the Redux store in persistent storage,
//for example, the local storage. Therefore, even after refreshing the browser, the site state will still be preserved

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  config: configSlice.reducer,
  cart:cartSlice.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "config"], // Persist only these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevents Redux Persist serialization issues
    }).concat(thunk),
});

export const persistor = persistStore(store);



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;