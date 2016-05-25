var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// this is a namespace in TypeScript
var Vehicles;
(function (Vehicles) {
    // export = public  
    var Vehicle = (function () {
        function Vehicle(vehicleType, year) {
            this.VehicleType = vehicleType;
            this.Year = year;
        }
        Vehicle.prototype.GetVehicleInfo = function () {
            return "Vehicle Type: " + this.VehicleType +
                " Year: " + this.Year.toString();
        };
        return Vehicle;
    }());
    Vehicles.Vehicle = Vehicle;
})(Vehicles || (Vehicles = {}));
"use strict";
// this is a namespace in TypeScript
var Vehicles;
(function (Vehicles) {
    // export = public  
    // extends = inherits
    var Car = (function (_super) {
        __extends(Car, _super);
        function Car() {
            _super.apply(this, arguments);
        }
        Car.prototype.GetCarInfo = function () {
            return "Car Type: " + this.VehicleType +
                " Year: " + this.Year.toString();
        };
        return Car;
    }(Vehicles.Vehicle));
    Vehicles.Car = Car;
})(Vehicles || (Vehicles = {}));
var Vehicles;
(function (Vehicles) {
    // export = public 
    var Truck = (function () {
        function Truck(carType, year) {
            this.CarType = carType;
            this.Year = year;
        }
        Truck.prototype.GetCarInfo = function () {
            return "Car Type: " + this.CarType +
                " Year: " + this.Year.toString();
        };
        return Truck;
    }());
    Vehicles.Truck = Truck;
})(Vehicles || (Vehicles = {}));
(function () {
    var mazda = new Vehicles.Car("Mazda", 2013);
    alert(mazda.GetCarInfo());
    alert(mazda.GetVehicleInfo());
})();
//# sourceMappingURL=main.js.map