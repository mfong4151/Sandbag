//refers to any body that must obey the laws of game physics

import Player from "./player";

const CONSTANTS = {
    BOUNCE_OFFSET: 10,

}


export default class PhysicsObject{

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
            y2: options.defaultPosition.y + options.height,
            defaultY: options.defaultPosition.y
        }
        this.bounceOffset = options.bounceOffset;

        //if character is idle, attack, in jump, etc.
        this.state = 0;
        //We should reevaluate if we need an "in jump"
        this.gravity = .5;
        this.drag = 1
        this.vel ={x: 0, y: 20};
        this.accel= { x:0, y:0 };
        
        this.boundaries = this.setBoundaries(dimensions);
    }

    setBoundaries(dimensions){
        let leftBound, rightBound, floorBound, ceilingBound;
        leftBound = 0;
        ceilingBound = 0;
        rightBound = dimensions.width - this.width - CONSTANTS.BOUNCE_OFFSET;
        floorBound = dimensions.floorPlane - this.height + CONSTANTS.BOUNCE_OFFSET;
    
        return{leftBound,rightBound, floorBound, ceilingBound}

    }



    //change countdownOver after we get countdown running
    outOfBounds(countdownOver = false){
        if(this.pos.x <= this.boundaries.leftBound || this.pos.y <= this.boundaries.ceilingBound 
            || this.pos.x >= this.boundaries.rightBound){
            
                return true;
            }
        return false;
    }  

    //Used to "bounce" the physical object if it gets out of bounds

    bounce(){
        
        
        if(this.pos.x <= this.boundaries.leftBound ){
            this.pos.x = 3;
            this.pos.x2 = 3 + this.width
            this.direction.horizontal *= -1;
        }
        
        if(this.pos.x + this.width >= this.boundaries.rightBound){
            this.pos.x = this.boundaries.rightBound - 10;
            this.direction.horizontal *= -1;

        }
        
        if(this.pos.y <= this.boundaries.ceilingBound ){ 
            this.pos.y2 = 3 + this.height
            this.direction.vertical *= -1;
        }

        //if(this.pos.y >= this.boundaries.floorBound){

        //    this.pos.y = this.boundaries.floorBound - this.height;
        //}
        console.log(this)
    }
    moveHorizontal(){
        
        
        this.pos.x += this.vel.x * this.direction.horizontal
    }




    moveVertical(){
        
        this.pos.y += this.vel.y;
        this.pos.y2 += this.vel.y
        
        if(this.pos.y + this.vel.y <= this.boundaries.floorBound){
            this.vel.y += this.gravity;
        }

        else{
            this.vel.y = 0;
            if (this instanceof Player){
                this.setStateIdle()
            }
        }
    }
   
   


    animate(ctx){
        this.update()
        this.draw(ctx);
    }

    //Get files from folder to import
   



}


