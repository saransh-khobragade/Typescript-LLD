import SpotManagerService from "./service/SpotManagerService";
import CarSpot from "./model/Spot/CarSpot";
import BikeSpot from "./model/Spot/BikeSpot";
import TruckSpot from "./model/Spot/TruckSpot";
import ParkingLotService from "./service/ParkingLotService";
import Vehicle, { VehicleType } from "./model/Vehicle";

// Factory Pattern: Creating different types of spots and vehicles

const m = new SpotManagerService();
m.addSpot(new CarSpot("C1", { G1: 10, G2: 30 }));
m.addSpot(new CarSpot("C2", { G1: 15, G2: 20 }));
m.addSpot(new BikeSpot("B1", { G1: 5, G2: 40 }));
m.addSpot(new TruckSpot("T1", { G1: 100, G2: 10 }));
const lot = new ParkingLotService(m);
const car = new Vehicle("MH12AB1234", VehicleType.CAR);
const t = lot.issueTicket(car, "G1");
console.log("Ticket:", t);
const result = lot.exit(t.ticketId, "G2");
console.log("Exit:", result);
