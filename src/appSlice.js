import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    authUser: null,
    refreshToggle: false
  },
  reducers: {
    //----- Set authenticated user
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
    //----- Manual refresh
    refresh: state => {
      state.refreshToggle = !state.refreshToggle;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, refresh } = appSlice.actions;

export default appSlice.reducer;