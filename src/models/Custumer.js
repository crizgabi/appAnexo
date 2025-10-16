class Customer {
  constructor({ nome, codigoCidade, tipo, cpf, nomeFantasia, endereco, telefone, email }) {
    if (!nome || !codigoCidade) {
      throw new Error("Os campos 'nome' e 'codigoCidade' são obrigatórios.");
    }

    if (tipo !== "fisico" && tipo !== "juridico") {
      throw new Error("O campo 'tipo' deve ser 'fisico' ou 'juridico'.");
    }

    if (tipo === "fisico" && !cpf) {
      throw new Error("CPF é obrigatório para clientes físicos.");
    }

    if (tipo === "juridico" && !nomeFantasia) {
      throw new Error("Nome fantasia é obrigatório para clientes jurídicos.");
    }

    this.nome = nome;
    this.codigoCidade = codigoCidade;
    this.tipo = tipo;
    this.cpf = cpf || null;
    this.nomeFantasia = nomeFantasia || null;
    this.endereco = endereco || null;
    this.telefone = telefone || null;
    this.email = email || null;
  }

  create() {
    throw new Error("Método create() deve ser implementado pela subclasse.");
  }

  getDetails() {
    throw new Error("Método getDetails() deve ser implementado pela subclasse.");
  }
}

export default Customer;