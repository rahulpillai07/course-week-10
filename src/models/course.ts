import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false, // Assuming you want a default value for isPublished
  },
  image: {
    type: String,
  },
});

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
