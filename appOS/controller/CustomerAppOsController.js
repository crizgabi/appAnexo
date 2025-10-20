// import { User } from "../../src/models/UserModel.js";
import { CustomerService } from "../service/CustomerAppOsService.js";

export const getCustomer = async (req, res) => {
    const { cpfCnpj } = req.body;

    try {
        const customer = await CustomerService.getCustomerByCpfCnpj(cpfCnpj);
        if (!customer) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }
        res.json(customer);
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).json({ error: "Erro interno ao buscar cliente." });
    }
};