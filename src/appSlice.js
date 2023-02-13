import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    authUser: null
  },
  reducers: {
    //----- Set authenticated user
    setUser: (state, action) => {
      state.authUser = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser } = appSlice.actions;

export default appSlice.reducer;