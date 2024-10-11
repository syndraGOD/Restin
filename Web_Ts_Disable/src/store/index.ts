import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./modules/themeSlice";
export const store = configureStore({
  reducer: {
    themeR: themeSlice,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
