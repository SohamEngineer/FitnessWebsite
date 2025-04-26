// import AddHomeWorkout from "../mongoSchema/addHomeWorkout.js";

import AddGymWorkout from "../mongoSchema/addGymWorkout.js";

// 
const addGymProduct = async (req, res) => {
  try {
    const { title, type, day, description, caloryburn } = req.body;
    const video = req.file?.filename;

    console.log("📦 Request body:", req.body);
    console.log("🎥 Uploaded file:", req.file);

    // Validation check
    if (!title || !type || !day || !description || !caloryburn || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields including video are required",
      });
    }

    const newWorkout = new AddGymWorkout({
      title,
      type,
      day,
      description,
      caloryburn,
      video, // store video filename
    });

    await newWorkout.save();

    res.status(201).json({
      success: true,
      message: "Workout with video added successfully",
    });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export { addGymProduct };
