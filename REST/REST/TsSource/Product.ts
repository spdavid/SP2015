namespace northwind {
    export class Product {
        static RenderProductsForSupplier(SupplierID: number) {
            var url = "http://services.odata.org/V4/Northwind/Northwind.svc/Products?$filter=SupplierID eq " + SupplierID.toString();
            var productsDiv = $('#Products');
            productsDiv.html("");
            $.getJSON(url,
                function (data) {//success
                    console.log(data);
                    $.each(data.value, function (index, prod) {
                        productsDiv.append("<div>" + prod.ProductName + "</div>");

                    });
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