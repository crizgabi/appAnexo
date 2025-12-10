export default class OrdemServico {
    constructor({
        idConserto = null,        // PKCONSERTO
        idCliente,                // FKCLIENTE
        idTecnico = null,         // FKTECNICO
        idEquipamento = null,     // FKEQUIPAMENTO
        numeroOS,

        idStatus = 1,             // IDSTATUS (padrão = ABERTO)
        observacao = null,        // OBSERVACAO

        numeroSerie = null,       // NSERIE
        defeitoReclamado = null,  // DEFEITORECLAMADO

        localAtendimento = null,  // LOCALATENDIMENTO
        tipoConserto = null,      // TIPOCONS

        situacao = 0,             // SITUACAO (0 = aguardando)
        dataConserto = null,      // DATACONSERTO
        hora = null,              // HORA

        dataCadastro = null,      // DATACAD
        dataAtualizacao = null,   // DATAATU
    }) {
        this.idConserto = idConserto;
        this.idCliente = idCliente;
        this.idTecnico = idTecnico;
        this.idEquipamento = idEquipamento;
        this.numeroOS = numeroOS;

        this.idStatus = idStatus;
        this.observacao = observacao;

        this.numeroSerie = numeroSerie;
        this.defeitoReclamado = defeitoReclamado;

        this.localAtendimento = localAtendimento;
        this.tipoConserto = tipoConserto;

        this.situacao = situacao;
        this.dataConserto = dataConserto;
        this.hora = hora;

        this.dataCadastro = dataCadastro;
        this.dataAtualizacao = dataAtualizacao;
    }
}