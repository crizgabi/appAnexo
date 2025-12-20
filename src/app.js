import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import UserRoutes from "./routes/UserRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js"
import CepRoutes from "./routes/CepRoutes.js"
import EquipmentRoutes from "./routes/EquipmentRoutes.js";
import ServicesRoutes from "./routes/ServicesRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"
import TechnicalRoutes from "./routes/TechnicalRoutes.js";
import CatalogRoutes from "./routes/CatalogRoutes.js";
import ServiceOrderRoutes from "./routes/ServiceOrderRoutes.js";
import ProductOSRoutes from "./routes/ProductOSRoutes.js";
import ServiceOSRoutes from "./routes/ServiceOSRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import CalendarRoutes from "./routes/CalendarRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// Rotas
app.use("/users", UserRoutes);
app.use("/customers", CustomerRoutes);
app.use("/cep", CepRoutes);
app.use("/equipments", EquipmentRoutes);
app.use("/services", ServicesRoutes);
app.use("/products", ProductRoutes);
app.use("/technicians", TechnicalRoutes);
app.use("/catalog", CatalogRoutes);
app.use("/service-orders", ServiceOrderRoutes);
app.use("/os/:id", ProductOSRoutes);
app.use("/os/:id", ServiceOSRoutes);
app.use("/upload", UploadRoutes);
app.use("/calendar", CalendarRoutes);

export default app;