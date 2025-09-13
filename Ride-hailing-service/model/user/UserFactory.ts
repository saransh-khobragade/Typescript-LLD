import User from "./User";

interface UserFactory {
    createUser(userType: string): User | null;
}

export default UserFactory;
