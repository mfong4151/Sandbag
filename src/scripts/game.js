import {Noctis, Tifa,TwoB, TestChar}from "./player";
import SandbagTotem from "./sandbag";
import Background from "./background";

export default class Game{
    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, 
                        height: canvas.height,
                        floorPlane: canvas.height * (7.5/10)
                        };
                    
        this.keyDown = false;
        this.player = new TestChar(this.dimensions);
        this.sandbag= new SandbagTotem(this.dimensions);
        this.background = new Background(this.dimensions);
        this.activeGame;
    }


    //Main gameplay loop
    play(){
        this.activeGame = true;
        this.animate();


        setInterval(()=>{
            if(!this.player.outOfBounds.bind(this.player)(this.dimensions)){

                if (this.keyDown){

                    this.player.moveHorizontal.bind(this.player)()
                }else{
                this.player.deccelerate.bind(this.player)()}

                this.player.moveVertical.bind(this.player)()
                this.player.applyGravity.bind(this.player)()
            }
        },50)

        
        //setInterval(this.sandbag.moveHorizontal.bind(this.sandbag),20);
    }
    
    //resets bag pos, resets char pos
    reset(){
        
    }

    animate(){
        this.background.animate(this.ctx);
        this.player.animate(this.ctx);
        this.sandbag.animate(this.ctx);
        if (this.activeGame) {
            requestAnimationFrame(this.animate.bind(this));
          }
        
    }

    renderFrame(){

    }


    beginMovement(userInput){
        console.log('apple')
        this.keyDown = true;
        this.player.move(userInput)
    }
   
    endMovement(){
        console.log('banana')
        this.keyDown = false;
        this.player.move()
    }


    convertLeftClick(){
        //Eventually i will want mute, pause, and choice buttons, this will require refactoring
        this.convertAttack();
    }

    convertAttack(){
    }


    newGame(){
        

    }

    //Once the bag is attacked, we want to change
    changeCameraFocus(){

    }

    chooseChar(){

    }

  
}