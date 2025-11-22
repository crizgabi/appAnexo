// import { User } from "../../src/models/UserModel.js";
import { CustomerService } from "../services/CustomerService.js";

export const getCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await CustomerService.getCustomerByPrimaryKey(id);
        if (!customer) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }
        res.json(customer);
    } catch (error) {
        console.error("Erro getting customer details:", error);
        res.status(500).json({ error: "Erro getting customer details." });
    }
};

export const getCustomersByName = async(req, res) => {
    const { razaoSocial } = req.query;

    try {
        const customers = await CustomerService.getCustomersByName(razaoSocial);
        if (!customers) {
            return res.status(404).json({ error: "Clientes não encontrado." });
        }
        res.json(customers);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ error: "Erro interno ao buscar clientes." });
    }
};

export const createCustomer = async (req, res) => {
    const customerData = req.body;
    const { login } = req.user;

  if (!login) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

    try {
        const newCustomer = await CustomerService.createCustomer(customerData, login);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ error: "Erro interno ao criar cliente." });
    }
};

export const updateCustomer = async (req, res) => {
    const customerData = req.body;
    //id = pkcodcli
    const { id } = req.params;
    const { login } = req.user;

    if (!login) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

    try {
        const updatedCustomer = await CustomerService.updateCustomer(id, customerData, login);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ error: "Erro interno ao criar cliente." });
    }
};
