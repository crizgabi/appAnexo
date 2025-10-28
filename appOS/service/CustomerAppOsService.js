import { CustomerAppOsRepository } from "../repository/CustomerAppOsRepository.js";
import { CustomerType } from "../../src/models/CustomerModel.js";

export const CustomerService = {
  getCustomerByCpfCnpj: async (cpfCnpj) => {
    try {
      const customer = await CustomerAppOsRepository.getCustomerByCpfCnpj(cpfCnpj);

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
      console.error("Erro no CustomerService.getCustomerByCpfCnpj:", error);
      throw error;
    }
  },
};

