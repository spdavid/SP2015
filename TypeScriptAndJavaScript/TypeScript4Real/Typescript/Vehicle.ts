// this is a namespace in TypeScript
module Vehicles {

    // export = public  
    export class Vehicle {
        VehicleType: string;
        Year: number;

        constructor(vehicleType: string, year: number) {
            this.VehicleType = vehicleType;
            this.Year = year;
        }

        GetVehicleInfo() {
            return "Vehicle Type: " + this.VehicleType +
                " Year: " + this.Year.toString();
        }
    }
}