import express from "express";
import { toggleSave } from "../controllers/save.controller.js";

const router = express.Router();

router.patch("/toggle", toggleSave);

export default router;
