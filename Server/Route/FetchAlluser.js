// fetch  all user who are signeup
import Gymimgupload from "../imageUplodeModdleware/GymImage.js";
import upload from "../imageUplodeModdleware/imageUplodeMiddleware.js";
import AddGymWorkout from "../mongoSchema/addGymWorkout.js";
import AddHomeWorkout from "../mongoSchema/addHomeWorkout.js";
import  NewUser from "../mongoSchema/signupSchema.js";
import express from "express"
const fetchUser=express.Router()


fetchUser.get("/all", async (req, res) => {
    try {
      const users = await NewUser.find().select("-password"); // exclude password
      const count = await NewUser.countDocuments();
      res.status(200).json({
        totalUsers: count,
        users: users,    
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  });

// DELETE a Home Workout by ID
fetchUser.delete("/homeworkout/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AddHomeWorkout.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Workout not found" });
      }
  
      res.status(200).json({ success: true, message: "Home workout deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting workout", error: error.message });
    }
  });


// PUT (Edit) a Home Workout by ID
fetchUser.put("/homeworkout/:id", upload.single("video"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, type, day, description, caloryburn } = req.body;
  
      const updatedFields = { title, type, day, description, caloryburn };
  
      if (req.file) {
        updatedFields.video = req.file.path;
      }
  
      const updated = await AddHomeWorkout.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Workout not found" });
      }
  
      res.status(200).json({ success: true, message: "Workout updated", workout: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating workout", error: error.message });
    }
  });

//delete GymWorkout
  fetchUser.delete("/gymworkout/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AddGymWorkout.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Workout not found" });
      }
  
      res.status(200).json({ success: true, message: "Home workout deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting workout", error: error.message });
    }
  });


// PUT (Edit) a Home Workout by ID
fetchUser.put("/gymworkout/:id", Gymimgupload.single("video"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, type, day, description, caloryburn } = req.body;
  
      const updatedFields = { title, type, day, description, caloryburn };
  
      if (req.file) {
        updatedFields.video = req.file.path;
      }
  
      const updated = await AddGymWorkout.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Workout not found" });
      }
  
      res.status(200).json({ success: true, message: "Workout updated", workout: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating workout", error: error.message });
    }
  });
  export default fetchUser;