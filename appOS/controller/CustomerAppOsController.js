// import { User } from "../../src/models/UserModel.js";
import { CustomerService } from "../service/CustomerAppOsService.js";

export const getCustomer = async (req, res) => {
    const { primaryKey } = req.body;

    try {
        const customer = await CustomerService.getCustomerByPrimaryKey(primaryKey);
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
    const { razaoSocial } = req.body;

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