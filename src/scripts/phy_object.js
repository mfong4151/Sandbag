import PhotoImport from "./png_asset_management";
 

//refers to any body that must obey the laws of game physics

class PhysicsObject{

    constructor(dimensions, options){
        this.height = options.height;
        this.width = options.width;
        this.mass = options.mass;
        this.posX = dimensions.width;
        this.posY= dimensions.height;
        this.direction = options.direction;
        this.testColor = options.testColor;
        this.velX = 0;
        this.velY = 0;
        this.accelX = 0;
        this.accelY = 0;
       
    }

    //change countdownOver after we get countdown running
    outOfBounds(dimensions, countdownOver = false){

        if(this.posX <= 0 || this.posY <= 0 
            || this.posX >= dimensions.width || this.posY > dimensions.floorPlane){
                console.log(this.posY >= dimensions.floorPlane)

                return true;
            }
        return false;
    }  

   
    moveHorizontal(){
        this.posX += this.velX * this.direction
    }

    moveVertical(){
        this.posY = this.posY - this.velY

    }

    applyGravity(gravity){
        if (this.posY <= this.floor){
        this.velY -= gravity
        }
    }
    inCollision(){

    }


    defineModel(){
        
        
    }
    


    draw(ctx){
        //Gut these out for more shape sensitive items later
        ctx.fillStyle = this.testColor;
        ctx.fillRect(
            this.posX,
            this.posY,
            this.width,
            this.height
          )

    }

    animate(ctx){
        this.draw(ctx);
    }

}


export default PhysicsObject;