import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const varSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = varSlice.actions;
export default varSlice.reducer;
