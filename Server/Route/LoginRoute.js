import express, { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import NewUser from "../mongoSchema/signupSchema.js";
 const loginroute=express.Router();

 const JWT_SECURITY_KEY="soham@33";

 loginroute.post("/login",async (req,res)=>{
     const {email,password}=req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email and password require" })
        }
        const user = await NewUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        const CheckPassword=await bcrypt.compare(password,user.password)
        if (!CheckPassword) {
            return res.status(400).json({ message: "Password does not match" });
        }
//JWT token generate
 const token=jwt.sign({id:user._id},JWT_SECURITY_KEY,{expiresIn:"24h"});
console.log(token)
res.status(200).json({ 
    message: "Login successful", 
    token, 
    user: {
        user:user.id,
        name: user.name,
    
                        role: user.role,
                    }
});
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
 })

 export default loginroute