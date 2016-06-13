var sp2015;
(function (sp2015) {
    var AutoComplete = (function () {
        function AutoComplete() {
        }
        AutoComplete.Init = function () {
            $('#txtAutoComplete').keyup(AutoComplete.TextBoxChanged);
        };
        AutoComplete.TextBoxChanged = function () {
            AutoComplete.Delay(function () {
                AutoComplete.RenderResults($('#txtAutoComplete').val());
            }, 1000);
        };
        AutoComplete.RenderResults = function (input) {
            console.log(input);
            $('#results').empty();
            var url = "http://services.odata.org/V3/Northwind/Northwind.svc/Customers?$filter=startswith(CompanyName,%27" + input + "%27)%20eq%20true";
            $.getJSON(url, function (data) {
                console.log(data);
                $.each(data.value, function (index, customer) {
                    $('#results').append("<div>" + customer.CompanyName + "</div>");
                });
            });
        };
        AutoComplete.Delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        return AutoComplete;
    }());
    sp2015.AutoComplete = AutoComplete;
})(sp2015 || (sp2015 = {}));
$(document).ready(function () {
    sp2015.AutoComplete.Init();
});
