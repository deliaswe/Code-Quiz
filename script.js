
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

