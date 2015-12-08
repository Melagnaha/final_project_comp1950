/**
 * Created by rojus on 15-12-07.
 */


$(document).ready(function(){

    // functions

    $('section').each(function(){

        if($(this).hasClass('locked')){
            $(this).children('.lectureShortcuts').children('.summary').hide();
            $(this).children('.lectureShortcuts').children('.exercise').hide();
        }
    });


    function loadQuiz (e){

        var quiz = $(this).parent().siblings('section.quizWrapper');
        e.preventDefault();
        e.stopPropagation(); // to stop parent reacting to child events
        quiz.fadeToggle(300);
    }

    function loadClass(e){

        var main = $(this).children('main');
        e.preventDefault();

        main.addClass('open');
        main.fadeToggle(300);
    }

    // events

    $('.quiz').click(loadQuiz);
    $('section.active').click(loadClass);
    $('main').click(function(e){e.stopPropagation();});
    $('.quizWrapper').click(function(e){e.stopPropagation();});
});

