import OrdemServico from "../models/ServiceOrderModel.js";
import { ServiceOrderRepository } from "../repositories/ServiceOrderRepository.js";

export const ServiceOrderService = {

    // CREATE
    async create(data, dbEnvKey, dbType) {

        if (!data.idCliente) {
            throw new Error("Campo obrigatório faltando: idCliente");
        }

        const os = new OrdemServico({
            idCliente: data.idCliente,
            idEquipamento: data.idEquipamento ?? null,
            idTecnico: data.idTecnicoResponsavel ?? null,
            defeitoReclamado: data.defeitoReclamado ?? null,
            observacao: data.observacoes ?? null,
            dataConserto: data.dataAgendamento ?? null,
            hora: data.horaAgendamento ?? null,
            dataCadastro: new Date(),
            dataAtualizacao: new Date()
        });

        try {
            const created = await ServiceOrderRepository.create(os, dbEnvKey, dbType);
            // created expected to be { idConserto, numeroOS }
            return {
                message: "Ordem de serviço criada com sucesso",
                idConserto: created.idConserto,
                numeroOS: created.numeroOS,
                idCliente: os.idCliente,
                idEquipamento: os.idEquipamento,
                idTecnicoResponsavel: os.idTecnico,
                defeitoReclamado: os.defeitoReclamado,
                observacoes: os.observacao,
                dataAgendamento: os.dataConserto,
                horaAgendamento: os.hora,
                dataCadastro: os.dataCadastro
            };
        } catch (err) {
            // rethrow but keep meaningful message
            const msg = (err && err.message) ? err.message : String(err);
            throw new Error(`Erro ao criar OS: ${msg}`);
        }
    },

    // LIST / GET ALL
    async list(dbEnvKey, dbType) {
        const rows = await ServiceOrderRepository.getAll(dbEnvKey, dbType);

        function formatDate(date) {
            if (!date) return null;
            return new Date(date).toISOString().substring(0, 10);
        }

        function formatTime(time) {
            if (!time) return null;
            return new Date(time).toISOString().substring(11, 16);
        }

        return (rows || []).map(r => ({
            idConserto: r.PKCONSERTO ?? null,
            idCliente: r.FKCLIENTE ?? null,
            nomeCliente: r.RAZAOSOCIAL ?? null,
            idEquipamento: r.FKEQUIPAMENTO ?? null,
            nomeEquipamento: r.EQUIPAMENTO ?? null,
            defeitoReclamado: r.DEFEITORECLAMADO ?? null,
            idStatus: r.FKSTATUS ?? null,
            nomeStatus: r.NOMESTATUS ?? null,
            idTecnicoResponsavel: r.FKTECNICO ?? null,
            nomeTecnicoResponsavel: r.NMTECNICO ?? null,
            dataAgendamento: formatDate(r.DATACONSERTO),
            horaAgendamento: formatTime(r.HORA),
            observacoes: r.OBS ?? null,
            dataCadastro: formatDate(r.DATACAD),
            dataAtualizacao: formatDate(r.DATAATU)
        }));
    },

    // GET BY ID
    async find(id, dbEnvKey, dbType) {
        const os = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!os) throw new Error("Ordem de serviço não encontrada");

        function formatDate(date) {
            if (!date) return null;
            return new Date(date).toISOString().substring(0, 10);
        }

        function formatTime(time) {
            if (!time) return null;
            return new Date(time).toISOString().substring(11, 16);
        }

        // normalize a single row to expected shape
        return {
            idConserto: os.PKCONSERTO ?? null,
            idCliente:os.FKCLIENTE ?? null,
            nomeCliente: os.RAZAOSOCIAL ?? null,
            idEquipamento: os.FKEQUIPAMENTO ?? null,
            nomeEquipamento: os.EQUIPAMENTO ?? null,
            defeitoReclamado: os.DEFEITORECLAMADO ?? null,
            idStatus: os.FKSTATUS ?? null,
            nomeStatus: os.NOMESTATUS ?? null,
            idTecnicoResponsavel: os.FKTECNICO ?? null,
            nomeTecnicoResponsavel: os.NMTECNICO ?? null,
            dataConserto: os.DATACONSERTO ?? null,
            dataAgendamento: formatDate(os.DATACONSERTO),
            horaAgendamento: formatTime(os.HORA),
            observacoes: os.OBS ?? null,
            dataCadastro: formatDate(os.DATACAD),
            dataAtualizacao: formatDate(os.DATAATU)
        };
    },

    // UPDATE OS
    async update(id, data, dbEnvKey, dbType) {
        const existing =
            await ServiceOrderRepository.getById(id, dbEnvKey, dbType);

        if (!existing) {
            throw new Error("Ordem de serviço não encontrada");
        }

        const updatedOS = {
            FKCLIENTE: data.idCliente ?? existing.FKCLIENTE,
            FKTECNICO: data.idTecnicoResponsavel ?? existing.FKTECNICO,
            FKEQUIPAMENTO: data.idEquipamento ?? existing.FKEQUIPAMENTO,
            DEFEITORECLAMADO: data.defeitoReclamado ?? existing.DEFEITORECLAMADO,
            OBS: data.observacoes ?? existing.OBS,
            DATACONSERTO: data.dataAgendamento ?? existing.DATACONSERTO,
            HORA: data.horaAgendamento ?? existing.HORA,
            DATAATU: new Date()
        };

        await ServiceOrderRepository.update(
            id,
            updatedOS,
            dbEnvKey,
            dbType
        );

        return await this.find(id, dbEnvKey, dbType);
    },

    // DELETE
    async delete(id, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!existing) throw new Error("Ordem de serviço não encontrada");

        await ServiceOrderRepository.delete(id, dbEnvKey, dbType);

        return {
            message: "Ordem de serviço removida com sucesso",
            idConserto: Number(id),
            deletedAt: null
        };
    }
};
