// global variables to initialize the quiz
var timeLeft = 100;
var userScore = 0;
var startQuiz = false;
var currentQuestionIndex = 0;
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// query selectors to grab time ('countdown') and question ('container') classes
var timerEl = document.querySelector('.timer');
var containerEl = document.querySelector('.container');
var answerDisplayEl = document.getElementById('answer-display');

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

function mainQuizMenu() {
    var mainMenu = document.createElement('div');
    mainMenu.innerHTML = '<h1>JavaScript Coding Quiz</h1>' + '<p>Try to answer the following code-oriented questions within the time given once you click the "Start Quiz" button below. Keep in mind that inncorrect answers will penalize your score/time by ten secconds. Good Luck!</p>' + '<button id="start-btn">Start Quiz</button>';
    mainMenu.setAttribute('class', 'container');

    containerEl.replaceWith(mainMenu);
    containerEl = mainMenu;

    document.getElementById("start-btn").addEventListener("click", initializeQuiz);
}

function resetQuiz() {
    startQuiz = false;
    timeLeft = 0;
    currentQuestionIndex = 0;
    containerEl.innerHTML = '';
}

// initialize quiz function
function initializeQuiz() {
    startQuiz = true;
    timeLeft = 100;

    var newContainerEl = document.createElement('div');
    newContainerEl.setAttribute('class', 'container');

    containerEl.replaceWith(newContainerEl);
    containerEl = newContainerEl;

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
    answerListDisplay.setAttribute('class', 'questions');
    currentQuestion.answers.forEach(function(answer) {
        var answerListItem = document.createElement('li');
        answerListItem.setAttribute('id', 'answers');
        answerListItem.textContent = answer;

        answerListItem.addEventListener('click', function() {
            verifyAnswer(answer, currentQuestion.correctAnswer);
        });
        answerListDisplay.appendChild(answerListItem);
    });
    questionDisplay.appendChild(answerListDisplay);
    containerEl.appendChild(questionDisplay);
}

// function to verify user's answer
function verifyAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        var correctDisplay = document.createElement('p');
        correctDisplay.textContent = 'Correct';
        answerDisplayEl.appendChild(correctDisplay);
    } else {
        timeLeft -= 10;
        var incorrectDisplay = document.createElement('p');
        incorrectDisplay.textContent = 'Incorrect';
        answerDisplayEl.appendChild(incorrectDisplay);
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
        if (timeLeft <= 0 || currentQuestionIndex >= quizQuestions.length) {
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

function viewHighScores() {
    displayHighScores();
}

function displayHighScoreInput() {
    containerEl.innerHTML = '';

    var highScoreDisplay = document.createElement('div');
    highScoreDisplay.innerHTML = '<h2>Enter Name/Intitals:</h2>';

    var userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('id', 'nameInput');

    var submitBtn = document.createElement('button');
    submitBtn.setAttribute('class', 'score-sub-btn');
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', function() {
        saveHighScore(userInput.value);
    });

    highScoreDisplay.appendChild(userInput);
    highScoreDisplay.appendChild(submitBtn);

    containerEl.appendChild(highScoreDisplay);
}

function saveHighScore(userName) {
    var userHighScore = {
        name: userName,
        score: userScore
    };
    highScores.push(userHighScore);

    highScores.sort((a,b) => b.score - a.score);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    displayHighScores();
}

function displayHighScores() {
    containerEl.innerHTML = '';

    var highScoresDisplay = document.createElement('div');
    highScoresDisplay.innerHTML = '<h2>High Scores:</h2>';

    var highScoresList = document.createElement('ol');
    highScores.forEach(function(highScore) {
        var scoreListItem = document.createElement('li');
        scoreListItem.textContent = highScore.name + ': ' + highScore.score;
        highScoresList.appendChild(scoreListItem);
    });

    highScoresDisplay.appendChild(highScoresList);

    var backBtn = document.createElement('button');
    backBtn.setAttribute('class', 'back-btn');
    backBtn.textContent = 'Back to Main Menu';
    backBtn.addEventListener('click', function() {
        timeLeft = 0;
        timerEl.textContent = 'Time: 0';

        mainQuizMenu();
    });

    var resetScoresBtn = document.createElement('button');
    resetScoresBtn.setAttribute('class', 'reset-btn');
    resetScoresBtn.textContent = 'Reset High Scores';
    resetScoresBtn.addEventListener('click', resetHighScores);

    highScoresDisplay.appendChild(backBtn);
    highScoresDisplay.appendChild(resetScoresBtn);
    containerEl.appendChild(highScoresDisplay);
}

function resetHighScores() {
    localStorage.removeItem('highScores');
    highScores = [];

    timeLeft = 0;

    displayHighScores();
}

// function to end the quiz
function endQuiz() {
    userScore = (timeLeft + 1);
    timeLeft = 0;

    resetQuiz();
    displayHighScoreInput();
}

document.getElementById("start-btn").addEventListener("click", initializeQuiz);
document.getElementById('view-scores-btn').addEventListener('click', viewHighScores);