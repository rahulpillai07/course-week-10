import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,  // Use the String constructor, not "string"
    required: true,
  },
  password: {
    type: String,  // Use the String constructor
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
