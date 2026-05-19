const mongoose = require("mongoose");

const AIAnalysisSchema = new mongoose.Schema({
  urgency: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  department: { type: String, default: "" },
  summary: { type: String, default: "" },
  autoResponse: { type: String, default: "" },
  analyzedAt: { type: Date, default: Date.now },
}, { _id: false });

const ComplaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  title: { type: String, required: [true, "Title is required"], trim: true },
  description: { type: String, required: [true, "Description is required"] },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Water Supply", "Electricity", "Roads", "Garbage", "Sewage", "Public Safety", "Other"],
  },
  location: { type: String, required: [true, "Location is required"], trim: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Closed"],
    default: "Pending",
  },
  aiAnalysis: { type: AIAnalysisSchema, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ComplaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Complaint", ComplaintSchema);