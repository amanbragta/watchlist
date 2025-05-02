import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved: {
    type: mongoose.Schema.Types.Array,
    default: [],
  },
});

export const User = mongoose.model("user", userSchema);
