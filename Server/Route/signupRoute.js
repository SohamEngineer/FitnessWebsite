import express from "express";
import bcrypt from "bcrypt";
import NewUser from "../mongoSchema/signupSchema.js";

const router= express.Router();

router.post("/signup",async (req,res)=>{
    try{
        const {name ,email,password}=req.body;
        const existingUser = await NewUser.findOne({ email });// find user is alredy exist or not
        if(existingUser){
            return res.status(404).json({
                massage:"User Is Alredy Exist",
                success:false,
             })
        }
//save the password as hashPassword
        const hashPassword= await bcrypt.hash(password,10)
    console.log(hashPassword)
    const newUser = new NewUser({ name, email, password:hashPassword });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully!" });
    }
    catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
})
export default router