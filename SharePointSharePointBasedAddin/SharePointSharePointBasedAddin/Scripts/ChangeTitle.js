/// <reference path="_references.js" />
(function (undefined) {

    $(document).ready(function () {
        $('#webTitleButton').click(ChangeTitle);
    });

    function ChangeTitle() {

        

        var hostweburl = getParameterByName("SPHostUrl");
        var appurl = getParameterByName("SPAppWebUrl");
        var scriptbase = hostweburl + '/_layouts/15/';
          $.getScript(scriptbase + 'SP.RequestExecutor.js',
                function () {

                    // need the context for the app
                    var context = new SP.ClientContext(appurl);

                    // next two lines are just needed. Copy paste
                    var factory = new SP.ProxyWebRequestExecutorFactory(appurl);
                    context.set_webRequestExecutorFactory(factory);

                    // need the context for the host
                    var hostContext = new SP.AppContextSite(context, hostweburl);

                    // use the host contxt to get the lists from the host web. 
                    var web = hostContext.get_web();
                 
                    var newTitle = $('#newWebTitle').val();

                    web.set_title(newTitle);

                    web.update();

                    // you must use the context of the app in order to fetch the items even thought
                    // they are comming from the host context.
                    context.load(web);
                    context.executeQueryAsync(
                        // success function
                        function () {
                            console.log("the new title is " + web.get_title());

                        },
                        // fail function
                     function (sender, args) {
                         console.log(args);

                     }
                    );
                });
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