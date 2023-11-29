import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,  // Use the String constructor, not "string"
    required: true,
  },
  password: {
    type: String,  // Use the String constructor
    required: true,
  },
  role:{
    type: String, // Use the String constructor, not "string
    enum: ["admin", "user"], 
    default: "admin"
  }
});

export const Admin = mongoose.models.admins || mongoose.model('Admin', adminSchema);
