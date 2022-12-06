import PhysicsObject from "./phy_object";


const CONSTANTS = {
    WIDTH: 91,
    HEIGHT: 90,
    MASS: 40,
    BOUNCE_OFFSET: 3,
    DEFAULT_DIRECTION:{
        HORIZONTAL: 1,
        VERTICAL: -1
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
                defaultPosition:{x: 100,
                                y: 100,
                                }
            });
        
        this.activeFrameSet;
        this.frame = 0;
        this.gameFrame = 0;
        this.lightAttack = {
                            attacking: false,
                            damage: 20,
                            velocityInput: 50,
                            animation:{
                                width: 224,
                                height: 148
                            }},

        this.chargeAttack = {
                                attacking: false,
                                damage: 50,
                                velocityInput: 200,
                                animation:{
                                    width: 224,
                                    height: 148
                            }
        }
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
        else if (this.state === CONSTANTS.STATE.ATTACK){
            if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.attackLeft;
            else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.attackRight;
        }

    }

    //provisional edit here to test attacking animation
    frameSetAnimation(){
        
        if (this.state === CONSTANTS.STATE.IDLE || this.state === CONSTANTS.STATE.ATTACK || this.state === CONSTANTS.STATE.CHARGE_ATTACK){
            if (this.gameFrame === 0){
                if (this.frame < 15) this.frame++;
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
        }else if (this.state === CONSTANTS.STATE.ATTACK){
               if (this.gameFrame % 2 === 0){
                  if (this.frame < 1) this.frame++;
                  else this.frame = 0;
                }
        }
    }

    _drawAttackFrames(ctx){
        ctx.drawImage(
            this.activeFrameSet,
             this.frame * this.lightAttack.animation.width,
             0,
             this.lightAttack.animation.width,
             this.lightAttack.animation.height,
            this.pos.x -55,
            this.pos.y -30,
            this.lightAttack.animation.width,
            this.lightAttack.animation.height
        
        )}

    draw(ctx){
        this.frameChoice();
    
        if(this.state === 3) this._drawAttackFrames(ctx);
        else{
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
        }
        this.frameSetAnimation();
    }
    
    
    increaseVelX(){
        if (this.vel.x < 12) this.vel.x = 12
        else if (this.vel.x >= 14 && this.vel.x < 25) this.vel.x += .5
        
    }
    
    changeAnimationState(attacking){
        if(attacking) this.state = CONSTANTS.STATE.ATTACK;
        else if (this.vel.y < 0) this.state = CONSTANTS.STATE.JUMP;
        else if (this.vel.x === 0 && this.vel.y === 0) this.state = CONSTANTS.STATE.IDLE;
        else if (this.vel.y === 0 && this.vel.x > 0) this.state = CONSTANTS.STATE.WALK;
        
    }
    
    setStateIdle(){
            this.state = CONSTANTS.STATE.IDLE;
    }
    
    jump(){

        this.vel.y -= 15;
    }

    inLightAttack(){
        if (this.lightAttack.attacking === true){
            this.state = CONSTANTS.STATE.ATTACK;
            return true;
        }
        return false;
    }

    update(){
        this.state = CONSTANTS.STATE.ATTACK
        let attacking = this.inLightAttack() // || this.inChargeAttack()
        
        this.moveVertical();
        this.moveHorizontal();
        
        this.changeAnimationState(attacking);
    
        
    }
    
    endHorizontalMovement(){
        this.vel.x = 0
    }
    moveHorizontal(){
        this.pos.x2 += this.vel.x * this.direction.horizontal;
        this.pos.x += this.vel.x * this.direction.horizontal;
    }



    move(wasd){
        switch (wasd){

                case 'w':
                    if (this.state !== CONSTANTS.STATE.JUMP)
                    this.jump();
                    //this.moveVertical()
                    //console.log(this.pos.y)

                    break
                case 'a':
                    this.direction.horizontal = -1;
                    this.increaseVelX();
                    break

                case 'd':
                    this.direction.horizontal = 1;
                    this.increaseVelX()

                    break

                case 's':
                    this.direction.vertical = -1
                    break
            }
    }


    doLightAttack(){
        this.lightAttack.attacking = true;
    }

    doChargeAttack(){
        this.state = CONSTANTS.STATE.CHARGE_ATTACK;
        
    }
    releaseChargeAttack(){

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