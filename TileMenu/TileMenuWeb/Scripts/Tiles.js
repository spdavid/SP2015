var TileMenu;
(function (TileMenu) {
    var AddInInfo = (function () {
        function AddInInfo(url) {
            // this will be the path of your url https://localhost..... This is set in the home controller
            this.AddInUrl = url;
            // use the app url to load a css file into sharepoint
            TileMenu.Utils.loadCss(this.AddInUrl + "/Content/Tiles.css");
        }
        return AddInInfo;
    }());
    TileMenu.AddInInfo = AddInInfo;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getJSON = function (url) {
            var prom = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader("Accept", "application/json");
                request.send();
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                request.onerror = function () {
                    reject(this.statusText);
                };
            });
            return prom;
        };
        Utils.postJSON = function (url, data) {
            var prom = new Promise(function (resolve, reject) {
                console.log("gonna post");
                var request = new XMLHttpRequest();
                request.open('POST', url);
                request.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").getAttribute("value"));
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("content-type", "application/json;odata=verbose");
                request.send(JSON.stringify(data));
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        console.log(JSON.parse(this.response));
                        reject(this.response);
                    }
                };
                request.onerror = function () {
                    console.log(JSON.stringify(this.response));
                    reject(this.response);
                };
            });
            return prom;
        };
        Utils.loadScript = function (url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        // loads a css file into the head based on its path
        Utils.loadCss = function (path) {
            var head = document.getElementsByTagName("head");
            var e = document.createElement("link");
            head[0].appendChild(e);
            e.setAttribute("type", "text/css");
            e.setAttribute("rel", "stylesheet");
            e.setAttribute("href", path);
        };
        return Utils;
    }());
    TileMenu.Utils = Utils;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var Tile = (function () {
        function Tile(title, url, image, color) {
            this.Title = title;
            this.URL = url;
            this.Image = image;
            this.Color = color;
        }
        Tile.prototype.GetTileElement = function () {
            var divElement = document.createElement("div");
            divElement.setAttribute("class", "tile-container");
            divElement.setAttribute("style", "background-color:" + this.Color);
            divElement.setAttribute("onclick", "window.location = " + this.URL);
            divElement.innerHTML =
                "<img src='" + this.Image + "' />" +
                    "<div>" + this.Title + "</div>";
            return divElement;
        };
        return Tile;
    }());
    TileMenu.Tile = Tile;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var TileApp = (function () {
        function TileApp() {
        }
        TileApp.Init = function () {
            /// load our es6 promise so we have backwards compatibility for promises with ie11
            TileMenu.Utils.loadScript(_TileInfo.AddInUrl + "/scripts/es6-promise.min.js", function () {
                TileMenu.Utils.loadScript(_TileInfo.AddInUrl + "/scripts/jquery-1.10.2.min.js", function () {
                    TileApp.CreateTilesListIfNotExists()
                        .then(TileApp.RenderTilesOnPage)
                        .catch(function (errorinfo) {
                        console.log(errorinfo);
                    });
                    // render tiles from list
                });
            });
        };
        TileApp.CreateTilesListIfNotExists = function () {
            return new Promise(function (resolve, reject) {
                // executeOrDelayUntilScriptLoaded waits for sp.js to load 
                // so we dont get erros when using the JSOM object model
                SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                    var pathToList = _spPageContextInfo.webServerRelativeUrl + "/List/Tiles";
                    // () => {}   is the same as function () {}
                    TileApp.GetList(pathToList)
                        .then(function (list) {
                        // if list is null
                        if (list == undefined) {
                            // we need to create a list
                            console.log("list does not exist");
                            TileApp.CreateTilesList().then(function (newList) {
                                TileApp.AddFieldsToTilesList(newList).then(function () {
                                    TileApp.AddDummyData(newList).then(function () {
                                        resolve(true);
                                    });
                                });
                            });
                        }
                        else {
                            console.log("list does exist");
                            // render tiles on page
                            resolve(true);
                        }
                    })
                        .catch(function (errorInfo) {
                        console.log(errorInfo);
                        reject(errorInfo);
                    });
                    ;
                }, "sp.js");
            });
        };
        TileApp.GetList = function (url) {
            return new Promise(function (resolve, reject) {
                var ctx = SP.ClientContext.get_current();
                // get list needs the relative url to get the list. 
                var list = ctx.get_web().getList(url);
                ctx.load(list);
                ctx.executeQueryAsync(function (sender, args) {
                    // success
                    resolve(list);
                }, function (sender, args) {
                    if (args.get_message() == "File Not Found.") {
                        resolve(undefined);
                    }
                    else {
                        console.log("Error");
                        // reject = throwing an exception
                        reject(args);
                    }
                });
            });
        };
        TileApp.CreateTilesList = function () {
            return new Promise(function (resolve, reject) {
                var ctx = SP.ClientContext.get_current();
                // add list info 
                var listInfo = new SP.ListCreationInformation();
                listInfo.set_title("Tiles");
                listInfo.set_url("List/Tiles");
                listInfo.set_templateType(SP.ListTemplateType.genericList);
                // create the list
                var list = ctx.get_web().get_lists().add(listInfo);
                ctx.load(list);
                ctx.executeQueryAsync(function (sender, args) {
                    // success
                    resolve(list);
                }, 
                //error
                function (sender, args) {
                    reject(args);
                });
            });
        };
        TileApp.AddFieldsToTilesList = function (list) {
            return new Promise(function (resolve, reject) {
                var ctx = SP.ClientContext.get_current();
                list.get_fields().addFieldAsXml('<Field ID="{F8042024-A8B9-4DF3-842E-F16E4CF66B37}" Name="NavigateUrl" StaticName="NavigateUrl" DisplayName="Navigate Url" Type="Text" Required="TRUE" Group="Tiles" />', true, null);
                list.get_fields().addFieldAsXml('<Field ID="{B9CC898D-BE0A-4CC0-830A-E83B10A12F07}" Name="ImageUrl" StaticName="ImageUrl" DisplayName="Image Url" Type="Text" Required="TRUE" Group="Tiles" />', true, null);
                // the ` allows us to write text multiline in our code
                var choiceFieldXml = "<Field ID=\"{87697A18-22A6-4B25-9778-150ADF71C97D}\"\n                                         Name=\"TileColor\"\n\t                                     StaticName=\"TileColor\"\n                                         DisplayName=\"Tile Color\"\n                                         Type=\"Choice\"\n                                         Required=\"TRUE\"\n                                         Group=\"Tiles\">\n                                    <CHOICES>\n                                      <CHOICE>Green</CHOICE>\n                                      <CHOICE>Blue</CHOICE>\n                                      <CHOICE>Orange</CHOICE>\n                                      <CHOICE>Grey</CHOICE>\n                                    </CHOICES>\n                                  </Field>";
                list.get_fields().addFieldAsXml(choiceFieldXml, true, null);
                ctx.executeQueryAsync(function (sender, args) {
                    // when fields are created we can return 
                    resolve(true);
                }, 
                //error
                function (sender, args) {
                    reject(args);
                });
            });
        };
        TileApp.AddDummyData = function (list) {
            return new Promise(function (resolve, reject) {
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
                list.get_context().executeQueryAsync(function (sender, args) {
                    //success
                    resolve(true);
                }, function (sender, args) {
                    //fail
                    console.log("failed to create dummy data");
                    console.log(args);
                    reject(args);
                });
            });
        };
        TileApp.RenderTilesOnPage = function () {
            var restUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Tiles')/items?$select=Title,Image_x0020_Url,Tile_x0020_Color,Navigate_x0020_Url";
            $.ajax({
                type: 'GET',
                url: restUrl,
                contentType: 'application/json',
                headers: { accept: 'application/json' },
                success: function (data) {
                    console.log(data);
                },
                error: function (a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
            document.getElementById("Tiles").innerText = "Hello Tiles";
        };
        return TileApp;
    }());
    TileMenu.TileApp = TileApp;
})(TileMenu || (TileMenu = {}));
//# sourceMappingURL=Tiles.js.map