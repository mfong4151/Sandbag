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
    DEFAULT_POSITION: { x:4,
                        y:0,
                        },
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

    LIGHT_ATTACK:{
        DAMAGE: .2,
        VELOCITY_INPUT:{
            X:15,
            Y:30,
        }
        
    }

    

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
                defaultPosition:{x: dimensions.width/4,
                                y: 100,
                                }
            });

        this.gravity = .5;
        this.activeFrameSet;
        this.frame = 0;
        this.gameFrame = 0;
        this.lightAttack = {
                            attacking: false,
                            damage: CONSTANTS.LIGHT_ATTACK.DAMAGE,

                            velocityInput:{
                                    x: CONSTANTS.LIGHT_ATTACK.VELOCITY_INPUT.X, 
                                    y: CONSTANTS.LIGHT_ATTACK.VELOCITY_INPUT.Y 
                                    },

                            animation:{
                                width: 224,
                                height: 148
                            },
                            areaOfEffect:{
                                    left: this.pos.x - 40,
                                    right: this.pos.x + 182,
                                    up: this.pos.y -30,
                                    down: this.pos.y2 +120
                                }
                            },

        this.chargeAttack = {
                                attacking: false,
                                damage: 5,
                                velocityInput: 200,
                                animation:{
                                    width: 224,
                                    height: 148
                            }
        }
    }

    //can be dried up
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

    frameSetAnimation(){
        if (this.state === CONSTANTS.STATE.ATTACK || this.state === CONSTANTS.STATE.CHARGE_ATTACK){
            if (this.gameFrame % 10 === 0){
              if (this.frame < 4) this.frame++;
              else this.frame = 0;
            }
              this.gameFrame ++ 
  
          }else if(this.state === CONSTANTS.STATE.IDLE){
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
    
        if(this.state === CONSTANTS.STATE.ATTACK) this._drawAttackFrames(ctx);
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
        else if (this.vel.x >= 14 && this.vel.x < 40) this.vel.x += .5
        
    }
    
    changeAnimationState(){
        if(this.lightAttack.attacking) this.state = CONSTANTS.STATE.ATTACK;
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

    
    doLightAttack(){
        if(!this.lightAttack.attacking)  this.lightAttack.attacking = true;
    }

    updateLightAttackAOE(){
        if (this.direction === 1){
            this.lightAttack.areaOfEffect.left = this.pos.x - 40;
            this.lightAttack.areaOfEffect.right = this.pos.x + 182;
        }
        else{
            this.lightAttack.areaOfEffect.left = this.pos.x2 - 182;
            this.lightAttack.areaOfEffect.right = this.pos.x + 40;
        }
        this.lightAttack.areaOfEffect.up = this.pos.y -30;
        this.lightAttack.areaOfEffect.down = this.pos.y2 +120;
    }

    
    preformLightAttack(){
        if (this.lightAttack.attacking){
            this.updateLightAttackAOE();
            this.attackFrames;
            this.state = CONSTANTS.STATE.ATTACK;
          
            setTimeout(()=>{
                this.state = CONSTANTS.STATE.IDLE;
                this.lightAttack.attacking = false;
                this.frame = 0
            }, 500)

            return true;
        }
        return false;
    }

    update(){
    
        this.moveVertical();
        this.moveHorizontal();
        this.preformLightAttack()
        
        this.changeAnimationState();
    }
    
    endHorizontalMovement(){
        this.vel.x = 0
    }
    moveHorizontal(){
        this.pos.x2 += this.vel.x * this.direction.horizontal;
        this.pos.x += this.vel.x * this.direction.horizontal;
    }


    doChargeAttack(){
        this.state = CONSTANTS.STATE.CHARGE_ATTACK;
        
    }
    releaseChargeAttack(){

    }

    move(wasd){
        switch (wasd){

            case 'w':
                if (this.state !== CONSTANTS.STATE.JUMP)
                this.jump();

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

    reset(dimensions){
        this.pos= {x: dimensions.width/4,
                                    y: 0
                                    },
        this.vel = {
                    x: 0,
                    y: 0
                    }
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


export {TestChar}; 