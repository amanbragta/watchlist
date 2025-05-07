import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("/user/getUser", async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    isLoading: false,
    isError: false,
    saved: [],
  },
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
    },
    optimisticSave: (state, action) => {
      const isSaved = state.saved.some((save) => save.id === action.payload.id);
      if (isSaved) {
        state.saved = state.saved.filter(
          (save) => save.id != action.payload.id
        );
      } else {
        state.saved = [...state.saved, action.payload];
      }
    },
    failedOptimisticSave: (state, action) => {
      state.saved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data?.username;
        state.saved = action.payload.data?.saved;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.user = action.payload.error;
      });
  },
});

export const { resetUser, optimisticSave, failedOptimisticSave } =
  userSlice.actions;
export default userSlice.reducer;
