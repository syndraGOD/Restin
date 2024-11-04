import { createSlice } from "@reduxjs/toolkit";
import { stationList } from "../../api/stationList";

const initialState = {
  filter: {
    line: "line1",
    station: stationList["line1"][0],
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
