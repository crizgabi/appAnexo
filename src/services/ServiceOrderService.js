import OrdemServico from "../models/ServiceOrderModel.js";
import { ServiceOrderRepository } from "../repositories/ServiceOrderRepository.js";

export const ServiceOrderService = {
    // CREATE
    async create(data, dbEnvKey, dbType) {
        // Apenas idCliente é obrigatório por enquanto
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

        return (rows || []).map(r => ({
            idConserto: r.IDCONSERT0 ?? r.idConserto ?? r.PKCONSERTO ?? null,
            numeroOS: r.NUMEROOS ?? r.numeroOS ?? null,
            idCliente: r.IDCLIENTE ?? r.idCliente ?? null,
            nomeCliente: r.NOMECLIENTE ?? r.nomeCliente ?? r.NOMECLIENTE ?? null,
            idEquipamento: r.IDEQUIPAMENTO ?? r.idEquipamento ?? null,
            nomeEquipamento: r.NOMEEQUIPAMENTO ?? r.nomeEquipamento ?? null,
            defeitoReclamado: r.DEFEITORECLAMADO ?? r.defeitoReclamado ?? null,
            idStatus: r.IDSTATUS ?? r.idStatus ?? null,
            nomeStatus: r.NOMESTATUS ?? r.nomeStatus ?? null,
            idTecnicoResponsavel: r.IDTECNICO ?? r.idTecnicoResponsavel ?? r.FKTECNICO ?? null,
            nomeTecnicoResponsavel: r.NOMETECNICO ?? r.nomeTecnicoResponsavel ?? r.NMTECNICO ?? null,
            dataAgendamento: r.DATACONSERTO ?? r.dataConserto ?? null,
            horaAgendamento: r.HORA ?? r.hora ?? null,
            observacoes: r.OBS ?? r.observacao ?? null,
            dataCadastro: r.DATACAD ?? r.dataCadastro ?? null,
            dataAtualizacao: r.DATAATU ?? r.dataAtualizacao ?? null
        }));
    },

    // GET BY ID
    async find(id, dbEnvKey, dbType) {
        const os = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!os) throw new Error("Ordem de serviço não encontrada");

        // normalize a single row to expected shape
        return {
            idConserto: os.idConserto ?? os.IDCONSERTO ?? os.PKCONSERTO ?? null,
            numeroOS: os.numeroOS ?? os.NUMEROOS ?? null,
            idCliente: os.idCliente ?? os.FKCLIENTE ?? null,
            nomeCliente: os.nomeCliente ?? os.NOMECLIENTE ?? null,
            idEquipamento: os.idEquipamento ?? os.FKEQUIPAMENTO ?? null,
            nomeEquipamento: os.nomeEquipamento ?? os.NOMEEQUIPAMENTO ?? null,
            defeitoReclamado: os.defeitoReclamado ?? os.DEFEITORECLAMADO ?? null,
            idStatus: os.idStatus ?? os.FKSTATUS ?? null,
            nomeStatus: os.nomeStatus ?? os.NOMESTATUS ?? null,
            idTecnicoResponsavel: os.idTecnicoResponsavel ?? os.FKTECNICO ?? null,
            nomeTecnicoResponsavel: os.nomeTecnicoResponsavel ?? os.NMTECNICO ?? null,
            dataAgendamento: os.dataConserto ?? os.DATACONSERTO ?? null,
            horaAgendamento: os.hora ?? os.HORA ?? null,
            observacoes: os.observacao ?? os.OBS ?? null,
            dataCadastro: os.dataCadastro ?? os.DATACAD ?? null,
            dataAtualizacao: os.dataAtualizacao ?? os.DATAATU ?? null
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
