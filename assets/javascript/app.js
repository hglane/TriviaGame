//Intitial values
var counter = 5;
var currentQuestion = 0;
var score = 0; 
var lost = 0;
var timer; 

//If timer over, go to next question

function nextQuestion() {

    var questionsOver = (quizQuestions.length - 1) === currentQuestion;

    if (questionsOver){
        console.log('Game Over')
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
    counter = 5;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Time Remaining: ' + counter);
    $('#game').html('<h4>' + question + '</h4>');
    $('#game').append(loadChoices(choices))


}

function loadChoices(choices){
    var result = '';

    for (var i = 0; i < choices.length; i++){

        result += '<p class="choice" data-answer="choices[i]">' + choices[i] + '</p>';
    };

    return result;

};

$(document).on('click', '.choice', function(){
    var clickedAnswer = $(this).attr('data-answer');
    console.log('clicked', clickedAnswer);
});




loadQuestion();