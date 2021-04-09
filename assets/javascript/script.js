// GLOBAL VARIABLES
// Questions
var QandA = [{
    Question: "Q1",
    MultipleChoice: ["A1-1", "A1-2", "A1-3", "A1-4"],
    Answer: "A1-1"
},
{
    Question: "Q2",
    MultipleChoice: ["A2-1", "A2-2", "A2-3", "A2-4"],
    Answer: "A2-4"
},
{
    Question: "Q3",
    MultipleChoice: ["A3-1", "A3-2", "A3-3", "A3-4"],
    Answer: "A3-2"
}];
var CurrentQuestion =0;

// Scores Storage array
var CurrentScore = 0;
var Scores = []

// Header
var timerEl = document.getElementById("timer");
var SecondsLeft = 60;

// Start
var StartDiv = document.getElementById("start");
var StartButton = document.getElementById("start-button");

// Questionnaire
var QuestionnaireDiv = document.getElementById("questionnaire");
var DisplayQuestionEl = document.getElementById("display-question");
var Answer1Button = document.getElementById("answer-1");
var Answer2Button = document.getElementById("answer-2");
var Answer3Button = document.getElementById("answer-3");
var Answer4Button = document.getElementById("answer-4");

// User Score
var UserScoreDiv = document.getElementById("user-score");
var FinalScoreEl = document.getElementById("final-score");
var InitialsEl = document.getElementById("initials");
var SubmitButton = document.getElementById("submit");

// Scoreboard
var ScoreboardDiv = document.getElementById("scoreboard");
var ScoreListEl = document.getElementById("score-list");
var GoBackButton = document.getElementById("go-back");
var ClearButton = document.getElementById("go-back");

/* -------------------------------------------------- */

// AUXILIARY FUNCTIONS
// Start Quiz Function
function StartQuizFunction() {
    //clears out start screen and display questionnaire screen
    StartDiv.style.display = "none";
    QuestionnaireDiv.style.display = "block";
    // restarts the Current Question and Timer
    TimerFunction(); 
    CurrentQuestion = 0;
    QuestinnaireFunction(CurrentQuestion);
       
}

// Timer Function
function TimerFunction(){
    var timerInterval = setInterval(function(){
        SecondsLeft--;
        timerEl.textContent = SecondsLeft;
        // When time is over, or questions are finished, move on to Score Screen
        if(SecondsLeft===0 || CurrentQuestion === QandA.length){
            clearInterval(timerInterval);
            // Calculate Score;
            CurrentScore = SecondsLeft*100
            QuestionnaireDiv.style.display = "none";
            UserScoreDiv.style.display = "block";            
        }
    }, 1000)
}

//Questionnaire Function
function QuestionnaireFunction(index) {
    if (index < QandA.length) {
        DisplayQuestionEl = QandA[index].question;
        Answer1Button = QandA[index].MultipleChoice[0];
        Answer2Button = QandA[index].MultipleChoice[1];
        Answer3Button = QandA[index].MultipleChoice[2];
        Answer4Button = QandA[index].MultipleChoice[3];
    }
    CheckAnswer()
}

// Check Answer Function (triggered by Answer button)
function CheckAnswer(event) {
    event.preventDefault;
    // if incorrect, substract time
    if (QandA[CurrentQuestion].Answer !== event.target.value) {
        SecondsLeft -= 10
    }
    // increase question index
    if (CurrentQuestion<QandA.length){
        CurrentQuestion++
    }
    // go to the next question
    QuestionnaireFunction(CurrentQuestion);
}

//Submit Score and Sort
function SubmitScore(event){
    event.preventDefault;  
    Scores.push({initials: InitialsEl.value, score: CurrentScore});
    // Sort Scores --> Currently not working need to review
    Scores = Scores.sort()
    // Display Scoreboard Screen
    QuestionnaireDiv.style.display = "none";
    UserScoreDiv.style.display = "block";
    DisplayScores()
}

// Display Scores Function
function DisplayScores(event){
    event.preventDefault;
}

// Clear Scores Function
function ClearScores(event){
    event.preventDefault;
}

// Go Back Button
function GoBack(event){
    event.preventDefault;

}

/* -------------------------------------------------- */

// EVENT LISTENERS
//Start
StartButton.addEventListener("click", StartQuizFunction)

//Answers


//Submit Score
SubmitButton.addEventListener("click", SubmitScore)

//Clear Score
ClearButton.addEventListener("click", ClearScores)

//Go Back
GoBackButton.addEventListener("click", GoBack)
