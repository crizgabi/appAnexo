class Service {
  constructor({
    pkcodser,
    descricao,
    datacad,
    dataatu,
    fkcodusu,
    valorCusto,
    valorMaterial,
    valorInsumo,
    valorTransporte,
    valorRefeicoes,
    valorOutros,
    descricaoOutros,
    codListaServico,
    descontoServico,
    mostraPreventiva,
    aliquota,
    codigoCNAE,
    codigoTributacao,
    codSitTrib,
    tributadoMunicipio,
    percDeducao,
    percISSRF,
    nomeServico,
    referencia,
    ativo,
    retemISSQN,
    valor,
  }) {
    if (!descricao) {
      throw new Error("O campo 'descricao' é obrigatório.");
    }
    this.id = pkcodser || null;
    this.descricao = descricao;
    this.dataCadastro = datacad || null;
    this.dataAtualizacao = dataatu || null;
    this.usuarioId = fkcodusu;
    this.valorCusto = valorCusto != null ? Number(valorCusto) : 0;
    this.valorMaterial = valorMaterial != null ? Number(valorMaterial) : 0;
    this.valorInsumo = valorInsumo != null ? Number(valorInsumo) : 0;
    this.valorTransporte = valorTransporte != null ? Number(valorTransporte) : 0;
    this.valorRefeicoes = valorRefeicoes != null ? Number(valorRefeicoes) : 0;
    this.valorOutros = valorOutros != null ? Number(valorOutros) : 0;
    this.descricaoOutros = descricaoOutros ?? "";
    this.codListaServico = codListaServico ?? null;
    this.descontoServico = descontoServico != null ? Number(descontoServico) : 0;
    this.mostraPreventiva = mostraPreventiva != null ? Number(mostraPreventiva) : 0;
    this.aliquota = aliquota != null ? Number(aliquota) : null;
    this.codigoCNAE = codigoCNAE ?? null;
    this.codigoTributacao = codigoTributacao ?? null;
    this.codSitTrib = codSitTrib ?? null;
    this.tributadoMunicipio = tributadoMunicipio != null ? Number(tributadoMunicipio) : 0;
    this.percDeducao = percDeducao != null ? Number(percDeducao) : 0;
    this.percISSRF = percISSRF != null ? Number(percISSRF) : 0;
    this.nomeServico = nomeServico ?? null;
    this.referencia = referencia ?? null;
    this.ativo = ativo != null ? Number(ativo) : 1;
    this.retemISSQN = retemISSQN != null ? Number(retemISSQN) : 0;
    this.valor = valor != null ? Number(valor) : 0;
  }
}

export default Service;