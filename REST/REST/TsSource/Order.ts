namespace northwind {
    export class Order {
        static RenderOrdersForEmployee(empId: number) {
            var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Orders?$expand=Customer&$filter=EmployeeID eq " + empId.toString();

            $.getJSON(url,
                function (data)
                {//success
                    // clear the orders element
                    var orderDiv = $('#Orders');
                    orderDiv.html("");
                    console.log(data);

                    // loop through all orders
                    $.each(data.value, function (index, order) {
                        var date = new Date(order.OrderDate);

                        orderDiv.append("<div>" + order.Customer.CompanyName + " (" + date.toLocaleDateString() + ")</div>");

                    })

                   
                },
                function (a, b) {
                    //fail
                    console.log(a);
                    console.log(b);
                }
            );
        }
    }
}