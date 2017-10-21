$(document).ready(init);
var pair = false;
var matches = 0;//Every time the application finds a match this variable should be incremented by 1
var attempts = 0;//Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
var accuracy = 0; //Accuracy is defined as a percentage of matches / attempts
var games_played = 0;
var lock =false;
var first_card_clicked = null;
var second_card_clicked = null;
var sound_object={
    'images/zeratul.jpg': new Audio("sounds/zeratul_goodjob.mp3"),
    'images/banelings.jpg': new Audio("sounds/baneling_roll.mp3"),
    'images/illidan.jpg': new Audio("sounds/not_prepared.mp3"),
    'images/cuterbaneling.jpg': new Audio("sounds/baneling_burst.mp3"),
    'images/infestor.png': new Audio("sounds/infestor_derp.mp3"),
    'images/sky_zerg.jpg': new Audio("sounds/multalisk.mp3"),
    'images/Ultralisk.png': new Audio("sounds/ultralisk.mp3"),
    'images/marine.jpg': new Audio("sounds/marine.mp3"),
    'images/Zergling.jpg': new Audio("sounds/zergling.mp3"),
    "clap": new Audio("sounds/applause.mp3"),
    "zerg_lick": new Audio("sounds/zerg_lick.mp3")
}
function random_sort(array){
    var sorted_array = [];
    while(array.length>0){
        var i = Math.floor(Math.random()*array.length);
        sorted_array.push(array.splice(i,1));
    }
    return sorted_array;
}
function create_board() {
    var image_array=[
        'images/banelings.jpg',
        'images/cuterbaneling.jpg',
        'images/cuterbaneling.jpg',
        'images/illidan.jpg',
        'images/infestor.png',
        'images/marine.jpg',
        'images/sky_zerg.jpg',
        'images/zeratul.jpg',
        'images/Zergling.jpg',
        'images/banelings.jpg',
        'images/Ultralisk.png',
        'images/illidan.jpg',
        'images/Ultralisk.png',
        'images/infestor.png',
        'images/marine.jpg',
        'images/sky_zerg.jpg',
        'images/zeratul.jpg',
        'images/Zergling.jpg'
    ]
    var random_image = random_sort(image_array);
    for(var i = 0; i<random_image.length;i++) {
        var image = random_image[i];
        $('<div>').addClass('card').attr('id', 'card' + i).appendTo('.game_area');
        $('<div>').addClass('front').prepend('<img src='+"'"+image+"'/>'").appendTo('#card' + i);
        $('<div>').addClass('back').prepend('<img src="images/card_pack.png"/>').appendTo('#card' + i);
        setTimeout(start_match,2000);
        setTimeout(lock_delay,3000);
    }
}
function reset_stats(){
    matches = 0;
    attempts = 0;
    accuracy = 0;
}
function reset_button() {
    if(lock === false){
        return;
    }
    lock = false;
    games_played++;
    $('.back').removeAttr('id');
    $('.front').removeAttr('id');
    reset_stats();
    display_stats();
    $('.game_area').html('');
    create_board();
    addClickHandlers();
    $('.card').toggleClass('flipped');
    $('#modal_body').css('display','none');
    $('#modal_body').css('background-image','url(images/clapping_zerg.gif)');
    setTimeout(start_match,2000);
    setTimeout(lock_delay,3000);
}
function card_clicked(){
    var face = $(this).find('.front').is('#revealed');
    if(lock===false){
        return;
    }

        if (first_card_clicked === null && lock == true && face ===false) {
            $(this).toggleClass('flipped');
            first_card_clicked = $(this);
        }
        else if (lock === true && first_card_clicked.attr('id') !== $(this).attr('id') && face === false) {
            $(this).toggleClass('flipped');
            second_card_clicked = $(this);
            if (second_card_clicked.find('img').attr('src') === first_card_clicked.find('img').attr('src')) {
                var image = second_card_clicked.find('img').attr('src');
                sound_object[image].play();
                lock = false;
                attempts++;
                matches++;
                if(attempts ===18 && matches!==9){
                    display_gg();
                    lock = false;
                    setTimeout(lock_delay,1000);
                }
                else {
                    lock = false;
                    $(first_card_clicked).find('.front').fadeOut(1500);
                    $(second_card_clicked).find('.front').fadeOut(1500);
                    setTimeout(reset_cards, 1000);
                    accuracy = (matches / attempts * 100);
                    pair = true;
                    if(matches===9&& accuracy<60){
                        $("#modal_body").css("background-image","url(images/balllicking.gif)");
                        $("#modal_body").css("display", "block");
                        sound_object["zerg_lick"].play();
                    }
                    else if (matches === 9) {
                        $("#modal_body").css("display", "block");
                        sound_object["clap"].play();
                    }
                }
                return;
            }
            else {
                attempts++;
                if(attempts ===18){
                    display_gg();
                    lock = false;
                    setTimeout(reset_cards, 1000);
                }
                else {
                    accuracy = (matches / attempts * 100);
                    lock = false;
                    setTimeout(reset_cards, 1000);
                }
            }
        }
}
function addClickHandlers(){
    $('.card').click(card_clicked);
    // $('.game_area').on('click','.card',card_clicked);
    // $('.game_area').on('hover','.card',glow);

    $('.card').hover(function(){
        if(!$(this).find('.front').is('#revealed')){
            $(this).toggleClass("glow");
        }
    })
}
function reset_cards(){
    display_stats();
    if(pair === false) {
        first_card_clicked.toggleClass('flipped');
        second_card_clicked.toggleClass('flipped');
    }
    else{
        first_card_clicked.find('.front').attr('id','revealed');
        second_card_clicked.find('.front').attr('id','revealed');
        if(second_card_clicked.hasClass("glow")){
            second_card_clicked.toggleClass("glow");
        }
        if(first_card_clicked.hasClass('glow')){
            first_card_clicked.toggleClass('glow');
        }
    }
    first_card_clicked = null;
    second_card_clicked = null;
    pair = false;
    lock = true;
}
function display_stats(){
    $('.games_played').find('.value').text(games_played);
    $('.attempts').find('.value').text(attempts);
    $('.accuracy').find('.value').text("%"+accuracy.toFixed(0));
}
function init() {
    create_board();
    addClickHandlers();
    $('.reset').click(reset_button);
    $('.card').toggleClass('flipped');
    lock = false;
    $('#modal_body').css('background-image','url(images/clapping_zerg.gif)');
}
function start_match(){
        $('.card').removeClass('flipped');
}
function lock_delay(){
    lock = true;
}
function display_gg(){
    $('#modal_body').css("background-image", "url(images/GG.gif)");
    $("#modal_body").css("display", "block");
    sound_object["rage"].play();
}
// function glow(){
//     if(!$(this).find('.front').is('#revealed')){
//         $(this).toggleClass("glow");
//     }
// }