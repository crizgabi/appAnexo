import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/ServiceOSModel.js", () => ({
    default: class ServiceOSModel {
        constructor(data) {
            Object.assign(this, data);
        }
    },
}));

jest.unstable_mockModule("../../../src/repositories/ServiceOSRepository.js", () => ({
    ServiceOSRepository: {
        create: jest.fn(),
        getAllByOS: jest.fn(),
        delete: jest.fn(),
    },
}));

const { ServiceOSService } = await import("../../../src/services/ServiceOSService.js");
const { ServiceOSRepository } = await import("../../../src/repositories/ServiceOSRepository.js");

describe("ServiceOSService.create", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve lançar erro se idConserto não for informado", async () => {
        await expect(
            ServiceOSService.create({ idServico: 1 }, "TEST", "firebird")
        ).rejects.toThrow("Parâmetro obrigatório faltando: idConserto");
    });

    it("deve lançar erro se idServico não for informado", async () => {
        await expect(
            ServiceOSService.create({ idConserto: 10 }, "TEST", "firebird")
        ).rejects.toThrow("Campo obrigatório faltando: idServico");
    });

    it("deve criar serviço da OS com sucesso", async () => {
        ServiceOSRepository.create.mockResolvedValue({ id: 1 });

        const result = await ServiceOSService.create(
            {
                idConserto: 10,
                idServico: 5,
                quantidade: 2,
                valorUnitario: 100,
                observacao: "Teste",
                idUsuario: 1,
                idTecnico: 2,
            },
            "TEST",
            "firebird"
        );

        expect(ServiceOSRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                idConserto: 10,
                idServico: 5,
                quantidade: 2,
                valorUnitario: 100,
                valorTotal: 200,
                observacao: "Teste",
                idUsuario: 1,
                idTecnico: 2,
            }),
            "TEST",
            "firebird"
        );

        expect(result).toEqual({ id: 1 });
    });
});

describe("ServiceOSService.getAllByOS", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve retornar serviços da OS", async () => {
        ServiceOSRepository.getAllByOS.mockResolvedValue([
            { id: 1 },
            { id: 2 },
        ]);

        const result = await ServiceOSService.getAllByOS(
            10,
            "TEST",
            "firebird"
        );

        expect(ServiceOSRepository.getAllByOS).toHaveBeenCalledWith(
            10,
            "TEST",
            "firebird"
        );

        expect(result).toHaveLength(2);
    });
});

describe("ServiceOSService.delete", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve deletar item de serviço da OS", async () => {
        ServiceOSRepository.delete.mockResolvedValue(true);

        const result = await ServiceOSService.delete(
            5,
            "TEST",
            "firebird"
        );

        expect(ServiceOSRepository.delete).toHaveBeenCalledWith(
            5,
            "TEST",
            "firebird"
        );

        expect(result).toBe(true);
    });
});
