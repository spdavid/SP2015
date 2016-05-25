"use strict";
 
// this is a namespace in TypeScript
module Vehicles {

    // export = public  
    // extends = inherits
    export class Car extends Vehicles.Vehicle{
        GetCarInfo() {
            return "Car Type: " + this.VehicleType +
                " Year: " + this.Year.toString();
        }
    }
}