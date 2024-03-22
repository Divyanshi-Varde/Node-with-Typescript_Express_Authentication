import express from "express";
import {
  deleteController,
  getController,
  readController,
  updateController,
} from "../controllers/route.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export function setupRoutes(): express.Router {
  const router = express.Router();

  router.use(authenticateToken);

  router.get("/api/users", getController);
  router.get("/api/users/:id", readController);
  router.patch("/api/users/:id", updateController);
  router.delete("/api/users/:id", deleteController);
  // router.post("/api/users", createController);

  return router;
}
