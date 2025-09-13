import User from "./User";
import Rider from "./Rider";
import Driver from "./Driver";

import UserFactory from "./UserFactory";

//Factory pattern
class UserFactoryImpl implements UserFactory {
    createUser(userType: string): User | null {
        if (userType === "rider") {
            return new Rider("test", "769876897", userType, "upi");
        } else if (userType === "driver") {
            return new Driver("test", "769876897", userType, "KGMNSBKJ", "ABC");
        } else {
            return null;
        }
    }
}
export default UserFactoryImpl;
