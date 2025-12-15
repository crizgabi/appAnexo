import { ServiceOrderService } from "../services/ServiceOrderService.js"
import { CustomerService } from "../services/CustomerService.js"

export const CalendarService = {
  getCalendar: async (id, dbEnvKey, dbType) => {
    const rows = await ServiceOrderService.findByUser(
      id,
      dbEnvKey,
      dbType
    );

    const calendar = await Promise.all(
      (rows || []).map(async (r) => {
        const customer = await CustomerService.getCustomerByPrimaryKey(
          r.idCliente,
          dbEnvKey,
          dbType
        );

        return {
          idConserto: r.idConserto ?? null,
          idCliente: r.idCliente ?? null,
          nomeCliente: r.nomeCliente ?? null,
          cpf: customer?.cpf ?? null,
          cnpj: customer?.cnpj ?? null,
          idStatus: r.idStatus ?? null,
          nomeStatus: r.nomeStatus ?? null,
          idTecnicoResponsavel: r.idTecnicoResponsavel ?? null,
          nomeTecnicoResponsavel: r.nomeTecnicoResponsavel ?? null,
          dataAgendamento: r.dataAgendamento ?? null,
          horaAgendamento: r.horaAgendamento ?? null,
        };
      })
    );

    return calendar;
  }
};