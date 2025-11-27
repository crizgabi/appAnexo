import { TechnicalService } from "../services/TechnicalService.js";
import prisma from "../../src/db/prismaClient.js";

export const TechnicalController = {
  
  getAll: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const tecnicos = await TechnicalService.list(
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(200).json(tecnicos);

    } catch (error) {
      console.error("Erro ao listar técnicos:", error);
      return res.status(500).json({
        message: "Erro ao listar técnicos",
        error: error.message,
      });
    }
  },

};