import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./modules/mainSlice";
export const store = configureStore({
  reducer: {
    mainR: mainSlice,
  },
});
