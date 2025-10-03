// SRP: Single responsibility - manages user basic information
class User {
    private id: string;
    private name: string;
    private number: string;
    private type: string;

    constructor(name: string, number: string, type: string) {
        this.id = "uuid";
        this.name = name;
        this.number = number;
        this.type = type;
    }
    getId() {
        return this.id;
    }
}

export default User;
