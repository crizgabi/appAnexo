import { CepService } from "../service/CepService.js";

export const getAddressByCep = async (req, res) => {
  try {
    const { cep } = req.params;

    if (!cep) {
      return res.status(400).json({ error: "CEP é obrigatório." });
    }

    const codigoCidade = await CepService.getAddressByCep(cep);

    if (!codigoCidade) {
      return res.status(404).json({ error: "Cidade não encontrada para o CEP informado." });
    }

    return res.json({ codigoCidade });
  } catch (error) {
    console.error("Erro no CepController.getCityCode:", error);
    return res.status(500).json({ error: "Erro ao consultar o CEP." });
  }
};

/**
 * GET /cep/:cep
 * Este método pega o CEP, cidade e UF enviados no corpo (ou params) 
 * e retorna o código da cidade do banco (PKCODCID).
 */
export const getCityCode = async (req, res) => {
  try {
    const { cep, cidade, uf } = req.params;

    if (!cep || !cidade || !uf) {
      return res.status(400).json({ error: "CEP, cidade e UF são obrigatórios." });
    }

    const codigoCidade = await CepService.getCityCode(cep, cidade, uf);

    if (!codigoCidade) {
      return res.status(404).json({ error: "Cidade não encontrada no banco." });
    }

    return res.json({ codigoCidade });
  } catch (error) {
    console.error("Erro no CepController.getCityCode:", error);
    return res.status(500).json({ error: "Erro ao consultar o código da cidade." });
  }
};