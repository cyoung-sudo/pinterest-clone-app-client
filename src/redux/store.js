import { configureStore } from "@reduxjs/toolkit";
// Slices
import appReducer from "../appSlice";

export default configureStore({
  reducer: {
    app: appReducer
  }
});