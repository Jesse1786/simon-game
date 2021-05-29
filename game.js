var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];

// Array to store the pattern the user clicks
var userClickedPattern = [];

// Play sound for a given colour
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Adds animation to pressed button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Add another colour to the sequence
function nextSequence() {
  // Get our next random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animation and sound for the chosen colour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Log user button clicks and play sound
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
});
