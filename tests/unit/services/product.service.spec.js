import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/ProductRepository.js", () => ({
    ProductRepository: {
        getProductByBarcode: jest.fn(),
        getProductByName: jest.fn(),
        getProductByReference: jest.fn(),
        getProductByPrimaryKey: jest.fn(),
        getProductDetails: jest.fn(),
        getAllProducts: jest.fn(),
    },
}));

const { ProductService } = await import("../../../src/services/ProductService.js");
const { ProductRepository } = await import("../../../src/repositories/ProductRepository.js");

describe("ProductService.getProductByBarcode", () => {
    it("deve retornar produtos mapeados", async () => {
        ProductRepository.getProductByBarcode.mockResolvedValue([
            {
                PKCODPROD: 1,
                NOME: "Produto A",
                REFERENCIA: "REF1",
                CODBARRAS: "123",
                VALORVENDA: 10,
            },
        ]);

        const result = await ProductService.getProductByBarcode("123", "db", "sql");

        expect(result).toEqual([
            {
                pkcodprod: 1,
                nome: "Produto A",
                referencia: "REF1",
                codbarras: "123",
                valorvenda: 10,
            },
        ]);

        expect(ProductRepository.getProductByBarcode).toHaveBeenCalledWith(
            "123",
            "db",
            "sql"
        );
    });

    it("deve retornar array vazio se não houver produtos", async () => {
        ProductRepository.getProductByBarcode.mockResolvedValue(null);

        const result = await ProductService.getProductByBarcode("123", "db", "sql");

        expect(result).toEqual([]);
    });

    it("deve propagar erro do repository", async () => {
        ProductRepository.getProductByBarcode.mockRejectedValue(
            new Error("DB error")
        );

        await expect(
            ProductService.getProductByBarcode("123", "db", "sql")
        ).rejects.toThrow("DB error");
    });
});




describe("ProductService.getProductByName", () => {
    it("deve mapear unidade corretamente", async () => {
        ProductRepository.getProductByName.mockResolvedValue([
            {
                PKCODPROD: 2,
                NOME: "Produto B",
                REFERENCIA: "REF2",
                CODBARRAS: "456",
                VALORVENDA: 20,
                SIGLA: "UN",
            },
        ]);

        const result = await ProductService.getProductByName("Produto", "db", "sql");

        expect(result[0].unidade).toBe("UN");
    });

    it("deve retornar unidade null se SIGLA for null", async () => {
        ProductRepository.getProductByName.mockResolvedValue([
            {
                PKCODPROD: 3,
                NOME: "Produto C",
                REFERENCIA: "REF3",
                CODBARRAS: "789",
                VALORVENDA: 30,
                SIGLA: null,
            },
        ]);

        const result = await ProductService.getProductByName("Produto", "db", "sql");

        expect(result[0].unidade).toBeNull();
    });
});



describe("ProductService.getProductDetails", () => {
    it("deve retornar detalhes do produto", async () => {
        ProductRepository.getProductDetails.mockResolvedValue({
            PKCODPROD: 1,
            STATUS: "A",
            CODBARRAS: "123",
            REFERENCIA: "REF1",
            NOME: "Produto A",
            OBSERVACAO: "Obs",
            ESTOQUEATU: 10,
            ESTOQUEMIN: 2,
            ESTOQUEMAX: 20,
            VALORVENDA: 50,
            AGILIZARESTOQUE: true,
            FKCODUNI: 1,
            NOMEUNIDADE: "Unidade",
            SIGLA: "UN",
            FKCODCAT: 1,
            NOMECATEGORIA: "Categoria",
            FKCODMARCA: 1,
            NOMEMARCA: "Marca",
        });

        const result = await ProductService.getProductDetails(1, "db", "sql");

        expect(result.pkcodprod).toBe(1);
        expect(result.unidade).toBe("UN");
        expect(result.nomecategoria).toBe("Categoria");
    });

    it("deve retornar null se produto não existir", async () => {
        ProductRepository.getProductDetails.mockResolvedValue(null);

        const result = await ProductService.getProductDetails(1, "db", "sql");

        expect(result).toBeNull();
    });
});




describe("ProductService.getAllProducts", () => {
    it("deve retornar lista mapeada", async () => {
        ProductRepository.getAllProducts.mockResolvedValue([
            {
                PKCODPROD: 1,
                NOME: "Produto A",
                REFERENCIA: "REF1",
                CODBARRAS: "123",
                VALORVENDA: 10,
                SIGLA: "UN",
            },
        ]);

        const result = await ProductService.getAllProducts("db", "sql");

        expect(result).toHaveLength(1);
        expect(result[0].nome).toBe("Produto A");
    });

    it("deve retornar array vazio se não houver produtos", async () => {
        ProductRepository.getAllProducts.mockResolvedValue(null);

        const result = await ProductService.getAllProducts("db", "sql");

        expect(result).toEqual([]);
    });
});