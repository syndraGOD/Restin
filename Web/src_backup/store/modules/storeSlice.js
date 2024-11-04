import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeData: [],
};

export const storeSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },
    // themeToggle: (state, action: PayloadAction<string>) => {

    // state.theme = 'dark'
  },
});

export const { setStoreData } = storeSlice.actions;
export default storeSlice.reducer;
