// Enum para os tipos de cliente
export const CustomerType = Object.freeze({
  JURIDICA: 0,
  FISICA: 1,
});

class Customer {
  constructor({ nome, codigoCidade, tipo, cpf, cnpj, nomeFantasia, endereco, telefone, email }) {
    if (!nome || !codigoCidade) {
      throw new Error("Os campos 'nome' e 'codigoCidade' são obrigatórios.");
    }

    if (tipo !== CustomerType.FISICA && tipo !== CustomerType.JURIDICA) {
      throw new Error("O campo 'tipo' deve ser CustomerType.FISICA ou CustomerType.JURIDICA.");
    }

    if (tipo === CustomerType.FISICA && !cpf) {
      throw new Error("CPF é obrigatório para pessoa física.");
    }

    if (tipo === CustomerType.JURIDICA && !cnpj) {
      throw new Error("CNPJ é obrigatório para pessoa jurídica.");
    }

    if (tipo === CustomerType.JURIDICA && !nomeFantasia) {
      throw new Error("Nome fantasia é obrigatório para pessoa jurídica.");
    }

    // Inicialização das propriedades
    this.nome = nome;
    this.codigoCidade = codigoCidade;
    this.tipo = tipo; // 0 = juridica | 1 = fisica
    this.cpf = cpf || null;
    this.cnpj = cnpj || null;
    this.nomeFantasia = nomeFantasia || null;
    this.endereco = endereco || null;
    this.telefone = telefone || null;
    this.email = email || null;
  }

  // Métodos genéricos para subclasses
  create() {
    throw new Error("Método create() deve ser implementado pela subclasse.");
  }

  getDetails() {
    throw new Error("Método getDetails() deve ser implementado pela subclasse.");
  }
}

export default Customer;