class User {
  constructor({
    id,
    login,
    passwordHash,
    tecnico = null
  }) {
    this.id = id;
    this.login = login;
    this.passwordHash = passwordHash;

    if (tecnico) {
      this.tecnico = {
        id: tecnico.id,
        nome: tecnico.nome,
        cpf: tecnico.cpf,
        rg: tecnico.rg,
        email: tecnico.email,
        celular: tecnico.celular,
        telefone1: tecnico.telefone1,
        telefone2: tecnico.telefone2,
        endereco: {
          logradouro: tecnico.endereco?.logradouro,
          numero: tecnico.endereco?.numero,
          cep: tecnico.endereco?.cep,
        },
        dataNascimento: tecnico.dataNascimento,
      };
    } else {
      this.tecnico = null;
    }
  }
}

export { User };