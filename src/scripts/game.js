import Caelum from "./caelum";
import SandbagTotem from "./sandbag";
import Background from "./background";

export default class Game{

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.mapDimensions = {
                        width: canvas.width, 
                        height: canvas.height,
                        floorPlane: canvas.height * (8.5/10)
                        };
                    
        this.playerMovement ={
                            horizontal: false,
                            vertical: false
                            };

        this.sandbagMovement = {
                                horizontal: false,
                                vertical:false
                                }
        
        this.player = new Caelum(this.mapDimensions);
        this.sandbag= new SandbagTotem(this.mapDimensions);
        this.background = new Background(this.mapDimensions);
        this.activeGame;
    }


    //Main gameplay loop
    play(){
        this.activeGame = true;
        this.animate();
       

        //Handles player movement
        setInterval(()=>{
            
            if(!this.player.outOfBounds.bind(this.player)(this.mapDimensions)){
                if (this.playerMovement.horizontal){
                    this.player.moveHorizontal.bind(this.player)()
                    
                }else{
                    if (!this.player.inJump) 
                    this.player.decelerateX.bind(this.player)()
                }

                this.player.moveVertical.bind(this.player)()
            }else{
                
                this.player.bounce.bind(this.player)(this.mapDimensions)
            }

            this.player.turnIdle.bind(this.player)() //will only run if player.vel.x/y is 0
            
            //Gravity does not work
            this.player.applyGravity.bind(this.player)(this.player.gravity)

        },50)
        //sandbag movement logic
        //this.sandbag.accel.y = 2

        setInterval(()=>{
            if(this.sandbag.inCollision.bind(this.sandbag)(this.player)){
                this.sandbag.convertMomentum.bind(this.sandbag)(this.player)
            }

            if(!this.sandbag.outOfBounds.bind(this.sandbag)(this.mapDimensions)){
           
            this.sandbag.increaseVel.bind(this.sandbag)()
                this.sandbag.moveHorizontal.bind(this.sandbag)()        
                this.sandbag.decelerateX.bind(this.sandbag)()
                this.sandbag.moveVertical.bind(this.sandbag)()

            }else{
        
                this.sandbag.bounce.bind(this.sandbag)(this.mapDimensions)
            }
        
            //this.sandbag.turnIdle.bind(this.sandbag)() //will only run if sandbag.vel.x/y is 0
            //this.sandbag.applyGravity.bind(this.sandbag)(this.sandbag.gravity)
        
        },50)
       

        
        //setInterval(this.sandbag.moveHorizontal.bind(this.sandbag),20);
    }
    
    //resets bag pos, resets char pos
    reset(){
        this.player.reset();
        this.sandbag.reset();
    }

    animate(){
        this.background.animate(this.ctx);
        this.sandbag.animate(this.ctx);
        this.player.animate(this.ctx);
        if (this.activeGame) {
            requestAnimationFrame(this.animate.bind(this));
          }
        
    }

    renderFrame(){

    }

    convertKeydown(userInput){
        console.log(userInput)
        if(userInput === " "){
            this.player.chargeAttack();
        }else{
            this.beginMovement(userInput);
        }
    }

    beginMovement(userInput){
        if(!this.player.inBounce){
            if (userInput === "a" || userInput ==="d") this.playerMovement.horizontal = true;
            if (userInput === 'w' || userInput === "s") this.playerMovement.vertical = true;
            this.player.move(userInput)

        }
    }

    convertKeyRelease(userInput){
        if(userInput === " "){
            this.player.chargeAttackRelease();
        }else{
            this.endMovement(userInput);
        }
    }

    endMovement(userInput){ 
        if (userInput === "a" || userInput ==="d") this.playerMovement.horizontal = false;
        if (userInput === 'w' || userInput === "s") this.playerMovement.vertical = false;
        
        //this.player.move(userInput)
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