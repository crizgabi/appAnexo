import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/ProductOSRepository.js", () => ({
    ProductOSRepository: {
        create: jest.fn(),
        getAllByOS: jest.fn(),
        delete: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/ProductOSModel.js", () => ({
    default: class ProductOSModel {
        constructor(data) {
            Object.assign(this, data);
        }
    },
}));

const { ProductOSService } = await import("../../../src/services/ProductOSService.js");
const { ProductOSRepository } = await import("../../../src/repositories/ProductOSRepository.js");

describe("ProductOSService.create", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve lançar erro se idConserto não for informado", async () => {
        await expect(
            ProductOSService.create({ idProduto: 1 }, "db", "sql")
        ).rejects.toThrow("Parâmetro obrigatório faltando: idConserto");
    });

    it("deve lançar erro se idProduto não for informado", async () => {
        await expect(
            ProductOSService.create({ idConserto: 10 }, "db", "sql")
        ).rejects.toThrow("Campo obrigatório faltando: idProduto");
    });

    it("deve criar produto da OS com valores default", async () => {
        ProductOSRepository.create.mockResolvedValue({ idItem: 1 });

        const result = await ProductOSService.create(
            {
                idConserto: 10,
                idProduto: 5,
            },
            "db",
            "sql"
        );

        expect(ProductOSRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                idConserto: 10,
                idProduto: 5,
                quantidade: 1,
                valorUnitario: 0,
                descontoPercentual: 0,
                valorTotal: 0,
            }),
            "db",
            "sql"
        );

        expect(result).toEqual({ idItem: 1 });
    });

    it("deve calcular corretamente o valorTotal", async () => {
        ProductOSRepository.create.mockResolvedValue(true);

        await ProductOSService.create(
            {
                idConserto: 20,
                idProduto: 3,
                quantidade: 4,
                valorUnitario: 50,
            },
            "db",
            "sql"
        );

        expect(ProductOSRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                quantidade: 4,
                valorUnitario: 50,
                valorTotal: 200,
            }),
            "db",
            "sql"
        );
    });
});

describe("ProductOSService.getAllByOS", () => {
    it("deve retornar os produtos da OS", async () => {
        ProductOSRepository.getAllByOS.mockResolvedValue([
            { idItem: 1 },
            { idItem: 2 },
        ]);

        const result = await ProductOSService.getAllByOS(10, "db", "sql");

        expect(ProductOSRepository.getAllByOS).toHaveBeenCalledWith(
            10,
            "db",
            "sql"
        );

        expect(result).toHaveLength(2);
    });
});

describe("ProductOSService.delete", () => {
    it("deve deletar item da OS", async () => {
        ProductOSRepository.delete.mockResolvedValue(true);

        const result = await ProductOSService.delete(5, "db", "sql");

        expect(ProductOSRepository.delete).toHaveBeenCalledWith(
            5,
            "db",
            "sql"
        );

        expect(result).toBe(true);
    });
});