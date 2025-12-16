const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
} = require("../controllers/courseController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, admin, createCourse);


module.exports = router;
