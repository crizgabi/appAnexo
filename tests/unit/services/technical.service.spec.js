import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/TechnicalRepository.js", () => ({
    TechnicalRepository: {
        findAll: jest.fn(),
    },
}));

const { TechnicalService } = await import("../../../src/services/TechnicalService.js");
const { TechnicalRepository } = await import("../../../src/repositories/TechnicalRepository.js");

describe("TechnicalService.list", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar lista de técnicos formatada", async () => {
        TechnicalRepository.findAll.mockResolvedValue([
            {
                IDTECNICO: 1,
                NOME: "João",
                ATIVO: 1,
            },
            {
                IDTECNICO: 2,
                NOME: "Maria",
                ATIVO: 0,
            },
        ]);

        const result = await TechnicalService.list("TEST", "firebird");

        expect(TechnicalRepository.findAll).toHaveBeenCalledWith("TEST", "firebird");

        expect(result).toEqual([
            {
                id: 1,
                nome: "João",
                ativo: 1,
            },
            {
                id: 2,
                nome: "Maria",
                ativo: 0,
            },
        ]);
    });

    it("deve retornar array vazio quando não houver técnicos", async () => {
        TechnicalRepository.findAll.mockResolvedValue([]);

        const result = await TechnicalService.list("TEST", "firebird");

        expect(result).toEqual([]);
    });
});
