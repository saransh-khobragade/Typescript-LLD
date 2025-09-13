import Spot from "./Spot";

import { VehicleType } from "../Vehicle";

// OCP & LSP: Open for extension, closed for modification - TruckSpot extends Spot without changing base behavior
class TruckSpot extends Spot {
    constructor(id: string, dist: Record<string, number> = {}) {
        super(id, VehicleType.TRUCK, dist);
    }
}
export default TruckSpot;
