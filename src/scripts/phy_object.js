//refers to any body that must obey the laws of game physics

const CONSTANTS = {
    BOUNCE_OFFSET: 10,

}


class PhysicsObject{

    constructor(dimensions, options){
        //Super overridden variables
        this.height = options.height;
        this.width = options.width;
        this.mass = options.mass;
        this.direction = {horizontal:options.directionHorizontal,
                            vertical: options.directionVertical
                        }
        //this.animations = options.animations
        this.pos = {
            x: options.defaultPosition.x, 
            y: options.defaultPosition.y,
            x2: options.defaultPosition.x + options.width,
            y2: options.defaultPosition.y + options.height
        }
        this.bounceOffset = options.bounceOffset;

        //if character is idle, attack, in jump, etc.
        this.state = 0;
        //We should reevaluate if we need an "in jump"
        this.inJump = false;
        this.inBounce = false;
        this.gravity = 4.8;
        this.vel ={x: 0, y: 0};
        this.accel= { x:0, y:0 };
        this.bouncePoints = this.setBouncePoints(dimensions);
    }

    setBouncePoints(dimensions){
        let leftBound, rightBound, floorBound, ceilingBound;
        leftBound = 0;
        ceilingBound = 0;
        rightBound = dimensions.width - this.width - CONSTANTS.BOUNCE_OFFSET;
        floorBound = dimensions.floorPlane - this.height + CONSTANTS.BOUNCE_OFFSET;
    
        return{leftBound,rightBound, floorBound, ceilingBound}


    }


    //change countdownOver after we get countdown running
    outOfBounds(countdownOver = false){
        if(this.pos.x <= this.bouncePoints.leftBound || this.pos.y <= this.bouncePoints.ceilingBound 
            || this.pos.x >= this.bouncePoints.rightBound|| this.pos.y > this.bouncePoints.floorBound){

                return true;
            }
        return false;
    }  

    //Used to "bounce" the physical object if it gets out of bounds

    bounce(){
        this.inBounce = true;
        
        if(this.pos.x <= this.bouncePoints.leftBound ){
            this.pos.x = 3;
            this.direction.horizontal *= -1;
        }
        
        if(this.pos.x + this.width >= this.bouncePoints.rightBound){
            this.pos.x = this.bouncePoints.rightBound - 10;
            this.direction.horizontal *= -1;

        }
        
        if(this.pos.y <= this.bouncePoints.ceilingBound ){ 
            this.pos.y = 3
            this.direction.vertical *= -1;
        }

        if(this.pos.y >= this.bouncePoints.floorBound){

            this.pos.y = this.bouncePoints.floorBound - this.height;
            this.direction.vertical *= -1;
        }
        
    }


    moveHorizontal(){
        this.pos.x += this.vel.x * this.direction.horizontal
    }

    moveVertical(){
        this.pos.y -= this.vel.y * this.direction.vertical

    }

    applyGravity(gravity){
        if (this.pos.y <= this.floor){
        this.vel.y += gravity
        }
    }
    inCollision(){

    }

    draw(ctx){

        this.frameChoice();
        ctx.drawImage(
            this.activeFrameSet,
             this.frame * this.width,
             0,
             this.width,
             this.height,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
            )

        this.frameSetAnimation()

    }

    animate(ctx){
        this.draw(ctx);
    }

    //Get files from folder to import
   



}


export default PhysicsObject;