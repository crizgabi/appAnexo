export default class ServiceOrderHourly {
  constructor({
    idHorario = null,              // PKCODHORARIO
    idConserto,                    // FKCONSERTO

    data,                          // DATA (DATE)
    horaInicio,                    // INICIO (TIME)
    horaFim,                       // FINAL (TIME)

    ordem = null,                  // ORDEM

    tecnicoId = null,              // FKTECNICO
    tecnicoNome = null,            // NMTECNICO (snapshot)

    usuarioId = null,              // FKCODUSU

    operacaoId = null,             // FKOPERACAO
    operacaoNome = null,           // OPERACAO (snapshot)

    valorHora = null,              // VALORHORA
    valorTotalOperacao = 0,        // VALORTOTALOPERACAO

    totalMinutos = null,           // TOTALMINUTO
    totalFormatado = null,
    idTecnico = null        // TOTAL (HH:mm)
  }) {
    this.idHorario = idHorario;
    this.idConserto = idConserto;

    this.data = data;
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;

    this.ordem = ordem;

    this.tecnicoId = tecnicoId;
    this.tecnicoNome = tecnicoNome;

    this.usuarioId = usuarioId;

    this.operacaoId = operacaoId;
    this.operacaoNome = operacaoNome;

    this.valorHora = valorHora;
    this.valorTotalOperacao = valorTotalOperacao;

    this.totalMinutos = totalMinutos;
    this.totalFormatado = totalFormatado;
    this.idTecnico = idTecnico;
  }
}