import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/ServicesRepository.js", () => ({
    ServicesRepository: {
        getServicesByDescription: jest.fn(),
        getServicesByReference: jest.fn(),
        getServicesByName: jest.fn(),
        getServicesByPrimaryKey: jest.fn(),
        getServiceDetails: jest.fn(),
        getAllServices: jest.fn(),
    },
}));

const { ServicesService } = await import("../../../src/services/ServicesService.js");
const { ServicesRepository } = await import("../../../src/repositories/ServicesRepository.js");

describe("ServicesService.getServicesByDescription", () => {
    it("deve retornar serviços mapeados", async () => {
        ServicesRepository.getServicesByDescription.mockResolvedValue([
            {
                PKCODSER: 1,
                DESCRICAO: "Serviço A",
                NOMESERVICO: "Limpeza",
                REFERENCIA: "REF1",
                VALOR: 100,
                SIGLA: "UN",
            },
        ]);

        const result = await ServicesService.getServicesByDescription(
            "Limpeza",
            "db",
            "sql"
        );

        expect(result).toEqual([
            {
                pkcodser: 1,
                descricao: "Serviço A",
                nome: "Limpeza",
                referencia: "REF1",
                valor: 100,
                unidade: "UN",
            },
        ]);
    });

    it("deve retornar array vazio se não houver serviços", async () => {
        ServicesRepository.getServicesByDescription.mockResolvedValue(null);

        const result = await ServicesService.getServicesByDescription(
            "Limpeza",
            "db",
            "sql"
        );

        expect(result).toEqual([]);
    });

    it("deve propagar erro do repository", async () => {
        ServicesRepository.getServicesByDescription.mockRejectedValue(
            new Error("DB error")
        );

        await expect(
            ServicesService.getServicesByDescription("Limpeza", "db", "sql")
        ).rejects.toThrow("DB error");
    });
});




describe("ServicesService.getServicesByName", () => {
    it("deve mapear unidade corretamente", async () => {
        ServicesRepository.getServicesByName.mockResolvedValue([
            {
                PKCODSER: 2,
                DESCRICAO: "Serviço B",
                NOMESERVICO: "Reparo",
                REFERENCIA: "REF2",
                VALOR: 200,
                SIGLA: null,
            },
        ]);

        const result = await ServicesService.getServicesByName(
            "Reparo",
            "db",
            "sql"
        );

        expect(result[0].unidade).toBeNull();
    });
});




describe("ServicesService.getServiceDetails", () => {
    it("deve retornar detalhes do serviço", async () => {
        ServicesRepository.getServiceDetails.mockResolvedValue({
            PKCODSER: 1,
            DESCRICAO: "Serviço A",
            NOMESERVICO: "Limpeza",
            REFERENCIA: "REF1",
            VALOR: 150,
            SIGLA: "UN",
        });

        const result = await ServicesService.getServiceDetails(1, "db", "sql");

        expect(result).toEqual({
            pkcodser: 1,
            descricao: "Serviço A",
            nome: "Limpeza",
            referencia: "REF1",
            valor: 150,
            unidade: "UN",
        });
    });

    it("deve retornar null se serviço não existir", async () => {
        ServicesRepository.getServiceDetails.mockResolvedValue(null);

        const result = await ServicesService.getServiceDetails(1, "db", "sql");

        expect(result).toBeNull();
    });
});




describe("ServicesService.getAllServices", () => {
    it("deve retornar lista de serviços", async () => {
        ServicesRepository.getAllServices.mockResolvedValue([
            {
                PKCODSER: 3,
                DESCRICAO: "Serviço C",
                NOMESERVICO: "Instalação",
                REFERENCIA: "REF3",
                VALOR: 300,
                SIGLA: "H",
            },
        ]);

        const result = await ServicesService.getAllServices("db", "sql");

        expect(result).toHaveLength(1);
        expect(result[0].nome).toBe("Instalação");
    });

    it("deve retornar array vazio se não houver serviços", async () => {
        ServicesRepository.getAllServices.mockResolvedValue(null);

        const result = await ServicesService.getAllServices("db", "sql");

        expect(result).toEqual([]);
    });
});