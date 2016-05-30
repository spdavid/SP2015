namespace northwind {
    export class Supplier {
        static RenderSuppliers() {
            var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Suppliers?$select=CompanyName,Country,SupplierID";

            $.getJSON(url,
                function (data) {
                    //success
                    console.log(data);
                    var suppliersDiv = $('#Suppliers');

                    // foreach (var supplier in data.value)
                    $.each(data.value, function (index, supplier) {

                        var newElement = $("<div style='cursor:pointer'>" + supplier.CompanyName + "</div>")
                        newElement.click(function () {
                            northwind.Product.RenderProductsForSupplier(supplier.SupplierID);
                        });

                        suppliersDiv.append(newElement);

                    });
                }
            );
        }
    }
}