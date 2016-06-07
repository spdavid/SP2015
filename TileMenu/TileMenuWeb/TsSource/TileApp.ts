
declare var _TileInfo: TileMenu.AddInInfo;

namespace TileMenu {
    export class TileApp {
        static Init() {
            /// load our es6 promise so we have backwards compatibility for promises with ie11
            Utils.loadScript(_TileInfo.AddInUrl + "/scripts/es6-promise.min.js", function () {
                TileApp.CreateTilesListIfNotExists();
                // render tiles from list
            });
        }

        static CreateTilesListIfNotExists() {

            // executeOrDelayUntilScriptLoaded waits for sp.js to load 
            // so we dont get erros when using the JSOM object model
            SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                //document.getElementById("Tiles").innerText = "Hello Tiles";
                var pathToList = _spPageContextInfo.webServerRelativeUrl + "/List/Tiles";
                // () => {}   is the same as function () {}
                TileApp.ListExists(pathToList)
                    .then((list) => {
                        if (list == undefined) {
                            // we need to create a list
                            console.log("list does not exist");
                            TileApp.CreateTilesList();
                        }
                        else {
                            console.log("list does  exist");
                            // render tiles on page
                        }
                    })
                    .catch((errorInfo) => {
                        console.log(errorInfo);
                    });;


            }, "sp.js");
        }

        static ListExists(url: string): Promise<SP.List> {

            return new Promise(function (resolve, reject) {

                var ctx = SP.ClientContext.get_current();

                // get list needs the relative url to get the list. 
                var list = ctx.get_web().getList(url);

                ctx.load(list);

                ctx.executeQueryAsync(function (sender, args) {
                    // success
                    resolve(list);
                },
                    function (sender, args) {
                        if (args.get_message() == "File Not Found.") {
                            resolve(undefined);
                        }
                        else {
                            console.log("Error")
                            // reject = throwing an exception
                            reject(args)
                        }
                    });

            });




        }


        static CreateTilesList() {
            var ctx = SP.ClientContext.get_current();
            var listInfo = new SP.ListCreationInformation();
            listInfo.set_title("Tiles");
            listInfo.set_url("List/Tiles");
            listInfo.set_templateType(SP.ListTemplateType.genericList);
           

          var list = ctx.get_web().get_lists().add(listInfo);
          ctx.load(list);
          ctx.executeQueryAsync((sender, args) => {
              console.log(list)
          })


        }
        // if our list does not exist. create it
        // Title, Url, imageurl, Color

        // render tiles // REst diplay on page

    }
}