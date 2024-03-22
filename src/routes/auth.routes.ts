import express from "express";
import {
  loginController,
  signUpController,
} from "../controllers/auth.controller";
import { validateSignup } from "../middleware/validate.middleware";

const app=express()

export function setupAuthRoutes(): express.Router {
  const router = express.Router();

  router.post("/api/login", loginController);
  router.post("/api/signup", validateSignup,signUpController);

  return router;
}
