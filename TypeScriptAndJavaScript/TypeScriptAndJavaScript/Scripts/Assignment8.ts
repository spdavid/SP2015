(function () {
    // Similar to PageLoad.. 
    // Waits for page to load then executes the script
    $(document).ready(function () {

        // gets the button
        var buttonElement = $('#addContact');

        // add click event to button. when clicked
        // the AddContactFunction will be called
        buttonElement.click(AddContact);


        // modal testing for james
        $('#myModal').on('shown.bs.modal', function () {
          
        })

    });

    // function adds the new contact to the page
    function AddContact()
    {
        // get the resultsDiv to where we will put our contact
        var resultsDiv = $('#results');

        // get contact values from the form
        var nameValue = $('#name').val();
        var emailValue = $('#email').val();
        var mobileValue = $('#mobile').val();
        var imageUrlValue = $('#imageUrl').val();;

        // generate url
        var html = "";
        html += "<div class='contactbubble clearfix'>";
        html += "<img src='" + imageUrlValue + "' />";
        html += "<div>";
        html += "  <div>";
        html += nameValue;
        html += "  </div>";
        html += "  <div>";
        html += emailValue;
        html += "  </div>";
        html += "  <div>";
        html += mobileValue;
        html += "  </div>";
        html += "</div>";
        html += "</div>";

        // append your html to the results div
        // so you get a new item 
        resultsDiv.append(html);

    }

})();