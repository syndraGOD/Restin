import { configureStore } from "@reduxjs/toolkit";
// import themeSlice from "./modules/themeSlice";
import filterSlice from "./modules/filterSlice";
import storeSlice from "./modules/storeSlice";
export const store = configureStore({
  reducer: {
    // themeR: themeSlice,
    filterR: filterSlice,
    storeR: storeSlice,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
