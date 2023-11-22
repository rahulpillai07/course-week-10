import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,  // Use the String constructor, not "string"
    required: true,
  },
  password: {
    type: String,  // Use the String constructor
    required: true,
  }
});

export const Admin = mongoose.models.admins || mongoose.model('Admin', adminSchema);
