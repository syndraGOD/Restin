import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  innerData: [],
};

export const mainSlice = createSlice({
  name: "mainR",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.innerData = action.payload;
    },
    // themeToggle: (state, action: PayloadAction<string>) => {

    // state.theme = 'dark'
  },
});

export const { setData } = mainSlice.actions;
export default mainSlice.reducer;
