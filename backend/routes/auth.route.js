import express from "express";
import passport from "passport";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", passport.authenticate("local"), signIn);
router.post("/register", signUp);
router.post("/logout", signOut);

export default router;
