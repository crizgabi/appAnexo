import { CalendarService } from "../services/CalendarService.js";
import prisma from "../../src/db/prismaClient.js";

export const getCalendar = async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const calendar = await CalendarService.getCalendar(req.params.id, tenant.dbEnvKey, tenant.dbType);
            return res.status(200).json(calendar);
        } catch (error) {
            console.error("Erro ao listar ordens de serviço:", error);
            return res.status(500).json({ message: "Erro ao listar ordens de serviço", error: error.message });
        }
    };
