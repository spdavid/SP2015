/// <reference path="vehicle.ts" />


module Vehicles {

    // export = public 
    export class Truck {
        CarType: string;
        Year: number;

        constructor(carType: string, year: number) {
            this.CarType = carType;
            this.Year = year;
        }

        GetCarInfo() {
            return "Car Type: " + this.CarType +
                " Year: " + this.Year.toString();
        }
    }
}