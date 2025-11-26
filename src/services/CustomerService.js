import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { CustomerType } from "../models/CustomerModel.js";
import { UserRepository } from "../repositories/userRepository.js";
import { CityRepository } from "../repositories/CityRepository.js";
import { CepService } from "./CepService.js";
import Customer from "../models/CustomerModel.js"

export const CustomerService = {
  // GET CUSTOMER LIST (by name)
  async getCustomersByName(razaoSocial, dbEnvKey, dbType) {
    const customers = await CustomerRepository.getCustomersByName(
      razaoSocial,
      dbEnvKey,
      dbType
    );

    if (!customers) return [];

    return customers.map((c) => {
      const tipo = Number(c.TIPOFJ) === CustomerType.FISICA
        ? CustomerType.FISICA
        : CustomerType.JURIDICA;

      return {
        pkcodcli: c.PKCODCLI,
        nome: c.RAZAOSOCIAL,
        cpf: tipo === CustomerType.FISICA ? c.CNPJCPF : undefined,
        cnpj: tipo === CustomerType.JURIDICA ? c.CNPJCPF : undefined,
        telefone1: c.FONE1,
        telefone2: c.FONE2,
      };
    });
  },

  // GET CUSTOMER BY PRIMARY KEY
  async getCustomerByPrimaryKey(primaryKey, dbEnvKey, dbType) {
    const customer = await CustomerRepository.getCustomerByPrimaryKey(
      primaryKey,
      dbEnvKey,
      dbType
    );

    if (!customer) return null;

    const tipo =
      customer.TIPOFJ === 0 ? "juridica" : "fisica";

    return {
      razaoSocial: customer.RAZAOSOCIAL,
      codigoCidade: customer.FKCODCID,
      tipo,
      cpf: tipo === "fisica" ? customer.CNPJCPF : null,
      cnpj: tipo === "juridica" ? customer.CNPJCPF : null,
      nomeFantasia: tipo === "juridica" ? customer.NOMEFANTASIA : null,
      endereco: (customer.ENDERECO || "").trim(),
      num: customer.NUM || "",
      comp: customer.COMP || "",
      bairro: customer.BAIRRO || "",
      cep: customer.CEP || "",
      cidade: customer.NOME_CIDADE,
      fax: customer.FAX || "",
      telefone1: customer.FONE1 || "",
      telefone2: customer.FONE2 || "",
      telefone1Whatsapp: customer.FONE1WHATSAPP || 0,
      telefone2Whatsapp: customer.FONE2WHATSAPP || 0,
      celularWhatsapp: customer.CELULARWHATSAPP || 0,
      email: customer.EMAIL || "",
      obs: customer.OBS || "",
    };
  },

  createCustomer: async (customerData, userLogin, dbEnvKey, dbType) => {
    const user = await UserRepository.findByLogin(userLogin, dbEnvKey, dbType);
    if (!user) throw new Error("Usuário não encontrado");

    // tipo F/J
    const tipo = customerData.tipo === "fisica"
      ? CustomerType.FISICA
      : CustomerType.JURIDICA;

    // cidade
    const cidade = await CityRepository.findByNameAndUf(
      customerData.cidade,
      customerData.uf,
      dbEnvKey,
      dbType
    );

    if (!cidade || !cidade.PKCODCID) {
      throw new Error(`Cidade não encontrada: ${customerData.cidade}/${customerData.uf}`);
    }

    const payload = {
      ...customerData,
      tipo,
      fkcodusu: user.PKDOCUSU,
      codigoCidade: cidade.PKCODCID,
      telefone1: customerData.telefone1 || "",
      telefone2: customerData.telefone2 || "",
      fax: customerData.fax || "",
      telefone1Whatsapp: customerData.telefone1 ? (customerData.telefone1Whatsapp || 0) : 0,
      telefone2Whatsapp: customerData.telefone2 ? (customerData.telefone2Whatsapp || 0) : 0,
      celularWhatsapp: customerData.fax ? (customerData.celularWhatsapp || 0) : 0,
      email: customerData.email || "",
      comp: customerData.comp || "",
      bairro: customerData.bairro || "",
      cep: customerData.cep || "",
      nomeFantasia: customerData.nomeFantasia || null,
      cnpj: customerData.cnpj || null,
      cpf: customerData.cpf || null,
      obs: customerData.obs || "",
      endereco: customerData.endereco || "",
      num: customerData.num || "",
    };

    const customer = new Customer(payload);

    const pkcodcli = await CustomerRepository.createCustomer(
      customer,
      dbEnvKey,
      dbType
    );

    return {
      pkcodcli,
      razaoSocial: customer.razaoSocial,
      tipo: customer.tipo,
      codigoCidade: customer.codigoCidade,
      message: "Cliente criado com sucesso!",
    };
  },

  // UPDATE CUSTOMER
  async updateCustomer(pkcodcli, customerData, userLogin, dbEnvKey, dbType) {
    const user = await UserRepository.findByLogin(userLogin, dbEnvKey, dbType);
    if (!user) throw new Error("Usuário não encontrado");

    const existingCustomer =
      await CustomerRepository.getCustomerByPrimaryKey(pkcodcli, dbEnvKey, dbType);

    if (!existingCustomer) throw new Error("Cliente não encontrado");

    let tipo = existingCustomer.TIPOFJ;
    if (customerData.tipo) {
      tipo = customerData.tipo === "fisica"
        ? CustomerType.FISICA
        : CustomerType.JURIDICA;
    }

    let codigoCidade = existingCustomer.FKCODCID;

    if (customerData.cidade && customerData.uf) {
      const cidade = await CityRepository.findByNameAndUf(
        customerData.cidade,
        customerData.uf,
        dbEnvKey,
        dbType
      );
      if (cidade?.PKCODCID) codigoCidade = cidade.PKCODCID;
    }

    const updatedCustomer = {
      STATUS: customerData.status ?? existingCustomer.STATUS,
      RAZAOSOCIAL: customerData.razaoSocial ?? existingCustomer.RAZAOSOCIAL,
      NOMEFANTASIA: customerData.nomeFantasia ?? existingCustomer.NOMEFANTASIA,
      FONE1: customerData.telefone1 ?? existingCustomer.FONE1,
      FONE2: customerData.telefone2 ?? existingCustomer.FONE2,
      FAX: customerData.fax ?? existingCustomer.FAX,
      FONE1WHATSAPP: customerData.telefone1Whatsapp ?? existingCustomer.FONE1WHATSAPP,
      FONE2WHATSAPP: customerData.telefone2Whatsapp ?? existingCustomer.FONE2WHATSAPP,
      CELULARWHATSAPP: customerData.celularWhatsapp ?? existingCustomer.CELULARWHATSAPP,
      EMAIL: customerData.email ?? existingCustomer.EMAIL,
      ENDERECO: customerData.endereco ?? existingCustomer.ENDERECO,
      NUM: customerData.num ?? existingCustomer.NUM,
      COMP: customerData.comp ?? existingCustomer.COMP,
      BAIRRO: customerData.bairro ?? existingCustomer.BAIRRO,
      CEP: customerData.cep ?? existingCustomer.CEP,
      FKCODCID: codigoCidade ?? existingCustomer.FKCODCID,
      CNPJCPF: customerData.cnpj ?? customerData.cpf ?? existingCustomer.CNPJCPF,
      TIPOFJ: tipo ?? existingCustomer.TIPOFJ,
      OBS: customerData.obs ?? existingCustomer.OBS,
      FKCODUSU: user.PKCODUSU,
    };

    await CustomerRepository.updateCustomer(
      pkcodcli,
      updatedCustomer,
      dbEnvKey,
      dbType
    );

    const response = await this.getCustomerByPrimaryKey(
      pkcodcli,
      dbEnvKey,
      dbType
    );
    return {
      success: true,
      data: response,
    };
  },
};