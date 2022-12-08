import Caelum from "./caelum";
import SandbagTotem from "./sandbag";
import Background from "./background";
import Counter from "./counter"
import Timer from "./timer"
import OffScreenSandbag from "./offscreen";
import VisualEFX from "./visual_effect";

export default class Game{

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.mapDimensions = {
                        width: canvas.width, 
                        height: canvas.height,
                        floorPlane: 586
                        };
        this.visualEFX = new VisualEFX();
        this.player = new Caelum(this.mapDimensions);
        this.sandbag= new SandbagTotem(this.mapDimensions);
        this.sandbagOffScreen = new OffScreenSandbag();
        this.background = new Background(this.mapDimensions);
        this.scoreCounter = new Counter(this.mapDimensions);
        this.timer = new Timer(this.dimensions);
        this.checkGameOver = false;
        this.activeGame;
    }


    //Main gameplay loop

    animate(){

        this.checkGameOver = this.timer.checkGameOver()
        this.ctx.clearRect(0, 0, this.mapDimensions.width, this.mapDimensions.height)
        this.background.animate(this.ctx);
        this.sandbagOffScreen.animate(this.ctx, this.sandbag);
        this.scoreCounter.updateDistanceTraveled(this.sandbag);
        this.scoreCounter.updateMaxHeightYeeted(this.sandbag.pos.y);
        this.scoreCounter.updatePreviousPos(this.sandbag);
        this.scoreCounter.animate(this.ctx, this.sandbag);
        this.timer.animate(this.ctx)
        this.sandbag.faceCharacter(this.player);
        this.sandbag.animate(this.ctx);
        this.player.animate(this.ctx);
        //this.specialEffects.animate(this.ctx, this.player.state); //should animate left or right spear effects
        //this.specialEffect.animate(this.ctx, this.sandbag.state)//should animate damaged animation
        if(this.sandbag.inCollision(this.player)){
            this.sandbag.convertMomentum(this.player);
        }
        if (this.player.outOfBounds()) this.player.bounce();
        
        if (this.sandbag.outOfBounds()) this.sandbag.bounce();
        
        if (this.timer.checkGameOver()) this.scoreCounter.animateEndgame(this.ctx);
        


        if (this.activeGame) {
            requestAnimationFrame(this.animate.bind(this));
          }        
    }


    restart(){
        this.player.reset();
        this.sandbag.reset;
    }

    play(){
        this.activeGame = true;
        this.animate();
        this.timer.decrimentTimer()
       
    }
    //resets bag pos, resets char pos
    reset(){
        this.player.reset(this.mapDimensions);
        this.sandbag.reset(this.mapDimensions);
        this.timer.reset();
        this.scoreCounter.reset();
    }


    convertKeydown(userInput){
        if(userInput === " "){
            this.player.doChargeAttack();
        }else{
            this.beginMovement(userInput);
        }
    }

    beginMovement(userInput){
        if(!this.player.inBounce){
            this.player.move(userInput)

        }
    }

    convertKeyRelease(userInput){
        if(userInput === " "){
            this.player.releaseChargeAttack();
        }else{
            this.endMovement(userInput);
        }
    }

    endMovement(userInput){ 
    
        this.player.endHorizontalMovement(userInput)
    }

    convertLeftClick(){
        //Eventually i will want mute, pause, and choice buttons, this will require refactoring
        this.player.doLightAttack();
    }


  
}