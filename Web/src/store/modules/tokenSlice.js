import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verifiToken: "",
};

export const tokenSlice = createSlice({
  name: "verifiToken",
  initialState,
  reducers: {
    setVerifiToken: (state, action) => {
      state.verifiToken = action.payload;
    },
  },
});

export const { setVerifiToken } = tokenSlice.actions;
export default tokenSlice.reducer;
