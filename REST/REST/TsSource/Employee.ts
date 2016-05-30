
namespace northwind {
    export class Employee {
        static RenderEmployees() {
            var url  = "http://services.odata.org/V4/Northwind/Northwind.svc/Employees";

            $.getJSON(url,
                function (data) {
                    //success
                    console.log(data);
                    var employees = data.value;
                    var divEmployees = $('#Employees');

                    // foreach (var employee in employees)
                    $.each(employees, function (idx, employee) {
                        // generate html to apend to the page
                       var textToAdd = "<div>" + employee.FirstName + " " + employee.LastName + " (" + employee.Title + ")</div>"

                        // create jquery object of our new element
                       var jqueryElement = $(textToAdd);

                        // add click event to our new element
                       jqueryElement.click(function () {
                           northwind.Order.RenderOrdersForEmployee(employee.EmployeeID);
                       });

                        // add element to the page. 
                       divEmployees.append(jqueryElement);

                        
                    });

                   



                },
                function (a, b) {
                    // fail
                    console.log(a);
                    console.log(b);
                }

            );

        }


    }
}