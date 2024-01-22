// global variables to initialize the quiz
var timeInterval = 75;
var userScore = 0;
var startQuiz = false;
var currentQuestionIndex = 0;

// defines quiz questions and answers as objects within an array
var quizQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3.alerts"
    },
    {
        question: "The condition within an if/else statement is enclosed by _______.",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "2. curly brackets"
    }
];

// initialize quiz function
function initializeQuiz() {
    startQuiz = true;
    // removes the start button from page
    document.getElementById("start-btn").remove();
    // display the questions and start timer
    displayQuestions(currentQuestionIndex);
    startTimer();
}

// function to display each question
function displayQuestions(questionIndex) {
    var currentQuestion = quizQuestions[questionIndex]

    console.log(currentQuestion.question);
    console.log("Possible Answers: ", currentQuestion.answers);
}

// function to check user's answer
function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        userScore += 10;
    } else {
        timeInterval -= 10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestions(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

// timer function
function startTimer() {

}

// function to end the quiz
function endQuiz() {
    console.log("Quiz complete! Final score: " + userScore);
}

document.getElementById("start-btn").addEventListener("click", initializeQuiz);
