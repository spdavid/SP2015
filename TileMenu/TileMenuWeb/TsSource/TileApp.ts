
declare var _TileInfo: TileMenu.AddInInfo;

namespace TileMenu {
    export class TileApp {
        static Init()
        {
         
            document.getElementById("Tiles").innerText = "Hello Tiles";
           // Utils.loadScript(_TileInfo.AddInUrl + "/scripts/es6-promise.min.js", function () {

                TileApp.CreateTilesListIfNotExists();


           // });

        } 

        static CreateTilesListIfNotExists() {

            SP.SOD.executeOrDelayUntilScriptLoaded(function () {


            var ctx = SP.ClientContext.get_current();

                // get list needs the relative url to get the list. 
            var list = ctx.get_web().getList("/sites/Tiles/SitePages");
            ctx.load(list);

            ctx.executeQueryAsync(function (sender, args) {
                console.log(list);
            },
                function (sender, args) {
                    console.log(sender);
                    console.log(args);
                });
             },"sp.js");

        }
        // if our list does not exist. create it
        // Title, Url, imageurl, Color

        // render tiles // REst diplay on page

    }
}