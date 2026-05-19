const { validationResult } = require("express-validator");
const Complaint = require("../models/Complaint");

const addComplaint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  try {
    const data = { ...req.body };
    if (req.user) data.user = req.user._id;
    const complaint = await Complaint.create(data);
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    next(err);
  }
};

const getAllComplaints = async (req, res, next) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (req.user && req.user.role !== "admin") filter.user = req.user._id;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [complaints, total] = await Promise.all([
      Complaint.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Complaint.countDocuments(filter),
    ]);
    res.json({ success: true, data: complaints, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    next(err);
  }
};

const getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found." });
    res.json({ success: true, data: complaint });
  } catch (err) {
    next(err);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const valid = ["Pending", "In Progress", "Resolved", "Closed"];
    if (!valid.includes(status))
      return res.status(400).json({ success: false, message: "Invalid status value." });
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found." });
    res.json({ success: true, data: complaint });
  } catch (err) {
    next(err);
  }
};

const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found." });
    res.json({ success: true, message: "Complaint deleted successfully." });
  } catch (err) {
    next(err);
  }
};

const searchByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;
    if (!location) return res.status(400).json({ success: false, message: "Location query required." });
    const complaints = await Complaint.find({ location: { $regex: location, $options: "i" } }).sort({ createdAt: -1 });
    res.json({ success: true, data: complaints, count: complaints.length });
  } catch (err) {
    next(err);
  }
};

const saveAIAnalysis = async (req, res, next) => {
  try {
    const { aiAnalysis } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { aiAnalysis, updatedAt: Date.now() },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found." });
    res.json({ success: true, data: complaint });
  } catch (err) {
    next(err);
  }
};

module.exports = { addComplaint, getAllComplaints, getComplaintById, updateComplaintStatus, deleteComplaint, searchByLocation, saveAIAnalysis };