//quiz_container javascript

/*Object Constructor function for question Object*/
function Question (text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}
/* end of object constructor function for question Object */

/* opbject constructor function for quiz_container Object */

function Quiz_container(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

    
}

Quiz_container.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz_container.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex; 

}

Quiz_container.prototype.guess = function(answer) {
    
    if(this.getQuestionIndex().correctAnswer(answer)) {
        this.score++; 
    }

    this.questionIndex++; 
}

/* end opbject Constructor function for Quiz_container Object */

/*questions is an array where each element of this array is an object*/
// questions used from http://www.quiz_containernightchief.com/Trivia-Quiz_container-Questions/Dinosaurs.html#scoreMark
var questions = [
    new Question("How many horns did Triceratops have?", ["1"," 2","3","4"],"3"),
    new Question("The largest dinosaur for which there is conclusive evidence, Argentinosaurus, is believed to have been approximately how long ?", ["30 M ","36 M","54 M","24 M"],"36 M"),
    new Question(" What does the work Dinosaur mean in its Greek root ?", ["Ancient Warrior","Terrible Lizard","Secret Dragon","Night Walker"],"Terrible Lizard"),
    new Question("The first dinosaur fossil was discovered and scientifically described in ... ?", ["1902","1921","1612","1824"],"1824"),
    new Question(" When did dinosaurs become extinct ?", ["About 65 million years ago","About 100 million years ago","About 20 million years ago","About 1.2 billion years ago"],"About 65 million years ago"),

    ];




var quiz_container = new Quiz_container(questions); // Initialization of Quiz_container Constructor object by passing questions array

/*This function will populate the questions and choices through HTML DOM object methods*/
function populate() {
    if(quiz_container.isEnded()) {
        showScores();

    }
    else {
        //The getElementById() method returns the element that has the ID attribute with the specified value
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz_container.getQuestionIndex().text;

        //show choices
        var choices = quiz_container.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

populate(); //calling of populate function

//guess function  is use to accept user's answer and to check for its correctness
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz_container.guess(guess);
        populate();
    }

}

// The function will show the progress of questions (eg. 1 of 5)
function showProgress() {
    var currentQuestionNumber = quiz_container.questionIndex + 1;
    // so the question you on, once answered it will add 1 to go to the next question
    var element = document.getElementById("progress");
    element.innerHTML =  '<div class="progress-number">' +currentQuestionNumber +'</div>' + " of " + '<div class="progress-number">' + quiz_container.questions.length +'</div>';
}

// This function will show result at the end of the quiz_container
// will add eveything together to display for the user to be able to see how they did
function showScores() {
    var gameOver = "<h1>Result</h1>";  
     gameOver += "<h2 id='score' style='text-align:center;'>Your Score: " + quiz_container.score + "</h2>";
    var element = document.getElementById("quiz_container");
    element.innerHTML = gameOver;

}
//countdown counter
//this calculates/converts the time in to seconds minutes hours and days
function getTimeRemaining(endtime) {
  var time = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  var days = Math.floor(time / (1000 * 60 * 60 * 24));
  return {
    total: time,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function createClock(id, endtime) {
  var theClock = document.getElementById(id);
  var daysSpan = theClock.querySelector(".days");
  var hoursSpan = theClock.querySelector(".hours");
  var minutesSpan = theClock.querySelector(".minutes");
  var secondsSpan = theClock.querySelector(".seconds");

  function update() {
    var time = getTimeRemaining(endtime);
    //Select elements from the array
    daysSpan.innerHTML = time.days;
    hoursSpan.innerHTML = ("0" + time.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + time.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + time.seconds).slice(-2);

    if (time.total <= 0) {
      clearInterval(interval);
    }
  }

  update();
  var interval = setInterval(update, 1000);
}
//to convert text into a JavaScript object
//This function is useful for setting date values based on string values
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
createClock("clockdiv", deadline);
