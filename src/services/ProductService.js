import { ProductRepository } from "../repositories/ProductRepository.js";

export const ProductService = {
    getProductByBarcode: async (barcode) => {
        try {
            const products = await ProductRepository.getProductByBarcode(barcode);

            if (!products) {
                return [];
            }

            return products.map((p) => {
                return {
                    pkcodprod: p.PKCODPROD,
                    nome: p.NOME,
                    referencia: p.REFERENCIA,
                    codbarras: p.CODBARRAS,
                    valorvenda: p.VALORVENDA,
                };
            });
        } catch (error) {
            console.error("Error listing products by barcode:", error);
            throw error;
        }
    },

    getProductByName: async (name) => {
        try {
            const products = await ProductRepository.getProductByName(name);

            if (!products) {
                return [];
            }

            return products.map((p) => {
                return {
                    pkcodprod: p.PKCODPROD,
                    nome: p.NOME,
                    referencia: p.REFERENCIA,
                    codbarras: p.CODBARRAS,
                    valorvenda: p.VALORVENDA,
                };
            });
        } catch (error) {
            console.error("Error listing products by name:", error);
            throw error;
        }
    },

    getProductByReference: async (reference) => {
        try {
            const products = await ProductRepository.getProductByReference(reference);

            if (!products) {
                return [];
            }

            return products.map((p) => {
                return {
                    pkcodprod: p.PKCODPROD,
                    nome: p.NOME,
                    referencia: p.REFERENCIA,
                    codbarras: p.CODBARRAS,
                    valorvenda: p.VALORVENDA,
                };
            });
        } catch (error) {
            console.error("Error listing products by reference:", error);
            throw error;
        }
    },

    getProductByPrimaryKey: async (productId) => {
        try {
            const products = await ProductRepository.getProductByPrimaryKey(productId);

            if (!products) {
                return [];
            }

            return products.map((p) => {
                return {
                    pkcodprod: p.PKCODPROD,
                    nome: p.NOME,
                    referencia: p.REFERENCIA,
                    codbarras: p.CODBARRAS,
                    valorvenda: p.VALORVENDA,
                };
            });
        } catch (error) {
            console.error("Error listing products by ID:", error);
            throw error;
        }
    },

    getProductDetails: async (productId) => {
        try {
            const p = await ProductRepository.getProductDetails(productId);

            if (!p) {
                return null;
            }

            return {
                pkcodprod: p.PKCODPROD,
                status: p.STATUS,
                codbarras: p.CODBARRAS,
                referencia: p.REFERENCIA,
                nome: p.NOME,
                observacao: p.OBSERVACAO,
                estoqueAtual: p.ESTOQUEATU,
                estoqueMin: p.ESTOQUEMIN,
                estoqueMax: p.ESTOQUEMAX,
                valorvenda: p.VALORVENDA,
                agilizarEstoque: p.AGILIZARESTOQUE,
                unidadeId: p.FKCODUNI,
                nomeunidade: p.NOMEUNIDADE,
                sigla: p.SIGLA,
                categoriaId: p.FKCODCAT,
                nomecategoria: p.NOMECATEGORIA,
                marcaId: p.FKCODMARCA,
                nomemarca: p.NOMEMARCA,
            };
        } catch (error) {
            console.error("Error listing product:", error);
            throw error;
        }
    },
};