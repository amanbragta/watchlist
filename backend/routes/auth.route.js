import express from "express";
import passport from "passport";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({ message: info?.message || "Login failed" });

      req.login(user, (err) => {
        if (err) return next(err);
        next();
      });
    })(req, res, next);
  },
  signIn
);
router.post("/register", signUp);
router.post("/logout", signOut);

export default router;
