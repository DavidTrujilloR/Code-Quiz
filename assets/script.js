const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["1. quotes","2. curly brackets","3. parentheses","4. square brackets"],
        answer: "2. curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "2. other arrays"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
    ];

    var timer = document.getElementById("timer");
    var timeLeft = document.getElementById("timeLeft");
    var timesUp = document.getElementById("timesUp"); 
    var startDiv = document.getElementById("start");
    var startQuizBtn = document.getElementById("start-quiz-button");  
    var questionDiv = document.getElementById("questionDiv");
    var questionTitle = document.getElementById("questionTitle");
    var choiceA = document.getElementById("btn0");
    var choiceB = document.getElementById("btn1");
    var choiceC = document.getElementById("btn2");
    var choiceD = document.getElementById("btn3");
    var answerCheck = document.getElementById("answerCheck");    
    var summary = document.getElementById("summary");
    var submitInitialBtn = document.getElementById("submitInitialBtn");
    var initialInput = document.getElementById("initialInput");
    var everything = document.getElementById("everything");   
    var highScoreSection = document.getElementById("highScoreSection");
    var finalScore = document.getElementById("finalScore");    
    var goBackBtn = document.getElementById("goBackBtn");
    var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
    var viewHighScore = document.getElementById("viewHighScore");
    var listOfHighScores = document.getElementById("listOfHighScores");
    var correctAns = 0;
    var questionNum = 0;
    var scoreResult;
    var questionIndex = 0;
    var totalTime = 151;
    
    function newQuiz() {
    questionIndex = 0;
    totalTime = 50;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";
    
    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";
    
    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
    
    showQuiz();
    };

    function showQuiz() {
    nextQuestion();
    }
    
    function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
    }

    function checkAnswer(answer) {
    
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";
    
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {

        correctAns++;

        answerCheck.textContent = "Correct!";
    } else {

        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }
    
    questionIndex++;

    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
    }
    
    function chooseA() { checkAnswer(0); }
    
    function chooseB() { checkAnswer(1); }
    
    function chooseC() { checkAnswer(2); }
    
    function chooseD() { checkAnswer(3); }

    function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
    }

    function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 
    
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;
    
    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }
    
    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };
    
    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
    }

    var i = 0;
    function showHighScores() {
    
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";
    
    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);
    
    var storedHighScores = JSON.parse(savedHighScores);
    
    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
    }

    startQuizBtn.addEventListener("click", newQuiz);
    choiceA.addEventListener("click", chooseA);
    choiceB.addEventListener("click", chooseB);
    choiceC.addEventListener("click", chooseC);
    choiceD.addEventListener("click", chooseD);
    
    submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
    });
    
    viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
    });
    
    goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
    });
    
    clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
    });