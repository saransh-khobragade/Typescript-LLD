import Spot from "./Spot";

import { VehicleType } from "../Vehicle";

class TruckSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.TRUCK, dist);
    }
}
export default TruckSpot;
