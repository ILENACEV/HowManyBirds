let totalTime=30;
let delayTime=2;
let totalScore=0;
let scoreIncrease=10;
let infoText;
let mainTimer=null;
let stepTimer=null;
let buttons=new Array();
let birds=[5,5,5,5,5, 6,6,6,6,6,6,6,6,6,6, 7,7,7,7,7,7,7, 8,8,8,8,8,8,8,8]
let rand_index=0;
let flag;
let pauseBtn;
let correctSound;
let wrongSound;
let stopSound;
let endTime=false;

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.audio('correct2', 'assets/sound/correct2.mp3');
        this.load.audio('wrong2', 'assets/sound/wrong2.mp3');
        this.load.audio('stopping', 'assets/sound/stopping.mp3');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('right', 'assets/right.png');
        this.load.image('wrong', 'assets/wrong.png');
        for(var i=0;i<4;i++)
            this.load.image('button'+i, 'assets/button/button'+i+'.png');

        this.load.image('bird0', 'assets/birds/5/2.jpg');
        this.load.image('bird1', 'assets/birds/5/3.jpg');
        this.load.image('bird2', 'assets/birds/5/8.jpg');
        this.load.image('bird3', 'assets/birds/5/11.jpg');
        this.load.image('bird4', 'assets/birds/5/16.jpg');

        this.load.image('bird5', 'assets/birds/6/2.jpg');
        this.load.image('bird6', 'assets/birds/6/3.jpg');
        this.load.image('bird7', 'assets/birds/6/5.jpg');
        this.load.image('bird8', 'assets/birds/6/6.jpg');
        this.load.image('bird9', 'assets/birds/6/9.jpg');
        this.load.image('bird10', 'assets/birds/6/14.jpg');
        this.load.image('bird11', 'assets/birds/6/15.jpg');
        this.load.image('bird12', 'assets/birds/6/17.jpg');
        this.load.image('bird13', 'assets/birds/6/18.jpg');
        this.load.image('bird14', 'assets/birds/6/19.jpg');

        this.load.image('bird15', 'assets/birds/7/1.jpg');
        this.load.image('bird16', 'assets/birds/7/4.jpg');
        this.load.image('bird17', 'assets/birds/7/7.jpg');
        this.load.image('bird18', 'assets/birds/7/10.jpg');
        this.load.image('bird19', 'assets/birds/7/11.jpg');
        this.load.image('bird20', 'assets/birds/7/16.jpg');
        this.load.image('bird21', 'assets/birds/7/17.jpg');

        this.load.image('bird22', 'assets/birds/8/1.jpg');
        this.load.image('bird23', 'assets/birds/8/2.jpg');
        this.load.image('bird24', 'assets/birds/8/5.jpg');
        this.load.image('bird25', 'assets/birds/8/6.jpg');
        this.load.image('bird26', 'assets/birds/8/7.jpg');
        this.load.image('bird27', 'assets/birds/8/11.jpg');
        this.load.image('bird28', 'assets/birds/8/17.jpg');
        this.load.image('bird29', 'assets/birds/8/19.jpg');
    }

    create ()
    {   
        correctSound=this.sound.add('correct2');
        wrongSound=this.sound.add('wrong2');
        stopSound=this.sound.add('stopping');     
        this.add.image(400, 300, 'bg');
        pauseBtn=this.add.image(775,25, 'pause');
        pauseBtn.setInteractive();
        pauseBtn.on('clicked', this.pauseHandler, this);

        //  Create a bunch of images
        
        this.createBox();
        //  If a Game Object is clicked on, this event is fired.
        //  We can use it to emit the 'clicked' event on the game object itself.
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        //  Display the game stats
        this.add.text(140, 67, 'How many birds do you see?', { font: '40px Arial', fill: '#000' });
        infoText = this.add.text(10, 10, '', { font: '32px Arial', fill: '#fff' });

        mainTimer = this.time.addEvent({ delay: totalTime*1000, callback: this.gameOver, callbackScope: this });
    }

    update ()
    {        
        var currentTime=Math.floor( (totalTime*1000 - mainTimer.getElapsed())/1000 );
        infoText.setText('Time: ' + currentTime +'    Score: '+totalScore);
        if(currentTime<5 && !endTime){
            endTime=true;
            stopSound.play();
        }
    }
    pauseHandler()
    {
        $('#pauseGame').modal({escapeClose: false,clickClose: false,showClose: false});
        mainTimer.paused = true;
        if (stepTimer != null)
            stepTimer.paused = true;
    }
    createBox()
    {
        rand_index=Phaser.Math.Between(0,29);
        
        var img=this.add.image(400,300,'bird'+rand_index);
        img.scaleX=0.8;
        img.scaleY=0.8;

        for(var i=0;i<4;i++){
            buttons[i] = this.add.image(170+150*i,540, 'button'+i);            
            buttons[i].scaleX=0.7;
            buttons[i].scaleY=0.7;
            //  Make them all input enabled
            buttons[i].setInteractive();
            buttons[i].name=i+5;

            //  The images will dispatch a 'clicked' event when they are clicked on
            buttons[i].on('clicked', this.clickHandler, this);
        }
    }
    clickHandler (button)
    {          
        if(button.name==birds[rand_index]){
            flag=this.add.image(400,300,'right');
            totalScore+=scoreIncrease;
            correctSound.play();
        }
        else{
            flag=this.add.image(400,300,'wrong');
            wrongSound.play();
        }
        this.checkbox();
    }
    checkbox()
    {
        for(var i=0;i<4;i++){
            buttons[i].off('clicked', this.clickHandler);
            buttons[i].input.enabled = false;
        }
        stepTimer=this.time.addEvent({ delay: delayTime*1000, callback: this.removebox, callbackScope: this });
    }
    removebox()
    {        
        for(var i=0;i<4;i++){
            buttons[i].setVisible(false);
        }
        flag.setVisible(false);
        this.createBox();
    }
    gameOver ()
    {
        if (stepTimer != null)
            stepTimer.paused=true;
        this.input.off('gameobjectup');
        $('#score-val').html(totalScore);
        $('#gameover').modal({escapeClose: false,clickClose: false,showClose: false});        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [ Example ]
};

const game = new Phaser.Game(config);