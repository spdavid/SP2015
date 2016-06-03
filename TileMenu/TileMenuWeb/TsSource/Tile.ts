namespace TileMenu {
    export class Tile {
        Title: string;
        URL: string;
        Image: string;
        Color: string;

        constructor(title, url, image, color) {
            this.Title = title;
            this.URL = url;
            this.Image = image;
            this.Color = color;
        }


        GetTileElement() : HTMLElement {
            var divElement = document.createElement("div");
            divElement.setAttribute("class", "tile-container");
            divElement.setAttribute("style", "background-color:" + this.Color)
            divElement.setAttribute("onclick", "window.location = " + this.URL);
            divElement.innerHTML =
                "<img src='" + this.Image + "' />" +
                "<div>" + this.Title + "</div>";

            return divElement;
        }

    }

}