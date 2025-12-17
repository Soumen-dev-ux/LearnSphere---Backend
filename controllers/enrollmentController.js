const Enrollment = require("../models/Enrollment");

// ENROLL
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const alreadyEnrolled = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      userId: req.user._id,
      courseId,
    });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MY ENROLLMENTS
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.user._id,
    }).populate("courseId");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
