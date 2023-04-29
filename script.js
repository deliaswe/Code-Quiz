
//Declared variables
var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var timeInterval = 0;
var secondsLeft = 75
var penalty = 10;
var score = 0;
var questionsDiv = document.querySelector("#questionsDiv");
var questionIndex = 0;
var unorderedList = document.querySelector("#unorderedList");
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//Quiz questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: ["the <head>", "the bottom of the <body>", "anywhere in the HTML", "anywhere in the stylesheet"],
        answer: "the bottom of the <body>"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World)", "alertBox('Hello World')", "alert('Hello World')", "msg('Hello World)"],
        answer: "alert('Hello World')"
    },
    {
        title: "How do you call a function called myFunction?",
        choices: ["myFunction()", "call myFunction()", "call function myFunction", "call select myFunction"],
        answer: "myFunction()"
    },
    {
        title: "How do you write an IF statement in JavaScript?",
        choices: ["if i = 5 or else", "if i = 5 then", "if i == 5 then", "if(i == 5)"],
        answer: "if(i == 5)"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for (i=0; i <= 5; i++)", "for (i <= 5; i++)", "for i= 1 to 5", "for (i = 0; i <= 5)"],
        answer: "for (i=0; i <= 5; i++)"
    }
]

//GIVEN I am taking a code quiz, WHEN I click the start button

startButton.addEventListener("click", function () {

    // a timer starts
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft + " seconds";

            if (secondsLeft <= 0) {
                clearInterval(timeInterval);
                finished();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
})

// and renders questions and choices to page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    unorderedList.innerHTML = "";
    // THEN I am presented with another question
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New choices for each question
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(unorderedList);
        unorderedList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
    startButton.style.visibility = "hidden";
}

// compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // WHEN I answer a question incorrectly
        } else {
            // Will deduct 10 seconds off secondsLeft
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// All done function will appear last page
function allDone() {
    questionsDiv.innerHTML = "";
    startButton.style.visibility = "hidden";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Finish!"
    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // WHEN all questions are answered or the timer reaches 0
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    // THEN I can save my initials and score
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    // Captures initials 
    createSubmit.addEventListener("click", function (event) {
        // event.preventDefault();
        // var highScoreText = new Object();
        // highScoreText.name = inputTag.value.trim();
        // highScoreText.newScore = score;
        // storeScores(highScoreText);
        // window.location.href = "highScores.html"

        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            // store initials and score
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.href = "highScores.html"
            
           
        }
    });
}