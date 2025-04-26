import express from "express";

import Gymimgupload from "../imageUplodeModdleware/GymImage.js";
import { addGymProduct } from "../AddProduct/AddGymProduct.js";


const addGymRouter = express.Router();

// Upload single image field "image"
addGymRouter.post("/",Gymimgupload.single("video"), addGymProduct);

export default addGymRouter;