import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    line: "line1",
    station: "수원",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // themeToggle: (state, action: PayloadAction<string>) => {

    // state.theme = 'dark'
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
