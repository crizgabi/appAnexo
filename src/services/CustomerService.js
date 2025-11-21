import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { CustomerType } from "../models/CustomerModel.js";
import { UserRepository } from "../repositories/userRepository.js";
import { CityRepository } from "../repositories/CityRepository.js";
import { CepService } from "./CepService.js";

export const CustomerService = {
  getCustomersByName: async (razaoSocial) => {
    try {
      const customers = await CustomerRepository.getCustomersByName(razaoSocial);

      if (!customers) {
        return [];
      }

      return customers.map((c) => {
        const tipo = Number(c.TIPOFJ) === CustomerType.FISICA ? CustomerType.FISICA : CustomerType.JURIDICA;

        return {
          pkcodcli: c.PKCODCLI,
          nome: c.RAZAOSOCIAL,
          cpf: tipo === CustomerType.FISICA ? c.CNPJCPF : undefined,
          cnpj: tipo === CustomerType.JURIDICA ? c.CNPJCPF : undefined,
          telefone1: c.FONE1,
          telefone2: c.FONE2,
        };
      });
    } catch (error) {
      console.error("Error listing customers:", error);
      throw error;
    }
  },

  getCustomerByPrimaryKey: async (primaryKey) => {
    try {
      const customer = await CustomerRepository.getCustomerByPrimaryKey(primaryKey);

      if (!customer) {
        return null;
      }

      const tipo =
        customer.TIPOFJ === 0 ? "juridica" : "fisica";

      return {
        razaoSocial: customer.RAZAOSOCIAL,
        codigoCidade: customer.FKCODCID,
        tipo,
        cpf: tipo === "fisica" ? customer.CNPJCPF : null,
        cnpj: tipo === "juridica" ? customer.CNPJCPF : null,
        nomeFantasia: tipo === CustomerType.JURIDICA ? customer.NOMEFANTASIA : null,
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
    } catch (error) {
      console.error("Error getting customer details", error);
      throw error;
    }
  },

  createCustomer: async (customerData, userLogin) => {
    try {
      const user = await UserRepository.findByLogin(userLogin);
      if (!user) throw new Error("Usuário não encontrado");

      const tipo =
        customerData.tipo === "fisica"
          ? CustomerType.FISICA
          : CustomerType.JURIDICA;

      let codigoCidade;
      if (customerData.cidade && customerData.uf) {
        const cidade = await CityRepository.findByNameAndUf(customerData.cidade, customerData.uf);
        if (!cidade || !cidade.PKCODCID) {
          throw new Error(`Cidade não encontrada no banco: ${customerData.cidade}/${customerData.uf}`);
        }
        codigoCidade = cidade.PKCODCID;
      } else {
        throw new Error("Cidade e UF são obrigatórios para criar o cliente.");
      }

      const newCustomer = {
        ...customerData,
        tipo,
        fkcodusu: user.PKDOCUSU,
        status: 0,
        codigoCidade,
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
        obs: customerData.obs || "",
        endereco: customerData.endereco || "",
        num: customerData.num || "",
      };

      const pkcodcli = await CustomerRepository.createCustomer(newCustomer);

      return {
        pkcodcli,
        message: "Cliente criado com sucesso!",
      };
    } catch (error) {
      console.error("Erro no CustomerService.createCustomer:", error);
      throw error;
    }
  },

  updateCustomer: async (pkcodcli, customerData, userLogin) => {
    try {
      const user = await UserRepository.findByLogin(userLogin);
      if (!user) throw new Error("Usuário não encontrado");

      const existingCustomer = await CustomerRepository.getCustomerByPrimaryKey(pkcodcli);
      if (!existingCustomer) throw new Error("Cliente não encontrado.");

      const tipo = customerData.tipo
        ? (customerData.tipo === "fisica" ? CustomerType.FISICA : CustomerType.JURIDICA)
        : existingCustomer.TIPOFJ;

      let codigoCidade = existingCustomer.FKCODCID;
      if (customerData.cidade && customerData.uf) {
        const cidade = await CityRepository.findByNameAndUf(customerData.cidade, customerData.uf);
        if (cidade && cidade.PKCODCID) {
          codigoCidade = cidade.PKCODCID;
        } else {
          console.warn(`Cidade não encontrada no banco: ${customerData.cidade}/${customerData.uf}`);
        }
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
        FKCODCID: codigoCidade,
        CNPJCPF: customerData.cnpj ?? customerData.cpf ?? existingCustomer.CNPJCPF,
        TIPOFJ: tipo,
        OBS: customerData.obs ?? existingCustomer.OBS,
        FKCODUSU: user.PKCODUSU
      };

      await CustomerRepository.updateCustomer(pkcodcli, updatedCustomer);
      const customer = await CustomerService.getCustomerByPrimaryKey(pkcodcli);

      return {
        success: true,
        message: "Cliente atualizado com sucesso",
        data: customer,
      };
    } catch (error) {
      console.error("Erro no updateCustomer Service:", error);
      throw error;
    }
  },
};