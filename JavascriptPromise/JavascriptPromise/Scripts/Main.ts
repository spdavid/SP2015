namespace main {
    export class Testing {
        static TestAsync() {
            var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions";
            console.log("starting");
            $.getJSON(url, Testing.GotJson);
            console.log("ending");
        }

        // this function does not get called until data has arrived. 
        static GotJson(data) {
            console.log(data);
            console.log("gotjson");
        }


        static TestSync() {
            console.log("starting");

            Testing.GotJsonWithPromise().then
                (
                function (data) {
                    console.log(data);
                    console.log("Ending");
                    
                });

        }

        // this function does not get called until data has arrived. 
        static GotJsonWithPromise(): Promise<any> {

            return new Promise(function (resolve, reject) {

               var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions";
               $.getJSON(url, function (data) {
                  
                   console.log("gotjson");
                   resolve(data);
               });
            });


           
        }

        static DivideNumbers(num1 : number, num2 : number): Promise<number>
        {
            return new Promise(function (resolve, reject) {
                if (num2 == 0) {
                    reject("cannot devide by zero");
                }

                resolve(num1 / num2);
            });
        }




        //static TestSync() {
        //    console.log("starting");

        //    Testing.GotJsonWithPromise().then(
        //        function (myNumber) {
        //            console.log(myNumber);
        //            console.log("ending");
        //        }).catch(function (errormsg) {
        //            console.log(errormsg);
        //        });
          
          
        //}

        //// this function does not get called until data has arrived. 
        //static GotJsonWithPromise() : Promise<number> {

        //    return new Promise(function (resolve, reject) {

        //        // return 1;
        //      //  resolve(1);

        //       reject("there was an error");
        //    });
           

        //    //var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Regions";
        //    //$.getJSON(url, function (data) {
        //    //    console.log(data);
        //    //    console.log("gotjson");
        //    //});
        //}
    }
}