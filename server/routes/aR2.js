import express from "express";
import { register } from "../controllers/authController";

const authRouter = express.Router();

// Api endpoints

authRouter("/regiter", register);