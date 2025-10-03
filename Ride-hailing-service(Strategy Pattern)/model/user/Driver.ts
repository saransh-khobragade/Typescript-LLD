import User from "./User";

// LSP: Driver extends User without breaking parent behavior
class Driver extends User {
    private drivingLicense: string;
    private vehicleInfo: string;

    constructor(
        name: string,
        number: string,
        userType: string,
        drivingLicense: string,
        vehicleInfo: string
    ) {
        super(name, number, userType);
        this.drivingLicense = drivingLicense;
        this.vehicleInfo = vehicleInfo;
    }
}
export default Driver;
