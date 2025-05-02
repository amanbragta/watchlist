import express from "express";
import savedRouter from "./routes/save.route.js";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(err));
app.set("trust proxy", 1);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      secure: true,
      sameSite: "None",
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/save", savedRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.send("hello vercel!"));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
