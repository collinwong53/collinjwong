function Skills(){
    var self = this;

    this.prepareForNextTurn = function(gameRef){
        $('.square').unbind('click', game.player1.skill);
        $('.square').unbind('click', game.player2.skill);

        $('.playerOnePower').removeClass('ultAnimate');
        $('.playerTwoPower').removeClass('ultAnimate');

        game.player = 1- game.player;

        if(gameRef.data.player == 0){

            game.player1.attack.play();
            game.ultCheck1 = false;
            $('.playerOnePower').addClass('playerPowerUsed');
            $('.playerOnePower').removeClass('hover');

            $('#p2_title_area').addClass('playerTurn');
            $('#p1_title_area').removeClass('playerTurn');
        }
        else{
            game.player2.attack.play();
            game.ultCheck2 = false;
            $('.playerTwoPower').addClass('playerPowerUsed');
            $('.playerTwoPower').removeClass('hover');

            $('#p1_title_area').addClass('playerTurn');
            $('#p2_title_area').removeClass('playerTurn');
        }
    };

    this.hanzoSkill = function(gameRef){
        var space = $(this).attr('id');

        var name = space.substr(0,5);
        var yPos = space[5];

        for(var xPos = 0; xPos < 5; xPos++){
            $('#'+name+yPos+xPos).addClass('shootAnimate');
            $('#'+name+yPos+xPos).css('background-image', 'none').removeClass('clicked X Y');
        }

        setTimeout(function(){
            $('.square').removeClass('shootAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    };

    this.genjiSkill = function(gameRef){
        var space = $(this).attr('id');

        var name = space.substr(0,5);
        var xPos = parseInt(space[5]);
        var yPos = parseInt(space[6]);

        for(var x = xPos-1; x <= xPos+1; x++){

            for(var y = yPos-1; y <= yPos+1; y++){

                if(y!= yPos || x != xPos){
                    if($('#'+name+x+y) !== undefined){
                        $('#'+name+x+y).css('background-image', 'none').removeClass('clicked X Y');
                        $('#'+name+x+y).addClass('slashAnimate');
                    }
                }
            }
        }

        setTimeout(function(){
            $('.square').removeClass('slashAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    };

    this.illidanSkill = function(gameRef){
        var name = 'space';
        var countPool = [];
        var toDelete = null;
        var playerTokenStr;

        if(gameRef.data.player == 0){
            playerTokenStr = 'p1icon';
        }
        else{
            playerTokenStr = 'p2icon';
        }


        for(var i = 0; i < game.sideNum; i++){
            for(var j = 0; j < game.sideNum; j++){
                if($('#'+name+i+j).css('background-image').indexOf(playerTokenStr) === -1 && $('#'+name+i+j).css('background-image') !== 'none' && $('#'+name+i+j).css('background-image') != undefined){
                    countPool.push('#'+name+i+j);
                }
            }
        }

        if(countPool.length > 3){

            for(var k = 0; k < 3; k++){
                toDelete = countPool[Math.floor(Math.random()*(countPool.length-1))];

                countPool.splice(countPool.indexOf(toDelete),1);

                $(toDelete).addClass('burnAnimate');
                $(toDelete).css('background-image', 'none').removeClass('clicked X Y');
            }
        }
        else{
            for(var obj in countPool){
                $(countPool[obj]).addClass('burnAnimate');
                $(countPool[obj]).css('background-image', 'none').removeClass('clicked X Y');
            }
        }

        setTimeout(function(){
            $('.square').removeClass('burnAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    };

    this.arthasSkill = function(gameRef){
        var space = $(this).attr('id');

        var name = space.substr(0,5);
        var xPos = space[6];

        for(var yPos = 0; yPos < 5; yPos++){
            $('#'+name+yPos+xPos).addClass('stabAnimate');
            $('#'+name+yPos+xPos).css('background-image', 'none').removeClass('clicked X Y');
        }

        setTimeout(function(){
            $('.square').removeClass('stabAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    };

    this.kerriganSkill = function(gameRef){
        var name = 'space';
        var countPool = [];
        var toDelete = null;
        var playerTokenStr;

        if(gameRef.data.player == 0){
            playerTokenStr = 'p1icon';
        }
        else{
            playerTokenStr = 'p2icon';
        }

        for(var i = 0; i < game.sideNum; i++){
            for(var j = 0; j < game.sideNum; j++){
                if($('#'+name+i+j).css('background-image').indexOf(playerTokenStr) === -1 && $('#'+name+i+j).css('background-image') !== 'none' && $('#'+name+i+j).css('background-image') != undefined){
                    countPool.push('#'+name+i+j);
                }
            }
        }

        if(countPool.length > 3){

            for(var k = 0; k < 3; k++){
                toDelete = countPool[Math.floor(Math.random()*(countPool.length-1))];

                countPool.splice(countPool.indexOf(toDelete),1);

                $(toDelete).addClass('kerrAnimate');
                $(toDelete).css('background-image', 'none').removeClass('clicked X Y');
            }
        }
        else{
            for(var obj in countPool){
                $(countPool[obj]).addClass('kerrAnimate');
                $(countPool[obj]).css('background-image', 'none').removeClass('clicked X Y');
            }
        }

        setTimeout(function(){
            $('.square').removeClass('kerrAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    };

    this.jimSkill = function(gameRef){
        var space = $(this).attr('id');

        var name = space.substr(0,5);
        var yPos = space[5];

        for(var xPos = 0; xPos < 5; xPos++){
            $('#'+name+yPos+xPos).addClass('fireAnimate');
            $('#'+name+yPos+xPos).css('background-image', 'none').removeClass('clicked X Y');
        }

        setTimeout(function(){
            $('.square').removeClass('fireAnimate');
        },1200);

        self.prepareForNextTurn(gameRef);
    }
}

var gameSkills = new Skills();