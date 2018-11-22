// My GIPHY API key: hKygJ8O2rMKyZ8WKPW0bLfaRtHkXG5Vk

// Array to hold the default/displayed styles of dance
var defaultStyles = ["swing dancing", "tango", "popping dance", "locking dance", "line dancing", "krumping", "pogo dancing", "baroque dancing", "ballet dancing", "belly dancing", "samba", "tap dancing", "square dancing", "riverdance", "melbourne shuffle"];

$(document).ready(function () {
    renderButtons();
});

// Function to loop through array of default dance styles and append a button for each to default-gif-buttons div
function renderButtons() {
    // Empty the div to reset any user-added buttons
    $("#default-gif-buttons").empty();
    // Loop through the array of dance styles
    for (var i = 0; i < defaultStyles.length; i++) {
        // Set a variable to create a button HTML tag
        var defaultButton = $("<button>");
        // Add a class of dance-style to each button so we can style them
        defaultButton.addClass("dance-style");
        // Add a data-(name) attribute to make each button unique - we can call on this later to query the GIPHY API with the q= parameter
        defaultButton.attr("data-name", defaultStyles[i]);
        // Add text to each button equal to each dance style in the array - after some testing I want to capitalize the text, but I will check GIPHY documentation on case sensitivity of queries
        defaultButton.text(defaultStyles[i]);
        // Append the freshly created buttons to the default-gif-buttons div
        $("#default-gif-buttons").append(defaultButton);
    };
};

// Function for all buttons to query the GIPHY API with an AJAX call on 'click'
$(document).on("click", ".dance-style", function () {

    // Set a variable to hold the value of the data-name attribute, which we set to be the style of dance in the renderButtons function
    var danceStyle = $(this).attr("data-name");
    // Set a variable to hold the GIPHY API query URL that allows the tag to be the data-name value of the button clicked
    // The URL also has a rating of G or PG, a limit of 10 gifs, and the 'sort by: relevant' parameters hard coded into it
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + danceStyle + "&rating=g&rating=pg&limit=10&sort=relevant&api_key=hKygJ8O2rMKyZ8WKPW0bLfaRtHkXG5Vk";

    // AJAX call with the queryURL defined above, and the method of GET - use .then to wait for response before executing the function
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // Assign variable to be placeholder for the data (gifs) returned
            var results = response.data;
            // Loop through the results to pull values and append them to div, p, and img tags
            for (var j = 0; j < results.length; j++) {
                // Assign a variable to create a new div tag
                var gifDiv = $("<div>");
                // Assign a variable to hold the rating of each gif
                var rating = results[j].rating;
                // Assign a variable to create a p tag with text equal to the rating
                var p = $("<p>").text("Rating: " + rating);
                // Assign a variable to create an img tag
                var danceGif = $("<img>");
                // Add src attribute to the img tag equal to the gif's 'still' URL so all the gifs load 'paused'
                danceGif.attr("src", results[j].images.fixed_width_still.url);
                // Add data- attribute to the img tag equal to the gif's fixed-width 'still' URL so we can toggle back and forth to it and the animated state
                danceGif.attr("data-still", results[j].images.fixed_width_still.url);
                // Add data- attribute to the img tag equal to the gif's fixed-width animated URL so we can toggle back and forth to it and the still state
                danceGif.attr("data-animate", results[j].images.fixed_width.url);
                // Add data- attribute to track what state (still or animate) each gif is in
                danceGif.attr("data-state", "still");
                // Add class so we can use onclick event listener to toggle between gif states
                danceGif.addClass("gif");
                // Prepend the p tag with the rating to the gif div we created
                gifDiv.prepend(p);
                // Prepend the img tag with the gif to the gif div we created
                gifDiv.prepend(danceGif);
                // Prepend the gif div to the HTML inside of the div with an id of gif-well
                $("#gif-well").prepend(gifDiv);
            }
        });
});

// Function to switch between still and animate states for gifs
$(document).on("click", ".gif", function () {

    // Assign a variable to store the gif's data-state
    var state = $(this).attr("data-state");

    // Check if the data-state is equal to 'still'
    if (state === "still") {
        // Update the src attribute of this image to it's data-animate value
        $(this).attr("src", $(this).attr("data-animate"));
        // Update the data-state attribute to 'animate' for tracking
        $(this).attr("data-state", "animate");
    }
    // Check if the data-state is equal to 'animate'
    if (state === "animate") {
        // Update the src attribute to the URL in 'data-still'
        $(this).attr("src", $(this).attr("data-still"));
        // Update data-state attribute to 'still' for tracking
        $(this).attr("data-state", "still");
    }
});

// Function to add new dance style/topic to the list of buttons
$("#add-dance").on("click", function (event) {
    // Prevent page from reloading (default condition) when submit style button is pressed
    event.preventDefault();
    // Assign variable to equal a string of the text inside of the input text box at the time of submittal
    var newTopic = $("#dance-input").val().trim();
    // Push the new topic to the end of the defaultStyles array
    defaultStyles.push(newTopic);
    // Empty the content of the text box after 'Add a Dance Style' button is clicked
    $("#dance-input").val("");
    // Call the renderButtons function to re render all the buttons with the new topic inside of the array
    renderButtons();
});