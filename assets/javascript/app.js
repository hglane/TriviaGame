//Intitial values
var counter = 30;
var currentQuestion = 0;
var score = 0; 
var lost = 0;
var timer; 


// Start the 30 second Timer

function timeUp(){
    clearInterval(timer);
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

loadQuestion();