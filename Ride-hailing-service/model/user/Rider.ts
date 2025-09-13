import User from "./User";

class Rider extends User {
    private paymentOption: string;
    constructor(
        name: string,
        number: string,
        userType: string,
        paymentOption: string
    ) {
        super(name, number, userType);
        this.paymentOption = paymentOption;
    }
}
export default Rider;
