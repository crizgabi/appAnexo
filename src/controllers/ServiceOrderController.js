import { ServiceOrderService } from "../services/ServiceOrderService.js";
import prisma from "../../src/db/prismaClient.js";
import e from "express";

export const ServiceOrderController = {
    create: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const { login } = req.user;
            if (!login) return res.status(401).json({ error: "Usuário não autenticado" });

            const novo = await ServiceOrderService.create(req.body, tenant.dbEnvKey, tenant.dbType);
            return res.status(201).json(novo);
        } catch (err) {
            console.error("Erro ao criar ordem de serviço:", err);
            return res.status(400).json({ error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const serviceOrders = await ServiceOrderService.list(tenant.dbEnvKey, tenant.dbType);
            return res.status(200).json(serviceOrders);
        } catch (error) {
            console.error("Erro ao listar ordens de serviço:", error);
            return res.status(500).json({ message: "Erro ao listar ordens de serviço", error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const os = await ServiceOrderService.find(req.params.id, tenant.dbEnvKey, tenant.dbType);
            if (!os) return res.status(404).json({ error: "Ordem de serviço não encontrada" });

            res.json(os);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const os = await ServiceOrderService.update(req.params.id, req.body, tenant.dbEnvKey, tenant.dbType);
            res.json(os);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const result = await ServiceOrderService.delete(req.params.id, tenant.dbEnvKey, tenant.dbType);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
export default ServiceOrderController;
