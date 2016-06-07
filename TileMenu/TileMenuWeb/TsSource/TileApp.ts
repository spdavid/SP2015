
// declare var = add reference kind of
// does not get converted into javascript
declare var _TileInfo: TileMenu.AddInInfo;

namespace TileMenu {
    export class TileApp {
        static Init() {
            /// load our es6 promise so we have backwards compatibility for promises with ie11
            Utils.loadScript(_TileInfo.AddInUrl + "/scripts/es6-promise.min.js", function () {
                Utils.loadScript(_TileInfo.AddInUrl + "/scripts/jquery-1.10.2.min.js", function () {

                TileApp.CreateTilesListIfNotExists()
                    .then(TileApp.RenderTilesOnPage)
                    .catch((errorinfo) => {
                        console.log(errorinfo);
                    });
                // render tiles from list
                });
            });
        }
        static CreateTilesListIfNotExists(): Promise<boolean> {


            return new Promise((resolve, reject) => {
                // executeOrDelayUntilScriptLoaded waits for sp.js to load 
                // so we dont get erros when using the JSOM object model
                SP.SOD.executeOrDelayUntilScriptLoaded(function () {

                    var pathToList = _spPageContextInfo.webServerRelativeUrl + "/List/Tiles";
                    // () => {}   is the same as function () {}
                    TileApp.GetList(pathToList)
                        .then((list) => {
                            // if list is null
                            if (list == undefined) {
                                // we need to create a list
                                console.log("list does not exist");
                                TileApp.CreateTilesList().then((newList) => {
                                    TileApp.AddFieldsToTilesList(newList).then(() => {
                                        TileApp.AddDummyData(newList).then(() => {
                                            resolve(true);
                                        });

                                    });
                                });

                            }
                            else {
                                console.log("list does exist");
                                // render tiles on page
                                resolve(true)
                            }
                        })
                        .catch((errorInfo) => {
                            console.log(errorInfo);
                            reject(errorInfo);
                        });;


                }, "sp.js");

            });
        }
        static GetList(url: string): Promise<SP.List> {

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
        static CreateTilesList(): Promise<SP.List> {
            return new Promise((resolve, reject) => {

                var ctx = SP.ClientContext.get_current();
                // add list info 
                var listInfo = new SP.ListCreationInformation();
                listInfo.set_title("Tiles");
                listInfo.set_url("List/Tiles");
                listInfo.set_templateType(SP.ListTemplateType.genericList);

                // create the list
                var list = ctx.get_web().get_lists().add(listInfo);
                ctx.load(list);
                ctx.executeQueryAsync((sender, args) => {
                    // success
                    resolve(list);
                },
                    //error
                    (sender, args) => {
                        reject(args);
                    });

            });
        }
        static AddFieldsToTilesList(list: SP.List): Promise<boolean> {

            return new Promise((resolve, reject) => {
                var ctx = SP.ClientContext.get_current();

                list.get_fields().addFieldAsXml('<Field ID="{F8042024-A8B9-4DF3-842E-F16E4CF66B37}" Name="NavigateUrl" StaticName="NavigateUrl" DisplayName="Navigate Url" Type="Text" Required="TRUE" Group="Tiles" />', true, null);
                list.get_fields().addFieldAsXml('<Field ID="{B9CC898D-BE0A-4CC0-830A-E83B10A12F07}" Name="ImageUrl" StaticName="ImageUrl" DisplayName="Image Url" Type="Text" Required="TRUE" Group="Tiles" />', true, null);

                // the ` allows us to write text multiline in our code
                var choiceFieldXml = `<Field ID="{87697A18-22A6-4B25-9778-150ADF71C97D}"
                                         Name="TileColor"
	                                     StaticName="TileColor"
                                         DisplayName="Tile Color"
                                         Type="Choice"
                                         Required="TRUE"
                                         Group="Tiles">
                                    <CHOICES>
                                      <CHOICE>Green</CHOICE>
                                      <CHOICE>Blue</CHOICE>
                                      <CHOICE>Orange</CHOICE>
                                      <CHOICE>Grey</CHOICE>
                                    </CHOICES>
                                  </Field>`;
                list.get_fields().addFieldAsXml(choiceFieldXml, true, null);

                ctx.executeQueryAsync((sender, args) => {
                    // when fields are created we can return 
                    resolve(true);
                },
                    //error
                    (sender, args) => {
                        reject(args);
                    });


            });


        }
        static AddDummyData(list: SP.List) {
            return new Promise((resolve, reject) => {

                var newIteminfo = new SP.ListItemCreationInformation();

                var item = list.addItem(newIteminfo);
                //item.set_item("internalname", "value");
                // C# Csom equivalent item["internalname"] = "value"
                item.set_item("Title", "Tile 1");
                item.set_item("Navigate_x0020_Url", "#");
                item.set_item("Image_x0020_Url", "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=david@zalodev.com&UA=0&size=HR64x64&sc=1465291685321");
                item.set_item("Tile_x0020_Color", "Blue");
                item.update();

                var item2 = list.addItem(newIteminfo);
                //item.set_item("internalname", "value");
                // C# Csom equivalent item["internalname"] = "value"
                item2.set_item("Title", "Tile 2");
                item2.set_item("Navigate_x0020_Url", "#");
                item2.set_item("Image_x0020_Url", "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=david@zalodev.com&UA=0&size=HR64x64&sc=1465291685321");
                item2.set_item("Tile_x0020_Color", "Green");
                item2.update();


                var item3 = list.addItem(newIteminfo);
                //item.set_item("internalname", "value");
                // C# Csom equivalent item["internalname"] = "value"
                item3.set_item("Title", "Tile 3");
                item3.set_item("Navigate_x0020_Url", "#");
                item3.set_item("Image_x0020_Url", "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=david@zalodev.com&UA=0&size=HR64x64&sc=1465291685321");
                item3.set_item("Tile_x0020_Color", "Yellow");
                item3.update();

                var item4 = list.addItem(newIteminfo);
                //item.set_item("internalname", "value");
                // C# Csom equivalent item["internalname"] = "value"
                item4.set_item("Title", "Tile 4");
                item4.set_item("Navigate_x0020_Url", "#");
                item4.set_item("Image_x0020_Url", "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=david@zalodev.com&UA=0&size=HR64x64&sc=1465291685321");
                item4.set_item("Tile_x0020_Color", "Grey");
                item4.update();

                list.get_context().executeQueryAsync((sender, args) => {
                    //success
                    resolve(true);
                }, (sender, args) => {
                    //fail
                    console.log("failed to create dummy data");
                    console.log(args);
                        reject(args);
                    });

            });
        }
        static RenderTilesOnPage() {
            var restUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Tiles')/items?$select=Title,Image_x0020_Url,Tile_x0020_Color,Navigate_x0020_Url";

            TileMenu.Utils.getJSON(restUrl).then((data) => {
                console.log(data);
                    var tilesElement = document.getElementById("Tiles")
                    for (var i = 0; i < data.value.length; i++) {
                        var tileInfo = data.value[i];
                        var tile = new TileMenu.Tile(tileInfo.Title, tileInfo.Navigate_x0020_Url, tileInfo.Image_x0020_Url, tileInfo.Tile_x0020_Color);
                        tilesElement.appendChild(tile.GetTileElement());
                    }
            });





           //$.ajax( {
           //     type: 'GET',
           //     url: restUrl,
           //     contentType: 'application/json',
           //     headers: { accept: 'application/json' },
           //     success: function (data) {
           //         console.log(data);
           //         var tilesElement = document.getElementById("Tiles")
           //         for (var i = 0; i < data.value.length; i++) {
           //             var tileInfo = data.value[i];
           //             var tile = new TileMenu.Tile(tileInfo.Title, tileInfo.Navigate_x0020_Url, tileInfo.Image_x0020_Url, tileInfo.Tile_x0020_Color);
           //             tilesElement.appendChild(tile.GetTileElement());
           //         }

           //     },
           //     error: function (a, b, c) {
           //         console.log(a);
           //         console.log(b);
           //         console.log(c);
           //     }
           // });


            
        }


        static SimeplePromiseTest() {
            TileApp.SimplePromise("David")
                .then((reponse) => {
                    // will output "that is correct"
                    console.log(reponse);
                })
                .catch(
                (errormessage) => {
                    // will output "wrong name"
                    console.log(errormessage);
                }
                );
        }

        /// : Promise<string> says its returning a string as the promise
        // same as return value in c#
        static SimplePromise(myName: string): Promise<string>{
            //return new Promise((resolve, reject) => {
            return new Promise(function (resolve, reject) {
                if (myName == "David") {
                    // return string
                    resolve("That is correct");
                }
                else {
                    // throw exception
                    reject("wrong name");
                }
            });


        } 

    }
}