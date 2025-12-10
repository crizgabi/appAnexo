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
            idConserto: r.IDCONSERTO ?? r.PKCONSERTO ?? null,
            numeroOS: r.NUMEROOS ?? r.numeroOS ?? null,
            idCliente: r.IDCLIENTE ?? r.idCliente ?? null,
            nomeCliente: r.NOMECLIENTE ?? r.nomeCliente ?? r.NOMECLIENTE ?? null,
            idEquipamento: r.IDEQUIPAMENTO ?? r.idEquipamento ?? null,
            nomeEquipamento: r.NOMEEQUIPAMENTO ?? r.nomeEquipamento ?? null,
            defeitoReclamado: r.DEFEITORECLAMADO ?? r.defeitoReclamado ?? null,
            idStatus: r.IDSTATUS ?? r.idStatus ?? null,
            nomeStatus: r.NOMESTATUS ?? r.nomeStatus ?? null,
            idTecnicoResponsavel: r.IDTECNICO ?? r.FKTECNICO ?? r.idTecnicoResponsavel ?? null,
            nomeTecnicoResponsavel: r.NOMETECNICO ?? r.NMTECNICO ?? r.nomeTecnicoResponsavel ?? null,
            dataAgendamento: formatDate(r.DATACONSERTO),
            horaAgendamento: formatTime(r.HORA),
            observacoes: r.OBS ?? r.OBSERVACAO ?? r.observacao ?? null,
            dataCadastro: formatDate(r.DATACADASTRO),
            dataAtualizacao: formatDate(r.DATAATUALIZACAO)
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
            idConserto: os.idConserto ?? os.IDCONSERTO ?? os.PKCONSERTO ?? null,
            numeroOS: os.numeroOS ?? os.NUMEROOS ?? null,
            idCliente: os.idCliente ?? os.IDCLIENTE ?? null,
            nomeCliente: os.nomeCliente ?? os.NOMECLIENTE ?? null,
            idEquipamento: os.idEquipamento ?? os.IDEQUIPAMENTO ?? null,
            nomeEquipamento: os.nomeEquipamento ?? os.NOMEEQUIPAMENTO ?? null,
            defeitoReclamado: os.defeitoReclamado ?? os.DEFEITORECLAMADO ?? null,
            idStatus: os.idStatus ?? os.IDSTATUS ?? null,
            nomeStatus: os.nomeStatus ?? os.NOMESTATUS ?? null,
            idTecnicoResponsavel: os.IDTECNICO ?? os.FKTECNICO ?? os.idTecnicoResponsavel ?? null,
            nomeTecnicoResponsavel: os.NOMETECNICO ?? os.NMTECNICO ?? os.nomeTecnicoResponsavel ?? null,
            dataAgendamento: formatDate(os.DATACONSERTO),
            horaAgendamento: formatTime(os.HORA),
            observacoes: os.OBS ?? os.OBSERVACAO ?? os.observacao ?? null,
            dataCadastro: formatDate(os.DATACADASTRO),
            dataAtualizacao: formatDate(os.DATAATUALIZACAO)
        };
    },

    // UPDATE
    async update(id, data, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!existing) throw new Error("Ordem de serviço não encontrada");

        const updatedPayload = {
            idCliente: data.idCliente ?? existing.FKCLIENTE ?? existing.idCliente,
            idTecnico: data.idTecnicoResponsavel ?? existing.FKTECNICO ?? existing.idTecnico,
            idEquipamento: data.idEquipamento ?? existing.FKEQUIPAMENTO ?? existing.idEquipamento,
            defeitoReclamado: data.defeitoReclamado ?? existing.DEFEITORECLAMADO ?? existing.defeitoReclamado,
            observacao: data.observacoes ?? existing.OBS ?? existing.observacao,
            dataConserto: data.dataAgendamento ?? existing.DATACONSERTO ?? existing.dataConserto,
            hora: data.horaAgendamento ?? existing.HORA ?? existing.hora,
            dataAtualizacao: new Date()
        };

        await ServiceOrderRepository.update(id, updatedPayload, dbEnvKey, dbType);

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
