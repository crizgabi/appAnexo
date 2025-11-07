import axios from "axios";
import { CityRepository } from "../repositories/CityRepository.js";

export const CepService = {
    getCityCode: async (cidade, uf) => {
    try {
      if (!cidade || !uf) {
        throw new Error("Cidade e UF são obrigatórios para obter o código da cidade.");
      }

      const city = await CityRepository.findByNameAndUf(cidade, uf);

      if (!city || !city.PKCODCID) {
        throw new Error(`Cidade não encontrada no banco: ${cidade}/${uf}`);
      }

      return city.PKCODCID;
    } catch (error) {
      console.error("Erro ao buscar código da cidade no banco:", error.message);
      throw error;
    }
  },

    getAddressByCep: async (cep) => {
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (!data || data.erro) {
                throw new Error("Não foi possível identificar o endereço pelo CEP.");
            }

            // Retorna o objeto completo com logradouro, bairro, localidade, uf, ibge, etc.
            return data;
        } catch (error) {
            console.error("Erro ao buscar endereço pelo CEP:", error.message);
            throw error;
        }
    },
};