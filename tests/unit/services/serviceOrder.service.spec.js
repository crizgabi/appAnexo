import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/ServiceOrderRepository.js", () => ({
    ServiceOrderRepository: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getCheckinState: jest.fn(),
        setCheckIn: jest.fn(),
        setCheckOut: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/services/CacheService.js", () => ({
    CacheService: {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/services/UploadService.js", () => ({
    UploadService: {
        uploadImage: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/ServiceOrderModel.js", () => ({
    default: jest.fn().mockImplementation((data) => data),
}));

const { ServiceOrderService } = await import("../../../src/services/ServiceOrderService.js");
const { ServiceOrderRepository } = await import("../../../src/repositories/ServiceOrderRepository.js");
const { CacheService } = await import("../../../src/services/CacheService.js");

// describe("ServiceOrderService.create", () => {
//     beforeEach(() => jest.clearAllMocks());

//     it("deve lançar erro se idCliente não for informado", async () => {
//         await expect(
//             ServiceOrderService.create(
//                 { idEquipamento: 1 },
//                 "TEST",
//                 "firebird"
//             )
//         ).rejects.toThrow("Campo obrigatório faltando: idCliente");
//     });

//     it("deve criar ordem de serviço com sucesso", async () => {
//         ServiceOrderRepository.create.mockResolvedValue({
//             idConserto: 10,
//             numeroOS: 123,
//         });

//         const result = await ServiceOrderService.create(
//             {
//                 idCliente: 1,
//                 idEquipamento: 2,
//             },
//             "TEST",
//             "firebird"
//         );

//         expect(ServiceOrderRepository.create).toHaveBeenCalled();

//         expect(result).toEqual(
//             expect.objectContaining({
//                 message: "Ordem de serviço criada com sucesso",
//                 idConserto: 10,
//                 numeroOS: 123,
//             })
//         );
//     });
// });



// describe("ServiceOrderService.find", () => {
//     beforeEach(() => jest.clearAllMocks());

//     it("deve retornar OS do cache se existir", async () => {
//         CacheService.get.mockResolvedValue({ idOS: 1 });

//         const result = await ServiceOrderService.find(1, "TEST", "firebird");

//         expect(CacheService.get).toHaveBeenCalled();
//         expect(ServiceOrderRepository.getById).not.toHaveBeenCalled();
//         expect(result).toEqual({ idOS: 1 });
//     });

//     it("deve buscar no banco se não houver cache", async () => {
//         CacheService.get.mockResolvedValue(null);
//         ServiceOrderRepository.getById.mockResolvedValue({ idOS: 2 });

//         const result = await ServiceOrderService.find(2, "TEST", "firebird");

//         expect(ServiceOrderRepository.getById).toHaveBeenCalledWith(
//             2,
//             "TEST",
//             "firebird"
//         );
//         expect(CacheService.set).toHaveBeenCalled();
//         expect(result).toEqual(
//             expect.objectContaining({
//                 idConserto: null
//             })
//         );
//     });
// });




describe("ServiceOrderService.update", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve atualizar a ordem de serviço", async () => {
        ServiceOrderRepository.getById.mockResolvedValue({ idConserto: 10 });
        ServiceOrderRepository.update.mockResolvedValue(true);

        const result = await ServiceOrderService.update(
            10,
            { status: "FINALIZADA" },
            "TEST",
            "firebird"
        );

        expect(ServiceOrderRepository.update).toHaveBeenCalledWith(
            10,
            expect.any(Object),
            "TEST",
            "firebird"
        );

        expect(CacheService.del).toHaveBeenCalled();

        expect(result).toEqual(
            expect.objectContaining({
                message: "Ordem de serviço atualizada com sucesso",
                idConserto: 10,
            })
        );
    });
});

