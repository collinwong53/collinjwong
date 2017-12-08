// Constructor for player health bars
// Requires a string input of '.playerOne' or '.playerTwo'

function PlayerHealth(playerNum){
    var self = this;

    this.playerNum = playerNum;
    this.maxTime = 250;
    this.timeRemaining = self.maxTime;
    this.intervalTime = 1;

    this.newHealth = null;
    this.changeValue = null;
    this.holdInterval = null;
    this.current = 100;

    this.checkHealth = function(){
        self.currentHealth();
        return self.current;
    };

    this.getHealth = function(healAmount){
        self.currentHealth();
        self.changeValue = (self.current + healAmount) / this.maxTime;

        self.currentHealth();
        self.changeValue = healAmount / this.maxTime;
        self.newHealth = self.current + healAmount;

        if(self.newHealth >= 100){
            self.newHealth = 100;
        }

        self.startAdd();

    };

    this.loseHealth = function(damageAmount){
        self.currentHealth();
        self.changeValue = damageAmount / this.maxTime;
        self.newHealth = self.current - damageAmount;

        if(self.newHealth <= 0){
            self.newHealth = 0;
        }

        $(playerNum + ' .health .outer').css('height', self.current - damageAmount + '%');
        self.start();

    };

    this.currentHealth = function(){
        self.current = $(playerNum+' .health .inner').height() / $(playerNum+' .health .inner').parent().height() * 100;
    };

    this.start = function(){
        self.holdInterval = setInterval( self.handleEvent ,self.intervalTime);
    };

    this.startAdd = function(){
        self.holdInterval = setInterval( self.handleEventAdd ,self.intervalTime);
    };

    this.handleEventAdd= function(){
        self.timeRemaining -= 1;
        self.current += self.changeValue;

        if(self.current >= self.newHealth){

            self.current = self.newHealth;
            self.newHealth = null;
            $(playerNum + ' .health .inner').css('height', self.current+'%');
            $(playerNum + ' .health .outer').css('height', self.newHealth + '%');


            self.timeRemaining = self.maxTime;
            self.stop();
        }

        $(playerNum + ' .health .outer').css('height', self.current+'%');
    };


    this.handleEvent = function(){
        self.timeRemaining -= 1;
        self.current -= self.changeValue;

        if(self.current <= self.newHealth){

            self.current = self.newHealth;
            self.newHealth = null;
            $(playerNum + ' .health .inner').css('height', self.current+'%');

            if(self.changeValue <0){
                $(playerNum + ' .health .outer').css('height', self.newHealth + '%');
            }

            self.timeRemaining = self.maxTime;
            self.stop();
        }

        $(playerNum + ' .health .inner').css('height', self.current+'%');
    };

    this.stop = function(){
        clearInterval(self.holdInterval);
    }
}