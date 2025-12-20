import { ServiceOSService } from "../services/ServiceOSService.js";
import prisma from "../db/prismaClient.js";

export const ServiceOSController = {

  create: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const idConserto = Number(req.params.id);
      if (isNaN(idConserto))
        return res.status(400).json({ error: "ID da OS inválido" });

      const novoItem = await ServiceOSService.create(
        {
          idConserto,
          idServico: req.body.idServico,
          quantidade: req.body.quantidade,
          valorUnitario: req.body.valorUnitario,
          observacao: req.body.observacao,
          idTecnico: req.body.idTecnico ?? null,
          idUsuario: req.user?.idUsuario ?? null
        },
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(201).json({
        ...novoItem,
        message: "Serviço adicionado com sucesso à Ordem de Serviço."
      });

    } catch (err) {
      console.error("Erro ao adicionar serviço na OS:", err);
      return res.status(400).json({ error: err.message });
    }
  },

  getAllByOS: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const items = await ServiceOSService.getAllByOS(
        req.params.id,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(200).json(items);

    } catch (err) {
      console.error("Erro ao listar serviços da OS:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      await ServiceOSService.delete(
        req.params.idItem,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.json({ message: "Serviço removido com sucesso" });

    } catch (err) {
      console.error("Erro ao remover serviço da OS:", err);
      return res.status(400).json({ error: err.message });
    }
  }
};
