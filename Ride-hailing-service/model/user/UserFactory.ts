import User from "./User";

// ISP: Focused interface with single responsibility for user creation
interface UserFactory {
    createUser(userType: string): User | null;
}

export default UserFactory;
