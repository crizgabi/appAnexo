import { ProductRepository } from "../repositories/ProductRepository.js";

export const ProductService = {
    getProductByBarcode: async (barcode, dbEnvKey, dbType) => {
        try {
            const products = await ProductRepository.getProductByBarcode(barcode, dbEnvKey, dbType);

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

    getProductByName: async (name, dbEnvKey, dbType) => {
        try {
            const products = await ProductRepository.getProductByName(
                name, 
                dbEnvKey, 
                dbType
            );

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

    getProductByReference: async (reference, dbEnvKey, dbType) => {
        try {
            const products = await ProductRepository.getProductByReference(
                reference, 
                dbEnvKey, 
                dbType
            );

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

    getProductByPrimaryKey: async (productId, dbEnvKey, dbType) => {
        try {
            const products = await ProductRepository.getProductByPrimaryKey(
                productId, 
                dbEnvKey, 
                dbType
            );

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

    getProductDetails: async (productId, dbEnvKey, dbType) => {
        try {
            const p = await ProductRepository.getProductDetails(
                productId, 
                dbEnvKey, 
                dbType
            );

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

    getAllProducts: async (dbEnvKey, dbType) => {
        try {
            const products = await ProductRepository.getAllProducts(dbEnvKey, dbType);

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
            console.error("Error listing products:", error);
            throw error;
        }
    },
};