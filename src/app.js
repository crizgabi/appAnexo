import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
import CustomerAppOsRoutes from "../appOS/routes/CustomerAppOSRoutes.js";
import CepRoutes from "../appOS/routes/CepRoutes.js"

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/users", userRoutes);
app.use("/customers", CustomerAppOsRoutes)
app.use("/cep", CepRoutes)

export default app;