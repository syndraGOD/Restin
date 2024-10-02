import styled from "styled-components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { theme: string } = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeToggle: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      if (action.payload) {
        state.theme = action.payload;
      } else {
        if (state.theme === "dark") {
          state.theme = "white";
        } else {
          state.theme = "dark";
        }
      }

      // state.theme = 'dark'
    },
  },
});

export const { themeToggle } = themeSlice.actions;
export default themeSlice.reducer;
