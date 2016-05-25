module DavidsEntities {
    export class Contact {
        Name: string;
        PicUrl: string;
        PhoneNumber: string;
        Email: string;

        constructor(name:string, picUrl : string, phone : string, email:string) {
            this.Name = name;
            this.PicUrl = picUrl;
            this.PhoneNumber = phone;
            this.Email = email;
        }

        GenerateHtml() : string {

            var html = "";
            html += "<div class='contactbubble clearfix'>";
            html += "<img src='" + this.PicUrl + "' />";
            html += "<div>";
            html += "  <div>";
            html += this.Name;
            html += "  </div>";
            html += "  <div>";
            html += this.Email;
            html += "  </div>";
            html += "  <div>";
            html += this.PhoneNumber;
            html += "  </div>";
            html += "</div>";
            html += "</div>";

            return html;
        }


        static somestaticMethod() {
        }

    }

}