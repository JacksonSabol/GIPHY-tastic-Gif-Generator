# Welcome to GIPHY-tastic .gif Generator!

## The following project is Assignment 6 of the UCB Full Stack Coding Bootcamp

### Overview

I employed HTML, CSS, JavaScript, jQuery, JSON, and AJAX HTTP requests to make a dynamically generated .gif dump. The point of this exercise was to use jQuery to generate buttons that perform an asynchronous HTTP (Ajax) request to the GIPHY API, then append .gifs to the webpage. The user can choose from 15 preset buttons on the topic of dancing, or enter their own topic/tag to generate a new button that appends .gifs of that to the webpage.

### To Generate Gifs:

* Click on one of the preexisting buttons along the top of the page to generate .gifs related to each style of dance. You'll see them appear as soon as you click the button!

* Type a style of dance, or unrelated topic, into the text field in the top right corner of the page. Click the 'Add Topic' button to generate a new button! Then simply click on your new button to generate .gifs!

I employed the use of jQuery to create dynamically generated elements that display on the page without changing the hard-coded HTML. I outputted the elements to a div container to hold the buttons, and each button populates the gif-well div below it with .gifs. The code snippet below shows how to dynamically generate buttons with data- values that can be used to make GIPHY API calls using an asynchronous HTTP (Ajax) request, as well as toggle between still and animated versions of gifs:

 ``` javascript
$(document).on("click", ".dance-style", function () {

    var danceStyle = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + danceStyle + "&rating=g&rating=pg&limit=10&sort=relevant&api_key=hKygJ8O2rMKyZ8WKPW0bLfaRtHkXG5Vk";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
                var gifDiv = $("<div>");
                var rating = results[j].rating;
                var p = $("<p>").text("Rating: " + rating);
                var danceGif = $("<img>");
                danceGif.attr("src", results[j].images.original_still.url);
                danceGif.attr("data-still", results[j].images.original_still.url);
                danceGif.attr("data-animate", results[j].images.original.url);
                danceGif.attr("data-state", "still");
                danceGif.addClass("gif");
                gifDiv.prepend(p);
                gifDiv.prepend(danceGif);
                $("#gif-well").prepend(gifDiv);
            }
        });
});
 ```
### Feel free to generate .gifs to your heart's content by clicking on the preexisting buttons, or by making your own!

[Link to my .gif Generator](https://jacksonsabol.github.io/GIPHY-tastic-Gif-Generator/)

Thank you for reading!

### Built With:
* HTML
* CSS
* JavaScript
* jQuery Library
* JSON
* Bootstrap CSS Library