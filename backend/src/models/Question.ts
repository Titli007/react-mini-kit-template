import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String], // Changed to an array of strings
    default: [], // Starts as an empty array, allowing multiple answers
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answeredAt: {
    type: Date,
    default: null, // Records the date when the answer is added, if any
  },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
