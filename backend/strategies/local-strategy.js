import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/user.model.js";
import { comparePassword } from "../utils/password-helpers.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    const user = {
      username: findUser.username,
      saved: findUser.saved,
      id: findUser.id,
    };
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) return done(null, false, { message: "User not found." });
      const comparePass = await comparePassword(password, findUser.password);
      if (!comparePass) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, findUser);
    } catch (err) {
      done(err);
    }
  })
);
