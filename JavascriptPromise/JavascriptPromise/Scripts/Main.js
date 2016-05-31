var main;
(function (main) {
    var Testing = (function () {
        function Testing() {
        }
        Testing.TestAsync = function () {
            var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions";
            console.log("starting");
            $.getJSON(url, Testing.GotJson);
            console.log("ending");
        };
        // this function does not get called until data has arrived. 
        Testing.GotJson = function (data) {
            console.log(data);
            console.log("gotjson");
        };
        Testing.TestSync = function () {
            console.log("starting");
            Testing.GotJsonWithPromise().then(function (data) {
                console.log(data);
                console.log("Ending");
            });
        };
        // this function does not get called until data has arrived. 
        Testing.GotJsonWithPromise = function () {
            return new Promise(function (resolve, reject) {
                var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions";
                $.getJSON(url, function (data) {
                    console.log("gotjson");
                    resolve(data);
                });
            });
        };
        Testing.DivideNumbers = function (num1, num2) {
            return new Promise(function (resolve, reject) {
                if (num2 == 0) {
                    reject("cannot devide by zero");
                }
                resolve(num1 / num2);
            });
        };
        return Testing;
    }());
    main.Testing = Testing;
})(main || (main = {}));
