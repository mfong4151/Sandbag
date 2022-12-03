import PhysicsObject from "./phy_object";


const CONSTANTS = {
    HEIGHT: 90,
    WIDTH: 90,
    MASS: 40,
    DEFAULT_DIRECTION: 1, //refers to the direction we're facing, 1 = right, -1 = left
    TEST_COLOR :'blue',
    DEFAULT_ACCEL: 0,
    DEFAULT_VEL: 0,
    DEFAULT_HP: 0,
    GRAVITY: 4.8,
    
};


class Player extends PhysicsObject{
    constructor(dimensions){
        super({
            width: dimensions.width/3,
            height: dimensions.floorPlane
            },
            {
                height: CONSTANTS.HEIGHT,
                width: CONSTANTS.WIDTH,
                mass: CONSTANTS.MASS,
                direction: CONSTANTS.DEFAULT_DIRECTION,
                testColor: CONSTANTS.TEST_COLOR
            });
    }

    deccelerate(){

        //Still might need this for fine tweeking
        //console.log(this.velX);

        if(this.accelX > 0) this.accelX -= .3;
        if(this.accelY > 0) this.accelY -= .3;
        if (this.velX > 1) this.velX -= 1;
        if (this.velY >1) this.velY -= 1;
        
    }
  

    increaseAccel(){
        
        if(this.accelX < 3){
            this.accelX += .5;
        }
    }

    increaseVel(){
        if (this.velX < 20){
        this.velX += this.accelX;
        this.velY += this.accelY;
        }
    }

    jump(){
        this.accelY = 2;
        this.velY = 10;
        this.moveVertical()

    }
    move(wasd){
        
        switch (wasd){
            
            case 'w': 
                this.jump()
                break
            case 'a':
                this.direction = -1;
                this.increaseAccel();
                this.increaseVel()
                ;
                break
                
            case 'd':
                this.direction = 1;
                this.increaseAccel();
                this.increaseVel()
                break

            case 's':

        }      
    }

    
 

    landing(){

    }

    //used for damaging the bag

    lightAttack(){

    }

    chargeAttack(){

    }


}

//character classes
//When constructing a character, we should super over options


class Noctis extends Player{

}


class Tifa extends Player{

}

class TwoB extends Player{

}

class TestChar extends Player{
    
}


export {Noctis, Tifa, TwoB, TestChar}; 