import { CustomerAppOsRepository } from "../repository/CustomerAppOsRepository.js";

export const CustomerService = {
  getCustomerByCpfCnpj: async (cpfCnpj) => {
    try {
      const customer = await CustomerAppOsRepository.getCustomerByCpfCnpj(cpfCnpj);

      if (!customer) {
        return null;
      }

      return {
        razaoSocial: customer.RAZAOSOCIAL,
        codigoCidade: customer.FKCODCID,
        tipo: customer.TIPOFJ === 1 ? "fisica" : "juridica",
        cpf: customer.TIPOFJ === 1 ? customer.CNPJCPF : null,
        cnpj: customer.TIPOFJ === 0 ? customer.CNPJCPF : null,
        nomeFantasia: customer.TIPOFJ === 0 ? customer.NOMEFANTASIA : null,
        endereco: `${customer.ENDERECO || ""} ${customer.NUM || ""}`.trim(),
        telefone: customer.FONE1,
        email: customer.EMAIL,
      };
    } catch (error) {
      console.error("Erro no CustomerService.getCustomerByCpfCnpj:", error);
      throw error;
    }
  },
};

