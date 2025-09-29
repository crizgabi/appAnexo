import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/users", userRoutes);

export default app;