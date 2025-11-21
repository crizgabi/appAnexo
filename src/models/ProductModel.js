class Product {
  constructor({
    pkcodprod,
    status,
    referencia,
    codbarras,
    nome,
    observacao,
    imagemprincipal,
    produtoespecifico,
    tipoitem,
    pesoliq,
    pesobruto,
    estoquemin,
    estoquemax,
    agilizarestoque,
    estoqueatu,
    descontomaximo,
    valorvenda,
    fkcoduni,
    nomeunidade,
    sigla,
    fkcodcat,
    nomecategoria,
    fkcodmarca,
    nomemarca,
  }) {

    // IDs e info básica
    this.id = pkcodprod;
    this.status = status != null ? Number(status) : 1;
    this.referencia = referencia ?? "";
    this.codBarras = codbarras ?? "";
    this.nome = nome;
    this.observacao = observacao ?? "";
    this.imagemPrincipal = imagemprincipal ?? null;

    // Propriedades do produto
    this.produtoEspecifico = produtoespecifico != null ? Number(produtoespecifico) : 0;
    this.tipoItem = tipoitem != null ? Number(tipoitem) : null;

    // Pesos
    this.pesoLiquido = pesoliq != null ? Number(pesoliq) : 0;
    this.pesoBruto = pesobruto != null ? Number(pesobruto) : 0;

    // Estoques
    this.estoqueMin = estoquemin != null ? Number(estoquemin) : 0;
    this.estoqueMax = estoquemax != null ? Number(estoquemax) : 0;
    this.agilizarEstoque = agilizarestoque != null ? Number(agilizarestoque) : 0;
    this.estoqueAtual = estoqueatu != null ? Number(estoqueatu) : 0;

    // Preço e desconto
    this.descontoMaximo = descontomaximo != null ? Number(descontomaximo) : 0;
    this.valorVenda = valorvenda != null ? Number(valorvenda) : 0;

    // Unidade
    this.unidadeId = fkcoduni ?? null;
    this.nomeUnidade = nomeunidade ?? null;
    this.siglaUnidade = sigla ?? null;

    // Categoria
    this.categoriaId = fkcodcat ?? null;
    this.nomeCategoria = nomecategoria ?? null;

    // Marca
    this.marcaId = fkcodmarca ?? null;
    this.nomeMarca = nomemarca ?? null;
  }
}

export default Product;