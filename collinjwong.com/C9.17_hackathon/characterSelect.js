var player1character;
var player2character;
var totalSelectedCharacters = 0;
function applyCharacterSelectionClickHandler() {
    $('.char_select_box').click(selectCharacterFunc);
    $('.char_select_box').click(play_select_sound);
    $('.reset').click(reset_button);
    $('#reselect_button').click(reselectCharacters);
    $('#start_game_button').click(confirmOptions);
}
function createCharacterSelection(charObj) {
    var targetCharSelectDiv = $('#char_select_menu');
    var characterTitleDiv = $('<div>').attr("id", "char_select_title").text("Choose Your Warrior!");
    for (var key in charObj) {
        var charSelectDiv = $('<div>').attr('id', charObj[key].name).addClass('char_select_box');
        var charIconDiv = $('<img>').attr('src',charObj[key].icon);
        charSelectDiv.append(charIconDiv);
        targetCharSelectDiv.prepend(charSelectDiv);
    }
    targetCharSelectDiv.prepend(characterTitleDiv);


}
function selectCharacterFunc() {
    var p1SelectToken = "<img class='playerSelect' id='p1selectToken' src='images/p1icon.png'>";
    var p2SelectToken = "<img class='playerSelect' id='p2selectToken' src='images/p2icon.png'>";
    if (totalSelectedCharacters < 2) {
        if(totalSelectedCharacters == 1 && !$(this).hasClass('tokened')) {
            $(this).prepend(p2SelectToken).addClass('tokened');
            totalSelectedCharacters++;
        } else if(totalSelectedCharacters < 1 ) {
            $(this).prepend(p1SelectToken).addClass('tokened');
            totalSelectedCharacters++;
        }
    }
}
function reselectCharacters() {
    $('.playerSelect').remove();
    $('.char_select_box').removeClass('tokened');
    totalSelectedCharacters = 0;
}

function confirmOptions() {
    if(totalSelectedCharacters == 2) {
        player1character = $('.char_select_box:has(#p1selectToken)').attr('id');
        player2character = $('.char_select_box:has(#p2selectToken)').attr('id');
        $('#char_select_modal').css('display','none');
        //Call coin flip
        player1character = characters[player1character];
        player2character = characters[player2character];
        var boardSize = $('input[name=board_size]:checked').val();
        var winCondition = $('input[name=win_condition]:checked').val();
        start_game(boardSize,winCondition);
        $('#player1name').text(game.player1.name);
        $('#player2name').text(game.player2.name);
    }
}
$(document).ready(function() {
    $('#modal_overlay').click (function(){
        $('#modal').css('display','none');
        $('#modal_overlay').css('display','none');
    });
    $('#modal').click (function(){
        $('#modal').css('display','none');
        $('#modal_overlay').css('display','none');
    });
});
function play_select_sound(){
    var character = $(this).attr('id');
    characters[character].select.play();
}
function reset_button(){
    $('#char_select_modal').css('display','block');
}