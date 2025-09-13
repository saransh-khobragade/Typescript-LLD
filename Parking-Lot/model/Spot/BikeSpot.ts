import Spot from "./Spot";
import { VehicleType } from "../Vehicle";

class BikeSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.BIKE, dist);
    }
}

export default BikeSpot;
