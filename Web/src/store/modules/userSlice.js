import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // setuserData: (state, action) => {
    //   state.userData = action.payload;
    // },
    setuserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setuserData } = userSlice.actions;
export default userSlice.reducer;
