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
    if (!findUser) throw new Error("User not found");
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
      if (!findUser) throw new Error("Invalid username");
      const comparePass = await comparePassword(password, findUser.password);
      if (!comparePass) {
        throw new Error("Wrong password");
      }
      return done(null, findUser);
    } catch (err) {
      done(err);
    }
  })
);
