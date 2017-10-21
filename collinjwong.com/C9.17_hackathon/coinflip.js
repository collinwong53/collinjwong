$(document).ready(initialize);

function initialize() {

    var setCoin = new Coinflip();
    setCoin.newFlip();

    // var stop = setCoin.flip;

    // setTimeout(function(){
    //     setCoin.stop();
    // },500*setCoin.flipCount+setCoin.alignTimeout); // Number multiplier should be equal to animation-duration
}

function Coinflip() {
    var self = this;
    this.flip = null;
    this.playerStart = null;
    this.flipCount = null; // Random number decides the player to start
    this.alignTimeout = 0; // alignTimeout is needed to make sure that the coin stops on the desired player

    this.setPlayer = function(){
        self.flipCount = (Math.floor(Math.random()*10)+5);
        console.log('Flip count is: '+ self.flipCount);

        $('#coin').css( 'animation-iteration-count', self.flipCount);

        if(self.flipCount%2 == 0){
            self.playerStart = 1;
            self.alignTimeout = -1; // -1 stops the animation 1ms before the flip completely finishes
        }
        else{
            self.playerStart = 2;
            self.alignTimeout = 0; // 0 allows the animation to completely finish
        }

        console.log('Player start is: '+self.playerStart);

    };

    this.newFlip = function(){
         self.setPlayer();

         self.flip = setInterval(function(){
            if($('.coinFront').hasClass('hideSide')){
                $('.coinBack').addClass('hideSide');
                $('.coinFront').removeClass('hideSide');
            }
            else{
                $('.coinFront').addClass('hideSide');
                $('.coinBack').removeClass('hideSide');
             }
         }, 250);

         self.setClear();

         return self.playerStart;
    };

    this.stop = function(){
        clearInterval(self.flip);
    };

    this.setClear = function(){
        setTimeout(function(){
            clearInterval(self.flip);
        },500*self.flipCount+self.alignTimeout); // Number multiplier should be equal to animation-duration

    };
}