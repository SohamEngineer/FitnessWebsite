import express from "express";
import FitnessTrack from "../mongoSchema/frinessTrack.js";
// import FitnessTrack from "../mongoSchema/firnessTrack.js";
const Fitnessroute = express.Router();

// Get fitness data for a specific user
Fitnessroute.get("/:userId", async (req, res) => {
  try {
    const data = await FitnessTrack.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fitness data" });
  }
});

// Post fitness data for a user
Fitnessroute.post("/", async (req, res) => {
  try {
    const { userId, ...rest } = req.body;
    const newEntry = new FitnessTrack({ userId, ...rest });
    await newEntry.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error("Fitness data post error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default Fitnessroute;
