import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/repositories/CustomerRepository.js", () => ({
    CustomerRepository: {
        getAllCustomers: jest.fn(),
        getCustomersByName: jest.fn(),
        getCustomerByPrimaryKey: jest.fn(),
        createCustomer: jest.fn(),
        updateCustomer: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/repositories/UserRepository.js", () => ({
    UserRepository: {
        findByLogin: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/repositories/CityRepository.js", () => ({
    CityRepository: {
        findByNameAndUf: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/services/CacheService.js", () => ({
    CacheService: {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
    },
}));

const { CustomerService } = await import("../../../src/services/CustomerService.js");
const { CustomerRepository } = await import("../../../src/repositories/CustomerRepository.js");
const { UserRepository } = await import("../../../src/repositories/UserRepository.js");
const { CityRepository } = await import("../../../src/repositories/CityRepository.js");
const { CacheService } = await import("../../../src/services/CacheService.js");

describe("CustomerService.getAllCustomers", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve retornar lista formatada de clientes", async () => {
        CustomerRepository.getAllCustomers.mockResolvedValue([
            {
                PKCODCLI: 1,
                RAZAOSOCIAL: "João",
                TIPOFJ: 1,
                CNPJCPF: "123",
                FONE1: "111",
                FONE2: "222",
            },
        ]);

        const result = await CustomerService.getAllCustomers("TEST", "firebird");

        expect(result).toEqual([
            {
                pkcodcli: 1,
                nome: "João",
                cpf: "123",
                cnpj: undefined,
                telefone1: "111",
                telefone2: "222",
            },
        ]);
    });

    it("deve retornar array vazio se não houver clientes", async () => {
        CustomerRepository.getAllCustomers.mockResolvedValue(null);

        const result = await CustomerService.getAllCustomers("TEST", "firebird");

        expect(result).toEqual([]);
    });
});

describe("CustomerService.getCustomerByPrimaryKey", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve retornar do cache se existir", async () => {
        CacheService.get.mockResolvedValue({ razaoSocial: "Cliente Cache" });

        const result = await CustomerService.getCustomerByPrimaryKey(1, "TEST", "firebird");

        expect(CacheService.get).toHaveBeenCalled();
        expect(result.razaoSocial).toBe("Cliente Cache");
        expect(CustomerRepository.getCustomerByPrimaryKey).not.toHaveBeenCalled();
    });

    it("deve buscar no banco e salvar no cache", async () => {
        CacheService.get.mockResolvedValue(null);

        CustomerRepository.getCustomerByPrimaryKey.mockResolvedValue({
            RAZAOSOCIAL: "Maria",
            TIPOFJ: 1,
            CNPJCPF: "999",
            FKCODCID: 10,
            NOME_CIDADE: "São Paulo",
        });

        const result = await CustomerService.getCustomerByPrimaryKey(1, "TEST", "firebird");

        expect(result.razaoSocial).toBe("Maria");
        expect(CacheService.set).toHaveBeenCalled();
    });

    it("deve retornar null se cliente não existir", async () => {
        CacheService.get.mockResolvedValue(null);
        CustomerRepository.getCustomerByPrimaryKey.mockResolvedValue(null);

        const result = await CustomerService.getCustomerByPrimaryKey(99, "TEST", "firebird");

        expect(result).toBeNull();
    });
});

describe("CustomerService.createCustomer", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve lançar erro se usuário não existir", async () => {
        UserRepository.findByLogin.mockResolvedValue(null);

        await expect(
            CustomerService.createCustomer({}, "admin", "TEST", "firebird")
        ).rejects.toThrow("Usuário não encontrado");
    });

    it("deve criar cliente com sucesso", async () => {
        UserRepository.findByLogin.mockResolvedValue({ PKDOCUSU: 1 });
        CityRepository.findByNameAndUf.mockResolvedValue({ PKCODCID: 10 });
        CustomerRepository.createCustomer.mockResolvedValue(123);

        const result = await CustomerService.createCustomer(
            {
                nomeFantasia: "Empresa X LTDA",
                razaoSocial: "Empresa X",
                tipo: 0,
                cnpj: "12.345.678/0001-90",
                cidade: "SP",
                uf: "SP",
            },
            "admin",
            "TEST",
            "firebird"
        );

        expect(result).toEqual({
            pkcodcli: 123,
            razaoSocial: "Empresa X",
            tipo: 0,
            codigoCidade: 10,
            message: "Cliente criado com sucesso!",
        });
    });
});

describe("CustomerService.updateCustomer", () => {
    beforeEach(() => jest.clearAllMocks());

    it("deve lançar erro se cliente não existir", async () => {
        UserRepository.findByLogin.mockResolvedValue({ PKCODUSU: 1 });
        CustomerRepository.getCustomerByPrimaryKey.mockResolvedValue(null);

        await expect(
            CustomerService.updateCustomer(1, {}, "admin", "TEST", "firebird")
        ).rejects.toThrow("Cliente não encontrado");
    });

    it("deve atualizar cliente e limpar cache", async () => {
        UserRepository.findByLogin.mockResolvedValue({ PKCODUSU: 1 });

        CustomerRepository.getCustomerByPrimaryKey.mockResolvedValue({
            TIPOFJ: 1,
            FKCODCID: 10,
        });

        CustomerRepository.updateCustomer.mockResolvedValue(true);

        CacheService.del.mockResolvedValue(true);

        CustomerRepository.getCustomerByPrimaryKey.mockResolvedValueOnce({
            TIPOFJ: 1,
            FKCODCID: 10,
        }).mockResolvedValueOnce({
            RAZAOSOCIAL: "Novo Nome",
            TIPOFJ: 1,
            FKCODCID: 10,
        });

        const result = await CustomerService.updateCustomer(
            1,
            { razaoSocial: "Novo Nome" },
            "admin",
            "TEST",
            "firebird"
        );

        expect(result.success).toBe(true);
        expect(CacheService.del).toHaveBeenCalled();
    });
});
