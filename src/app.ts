import express from "express";
import dotenv from "dotenv";
import { setupRoutes } from "./routes/crud.routes";
import { setupAuthRoutes } from "./routes/auth.routes";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setupAuthRoutes())
app.use(setupRoutes());


app.listen(PORT, () => {
  console.log(`Server is listening to port:${PORT}`);
});
