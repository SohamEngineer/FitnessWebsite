import express from "express";
import fs from "fs";
import path from "path";
import AddHomeWorkout from "../mongoSchema/addHomeWorkout.js";

const HomeWorkout = express.Router();

HomeWorkout.get("/", async (req, res) => {
  try {
    const workouts = await AddHomeWorkout.find();

    const withBase64 = workouts.map((workout) => {
      const filename = workout.video?.replace(/^uploads[\\/]/, "");
      const videoPath = path.join("uploads", filename);

      let videoData = "";
      try {
        videoData = fs.readFileSync(videoPath, { encoding: "base64" });
      } catch (err) {
        console.error("Error reading video file:", videoPath, err);
      }

      return {
        ...workout._doc,
        videoBase64: `data:video/mp4;base64,${videoData}`,
      };
    });

    res.status(200).json(withBase64);
  } catch (err) {
    console.error("Error in /api/homeworkout:", err);
    res.status(500).json({ message: "Error fetching workouts", err });
  }
});

// Example: GET /api/homeworkout/:id
HomeWorkout.get('/homeworkout/:id', async (req, res) => {
  try {
    const workout = await AddHomeWorkout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const filename = workout.video?.replace(/^uploads[\\/]/, "");
    const videoPath = path.join("uploads", filename);

    let videoData = "";
    try {
      videoData = fs.readFileSync(videoPath, { encoding: "base64" });
    } catch (err) {
      console.error("Error reading video file:", videoPath, err);
    }

    const workoutWithVideo = {
      ...workout._doc,
      videoBase64: `data:video/mp4;base64,${videoData}`,
    };

    res.json(workoutWithVideo);
  } catch (error) {
    res.status(500).json({ error: "Workout not found" });
  }
});





export default HomeWorkout;
