import express from "express";
import passport from "passport";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { checkSchema, validationResult } from "express-validator";
import { userValidationSchema } from "../utils/userValidationSchema.js";

const router = express.Router();

router.post(
  "/login",
  checkSchema(userValidationSchema),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ message: result.array() });
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

router.post("/register", checkSchema(userValidationSchema), signUp);
router.post("/logout", signOut);

export default router;
