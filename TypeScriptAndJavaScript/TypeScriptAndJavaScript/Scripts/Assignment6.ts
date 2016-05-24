
(function () {



    $(document).ready(
        function () {
            $('#colorChangerButton').click(ChangeColorOfPage);
            //$('#colors').change(ShowPreview);
            var options = $('#colors option');
            //console.log(options);

            // foreach (var option in options)
            $.each(options, function (index, option) {
                var color = option.value;
                //javascript
                option.setAttribute("style", "color:grey;background-color:" + color);
                // jquery
               // $(value).attr("style", "background-color:" + color);

            });

        }
    );

    function ShowPreview() {
        var color = $('#colors').val();
        $('#colors').attr("style", "background-color:" + color);
    }

    function ChangeColorOfPage() {
        var color = $('#colors').val();
        console.log(color);

        if (color == "none") {
            document.body.style.backgroundColor = null;
        }
        else {
            document.body.style.backgroundColor = color;
            //$(document.body).attr("style", "background-color:" + color);
            //$('body').attr("style", "background-color:" + color);
           
        }
    }

})();
