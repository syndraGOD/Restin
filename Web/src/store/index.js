import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // for localStorage
import sessionStorage from "redux-persist/lib/storage/session"; // for sessionStorage
import filterSlice from "./modules/filterSlice";
import storeSlice from "./modules/storeSlice";
import userSlice from "./modules/userSlice";
import tokenSlice from "./modules/tokenSlice";

// Persist configurations
const storePersistConfig = {
  key: "storeR",
  storage: sessionStorage,
};

const userPersistConfig = {
  key: "userR",
  storage: storage,
};

const tokenPersistConfig = {
  key: "tokenR",
  storage: storage, // localStorage
};

const filterPersistConfig = {
  key: "filterR",
  storage: storage, // local
};
// Persisted reducers
const persistedStoreReducer = persistReducer(storePersistConfig, storeSlice);
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedTokenReducer = persistReducer(tokenPersistConfig, tokenSlice);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterSlice);

// Combine reducers
const rootReducer = combineReducers({
  filterR: persistedFilterReducer, // not persisted 였다가, 기획변경으로 수정
  storeR: persistedStoreReducer,
  userR: persistedUserReducer,
  tokenR: persistedTokenReducer,
});

// Middleware 수정
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: {
//     // 특정 Redux Persist 액션 무시
//     ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//   },
// });

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  // middleware: customizedMiddleware,
});

// Persistor
export const persistor = persistStore(store);
