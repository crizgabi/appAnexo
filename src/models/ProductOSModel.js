export default class ProductOSModel {
  constructor({
    idItemProduto = null,
    idConserto,
    idProduto,
    descricaoProduto = null,
    unidade = null,
    quantidade = 1,
    valorUnitario = 0,
    descontoPercentual = null,
    valorTotal = 0,
    observacao = null,
    idUsuario = null,
    ordem = null,
    idTecnico = null
  }) {
    this.idItemProduto = idItemProduto;
    this.idConserto = idConserto;
    this.idProduto = idProduto;
    this.descricaoProduto = descricaoProduto;
    this.unidade = unidade;
    this.quantidade = quantidade;
    this.valorUnitario = valorUnitario;
    this.descontoPercentual = descontoPercentual;
    this.valorTotal = valorTotal;
    this.observacao = observacao;
    this.idUsuario = idUsuario;
    this.ordem = ordem;
    this.idTecnico = idTecnico;
  }
}
