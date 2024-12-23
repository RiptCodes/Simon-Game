


var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;

var backgroundSetting = false;



$(".changeColour").click(function(){
  blackWhite();
  $(".changeColour").hide();
  backgroundSetting = true;
  console.log(backgroundSetting);
   $(".changeColourRevert").show();
})

$(".changeColourRevert").click(function(){
  switchBack();
  $(".changeColourRevert").hide();
  backgroundSetting = false;
  console.log(backgroundSetting);
  $(".changeColour").show();
  
})
  







$(document).keypress(function() {
  if (!started) {

     $("#level-title").text("Level " + level);
    lastSequence()
      setTimeout(function() {
        lastSequence();
          nextSequence();
  }, 1000);
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);

  animatePress(userChosenColour);
  

  checkAnswer(userClickedPattern.length-1);

});


function lastSequence(){
  console.log(gamePattern)
  playSound()
}

function nextSequence() {
  userClickedPattern = []
  level++;

  
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour)
  
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
  return randomChosenColour
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success")
      console.log(gamePattern)
    if (userClickedPattern.length === gamePattern.length){
      console.log("sequence complete")  
      setTimeout(function() {
      nextSequence()
        
  }, 1000);
    }
  }
      
  else{
    console.log("wrong")
    var wrongAnswer = new Audio("sounds/wrong.mp3")
    wrongAnswer.play()
    $("body").addClass("game-over")
     setTimeout(function() {
      $("body").removeClass("game-over")
      
  }, 200);
    $("h1").text("Game Over, Press any key to restart");
    startOver()
  }
}
function startOver(){
  level = 0
  gamePattern = []
  started = false
  

}

function blackWhite(){
  $("body").addClass("black")
  $("h1").css("color","white")
  $(".btn").css("background-color","transparent")
  $(".btn").css("border-color","white")
}

function switchBack(){
    $("body").addClass("normal")
  $("h1").css("color","#FEF2BF")
  $(".blue").css("background-color","blue")
  $(".red").css("background-color","red")
   $(".yellow").css("background-color","yellow")
   $(".green").css("background-color","green")
  $(".btn").css("border-color","black")
}

$(document).keypress(function(event) {
  var key = event.key;
  switch (key) {
    case "a":
      $("#green").click();
      break;
    case "s":
      $("#red").click();
      break;
    case "d":
      $("#yellow").click();
      break;
    case "f":
      $("#blue").click();
      break;
    default:
      break;
  }
});