import { ServiceOrderService } from "../services/ServiceOrderService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import prisma from "../../src/db/prismaClient.js";

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

    getByUser: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const os = await ServiceOrderService.findByUser(req.params.id, tenant.dbEnvKey, tenant.dbType);
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

            const os = await ServiceOrderService.update(
                req.params.id,
                req.body,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.json(os);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    addSignature: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const result = await ServiceOrderService.addSignature(
                req.params.id,
                req.files,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getSignature: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const result = await ServiceOrderService.getSignature(req.params.id, tenant.dbEnvKey, tenant.dbType);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deleteSignature: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

            const result = await ServiceOrderService.deleteSignature(req.params.id, req.params.tipo, tenant.dbEnvKey, tenant.dbType);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    addImage: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const { login } = req.user;
            const user = await UserRepository.findByLogin(login, tenant.dbEnvKey, tenant.dbType);
            if (!user) return null;
            const result = await ServiceOrderService.addImage(
                req.params.id,
                req.file,
                user.FKTECNICO,
                user.PKCODUSU,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getImages: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({
                where: { id: tenantId }
            });

            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const result = await ServiceOrderService.getImages(
                req.params.id,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getImageById: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({
                where: { id: tenantId }
            });

            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const result = await ServiceOrderService.getImageById(
                req.params.imageId,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deleteImage: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({
                where: { id: tenantId }
            });
            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const { id, imageId } = req.params;

            const result = await ServiceOrderService.deleteImage(
                id,
                imageId,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    updateImageDescription: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const { descricao } = req.body;
            const { imageId } = req.params;

            if (!descricao) {
                return res.status(400).json({ error: "Descrição obrigatória" });
            }

            const tenant = await prisma.tenant.findUnique({
                where: { id: tenantId }
            });

            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const result = await ServiceOrderService.updateImageDescription(
                imageId,
                descricao,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
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
    },

    checkIn: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const { dataAtendimento } = req.body;

            const result = await ServiceOrderService.checkIn(
                req.params.id,
                dataAtendimento,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            // OS não encontrada ou qualquer regra do service
            res.status(400).json({ error: err.message });
        }
    },

    checkOut: async (req, res) => {
        try {
            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId) {
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });
            }

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant) {
                return res.status(404).json({ error: "Tenant inválido" });
            }

            const { dataChecklistFinal } = req.body;

            const result = await ServiceOrderService.checkOut(
                req.params.id,
                dataChecklistFinal,
                tenant.dbEnvKey,
                tenant.dbType
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
export default ServiceOrderController;
