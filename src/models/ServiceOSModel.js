export default class ServiceOSModel  {
  constructor({
    idItemServico = null,
    idConserto,
    idServico,
    descricaoServico = null,
    quantidade = 1,
    valorUnitario = 0,
    valorTotal = 0,
    observacao = null,
    idUsuario = null,
    ordem = null
  }) {
    this.idItemServico = idItemServico;
    this.idConserto = idConserto;
    this.idServico = idServico;
    this.descricaoServico = descricaoServico;
    this.quantidade = quantidade;
    this.valorUnitario = valorUnitario;
    this.valorTotal = valorTotal;
    this.observacao = observacao;
    this.idUsuario = idUsuario;
    this.ordem = ordem;
  }
}
