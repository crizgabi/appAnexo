import { CustomerAppOsRepository } from "../repository/CustomerAppOsRepository.js";
import { CustomerType } from "../../src/models/CustomerModel.js";

export const CustomerService = {
  getCustomersByName: async (razaoSocial) => {
    try {
      const customers = await CustomerAppOsRepository.getCustomersByName(razaoSocial);

      if (!customers) {
        return [];
      }

      return customers.map((c) => ({
        pkcodcli: c.PKCODCLI,
        nome: c.RAZAOSOCIAL,
        cpf: c.TIPOFJ === CustomerType.FISICA ? c.CNPJCPF : null,
        cnpj: c.TIPOFJ === CustomerType.JURIDICA ? c.CNPJCPF : null,
        telefone1: c.FONE1,
        telefone2: c.FONE2,
      }));
    } catch (error) {
      console.error("Error listing customers:", error);
      throw error;
    }
  },

  getCustomerByPrimaryKey: async (primaryKey) => {
    try {
      const customer = await CustomerAppOsRepository.getCustomerByPrimaryKey(primaryKey);

      if (!customer) {
        return null;
      }

      const tipo =
        customer.TIPOFJ === 1 ? CustomerType.FISICA : CustomerType.JURIDICA;

      return {
        razaoSocial: customer.RAZAOSOCIAL,
        codigoCidade: customer.FKCODCID,
        tipo,
        cpf: tipo === CustomerType.FISICA ? customer.CNPJCPF : null,
        cnpj: tipo === CustomerType.JURIDICA ? customer.CNPJCPF : null,
        nomeFantasia: tipo === CustomerType.JURIDICA ? customer.NOMEFANTASIA : null,
        endereco: `${customer.ENDERECO || ""} ${customer.NUM || ""}`.trim(),
        comp: customer.COMP || "",
        bairro: customer.BAIRRO || "",
        cep: customer.CEP || "",
        fax: customer.FAX || "",
        telefone1: customer.FONE1 || "",
        telefone2: customer.FONE2 || "",
        telefone1Whatsapp: customer.FONE1WHATSAPP || 0,
        telefone2Whatsapp: customer.FONE2WHATSAPP || 0,
        celularWhatsapp: customer.CELULARWHATSAPP || 0,
        email: customer.EMAIL || "",
        obs: customer.OBS || "",
      };
    } catch (error) {
      console.error("Error getting customer details", error);
      throw error;
    }
  },
};

