import React from 'react'
import { Routes, Route} from "react-router-dom";

import Pricing from '../UI/Pricing';

import Home from '../UI/Home';
import Login from '../UI/LogIn/Login';
import Gym from '../UI/GymWorkout';
import Signup from '../UI/Signup/signup';
import ForgotPassword from '../UI/ForgotPassword/Forgot';
import VerifyOTP from '../UI/ForgotPassword/Verify_otp';
import ResetPassword from '../UI/ForgotPassword/resetPassword';
import TrackLogin from '../UI/Tracklogin';
import Track from '../UI/Track';
import { useAuth } from '../utils/AuthContext';
import MealPlanning from '../UI/MealSection/MealPlaining';
import MainMealSection from '../UI/MealSection/MainMealSection';
import Caloricalculator from '../UI/MealSection/caloricalculator';
import HomeWorkout from '../UI/WorkoutHome';
import WorkoutDetails from '../UI/WorkOutDetails';
import GymWorkoutDetails from '../UI/GymWorkDetails';
import WorkoutPlayer from '../UI/WorkoutPlayer';

const AllRoutes = () => {
  
   const{authUser}=useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/membership" element={<Pricing />} />  
      <Route path="/track" element={authUser?<Track />:<TrackLogin/>} 
       />
       
       <Route path='/login' element={<Login/>}/>   
       <Route path='/homeworkout' element={<HomeWorkout/>}/> 
       <Route path="/homeworkout/:id" element={<WorkoutDetails />} />
       <Route path='/start-workout' element={<WorkoutPlayer/>}/>
       <Route path='/gymworkout/:id' element={<GymWorkoutDetails/>}/>
       <Route path='/gymworkout' element={<Gym/>}/>
       <Route path='/mealplaining' element={<MealPlanning/>}></Route>
       <Route path='/calorie' element={<Caloricalculator/>}></Route>
       <Route path='/mealsection'  element={<MainMealSection/>}></Route>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/userprofile' element={<fr/>}></Route>
       <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
       <Route path='/verify-otp' element={<VerifyOTP/>}></Route>

       <Route path='/reset-password' element={<ResetPassword/>}></Route>
    </Routes>
    
  )
}

export default AllRoutes
