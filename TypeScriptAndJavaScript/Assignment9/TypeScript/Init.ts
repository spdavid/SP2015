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
        var imageUrlValue = $('#imageUrl').val();;

        var contact = new DavidsEntities.Contact(nameValue, imageUrlValue, mobileValue, emailValue);

     

        // append your html to the results div
        // so you get a new item 
        resultsDiv.append(contact.GenerateHtml());


    }

})();   