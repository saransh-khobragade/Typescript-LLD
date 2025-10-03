import User from "../model/user/User";
import UserFactoryImpl from "../model/user/UserFactoryImpl";
import UserFactory from "../model/user/UserFactory";

// SRP: Single responsibility - handles user creation operations
class UserService {
    userFactory: UserFactory;

    constructor() {
        this.userFactory = new UserFactoryImpl();
    }
    createUser(userType: string): User | null {
        return this.userFactory.createUser(userType);
    }
}
export default UserService;
