import Caelum from "./caelum";
import SandbagTotem from "./sandbag";
import Background from "./background";

export default class Game{

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.mapDimensions = {
                        width: canvas.width, 
                        height: canvas.height,
                        floorPlane: 586
                        };
        
        this.player = new Caelum(this.mapDimensions);
        this.sandbag= new SandbagTotem(this.mapDimensions);
        this.background = new Background(this.mapDimensions);
        this.activeGame;
    }


    //Main gameplay loop

    animate(){
        this.ctx.clearRect(0, 0, this.mapDimensions.width, this.mapDimensions.height)
        this.background.animate(this.ctx);
        this.player.animate(this.ctx);
        this.sandbag.animate(this.ctx);
        if(this.sandbag.inCollision(this.player)){
            this.sandbag.convertMomentum(this.player)
        }
        if (this.player.outOfBounds()) this.player.bounce();
        

        if (this.sandbag.outOfBounds())
            this.sandbag.bounce()
        
        if (this.activeGame) {
            requestAnimationFrame(this.animate.bind(this));
          }
        
    }


    play(){
        this.activeGame = true;
        this.animate();
        

//       

//        
    }
    
    //resets bag pos, resets char pos
    reset(){
        this.player.reset();
        this.sandbag.reset();
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

    //Once the bag is attacked, we want to change
    changeCameraFocus(){

    }

    chooseChar(){

    }

  
}