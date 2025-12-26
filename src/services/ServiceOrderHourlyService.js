import ServiceOrderHourly from "../models/ServiceOrderHourlyModel.js";
import { ServiceOrderHourlyRepository } from "../repositories/ServiceOrderHourlyRepository.js";
import { ServiceOrderRepository } from "../repositories/ServiceOrderRepository.js";

function horaFimMenorOuIgual(inicio, fim) {
    return fim <= inicio;
}

function calcularTotalMinutos(horaInicio, horaFim) {
    const [hIni, mIni] = horaInicio.split(":").map(Number);
    const [hFim, mFim] = horaFim.split(":").map(Number);

    const inicioMin = hIni * 60 + mIni;
    const fimMin = hFim * 60 + mFim;

    return fimMin - inicioMin;
}

function formatarTotal(minutos) {
    const h = Math.floor(minutos / 60).toString().padStart(2, "0");
    const m = (minutos % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
}

function formatDate(date) {
    if (!date) return null;
    return new Date(date).toISOString().substring(0, 10);
}

function formatTime(time) {
    if (!time) return null;
    return new Date(time).toISOString().substring(11, 16);
}

export const ServiceOrderHourlyService = {

    // GET /os/:id/horarios
    async listByServiceOrder(idConserto, dbEnvKey, dbType) {

        const consertoId = Number(idConserto);
        if (isNaN(consertoId)) throw new Error("INVALID_OS_ID");

        const os = await ServiceOrderRepository.getById(consertoId, dbEnvKey, dbType);
        if (!os) throw new Error("OS_NOT_FOUND");

        const rows = await ServiceOrderHourlyRepository.findByServiceOrder(
            consertoId,
            dbEnvKey,
            dbType
        );

        return rows.map(row => ({
            id: row.PKCODHORARIO,
            data: formatDate(row.DATA),
            inicio: formatTime(row.INICIO),
            fim: formatTime(row.FINAL),
            tecnicoId: row.FKTECNICO,
            tecnicoNome: row.NMTECNICO ?? "Não informado",
            ordem: row.ORDEM,
            tecnicoId: row.FKTECNICO,
            tecnicoNome: row.NMTECNICO,
            operacaoId: row.FKOPERACAO,
            operacaoNome: row.OPERACAO,
            totalMinutos: row.TOTALMINUTO,
            totalFormatado: row.TOTAL
        }));
    },

    // POST /os/:id/horarios
    async create(idConserto, dataBody, usuarioId, dbEnvKey, dbType) {

        const consertoId = Number(idConserto);
        if (isNaN(consertoId)) throw new Error("INVALID_OS_ID");

        const os = await ServiceOrderRepository.getById(consertoId, dbEnvKey, dbType);
        if (!os) throw new Error("OS_NOT_FOUND");

        const { data: dataExecucao, horaInicio, horaFim, idTecnico } = dataBody;

        if (horaFimMenorOuIgual(horaInicio, horaFim)) {
            throw new Error("INVALID_TIME_RANGE");
        }

        const totalMinutos = calcularTotalMinutos(horaInicio, horaFim);
        const totalFormatado = formatarTotal(totalMinutos);

        const hourly = new ServiceOrderHourly({
            idConserto: consertoId,
            data: dataExecucao,
            horaInicio,
            horaFim,
            usuarioId,
            idTecnico: idTecnico ?? null,
            totalMinutos,
            totalFormatado
        });

        const result = await ServiceOrderHourlyRepository.create(
            hourly,
            dbEnvKey,
            dbType
        );

        return {
            idHorario: result.idHorario,
            idConserto: result.idConserto,
            data: result.data,
            horaInicio: result.horaInicio,
            horaFim: result.horaFim,
            idTecnico: result.idTecnico,
            tecnicoNome: result.tecnicoNome
        };
    },

    // DELETE /os/:id/horarios/:horarioId
    async delete(idConserto, idHorario, dbEnvKey, dbType) {

        const consertoId = Number(idConserto);
        const horarioIdNum = Number(idHorario);

        const os = await ServiceOrderRepository.getById(consertoId, dbEnvKey, dbType);
        if (!os) throw new Error("OS_NOT_FOUND");

        const ok = await ServiceOrderHourlyRepository.delete(
            idHorario,
            consertoId,
            dbEnvKey,
            dbType
        );

        if (!ok) throw new Error("NOT_FOUND");

        return true;
    }
};
