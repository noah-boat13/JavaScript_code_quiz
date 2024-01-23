// global variables to initialize the quiz
var timeLeft = 100;
var userScore = 0;
var startQuiz = false;
var currentQuestionIndex = 0;

// query selectors to grab time ('countdown') and question container id's
var timerEl = document.querySelector('.timer');
var questionEl = document.querySelector('.container');

// defines quiz questions and answers as objects within an array
var quizQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition within an if/else statement is enclosed by _______.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "curly brackets"
    }
];

// initialize quiz function
function initializeQuiz() {
    startQuiz = true;
    // removes the header/description/start button from page to begin displaying questions and answers
    questionEl.remove();
    // display the questions and start timer
    displayQuestions(currentQuestionIndex);
    startTimer();
}

// function to display each question then checks using verifyAnswer function
function displayQuestions(questionIndex) {
    var currentQuestion = quizQuestions[questionIndex];

    var questionDisplay = document.createElement('div');
    questionDisplay.innerHTML = '<h2>' + currentQuestion.question + '</h2>';

    var answerListDisplay = document.createElement('ol');
    currentQuestion.answers.forEach(function(answer) {
        var answerListItem = document.createElement('li');

        var answerListBtn = document.createElement('button');
        answerListItem.textContent = answer;

        answerListBtn.addEventListener('click', function() {
            verifyAnswer(answer, currentQuestion.correctAnswer);
        });
        answerListItem.appendChild(answerListBtn);
        answerListDisplay.appendChild(answerListItem);
    });

    questionDisplay.appendChild(answerListDisplay);
    document.body.appendChild(questionDisplay);
}

// function to verify user's answer
function verifyAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        userScore += 10;
    } else {
        timeLeft -= 10;
    }

    // move to next question
    currentQuestionIndex++;

    // check for more questions / if there are display next question / if not end quiz
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestions(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

// timer function
function startTimer() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = 'Time: ' + timeLeft;
        
        if (timerInterval <= 0 || !startQuiz) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timeLeft--;
        }
    }, 1000);
}

// function to end the quiz
function endQuiz() {
    console.log("Quiz complete! Final score: " + userScore);
}

document.getElementById("start-btn").addEventListener("click", initializeQuiz);
