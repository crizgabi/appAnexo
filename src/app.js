import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import CustomerAppOsRoutes from "../appOS/routes/CustomerAppOSRoutes.js"
import CepRoutes from "../appOS/routes/CepRoutes.js"
import EquipmentRoutes from "../appOS/routes/EquipmentRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// Rotas
app.use("/users", userRoutes);
app.use("/customers", CustomerAppOsRoutes)
app.use("/cep", CepRoutes)
app.use("/equipments", EquipmentRoutes);

export default app;