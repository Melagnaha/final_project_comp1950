/**
 * Created by rojus on 15-12-07.
 */


$(document).ready(function(){

    // global vars

    var timer,
        seconds = 0,
        minutes = 30,
        myTimerLabl;


    // functions


    function refreshList () {
        $('section').each(function () {

            if ($(this).hasClass('locked')) {
                $(this).children('.lectureShortcuts').children('.summary').hide();
                $(this).children('.lectureShortcuts').children('.exercise').hide();
                $(this).children('.lectureShortcuts').children('.quiz').hide();
            }

            if ($(this).hasClass('readyForQuiz')) {
                $(this).children('.lectureShortcuts').children('.quiz').show();
            }

        });
    }


    function loadQuiz (e){

        var quiz = $(this).parent().siblings('section.quizWrapper');
        e.preventDefault();
        e.stopPropagation(); // to stop parent reacting to child events
        quiz.fadeToggle(300);
    }

    function loadClass(e){

        var main = $(this).children('main');
        e.preventDefault();
        $(this).children('.quizWrapper').hide();
        main.addClass('open');
        main.fadeToggle(300);
    }

    function startQuiz (e){

            timer = $(this);
            var content = $(this).siblings('.quizContent'),
            stopBtn = $(this).siblings('.endQuizBtn');

        e.preventDefault();
        e.stopPropagation(); // to stop parent reacting to child events

        timer.html('Starting...');
        timer.unbind(); // to drop the event so user can't restart the test
        timer.removeClass('startQuizBtn');
        timer.css({'font-size':'1.4rem', 'color':'floralwhite'});

        content.removeClass('hidden');
        stopBtn.removeClass('hidden');

        console.log('Click'); // debug

        myTimerLabl = setInterval(myTimer, 1000);
    }

    // ############## timer ############# //


    function myTimer() {


        if (seconds == 0 && minutes > 0) {
            seconds = 59;
            minutes--;
        } else if (seconds == 0 && minutes == 0) {
            clearTimeout(myTimerLabl);
            timer.html('Time is up!');
            timer.css('color', 'red');
            seconds = 0;
            minutes = 30;
        } else {
            seconds--;
        }
        if (seconds < 10) {
            timer.html('Time left <br>' + minutes + ':0' + seconds);
        } else {
            timer.html('Time left <br>' + minutes + ':' + seconds);
        }

        if (minutes < 10 && seconds == 0) {
           timer.css('color', 'red');
        } else {
          timer.css('color', 'floralwhite');
        }

        if (seconds == 0) {
          timer.css('color', 'yellowgreen');
        }
    }

    function endQuiz (e) {

        clearTimeout(myTimerLabl);
        e.preventDefault();
        console.log('click reg endQuizBtn'); // debug
        $(this).unbind().removeClass('endQuizBtn').css('font-size','1.2rem').html('Thank you for taking a quiz');
        alert('Your quiz has been submitted! Thank you!');
        // submit form logic ...
        timer.html('Quiz submitted');
        $(this).parent().fadeOut(500);
        $(this).parent().parent().removeClass('readyForQuiz').removeClass('locked').addClass('active').unbind().click(loadClass);
        $(this).parent().siblings('.lectureShortcuts').children().show();

    }

    // on load

    refreshList();

    // events

    $('.quiz').click(loadQuiz);
    $('section.active').click(loadClass);
    $('main').click(function(e){e.stopPropagation();});
    $('.quizWrapper').click(function(e){e.stopPropagation();});
    $('.startQuizBtn').click(startQuiz);
    $('.endQuizBtn').click(endQuiz);
});

