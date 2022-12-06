import PhysicsObject from "./phy_object";


const CONSTANTS = {
    WIDTH: 91,
    HEIGHT: 90,
    MASS: 40,
    BOUNCE_OFFSET: 3,
    DEFAULT_DIRECTION:{
        HORIZONTAL: 1,
        VERTICAL: 1
    },  //refers to the direction we're facing, 1 = right, -1 = left
    TEST_COLOR :'blue',
    DEFAULT_ACCEL: 0,
    DEFAULT_VEL: 0,
    DEFAULT_HP: 0,

    STATE: {  
        IDLE: 0,
        WALK: 1,
        JUMP: 2,
        ATTACK: 3,
        CHARGE_ATTACK: 4
    },

    //ACCELERATION{
    //    X: 
    //    Y:

    //}

    //DECELERATION{
    //    X:
    //    Y:
    //}

};

export default class Player extends PhysicsObject{
    constructor(dimensions){
        super(dimensions,
            {
                height: CONSTANTS.HEIGHT,
                width: CONSTANTS.WIDTH,
                mass: CONSTANTS.MASS,
                directionHorizontal: CONSTANTS.DEFAULT_DIRECTION.HORIZONTAL,
                directionVertical: CONSTANTS.DEFAULT_DIRECTION.VERTICAL,
                defaultPosition:{x: dimensions.width/3,
                                y: dimensions.floorPlane - CONSTANTS.HEIGHT + 5
                                }
            });
            
        this.activeFrameSet;
        this.frame = 0;
        this.gameFrame = 0;
        this.lightAttack = {
                            damage: 20,
                            velocityInput: 50,
                            };

        this.chargeAttack = {
                                damage: 50,
                                velocityInput: 200
                            };
    }


    frameChoice(){
        if (this.state === CONSTANTS.STATE.IDLE){
             if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.idleLeft;
             else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.idleRight;

        }else if (this.state === CONSTANTS.STATE.WALK){
            if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.walkLeft;
            else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.walkRight;

        }else if (this.state === CONSTANTS.STATE.JUMP){
            if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.jumpLeft;
            else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.jumpRight;
        }
        //else if (this.state === CONSTANTS.STATE.ATTACK){
        //    if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.postDamageLeft;
        //    else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.postDamageRight;
        //}

    }

    //provisional edit here to test attacking animation
    frameSetAnimation(){
        
        if (this.state === CONSTANTS.STATE.IDLE || this.state === CONSTANTS.STATE.ATTACK || this.state === CONSTANTS.STATE.CHARGE_ATTACK){
            if (this.gameFrame % 13 === 0){
                if (this.frame < 3) this.frame++;
                else this.frame = 0;
            }
            this.gameFrame ++;
  
          }else if (this.state === CONSTANTS.STATE.WALK){
              if (this.gameFrame % 11 === 0){
                if (this.frame < 4) this.frame++;
                else this.frame = 0;
              }
              this.gameFrame ++;
  
          }else if (this.state === CONSTANTS.STATE.JUMP){
              if (this.gameFrame % 2 === 0){
                  if (this.frame < 1) this.frame++;
                  else this.frame = 0;
                }
                this.gameFrame ++
        }
    }
    
    decelerateX(){

        //Still might need fine tweeking
        //console.log(this.vel.x);

        if(this.accel.x > 0) this.accel.x += .3;
        if (this.vel.x > 0) this.vel.x += .6;
        
    }

    deccelerateY(){
        if(this.accel.y > 0) this.accel.y -= .3;
        if (this.vel.y >1) this.vel.y -= .6;
    }
  

    increaseAccelX(){
        this.state = 1
        if(this.accel.x < this.vel.x/2 || this.accel.x < 2 ){

            if(this.accel.x <= 0){
                this.accel.x += 2
            }
            this.accel.x += .3;
        }
    }

    increaseVel(){
        if (this.vel.x < 18) this.vel.x += this.accel.x;


        if (this.vel.y < 18) this.vel.y += this.accel.y;
    }


    turnIdle(){
        if (this.vel.x <= 0 && this.vel.y <= 0) this.state = CONSTANTS.STATE.IDLE;
    }

    resumeIdle(){
        this.state = CONSTANTS.STATE.IDLE
    }

    jump(){
        this.state = CONSTANTS.STATE.JUMP
        this.accel.y = 2;
        this.vel.y = 15;
        this.inJump = true;
        this.moveVertical();
    
    }

    softLanding(){

        this.accel.y = 0;
        this.inBounce = false;

    }

    move(wasd){
        if (!this.inBounce){
        switch (wasd){

                case 'w':
                    this.direction.vertical = 1
                    this.jump()
                    break
                case 'a':
                    this.direction.horizontal = -1;
                    this.increaseAccelX();
                    this.increaseVel()
                    ;
                    break

                case 'd':
                    this.direction.horizontal = 1;
                    this.increaseAccelX();
                    this.increaseVel()
                    break

                case 's':
                    this.direction.vertical = -1
            }
        }



    }


    doLightAttack(){
        //uncomment this when we've implemented proper sprites
        this.state = CONSTANTS.STATE.ATTACK;

    }

    chargeAttack(){
        this.state = CONSTANTS.STATE.CHARGE_ATTACK;

    }
    chargeAttackRelease(){

    }
}

//character classes
//When constructing a character, we should super over options
class TestChar extends Player{
    
    draw(ctx){
        //Gut these out for more shape sensitive items later
        ctx.fillStyle = this.testColor;
        ctx.fillRect(
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
          )
    }
}


//We should move this to another file after completion, copy paste with the CONSTANTS





export {TestChar}; 