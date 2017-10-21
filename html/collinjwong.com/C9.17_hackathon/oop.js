function Tic_tac(char1,char2){
    this.win_condition;
    this.player_1_win = 0;
    this.player_2_win = 0;
    var self = this;
    this.square_clicked;
    this.board_size;
    this.sideNum = self.board_size;
    this.player = 0;
    this.game_won = false;
    this.background = "url('images/heroes_background.jpg')";
    this.player1= char1;
    this.player2= char2;
    this.player1_win_image = "url('images/player_1_win.png')";
    this.player2_win_image = 'url("images/player_2_win.png")';
    this.p1token = 'url("images/p1icon.png")';
    this.p2token = 'url("images/p2icon.png")';
    this.player1Health = null;
    this.player2Health = null;
    this.reset_board = function(){
        $('#game_area').html("");
        self.createBoard();
        $('.playerOnePower').removeClass('playerPowerUsed');
        $('.playerTwoPower').removeClass('playerPowerUsed');
        self.ult1Used = false;
        self.ult2Used = false;
    }
    this.ultCheck1 = false;
    this.ultCheck2 = false;
    this.ult1Used = false;
    this.ult2Used = false;
    this.win_game = function(player){
        $("#modal").css("background-image", player);
        $('#modal').css('display', "block");
        $('#modal').css('background-size', 'contain');
        $('#modal').css('background-repeat', 'no-repeat');
        $('#modal').css('background-position', 'center');
        $('#modal_overlay').css('display',"block");
        self.reset_board();
        self.player_1_win =0;
        self.player_2_win =0;
    }
    this.endgame = function(player){
        self.ult1Used = false;
        self.ult2Used = false;
        self.game_won = true;
        self.win_game(player)
    }
    this.player1_image = function(){
        $('.playerOne').prepend('<img src='+"'"+self.player1.portrait+ "'/>'")
    }
    this.player2_image = function(){
        $('.playerTwo').prepend('<img src='+"'"+self.player2.portrait+ "'/>'")
    }
    this.show_victor = function(player){
        if(self.player_1_win === 5){
            this.endgame(self.player1_win_image);
        }
        else if(self.player_2_win === 5){
            this.endgame(self.player2_win_image);
        }
        else{
            $("#modal").css("background-image", player.victory);//need to change .text
            $('#modal').css('display', "block");
            $('#modal_overlay').css('display',"block");
            player.sound.play();
            self.reset_board();
            console.log(player , "has won");
            this.ult1Used = false;
            this.ult2Used = false;
        }
    }
    this.createBoard = function(){
        $('#game_area').html("");
        for (var i = 0; i < self.sideNum; i++) {
            for (var j = 0; j < self.sideNum; j++) {
                $('<div>').addClass('square').attr('id', "space" + i.toString() + j.toString()).click(self.addMark).appendTo('#game_area');
            }//end inner for
        }//outer for

        if(self.sideNum == 3){
            $('.square').css({
                width: '33.3333%',
                height: '33.3333%'
            });
        }
        else if(self.sideNum == 4){
            $('.square').css({
                width: '25%',
                height: '25%'
            });
        }
        else{
            $('.square').css({
                width: '20%',
                height:'20%'
            });
        }
        for (var i = 0; i < self.sideNum; i++) {
            $('#space0'+ i.toString()).css('border-top', 'none');
            $('#space' + i.toString() + '0').css('border-left', 'none');
            $('#space' + i.toString() + (self.sideNum-1).toString()).css('border-right', 'none');
            $('#space' + (self.sideNum-1).toString() + i.toString()).css('border-bottom', 'none');
        }

    }//end board
    this.add_background = function(background){
        $('body').css('background-image', background);
    }
    this.ultimate = function(player){
        return function () {

            if (player == 0 && self.player == 0 && !self.ult1Used) {
                $('.playerOnePower').addClass('ultAnimate');
                game.ultCheck1 = true; // Referencing game works, but using self is inconsistent
                $('.square').on('click', null, {player: '0'} ,self.player1.skill);
                // self.player = 1- self.player;
                self.ult1Used = true;
            }
            else if(player == 1 && self.player == 1 && !self.ult2Used) {
                $('.playerTwoPower').addClass('ultAnimate');
                game.ultCheck2 = true; // Referencing game works, but using self is inconsistent
                $('.square').on('click', null, {player: '1'} ,self.player2.skill);
                // self.player = 1- self.player;
                self.ult2Used = true;
            }
        }
    }
    this.addMark = function(){
        self.square_clicked = $(this).attr('id');
        if(game.ultCheck1 === false && game.ultCheck2 === false && self.game_won === false) {
            if ($(this).hasClass('clicked')) {
                return;
            }
            if (self.player == 0) {
                $('#p2_title_area').addClass('playerTurn');
                $('#p1_title_area').removeClass('playerTurn');
                $(this).css("background-image", self.p1token).addClass('clicked').addClass('X');
                if(self.check_win('X')){
                    self.player_1_win++;
                    self.show_victor(self.player1);
                    self.player2Health.loseHealth(20);
                    self.player = 1- self.player;
                    return;
                }
                else{
                    self.draw();
                }
                self.player++;
            }else{
                $('#p1_title_area').addClass('playerTurn');
                $('#p2_title_area').removeClass('playerTurn');
                $(this).css("background-image", self.p2token).addClass('clicked').addClass('Y');
                if(self.check_win('Y')){
                    self.player_2_win++;
                    self.show_victor(self.player2);
                    self.player1Health.loseHealth(20);
                    self.player = 1- self.player;
                    return;
                }
                else{
                    self.draw()
                }
                self.player--;
            }//end else if
        }//end outer if
    }//end add mark
    this.check_win = function(player){
        var directions = [
            {"x":1, "y":0},//right
            {"x":-1, "y":0},//left;
            {"x":1, "y":1},//right down
            {"x":-1, "y":-1},//left up
            {"x":1, "y":-1},//right up
            {"x":-1, "y":1},//left down
            {"x":0, "y":-1},//up
            {"x":0,"y":1}//down
        ]
        var hold = self.square_clicked;
        for(var j = 0; j <directions.length; j+=2){
            var first_num = parseInt(hold.substr(hold.length-2,1));
            var second_num = parseInt(hold.substr(hold.length-1,1));
            var first_num_d2 = parseInt(hold.substr(hold.length-2,1));
            var second_num_d2 = parseInt(hold.substr(hold.length-1,1));
            var points = 0;
            var d1_check = true;
            var d2_check = true;//false if class X or Y isn't there
            for(var i = 0; i <self.win_condition-1; i++){
                var first_direction = "#space" + (first_num += directions[j].y)+ (second_num += directions[j].x);
                var second_direction = "#space" + (first_num_d2 += directions[j+1].y)+ (second_num_d2 += directions[j+1].x);
                if($(first_direction).hasClass(player) && d1_check === true){
                    points++;
                }
                else{
                    d1_check = false;
                }
                if($(second_direction).hasClass(player) && d2_check === true){
                    points++;
                }
                else{
                    d2_check = false;
                }
                if(points >= self.win_condition -1){
                    return true;
                }

            }
        }
    }
    this.draw = function(){
        var total_token = 0;
        for(var i = 0; i<self.sideNum; i++){
            for(var j =0; j<self.sideNum; j++){
                var check= $("#space"+i+j);
                if(check.hasClass('X') || check.hasClass('Y')){
                    total_token++;
                }
                if(total_token === self.board_size){
                    self.reset_board();
                    total_token = 0;
                }
            }//end inner for
        }//end outer for
    }//check row

    this.create_health = function(player){
        var health = $('<div>').addClass('health');
        var inner = $('<div>').addClass('inner');
        var outer =$('<div>').addClass('outer');
        var complete = health.append(inner,outer);
        player.append(complete);
    }
    this.start_game = function(board_size,win_condition){
        self.sideNum = board_size;
        self.win_condition = win_condition;
        self.board_size = parseInt(board_size)*parseInt(board_size);
        if(self.win_condition > self.sideNum){
            self.win_condition = self.sideNum;
        }

        $('.game_area').html("");
        $('.playerOne').html("");
        $('.playerTwo').html("");
        reselectCharacters();
        self.create_health($('.playerOne'));
        self.create_health($('.playerTwo'));
        self.createBoard(self.sideNum);
        self.add_background(self.background);
        self.player1_image();
        self.player2_image();
        self.player1Health = new PlayerHealth('.playerOne');
        self.player2Health = new PlayerHealth('.playerTwo');
        $('.playerOnePower').click(self.ultimate('0'));
        $('.playerTwoPower').click(self.ultimate('1'));
        $('#p1_title_area').addClass('playerTurn');

        $('#p2_title_area').removeClass('playerTurn');

        $('.playerOnePower').removeClass('ultAnimate');
        $('.playerTwoPower').removeClass('ultAnimate');

        if($('.playerOnePower').hasClass('playerPowerUsed')){
            $('.playerOnePower').removeClass('playerPowerUsed');
        }

        if($('.playerTwoPower').hasClass('playerPowerUsed')){
            $('.playerTwoPower').removeClass('playerPowerUsed');
        }
    }//end start game
}//end object


