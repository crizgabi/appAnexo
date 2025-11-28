import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js"
import CepRoutes from "./routes/CepRoutes.js"
import EquipmentRoutes from "./routes/EquipmentRoutes.js";
import ServicesRoutes from "./routes/ServicesRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"


const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// Rotas
app.use("/users", userRoutes);
app.use("/customers", CustomerRoutes)
app.use("/cep", CepRoutes)
app.use("/equipments", EquipmentRoutes);
app.use("/services", ServicesRoutes)
app.use("/products", ProductRoutes)

export default app;