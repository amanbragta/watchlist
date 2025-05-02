import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateState(state, action) {
      return action.payload;
    },
  },
});

export const { updateState } = searchSlice.actions;
export default searchSlice.reducer;
