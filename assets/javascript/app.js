//Intitial values
var counter = 30;
var currentQuestion = 0;
var score = 0; 
var lost = 0;
var timer; 

//If timer over, go to next question

function nextQuestion() {

    var questionsOver = (quizQuestions.length - 1) === currentQuestion;

    if (questionsOver){
        console.log('Game Over')
        displayResult();
    }else{
        currentQuestion++;
        loadQuestion(); 
    }
    
}


// Start the 30 second Timer

function timeUp(){
    clearInterval(timer);

    lost++;

    nextQuestion();
}



function countDown(){
    counter--;

    $('#time').html('Time Remaining: ' + counter);

    if (counter === 0){
        timeUp();
    }
}



// Display the question and choices together

function loadQuestion(){
    counter = 30;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Time Remaining: ' + counter);
    $('#game').html(`
        <h4>${question}<h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
    
}

function loadChoices(choices){
    var result = '';

    for (var i = 0; i < choices.length; i++){

        result += '<p class="choice" data-answer="'+ choices[i] +'">' + choices[i] + '</p>';
    };

    return result;

};

$(document).on('click', '.choice', function(){
    clearInterval(timer);
    var clickedAnswer = $(this).attr('data-answer');
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === clickedAnswer){
        //Win
        score++;
        console.log('Win')
        nextQuestion();
    }else {
        lost++;
        console.log('Lose')
        nextQuestion();
    }
});

function displayResult() {
    var result = `
        <p> You got ${score} question(s) right!</p>
        <p> You missed ${score} question(s)</p>
        <p> Total Questions: ${quizQuestions.length}</p>
        <button class="btn btn-primary" id="reset">Reset Questions</button>
    `;

    $('#game').html(result);

}

$(document).on('click', '#reset', function() {
    counter = 5;
    currentQuestion = 0;
    score = 0; 
    lost = 0;
    timer = null; 


    loadQuestion();
});

function loadRemainingQuestion() {
    var remainingQuestions = quizQuestions.length - (currentQuestion + 1);
    var totalQuestions = quizQuestions.length;

    return `Remaining Question(s): ${remainingQuestions}/${totalQuestions}`;

}



loadQuestion();