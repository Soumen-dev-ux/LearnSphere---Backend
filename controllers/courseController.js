const Course = require("../models/Course");

// GET all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE course (admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, difficulty, price, lessons } =
      req.body;

    const course = await Course.create({
      title,
      description,
      category,
      difficulty,
      price,
      lessons,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
