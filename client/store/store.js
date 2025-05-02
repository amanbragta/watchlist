import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice.js";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
