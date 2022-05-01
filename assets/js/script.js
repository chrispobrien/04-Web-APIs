// Quiz questions, options, correct answer from options
var questions = [
    {
        id: 0,
        question: "Commonly used data types DO NOT include:",
        options: [ "strings", "booleans", "alerts", "numbers" ],
        correct: "alerts"
    },
    {
        id: 1,
        question: "The condition in an if / else statement is enclosed within ____.",
        options: [ "quotes", "curly brackets", "parentheses", "square brackets" ],
        correct: "parentheses"
    },
    {
        id: 2,
        question: "Arrays in JavaScript can be used to store ____.",
        options: [ "numbers and strings", "other arrays", "booleans", "all of the above" ],
        correct: "all of the above"
    },
    {
        id: 3,
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: [ "commas", "curly brackets", "quotes", "parentheses" ],
        correct: "quotes"
    },
    {
        id: 4,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [ "JavaScript", "terminal / bash", "for loops", "console.log" ],
        correct: "console.log"
    },
];

// Load references to window elements
var pageContentEl = document.querySelector("#page-content");
var codingQuizIntro = document.querySelector("#coding-quiz-intro");
var codingQuizQuestion = document.querySelector("#coding-quiz-question");
var codingQuizScore = document.querySelector("#coding-quiz-score");
var codingQuizHighScores = document.querySelector("#coding-quiz-high-scores");
var formEl = document.querySelector("#score-form");
var scoresEl = document.querySelector("#scores");
var highScores = [];
var codingQuizId = 0;
var quizTime;
var quizTimer;

// Hide all content sections
codingQuizIntro.style.display = "none";
codingQuizQuestion.style.display = "none";
codingQuizScore.style.display = "none";
codingQuizHighScores.style.display = "none";

// Load high scores from local persistent storage
var loadScores = function() {
    highScores = localStorage.getItem("high-scores",highScores);
    if (!highScores) {
        highScores = [];
        return false;
    }
    highScores = JSON.parse(highScores);
}

var poseQuestion = function(Id) {
    // Remove quiz options for previous question if exists
    var btnEl = document.querySelector(".btn-option");
    while (btnEl != null) {
        btnEl.remove();
        btnEl = document.querySelector(".btn-option");
    }
    var wrongEl = document.querySelector(".wrong");
    if (wrongEl != null)
        wrongEl.remove();
    
    // Add question in h1 tag and add option buttons, add div to report wrong answer
    codingQuizQuestion.innerHTML = "<h1>" + questions[Id].question + "</h1>";
    for (let i=0;i<questions[Id].options.length;i++) {
        var btnEl = document.createElement("button");
        btnEl.classList = "btn btn-option quiz-choice";
        btnEl.textContent = questions[Id].options[i];
        codingQuizQuestion.appendChild(btnEl);
    }
    var wrongEl = document.createElement("h1");
    wrongEl.className = "wrong";
    codingQuizQuestion.appendChild(wrongEl);

}

// Handles interval timer ticks, 1000 ms or 1 second during quiz
var handleTimer = function() {
    // Find DOM element containing the text we want to update
    var quickTimeEl = document.querySelector(".timer");

    // If there is time left, decrement the amount of time by 1 second and redisplay
    if (quizTime>1) {
        quizTime--;
        quickTimeEl.textContent = "Time: "+quizTime;
    } else {
        // OUT OF TIME
        // Reset time display
        quickTimeEl.textContent = "Time: --";
        // Stop interval timer
        clearInterval(quizTimer);
        // Show introduction again
        codingQuizIntro.style.display = "flex";
        codingQuizQuestion.style.display = "none";
        codingQuizScore.style.display = "none";
        codingQuizHighScores.style.display = "none";
    }
}

// In header the anchor tag will show high scores at any time
var viewHighScores = function() {
    // Reset timer
    var quickTimeEl = document.querySelector(".timer");
    quickTimeEl.textContent = "Time: --";
    quizTime = 100;

    // Show high scores
    showHighScores();

    // Turn off quiz interval if active
    if (quizTimer) {
        clearInterval(quizTimer);
    }
    
    // Hide all content sections but high scores
    codingQuizIntro.style.display = "none";
    codingQuizQuestion.style.display = "none";
    codingQuizScore.style.display = "none";
    codingQuizHighScores.style.display = "flex";

}

// Handles all button clicks
var quizButtonHandler = function(event) {
    // Click on button "Start Quiz"
    if (event.target.matches("#start-quiz")) {
        codingQuizIntro.style.display = "none";
        codingQuizQuestion.style.display = "flex";
        codingQuizId = 0;
        poseQuestion(codingQuizId);
        quizTime = 100;
        quizTimer = setInterval(handleTimer,1000);
    }
    // Click on a quiz choice (option)
    if (event.target.matches(".quiz-choice")) {
        var buttonEl = event.target;
        // Correct choice?
        if (buttonEl.textContent === questions[codingQuizId].correct) {
            // Go to next question if there is one
            if (codingQuizId < (questions.length-1))
                poseQuestion(++codingQuizId);
            // Otherwise end the quiz part and stop the timer
            else {
                codingQuizQuestion.style.display = "none";
                codingQuizScore.style.display = "flex";
                clearInterval(quizTimer);
                var finalScoreEl = document.querySelector("#final-score");
                finalScoreEl.textContent = quizTime;
            }
        // Wrong choice, let the user know and deduct a penalty
        } else {
            var wrongEl = document.querySelector(".wrong");
            wrongEl.textContent = "Wrong answer! -10 seconds!";
            if (quizTime > 10) quizTime = quizTime-10; else quizTime=0;
        }
    }
    // Click on save score - I don't think this ever true
    // if (event.target.matches("#save-score")) {
    //     var inputEl = document.querySelector("");
    // }
    if (event.target.matches("#go-back")) {
        codingQuizHighScores.style.display = "none";
        codingQuizIntro.style.display = "flex";
    }
    if (event.target.matches("#clear-highscores")) {
        highScores = [];
        localStorage.setItem("high-scores",JSON.stringify(highScores));
        showHighScores();
    }
    
}

var quizFormHandler = function(event) {
    // Prevent page refresh
    event.preventDefault();

    // Load initials
    var quizInitials = document.querySelector("input[name='form-initials']").value;
    if (quizInitials === "")
        return false;

    // Make score object
    var thisScore = {
        score: quizTime,
        initials: quizInitials
    };

    // Store score object in array of high scores
    highScores.push(thisScore);
    // Store high scores in local storage to persist through page reloads
    localStorage.setItem("high-scores",JSON.stringify(highScores));

    // Advance to high scores display
    showHighScores();
    codingQuizScore.style.display = "none";
    codingQuizHighScores.style.display = "flex";
}

// Erase possibly old high scores and generate new list from array
var showHighScores = function() {
    // Erase a previously loaded highscore table
    var scoreEl = document.querySelector(".score");
    while (scoreEl) {
        scoreEl.remove();
        scoreEl = document.querySelector(".score");
    }

    highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    // TODO: sort
    for (i=0;i<highScores.length;i++) {
        scoreEl = document.createElement("li");
        scoreEl.textContent = (i+1)+". "+highScores[i].initials + " - " + highScores[i].score;
        scoreEl.className = "score";
        scoresEl.appendChild(scoreEl);
    }
}

// Entry point
var startQuiz = function () {
    loadScores();
    codingQuizIntro.style.display = "flex";
}

formEl.addEventListener("submit", quizFormHandler);
pageContentEl.addEventListener("click", quizButtonHandler);
startQuiz();
