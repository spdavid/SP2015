namespace TileMenu {
    export class AddInInfo {
        AddInUrl: string;
        constructor(url: string) {
            // this will be the path of your url https://localhost..... This is set in the home controller
            this.AddInUrl = url;

            // use the app url to load a css file into sharepoint
            Utils.loadCss(this.AddInUrl + "/Content/Tiles.css");
            


        }
    }
}


