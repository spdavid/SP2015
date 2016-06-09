/// <reference path="_references.js" />
(function (undefined) {
    $(document).ready(function () {

        RenderCarsOnPage();
        var hostweburl = getParameterByName("SPHostUrl");

        var scriptbase = hostweburl + '/_layouts/15/';

            //$.getScript(scriptbase + 'SP.js',
        //function () { 
        $.getScript(scriptbase + 'SP.RequestExecutor.js', GetListsFromHostWeb); 
    //}
            //);
      
    });
    function RenderCarsOnPage() {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Cars')/items";

        $.getJSON(url, function (data) {
            console.log(data);
            var messageelement = $("#cars");

            $.each(data.value, function (index, car) {
                messageelement.append("<div>" + car.Title + "</div>");
            });

        });

    }
    function GetListsFromHostWeb() {

        // host url is from the host where the app is installed
        var hostUrl = getParameterByName("SPHostUrl");
        // appurl is the current app web
        var appWebUrl = getParameterByName("SPAppWebUrl");
      
        // we need to create a special executor object to 
        // get arround the cross site calls problem to sharepoint. 
        var executor;
        executor = new SP.RequestExecutor(appWebUrl);

        // SP.AppContextSite(@target) must be added in order to get
        // info from the host web. 
        // you must also add @target=[hosturl] at the end of the query
        // string
        var requestUrl = appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists?$Select=Title&@target='" + hostUrl + "'";


        executor.executeAsync(
                        {
                            url: requestUrl,
                            method: "GET",
                            headers: { "Accept": "application/json; odata=verbose" },
                            success: function (data) {
                                var parsedData = JSON.parse(data.body);
                                console.log(parsedData);
                                var hostListsElement = $("#hostLists");
                                $.each(parsedData.d.results, function (index, list) {
                                    hostListsElement.append("<div>" + list.Title + "</div>");

                                });

                            },
                            error: function (a,b,c) {
                                console.log(a);
                                console.log(b);
                                console.log(c);


                            }
                        }
 );


        //$.getJSON(hostUrl + "/_api/web/lists?$Select=Title", function (data)
        //{
        //    console.log(data);
        //});

    }
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})();