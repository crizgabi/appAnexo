export default class Equipament {
  constructor({
    idEquipamento = null,
    idCliente,
    nomeEquipamento,
    marca,
    modelo,
    numeroSerie,
    localInstalacao = null,
    fabricante = null,
    codigoInterno = null,
    numeroPatrimonio = null,
    descricao = null,
    //imagens = [],
    dataCadastro = null,
    dataAtualizacao = null,
  }) {
    this.idEquipamento = idEquipamento;
    this.idCliente = idCliente;
    this.nomeEquipamento = nomeEquipamento;
    this.marca = marca;
    this.modelo = modelo;
    this.numeroSerie = numeroSerie;
    this.localInstalacao = localInstalacao;
    this.fabricante = fabricante;
    this.codigoInterno = codigoInterno;
    this.numeroPatrimonio = numeroPatrimonio;
    this.descricao = descricao;
    //this.imagens = imagens;
    this.dataCadastro = dataCadastro;
    this.dataAtualizacao = dataAtualizacao;
  }
}
