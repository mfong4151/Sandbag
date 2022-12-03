import PhysicsObject from "./phy_object";

const CONSTANTS = {
    HEIGHT: 90,
    WIDTH: 90,
    MASS: 40,
    DEFAULT_DIRECTION: -1, //refers to the direction we're facing, 1 = right, -1 = left
    TEST_COLOR :'green',
    DEFAULT_ACCEL: 0,
    DEFAULT_VEL: 0,
    DEFAULT_HP: 0,
    GRAVITY: 4.8,
    
};


export default class SandbagTotem extends PhysicsObject{
    constructor(dimensions){
        
        super({
                width: dimensions.width/2,
                height: dimensions.floorPlane
                },
            {
            height: CONSTANTS.HEIGHT,
            width: CONSTANTS.WIDTH,
            mass: CONSTANTS.MASS,
            direction: CONSTANTS.DEFAULT_DIRECTION,
            testColor: CONSTANTS.TEST_COLOR,
        });

        this.hp = CONSTANTS.DEFAULT_HP;

    }
    bounce(){


    }

    launchSandbag(){

    }

    decellerate(){

        if(this.accelX > 0) this.accelX -= .1;
        if(this.accelY > 0) this.accelY -= .1;
        if (this.velX > 1) this.velX -= .1;
        if (this.velY >1) this.velY -= .1;
        
    }
  
    increaseAccel(){
        
        if(this.accelX < 25){
            this.accelX += 1;
            this.accelY += 1;
        }
    }

    increaseVel(){
        if (this.velX < 100){
        this.velX += this.accelX * this.hp;
        this.velY += this.accelY * this.hp;
        }
    }
    
    takeCollision(otherEntity){

        this.absorbDamage()
    }

    absorbDamage(){

    }

    
    reset(){
        this.posX = CONSTANTS.DEFAULT_POS_X;
        this.posY = CONSTANTS.DEFAULT_POS_Y;
        this.velX = CONSTANTS.DEFAULT_VEL;
        this.velY = CONSTANTS.DEFAULT_VEL;
        this.accelX = CONSTANTS.DEFAULT_ACCEL;
        this.accelY = CONSTANTS.DEFAULT_ACCEL;
        this.direction = CONSTANTS.DEFAULT_DIRECTION;
        this.hp = CONSTANTS.DEFAULT_HP;
    }
}
