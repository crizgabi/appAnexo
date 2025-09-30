import Roles from "./roles.js"

class User{
    constructor(id, email, passwordHash, role = Roles.USER){
        if (!Object.values(Roles).includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = Roles.USER;
    }
}

export {User, Roles}