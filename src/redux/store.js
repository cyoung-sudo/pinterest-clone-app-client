import { configureStore } from "@reduxjs/toolkit";
// Slices
import appReducer from "../appSlice";
import popupReducer from "../components/popup/slices/popupSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    popup: popupReducer
  }
});