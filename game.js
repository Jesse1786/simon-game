var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];

// Array to store the pattern the user clicks
var userClickedPattern = [];

// Keep track of the game's level
var level = 0;

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
  // Reset the user's pattern array
  userClickedPattern = [];
  // Level up and update h1
  level++;
  $("#level-title").text("Level " + level);

  // Get our next random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animation and sound for the chosen colour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Check if the user's sequence is correct
function checkAnswer(currentLevel) {
  // Check the user's most recent click
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
  }
  else {
    console.log("wrong");
  }

  // Check if the user has finished the sequence
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

// Log user button clicks and play sound
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Sound and animation for the pressed button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the user's click is correct
  checkAnswer(userClickedPattern.length - 1);
});

// Detect whether game has started
var started = false;
$(document).keypress(function() {
  // Start the game if it game isn't already in progress
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
