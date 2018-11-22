// GIPHY API key: hKygJ8O2rMKyZ8WKPW0bLfaRtHkXG5Vk

// Array to hold the default/displayed styles of dance
var defaultStyles = ["swing dancing", "tango", "alcha gulu", "locking", "line dancing", "krumping", "pogo dancing", "baroque dancing", "ballet dancing", "belly dancing", "samba", "tap dancing", "square dancing", "irish step dancing", "melbourne shuffle"];

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