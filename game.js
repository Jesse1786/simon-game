// Available button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];

// Array to store the pattern the user clicks
var userClickedPattern = [];

// Keep track of the game's level
var level = 0;

// Game state
var started = false;

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

// Advance the game to the next sequence
function nextSequence() {
  // Reset the user's pattern array
  userClickedPattern = [];
  // Level up and update h1
  level++;
  $("#level-title").text("Level " + level);

  // Add another colour to the sequence
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animation and sound for the chosen colour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // User got the answer correct

    // Check if the user has finished the sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // User got the answer wrong

    // Game over sound
    playSound("wrong");

    // Game over animation
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Game over text
    $("#level-title").text("Game Over! Press Spacebar to Restart!")

    // Reset the game to starting state
    startOver();
  }
}

// Reset game values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Add sound, animation, and logic to button presses
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  // Sound and animation for the pressed button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check correctness only if game has started
  if (started) {
    // Record user's answer
    userClickedPattern.push(userChosenColour);
    // Check if the user's click is correct
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Detect whether game has started
$(document).keypress(function(event) {
  if (event.code === "Space") {
    // Start the game if it game isn't already in progress
    if (!started) {
      setTimeout(function() {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }, 500);
    }
  }
});
