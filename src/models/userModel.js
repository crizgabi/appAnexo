const users = []; //Banco em memória
const Roles = require("./roles");

class User{
    constructor(id, email, passwordHash, role = Roles.USER){
        if (!Object.values(Roles).includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
}

module.exports = {User, users, Roles}