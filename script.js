let level = localStorage.getItem("level");

document.getElementById("levelTitle").innerHTML =
level.toUpperCase() + " LEVEL";

let currentQuestion = 0;
let score = 0;
let hintsLeft = 3;

let quizQuestions = questions[level];

let timer;
let timeLeft = 30;

loadQuestion();

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 30;

    document.getElementById("timer").innerHTML =
    "Time Left: " + timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerHTML =
        "Time Left: " + timeLeft;

        if(timeLeft <= 0) {

            nextQuestion();
        }

    }, 1000);

    let q = quizQuestions[currentQuestion];

    document.getElementById("question").innerHTML =
    q.question;

    let optionsHTML = "";

    q.options.forEach((option, index) => {

        optionsHTML += `
        <button onclick="checkAnswer(${index})">
        ${option}
        </button>
        <br><br>
        `;
    });

    document.getElementById("options").innerHTML =
    optionsHTML;

    document.getElementById("hint").innerHTML = "";
}

function checkAnswer(selected) {

    let q = quizQuestions[currentQuestion];

    if(selected === q.answer) {

        score++;

        document.getElementById("score").innerHTML =
        score;
    }

    nextQuestion();
}

function nextQuestion() {

    currentQuestion++;

    if(currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        alert("Quiz Completed!\nScore: " + score);

        window.location.href = "home.html";
    }
}

function showHint() {

    if(hintsLeft > 0) {

        document.getElementById("hint").innerHTML =
        quizQuestions[currentQuestion].hint;

        hintsLeft--;

    } else {

        alert("No hints left!");
    }
}
