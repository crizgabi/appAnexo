// Enum para os tipos de cliente
export const CustomerType = Object.freeze({
  JURIDICA: 0,
  FISICA: 1,
});

export const isWhatsApp = Object.freeze({
  NO: 0,
  YES: 1,
});

class Customer {
  constructor({
    razaoSocial,
    codigoCidade,
    tipo,
    cpf,
    cnpj,
    nomeFantasia,
    endereco,
    num,
    comp,
    bairro,
    cep,
    fax,
    telefone1,
    telefone2,
    telefone1Whatsapp,
    telefone2Whatsapp,
    celularWhatsapp,
    email,
    obs,
    fkcodusu,
    status,
  }) {
    if (!razaoSocial || !codigoCidade) {
      throw new Error("Os campos 'razaoSocial' e 'codigoCidade' são obrigatórios.");
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
    this.razaoSocial = razaoSocial;
    this.codigoCidade = codigoCidade;
    this.tipo = tipo;
    this.cpf = cpf || null;
    this.cnpj = cnpj || null;
    this.nomeFantasia = nomeFantasia || null;

    this.endereco = endereco || '';
    this.num = num || '';
    this.comp = comp || '';
    this.bairro = bairro || '';
    this.cep = cep || '';

    this.fax = fax || '';
    this.telefone1 = telefone1 || '';
    this.telefone2 = telefone2 || '';
    this.telefone1Whatsapp = telefone1Whatsapp || isWhatsApp.NO;
    this.telefone2Whatsapp = telefone2Whatsapp || isWhatsApp.NO;
    this.celularWhatsapp = celularWhatsapp || isWhatsApp.NO;

    this.email = email || '';
    this.obs = obs || '';
    this.fkcodusu = fkcodusu || 1;
    this.status = status || 1;
  }
}

export default Customer;