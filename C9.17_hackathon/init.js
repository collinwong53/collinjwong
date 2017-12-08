function initialize() {
    createCharacterSelection(characters);
    applyCharacterSelectionClickHandler();
}

function start_game(boardSize,winCondition) {
    game = new Tic_tac(player1character,player2character);
    game.start_game(boardSize,winCondition);
}

$(document).ready(initialize);