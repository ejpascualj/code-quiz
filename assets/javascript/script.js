// GLOBAL VARIABLES
// Questions
var QandA = [
    {Question: "Q1", MultipleChoice: ["A1-1", "A1-2", "A1-3", "A1-4"], Answer: "A1-1"},
    {Question: "Q2", MultipleChoice: ["A2-1", "A2-2", "A2-3", "A2-4"], Answer: "A2-4"},
    {Question: "Q3", MultipleChoice: ["A3-1", "A3-2", "A3-3", "A3-4"], Answer: "A3-2"}
];
var CurrentQuestion = 0;


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
    SecondsLeft = 60;
    TimerFunction();
    QuestionnaireFunction(CurrentQuestion);
}

// Timer Function
function TimerFunction() {
    var timerInterval = setInterval(function () {
        SecondsLeft--;
        timerEl.textContent = SecondsLeft;
        
        // When time is over, or questions are finished, move on to Score Screen
        if (SecondsLeft === 0 || CurrentQuestion >= QandA.length) {
            clearInterval(timerInterval);
            ScoreFunction()
        }
    }, 1000)
}

//Questionnaire Function
function QuestionnaireFunction(index) {
    if (index < QandA.length) {
        DisplayQuestionEl.innerHTML = QandA[index].Question;
        Answer1Button.innerHTML = QandA[index].MultipleChoice[0];
        Answer2Button.innerHTML = QandA[index].MultipleChoice[1];
        Answer3Button.innerHTML = QandA[index].MultipleChoice[2];
        Answer4Button.innerHTML = QandA[index].MultipleChoice[3];
    }
}

// Check Answer Function (triggered by Answer button)
function CheckAnswer(event) {
    event.preventDefault()
    // if incorrect, substract time
    if (event.target.value !==  QandA[CurrentQuestion].Answer) {
        SecondsLeft -= 10
    }
    // increase question index
    if (CurrentQuestion < QandA.length) {
        CurrentQuestion++
        // go to the next question
        QuestionnaireFunction(CurrentQuestion);
    } else {
        clearInterval(timerInterval);
        ScoreFunction();
    }
    
}

function ScoreFunction(){
    // Calculate Score;
    CurrentScore = SecondsLeft * 100
    FinalScoreEl.innerHTML = CurrentScore;
    QuestionnaireDiv.style.display = "none";
    UserScoreDiv.style.display = "block";
}

//Submit Score and Sort
function SubmitScore(event) {
    event.preventDefault();
    Scores.push({ initials: InitialsEl.value, score: CurrentScore });
    // Sort Scores --> Currently not working need to review
    // sort() https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    Scores = Scores.sort(function (a, b) {
        if (a.score > b.score) {
            return -1;
        } else if (a.score < b.score) {
            return 1;
        } else {
            return 0;
        }
    });
    // Save Scores into Local Storage
    
    DisplayScores()
    // localStorage.setItem("Scores", JSON.stringify(Scores))



}

// Display Scores Function
function DisplayScores() {
    // event.preventDefault();
    // Display Scoreboard Screen
    for (var i = 0; i < Scores.length; i++) {
        var ScoreListItem = document.createElement("li");
        ScoreListItem.innerHTML = Scores[i].score + " " + Scores[i].initials
        ScoreListEl.appendChild(ScoreListItem)
    }
    UserScoreDiv.style.display = "none";
    ScoreboardDiv.style.display = "block";
}

// Clear Scores Function
function ClearScores(event) {
    Scores = [];
    // 
    // while(ScoreListEl.firstChild){
    //     ScoreListEl.removeChild(ScoreListEl.firstChild)
    // }

    while( ScoreListEl.hasChildNodes() ){
        ScoreListEl.removeChild(ScoreListEl.lastChild);
    }
}

// Go Back Button
function GoBack(event) {
    event.preventDefault();
    StartDiv.style.display = "block";
    QuestionnaireDiv.style.display = "none";
    UserScoreDiv.style.display = "none";
    ScoreboardDiv.style.display = "none";
    // Initialize Timer
    timerEl.textContent = 60;
    CurrentQuestion = 0;
}

/* -------------------------------------------------- */

// EVENT LISTENERS

//Start
QuestionnaireDiv.style.display = "none";
UserScoreDiv.style.display = "none";
ScoreboardDiv.style.display = "none";
StartButton.addEventListener("click", StartQuizFunction)

//Answers
Answer1Button.addEventListener("click", CheckAnswer)
Answer2Button.addEventListener("click", CheckAnswer)
Answer3Button.addEventListener("click", CheckAnswer)
Answer4Button.addEventListener("click", CheckAnswer)

//Submit Score
SubmitButton.addEventListener("click", SubmitScore)

//Clear Score
ClearButton.addEventListener("click", ClearScores)

//Go Back
GoBackButton.addEventListener("click", GoBack)