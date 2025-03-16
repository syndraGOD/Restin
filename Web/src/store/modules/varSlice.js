import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  announceImgs: [],
};

export const varSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAnnounceImgs: (state, action) => {
      state.announceImgs = action.payload;
    },
  },
});

export const { setLoading, setAnnounceImgs } = varSlice.actions;
export default varSlice.reducer;
