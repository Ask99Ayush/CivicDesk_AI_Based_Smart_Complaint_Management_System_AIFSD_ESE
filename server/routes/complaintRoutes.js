const express = require("express");
const { body } = require("express-validator");
const {
  addComplaint, getAllComplaints, getComplaintById,
  updateComplaintStatus, deleteComplaint, searchByLocation, saveAIAnalysis,
} = require("../controllers/complaintController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

const complaintValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

router.get("/search", searchByLocation);
router.route("/")
  .post(complaintValidation, addComplaint)
  .get(protect, getAllComplaints);
router.route("/:id")
  .get(protect, getComplaintById)
  .put(protect, updateComplaintStatus)
  .delete(protect, adminOnly, deleteComplaint);
router.put("/:id/ai-analysis", protect, saveAIAnalysis);

module.exports = router;