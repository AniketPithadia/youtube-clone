import express from "express";
import { googleAuth, signOut, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

//SIGN OUT
router.post("/signout", signOut);

//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
