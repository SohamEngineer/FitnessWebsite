import express from "express";
import { addProduct } from "../AddProduct/AddProduct.js";
import upload from "../imageUplodeModdleware/imageUplodeMiddleware.js";
// import upload from "../middleware/upload.js";

const addRouter = express.Router();

// Upload single image field "image"
addRouter.post("/", upload.single("video"), addProduct);

export default addRouter;