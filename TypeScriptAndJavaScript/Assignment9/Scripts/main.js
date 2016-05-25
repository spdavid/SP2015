var DavidsEntities;
(function (DavidsEntities) {
    var Contact = (function () {
        function Contact(name, picUrl, phone, email) {
            this.Name = name;
            this.PicUrl = picUrl;
            this.PhoneNumber = phone;
            this.Email = email;
        }
        Contact.prototype.GenerateHtml = function () {
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
        };
        Contact.somestaticMethod = function () {
        };
        return Contact;
    }());
    DavidsEntities.Contact = Contact;
})(DavidsEntities || (DavidsEntities = {}));
/// <reference path="contact.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
(function () {
    // Similar to PageLoad.. 
    // Waits for page to load then executes the script
    $(document).ready(function () {
        // gets the button
        var buttonElement = $('#addContact');
        // add click event to button. when clicked
        // the AddContactFunction will be called
        buttonElement.click(AddContact);
    });
    // function adds the new contact to the page
    function AddContact() {
        // get the resultsDiv to where we will put our contact
        var resultsDiv = $('#results');
        // get contact values from the form
        var nameValue = $('#name').val();
        var emailValue = $('#email').val();
        var mobileValue = $('#mobile').val();
        var imageUrlValue = $('#imageUrl').val();
        ;
        var contact = new DavidsEntities.Contact(nameValue, imageUrlValue, mobileValue, emailValue);
        // append your html to the results div
        // so you get a new item 
        resultsDiv.append(contact.GenerateHtml());
    }
})();
//# sourceMappingURL=main.js.map