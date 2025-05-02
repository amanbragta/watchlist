import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/password-helpers.js";

export const signIn = (req, res) => {
  res.sendStatus(200);
};

export const signUp = async (req, res) => {
  const { body } = req;
  const password = await hashPassword(body.password);
  body.password = password;
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    await req.login(savedUser, (err) => {
      if (err) throw new Error(err);
      res.status(200).send(savedUser);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const signOut = async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorised");
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};
