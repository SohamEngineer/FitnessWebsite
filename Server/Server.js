import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//all route
import router from "./Route/signupRoute.js";
import loginroute from "./Route/LoginRoute.js";
import SendOtpRoute from "./Route/ForgotPasswordRoute/SendOtp.js";
import Fitnessroute from "./Route/FitnessTrackRoute.js";
import addRouter from "./Route/ProtectedRoute.js";
import HomeWorkout from "./Route/HomeProductFetch.js";

// import addGymRouter from "./Route/GymWorkoutaddRoute.js";
import GymWork from "./Route/FetchGym.js";
import addGymRouter from "./Route/GymWorkadd.js";
import fetchUser from "./Route/FetchAlluser.js";

dotenv.config();



const app=express();
app.use(cors());
app.use(express.json());

app.use("/",router)
app.use("/",loginroute);
app.use("/api/passwordchange",SendOtpRoute)//Otp Send email
app.use("/api/fitness", Fitnessroute); //Fitness Track
app.use("/api/addhome", addRouter);//Add HomeWorkout
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads'))); //homeworkout video uplode
app.use("/api/homeworkout",HomeWorkout)//fetch homeworkout
app.use("/api/gymworkout",addGymRouter)//add Gymworkout
app.use("/api/gymwork",GymWork)//fetch GymWorkout
app.use('/gymphoto', express.static(path.join(path.resolve(), 'gymphoto')));//gym workout video uplode
app.use("/api/users", fetchUser);//fetch All user in admin Pannel


const PORT=process.env.PORT|| 8000
const MONGO_URL=process.env.MONGOOS_URL || "mongodb+srv://sohamata33:sohamata33@cluster0.dj5uq2c.mongodb.net/"
//Mongodb connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})