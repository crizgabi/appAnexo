import { UserService } from "../services/UserService.js";
import { CustomerService } from "../services/CustomerService.js";
import { EquipmentService } from "../services/EquipmentService.js";
import { ProductService } from "../services/ProductService.js";
import { ServicesService } from "../services/ServicesService.js";
import { ServiceOrderService } from "../services/ServiceOrderService.js";
import prisma from "../../src/db/prismaClient.js";

export const getCatalog = async (req, res) => {
    try {
        const tenantId = req.headers["x-tenant-id"];
        if (!tenantId)
            return res.status(400).json({ error: "x-tenant-id header obrigatório" });

        const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
        if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

        const { dbEnvKey, dbType } = tenant;

        const [
            users,
            customers,
            equipments,
            products,
            services,
            serviceOrder,
            checkLists
        ] = await Promise.all([
            UserService.getAllUsers(dbEnvKey, dbType),
            CustomerService.getAllCustomers(dbEnvKey, dbType),
            EquipmentService.list(dbEnvKey, dbType),
            ProductService.getAllProducts(dbEnvKey, dbType),
            ServicesService.getAllServices(dbEnvKey, dbType),
            ServiceOrderService.list(dbEnvKey, dbType),
            ServiceOrderService.getAllChecklists(dbEnvKey, dbType)
        ]);

        return res.status(200).json({
            users,
            customers,
            equipments,
            products,
            services,
            serviceOrder,
            checkLists
        });

    } catch (error) {
        console.error("Error in catalog:", error);
        return res.status(500).json({ error: "Error in catalog" });
    }
};