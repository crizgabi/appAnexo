import { EquipmentService } from "../services/EquipmentService.js";
import prisma from "../../src/db/prismaClient.js";

export const EquipmentController = {

  // GET /equipamentos
  getAll: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const equipamentos = await EquipmentService.list(
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(200).json(equipamentos);

    } catch (error) {
      console.error("Erro ao listar equipamentos:", error);
      return res.status(500).json({
        message: "Erro ao listar equipamentos",
        error: error.message,
      });
    }
  },

  // GET /equipamentos/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const expand = req.query.expand || [];
      const osLimit = req.query.osLimit ? parseInt(req.query.osLimit, 10) : 10;
      const osOffset = req.query.osOffset ? parseInt(req.query.osOffset, 10) : 0;

      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const equipamento = await EquipmentService.find(
        id,
        tenant.dbEnvKey,
        tenant.dbType,
        { expand, osLimit, osOffset }
      );

      if (!equipamento)
        return res.status(404).json({ error: "Equipamento não encontrado" });

      return res.json(equipamento);

    } catch (err) {
      console.error("Erro ao buscar equipamento:", err);
      return res.status(404).json({ error: err.message });
    }
  },

  // GET /equipamentos/cliente/:idCliente
  getByCustomerId: async (req, res) => {
    try {
      const { idCliente } = req.params;

      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const equipamentos = await EquipmentService.listByCustomer(
        idCliente,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.json(equipamentos);

    } catch (err) {
      console.error("Erro ao buscar equipamentos do cliente:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  // POST /equipamentos
  create: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const { login } = req.user;
      if (!login)
        return res.status(401).json({ error: "Usuário não autenticado" });

      const novo = await EquipmentService.create(
        req.body,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(201).json(novo);

    } catch (err) {
      console.error("Erro criando equipamento:", err);
      return res.status(400).json({ error: err.message });
    }
  },

  // PUT /equipamentos/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const { login } = req.user;
      if (!login)
        return res.status(401).json({ error: "Usuário não autenticado" });

      const atualizado = await EquipmentService.update(
        id,
        req.body,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.json(atualizado);

    } catch (err) {
      console.error("Erro atualizando equipamento:", err);
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE /equipamentos/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const resultado = await EquipmentService.delete(
        id,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.json(resultado);

    } catch (err) {
      console.error("Erro removendo equipamento:", err);
      return res.status(400).json({ error: err.message });
    }
  },
};