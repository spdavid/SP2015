namespace sp2015 {
    export class AutoComplete {
        static Init() {
            $('#txtAutoComplete').keyup(AutoComplete.TextBoxChanged);
        }

        static TextBoxChanged() {
            AutoComplete.Delay(function () {
                AutoComplete.RenderResults($('#txtAutoComplete').val());
            }, 1000);
            
        }

        static Delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        static RenderResults(input: string) {
            console.log(input);
            $('#results').empty();
            var url = "http://services.odata.org/V3/Northwind/Northwind.svc/Customers?$filter=startswith(CompanyName,%27" + input + "%27)%20eq%20true";
            $.getJSON(url, (data) => {
                console.log(data);
                $.each(data.value, (index, customer) => {
                    $('#results').append("<div>" + customer.CompanyName +"</div>");
                });
            });
        }

    }
}

 

$(document).ready(() => {
    sp2015.AutoComplete.Init();
});