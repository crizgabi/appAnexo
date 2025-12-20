import OrdemServico from "../models/ServiceOrderModel.js";
import { ServiceOrderRepository } from "../repositories/ServiceOrderRepository.js";
import { UploadService } from "./UploadService.js";
import { CacheService } from "../services/CacheService.js";

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
            dataAtendimento: formatDate(r.DATAATENDIMENTO) ?? null,
            dataChecklistFinal: formatDate(r.DATACHECKLISTFINAL) ?? null,
            horaAgendamento: formatTime(r.HORA),
            observacoes: r.OBS ?? null,
            dataCadastro: formatDate(r.DATACAD),
            dataAtualizacao: formatDate(r.DATAATU),
            assinaturaTecnico: r.ARQASS1 ?? null,
            assinaturaCliente: r.ARQASS2 ?? null
        }));
    },

    // GET BY ID
    async find(id, dbEnvKey, dbType) {

        const cached = await CacheService.get(osCacheKey(id, dbEnvKey, dbType));
        if (cached) {
            return cached;
        }

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
        const result = {
            idConserto: os.PKCONSERTO ?? null,
            idCliente: os.FKCLIENTE ?? null,
            nomeCliente: os.RAZAOSOCIAL ?? null,
            idEquipamento: os.FKEQUIPAMENTO ?? null,
            nomeEquipamento: os.EQUIPAMENTO ?? null,
            defeitoReclamado: os.DEFEITORECLAMADO ?? null,
            idStatus: os.FKSTATUS ?? null,
            nomeStatus: os.NOMESTATUS ?? null,
            idTecnicoResponsavel: os.FKTECNICO ?? null,
            nomeTecnicoResponsavel: os.NMTECNICO ?? null,
            dataConserto: os.DATACONSERTO ?? null,
            dataAtendimento: formatDate(os.DATAATENDIMENTO) ?? null,
            dataChecklistFinal: formatDate(os.DATACHECKLISTFINAL) ?? null,
            dataAgendamento: formatDate(os.DATACONSERTO),
            horaAgendamento: formatTime(os.HORA),
            observacoes: os.OBS ?? null,
            dataCadastro: formatDate(os.DATACAD),
            dataAtualizacao: formatDate(os.DATAATU),
            assinaturaTecnico: os.ARQASS1 ?? null,
            assinaturaCliente: os.ARQASS2 ?? null
        };

        await CacheService.set(osCacheKey(id, dbEnvKey, dbType), result, 60);

        return result;
    },

    // GET BY USER
    async findByUser(id, dbEnvKey, dbType) {
        const rows = await ServiceOrderRepository.getByUser(id, dbEnvKey, dbType);
        if (!rows) return [];

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
            dataConserto: formatDate(r.DATACONSERTO) ?? null,
            dataAtendimento: formatDate(r.DATAATENDIMENTO) ?? null,
            dataChecklistFinal: formatDate(r.DATACHECKLISTFINAL) ?? null,
            observacoes: r.OBS ?? null,
            dataCadastro: formatDate(r.DATACAD),
            dataAtualizacao: formatDate(r.DATAATU),
            assinaturaTecnico: r.ARQASS1 ?? null,
            assinaturaCliente: r.ARQASS2 ?? null
        }));
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

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return await this.find(id, dbEnvKey, dbType);
    },

    // add signatures to OS
    async addSignature(id, files, dbEnvKey, dbType) {
        const existing =
            await ServiceOrderRepository.getById(id, dbEnvKey, dbType);

        if (!existing) {
            throw new Error("Ordem de serviço não encontrada");
        }

        let assinatura1Url = null;
        let assinatura2Url = null;

        if (files.assinatura1 && files.assinatura1.length > 0) {
            const result1 = await UploadService.uploadImage(files.assinatura1[0]);
            assinatura1Url = result1.url;
        }
        if (files.assinatura2 && files.assinatura2.length > 0) {
            const result2 = await UploadService.uploadImage(files.assinatura2[0]);
            assinatura2Url = result2.url;
        }

        await ServiceOrderRepository.addSignature(
            id,
            { assinatura1: assinatura1Url, assinatura2: assinatura2Url },
            dbEnvKey, dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return this.getSignature(
            id,
            dbEnvKey,
            dbType
        )
    },

    async getSignature(id, dbEnvKey, dbType) {
        const row =
            await ServiceOrderRepository.getSignature(id, dbEnvKey, dbType);

        if (!row) {
            return null;
        }

        return {
            idConserto: row.FKCONSERTO ?? null,
            assinaturaTecnico: row.ARQASS1 ?? null,
            assinaturaCliente: row.ARQASS2 ?? null
        };
    },

    async deleteSignature(id, tipo, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getSignature(id, dbEnvKey, dbType);

        if (!existing) {
            throw new Error("Assinatura não encontrada");
        }

        if (
            (tipo === "tecnico" && !existing.ARQASS1) ||
            (tipo === "cliente" && !existing.ARQASS2)
        ) {
            throw new Error("Assinatura já está vazia");
        }

        await ServiceOrderRepository.deleteSignature(
            id,
            tipo,
            dbEnvKey,
            dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return {
            deleted: true,
            tipo
        };
    },

    async addImage(id, file, idTecnico, fkCodUsu, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!existing) throw new Error("Ordem de serviço não encontrada");

        if (!file) throw new Error("Imagem não enviada");

        const uploadResult = await UploadService.uploadImage(file);

        const image = await ServiceOrderRepository.addImage(
            id,
            idTecnico,
            fkCodUsu,
            uploadResult.url,
            dbEnvKey,
            dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return {
            idConserto: image.FKCONSERTO ?? null,
            idImagem: image.PKARQUIVO ?? null,
            url: image.CAMINHO ?? null,
            idTecnico: image.FKTECNICO ?? null,
            dataHoraUpload: image.DATACAD ?? null
        };
    },

    async getImages(id, dbEnvKey, dbType) {
        const rows = await ServiceOrderRepository.getImages(id, dbEnvKey, dbType);

        if (!rows || rows.length === 0) return [];

        return rows.map(row => ({
            idConserto: row.FKCONSERTO ?? null,
            idImagem: row.PKARQUIVO ?? null,
            url: row.CAMINHO ?? null,
            descricao: row.DESCRICAO ?? null,
            idTecnico: row.FKTECNICO ?? null,
            dataHoraUpload: row.DATACAD ?? null
        }));
    },

    async getImageById(id, dbEnvKey, dbType) {
        const image = await ServiceOrderRepository.getImageById(id, dbEnvKey, dbType);

        if (!image) return null;

        return {
            idConserto: image.FKCONSERTO ?? null,
            idImagem: image.PKARQUIVO ?? null,
            url: image.CAMINHO ?? null,
            descricao: image.DESCRICAO ?? null,
            idTecnico: image.FKTECNICO ?? null,
            dataHoraUpload: image.DATACAD ?? null
        };
    },

    async deleteImage(idConserto, imageId, dbEnvKey, dbType) {
        const image = await ServiceOrderRepository.getImageById(
            imageId,
            dbEnvKey,
            dbType
        );

        if (!image) {
            throw new Error("Imagem não encontrada");
        }

        if (image.FKCONSERTO !== Number(idConserto)) {
            throw new Error("Imagem não pertence a esta OS");
        }

        const deleted = await ServiceOrderRepository.deleteImage(
            idConserto,
            imageId,
            dbEnvKey,
            dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return {
            idConserto: deleted.FKCONSERTO ?? null,
            idImagem: deleted.PKARQUIVO ?? null,
            url: deleted.CAMINHO ?? null,
            descricao: deleted.DESCRICAO ?? null,
            idTecnico: deleted.FKTECNICO ?? null,
            dataHoraUpload: deleted.DATACAD ?? null
        };
    },

    async updateImageDescription(idImagem, descricao, dbEnvKey, dbType) {
        const updated = await ServiceOrderRepository.updateImageDescription(
            idImagem,
            descricao,
            dbEnvKey,
            dbType
        );

        return {
            idConserto: updated.FKCONSERTO ?? null,
            idImagem: updated.PKARQUIVO ?? null,
            url: updated.CAMINHO ?? null,
            idTecnico: updated.FKTECNICO ?? null,
            descricao: updated.DESCRICAO ?? null,
            dataHoraUpload: updated.DATACAD ?? null
        };
    },

    // DELETE
    async delete(id, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getById(id, dbEnvKey, dbType);
        if (!existing) throw new Error("Ordem de serviço não encontrada");

        await ServiceOrderRepository.delete(id, dbEnvKey, dbType);

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        return {
            message: "Ordem de serviço removida com sucesso",
            idConserto: Number(id),
            deletedAt: null
        };
    },

    async checkIn(id, dataAtendimento, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getCheckinState(
            id,
            dbEnvKey,
            dbType
        );

        if (!existing) {
            throw new Error("Ordem de serviço não encontrada");
        }

        // Idempotência
        if (existing.DATAATENDIMENTO) {
            return {
                idConserto: id,
                dataAtendimento: existing.DATAATENDIMENTO
            };
        }

        const data = dataAtendimento
            ? new Date(dataAtendimento)
            : new Date();

        await ServiceOrderRepository.setCheckIn(
            id,
            data,
            dbEnvKey,
            dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        const updated = await ServiceOrderRepository.getCheckinState(
            id,
            dbEnvKey,
            dbType
        );

        return {
            idConserto: id,
            dataAtendimento: updated.DATAATENDIMENTO
        };
    },

    async checkOut(id, dataChecklistFinal, dbEnvKey, dbType) {
        const existing = await ServiceOrderRepository.getCheckinState(
            id,
            dbEnvKey,
            dbType
        );

        if (!existing) {
            throw new Error("Ordem de serviço não encontrada");
        }

        // Idempotência
        if (existing.DATACHECKLISTFINAL) {
            return {
                idConserto: id,
                dataChecklistFinal: existing.DATACHECKLISTFINAL
            };
        }

        const data = dataChecklistFinal
            ? new Date(dataChecklistFinal)
            : new Date();

        await ServiceOrderRepository.setCheckOut(
            id,
            data,
            dbEnvKey,
            dbType
        );

        await CacheService.del(osCacheKey(id, dbEnvKey, dbType));

        const updated = await ServiceOrderRepository.getCheckinState(
            id,
            dbEnvKey,
            dbType
        );

        return {
            idConserto: id,
            dataChecklistFinal: updated.DATACHECKLISTFINAL
        };
    },
};

//HELPERS

function osCacheKey(id, dbEnvKey, dbType) {
    return `os:find:${String(dbEnvKey)}:${String(dbType)}:${Number(id)}`;
}