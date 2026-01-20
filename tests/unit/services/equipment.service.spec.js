import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/EquipmentRepository.js", () => ({
    EquipmentRepository: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByCustomer: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findOsByEquipamento: jest.fn()
    }
}));

const { EquipmentService } = await import("../../../src/services/EquipmentService.js");
const { EquipmentRepository } = await import("../../../src/repositories/EquipmentRepository.js");

describe("EquipmentService.create", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve lançar erro se campos obrigatórios estiverem faltando", async () => {
        const data = { nomeEquipamento: "Notebook" };

        await expect(
            EquipmentService.create(data, "TEST", "firebird")
        ).rejects.toThrow("Campos obrigatórios faltando");
    });

    it("deve criar equipamento com sucesso", async () => {
        const data = {
            idCliente: 1,
            nomeEquipamento: "Notebook",
            marca: "Dell",
            modelo: "Inspiron",
            numeroSerie: "ABC123"
        };

        EquipmentRepository.create.mockResolvedValue({
            idEquipamento: 10,
            dataCadastro: new Date(),
            dataAtualizacao: new Date()
        });

        const result = await EquipmentService.create(data, "TEST", "firebird");

        expect(EquipmentRepository.create).toHaveBeenCalled();
        expect(result).toMatchObject({
            idEquipamento: 10,
            nomeEquipamento: "Notebook",
            marca: "Dell",
            modelo: "Inspiron",
            numeroSerie: "ABC123"
        });
    });

});




describe("EquipmentService.find", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve lançar erro se equipamento não existir", async () => {
        EquipmentRepository.findById.mockResolvedValue(null);

        await expect(
            EquipmentService.find(1, "TEST", "firebird")
        ).rejects.toThrow("Equipamento não encontrado");
    });

    it("deve retornar equipamento sem historicoOs quando não expandir", async () => {
        EquipmentRepository.findById.mockResolvedValue({
            PKEQUIPAMENTO: 1,
            FKCLIENTE: 2,
            EQUIPAMENTO: "Notebook",
            MARCA: "Dell",
            MODELO: "Inspiron",
            NSERIE: "ABC",
            LOCALEQUIPAMENTO: "Sala",
            FABRICANTE: "Dell",
            CODINTERNO: "INT01",
            NUMPATRIMONIO: "PAT01",
            OBS: "Obs",
            DATACAD: new Date(),
            DATAATU: new Date()
        });

        const result = await EquipmentService.find(1, "TEST", "firebird");

        expect(result.historicoOs).toBeNull();
        expect(result.nomeEquipamento).toBe("Notebook");
    });

    it("deve retornar historicoOs quando expand=historicoOs", async () => {
        EquipmentRepository.findById.mockResolvedValue({
            PKEQUIPAMENTO: 1,
            FKCLIENTE: 2,
            EQUIPAMENTO: "Notebook"
        });

        EquipmentRepository.findOsByEquipamento.mockResolvedValue([
            { idOs: 1 },
            { idOs: 2 }
        ]);

        const result = await EquipmentService.find(
            1,
            "TEST",
            "firebird",
            { expand: ["historicoOs"], osLimit: 5, osOffset: 0 }
        );

        expect(EquipmentRepository.findOsByEquipamento).toHaveBeenCalledWith(
            1,
            "TEST",
            "firebird",
            { limit: 5, offset: 0 }
        );

        expect(result.historicoOs.length).toBe(2);
    });

});




describe("EquipmentService.update", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve lançar erro se equipamento não existir", async () => {
        EquipmentRepository.findById.mockResolvedValue(null);

        await expect(
            EquipmentService.update(1, {}, "TEST", "firebird")
        ).rejects.toThrow("Equipamento não encontrado");
    });

    it("deve atualizar apenas campos enviados", async () => {
        EquipmentRepository.findById.mockResolvedValue({
            FKCLIENTE: 1,
            EQUIPAMENTO: "Notebook",
            MARCA: "Dell",
            MODELO: "Old",
            NSERIE: "123"
        });

        EquipmentRepository.update.mockResolvedValue(true);

        EquipmentRepository.findById.mockResolvedValueOnce({
            FKCLIENTE: 1,
            EQUIPAMENTO: "Notebook",
            MARCA: "Dell",
            MODELO: "Old",
            NSERIE: "123"
        }).mockResolvedValueOnce({
            PKEQUIPAMENTO: 1,
            FKCLIENTE: 1,
            EQUIPAMENTO: "Notebook",
            MARCA: "Dell",
            MODELO: "New",
            NSERIE: "123"
        });

        const result = await EquipmentService.update(
            1,
            { modelo: "New" },
            "TEST",
            "firebird"
        );

        expect(EquipmentRepository.update).toHaveBeenCalled();
        expect(result.modelo).toBe("New");
    });

});




describe("EquipmentService.delete", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve lançar erro se equipamento não existir", async () => {
        EquipmentRepository.findById.mockResolvedValue(null);

        await expect(
            EquipmentService.delete(1, "TEST", "firebird")
        ).rejects.toThrow("Equipamento não encontrado");
    });

    it("deve lançar erro se repository não deletar", async () => {
        EquipmentRepository.findById.mockResolvedValue({ PKEQUIPAMENTO: 1 });
        EquipmentRepository.delete.mockResolvedValue(false);

        await expect(
            EquipmentService.delete(1, "TEST", "firebird")
        ).rejects.toThrow("Erro ao remover equipamento");
    });

    it("deve deletar equipamento com sucesso", async () => {
        EquipmentRepository.findById.mockResolvedValue({ PKEQUIPAMENTO: 1 });
        EquipmentRepository.delete.mockResolvedValue(true);

        const result = await EquipmentService.delete(1, "TEST", "firebird");

        expect(result).toEqual({
            message: "Equipamento removido com sucesso",
            idEquipamento: 1,
            deletedAt: null
        });
    });

});