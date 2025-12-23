import { ServiceOrderHourlyService } from "../services/ServiceOrderHourlyService.js";
import prisma from "../../src/db/prismaClient.js";

export const ServiceOrderHourlyController = {

    // GET /os/:id/horarios
    listByServiceOrder: async (req, res) => {
        try {
            const { id } = req.params;

            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId)
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant)
                return res.status(404).json({ error: "Tenant inválido" });

            const horarios = await ServiceOrderHourlyService.listByServiceOrder(
                id,
                tenant.dbEnvKey,
                tenant.dbType
            );

            return res.status(200).json(horarios);

        } catch (err) {
            console.error("Erro ao listar horários da OS:", err);

            if (err.message === "OS_NOT_FOUND") {
                return res.status(404).json({
                    error: "NOT_FOUND",
                    message: "Ordem de Serviço não encontrada."
                });
            }

            return res.status(500).json({
                message: "Erro ao listar horários da OS",
                error: err.message
            });
        }
    },

    // POST /os/:id/horarios
    create: async (req, res) => {
        try {
            const { id } = req.params;
            const { data, horaInicio, horaFim, idTecnico } = req.body;

            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId)
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant)
                return res.status(404).json({ error: "Tenant inválido" });

            const { login, id: usuarioId } = req.user || {};
            if (!login)
                return res.status(401).json({ error: "Usuário não autenticado" });

            if (!data || !horaInicio || !horaFim) {
                return res.status(400).json({
                    error: "BAD_REQUEST",
                    message: "Campos obrigatórios: data, horaInicio, horaFim"
                });
            }

            const result = await ServiceOrderHourlyService.create(
                id,
                { data, horaInicio, horaFim, idTecnico },
                usuarioId,
                tenant.dbEnvKey,
                tenant.dbType
            );

            return res.status(201).json({
                ...result,
                message: "Horário registrado com sucesso."
            });

        } catch (err) {
            console.error("Erro ao registrar horário da OS:", err);

            if (err.message === "OS_NOT_FOUND") {
                return res.status(404).json({
                    error: "NOT_FOUND",
                    message: "Ordem de Serviço não encontrada."
                });
            }

            if (err.message === "INVALID_TIME_RANGE") {
                return res.status(422).json({
                    error: "INVALID_TIME_RANGE",
                    message: "Hora final não pode ser menor ou igual à hora inicial."
                });
            }

            return res.status(500).json({
                message: "Erro ao registrar horário da OS",
                error: err.message
            });
        }
    },

    // DELETE /os/:id/horarios/:horarioId
    delete: async (req, res) => {
        try {
            const { id, horarioId } = req.params;

            const tenantId = req.headers["x-tenant-id"];
            if (!tenantId)
                return res.status(400).json({ error: "x-tenant-id header obrigatório" });

            const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
            if (!tenant)
                return res.status(404).json({ error: "Tenant inválido" });

            const { login } = req.user || {};
            if (!login)
                return res.status(401).json({ error: "Usuário não autenticado" });

            await ServiceOrderHourlyService.delete(
                id,
                horarioId,
                tenant.dbEnvKey,
                tenant.dbType
            );

            return res.status(200).json({
                message: "Horário removido com sucesso.", data: {
                    id: horarioId,
                    serviceOrderId: id
                }
            });

        } catch (err) {
            console.error("Erro ao remover horário da OS:", err);

            if (err.message === "OS_NOT_FOUND" || err.message === "NOT_FOUND") {
                return res.status(404).json({
                    error: "NOT_FOUND",
                    message: "Horário não encontrado."
                });
            }

            return res.status(500).json({
                message: "Erro ao remover horário da OS",
                error: err.message
            });
        }
    }
};
