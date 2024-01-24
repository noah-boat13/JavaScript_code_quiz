// global variables to initialize the quiz
var timeLeft = 100;
var userScore = 0;
var startQuiz = false;
var currentQuestionIndex = 0;

// query selectors to grab time ('countdown') and question ('container') classes
var timerEl = document.querySelector('.timer');
var containerEl = document.querySelector('.container');

// defines quiz questions and answers as objects within an array
var quizQuestions = [
    {
        question: 'Commonly used data types do NOT include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 'alerts'
    },
    {
        question: 'The condition within an if/else statement is enclosed by _______.',
        answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: 'curly brackets'
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 'all of the above'
    },
    {
        question: 'Strings must be enclosed within ______ when being assigned to variables.',
        answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswer: 'parenthesis'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['Javascript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log'
    }
];

// initialize quiz function
function initializeQuiz() {
    startQuiz = true;
    // removes the header/description/start button from page to begin displaying questions and answers
    var newContainerEl = document.createElement('div');
    newContainerEl.setAttribute('class', 'container');

    containerEl.replaceWith(newContainerEl);

    containerEl = newContainerEl;
    // display the questions and start timer
    displayQuestions(currentQuestionIndex);
    startTimer();
}

// function to display each question then checks using verifyAnswer function
function displayQuestions(questionIndex) {
    var currentQuestion = quizQuestions[questionIndex];

    containerEl.innerHTML = '';

    var questionDisplay = document.createElement('div');
    questionDisplay.innerHTML = '<h2>' + currentQuestion.question + '</h2>';

    var answerListDisplay = document.createElement('ol');
    currentQuestion.answers.forEach(function(answer) {
        var answerListItem = document.createElement('li');
        answerListItem.textContent = answer;

        answerListItem.addEventListener('click', function() {
            verifyAnswer(answer, currentQuestion.correctAnswer);
        });
        answerListDisplay.appendChild(answerListItem);
    });

    questionDisplay.appendChild(answerListDisplay);
    containerEl.appendChild(questionDisplay);
}

function displayCorrect() {
    console.log('Correct');
}

function displayIncorrect() {
    console.log('Incorrect');
}

// function to verify user's answer
function verifyAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        displayCorrect();
    } else {
        timeLeft -= 10;
        displayIncorrect();
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
        
        
        if (startQuiz) {
            timerEl.textContent = 'Time: ' + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            } else {
                timeLeft--;
            }
        } else {
            clearInterval(timerInterval);
        }  
    }, 1000);
}

// function to end the quiz
function endQuiz() {
    userScore = timeLeft;
    console.log("Quiz complete! Final score: " + userScore);
}

document.getElementById("start-btn").addEventListener("click", initializeQuiz);
