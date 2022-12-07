import PhysicsObject from "./phy_object";


const CONSTANTS = {
    HEIGHT: 150,
    WIDTH: 130,
    MASS: 40,
    DEFAULT_DIRECTION:{
        HORIZONTAL: -1,
        VERTICAL: -1
    },  //refers to the direction we're facing, 1 = right, -1 = left
    DEFAULT_ACCEL: 0,
    DEFAULT_VEL: 0,
    DEFAULT_HP: 1,
    GRAVITY: 4.8,

    STATE: {  
        IDLE: 0,
        DAMAGED: 1,
        RECOVERY: 2
        
    },
    ANIMATION: {
        IDLE_FRAMES: 5,
        DAMAGED: 1,
        POST: 1, //post damage
        WIDTH: 130,
        HEIGHT: 150
    },
    BOUNCE_OFFSET: 10

};


export default class SandbagTotem extends PhysicsObject{
    constructor(dimensions){

        super(dimensions,
            {
            height: CONSTANTS.HEIGHT,
            width: CONSTANTS.WIDTH,
            mass: CONSTANTS.MASS,
            directionHorizontal: CONSTANTS.DEFAULT_DIRECTION.HORIZONTAL,
            directionVertical: CONSTANTS.DEFAULT_DIRECTION.VERTICAL,
            testColor: CONSTANTS.TEST_COLOR,
            bounceOffset: CONSTANTS.BOUNCE_OFFSET,
            defaultPosition:{x: dimensions.width/2,
                y: 100
            }
        });
        this.animationDirection =  CONSTANTS.DEFAULT_DIRECTION.HORIZONTAL
        //this.hp = CONSTANTS.DEFAULT_HP;
        this.hp = CONSTANTS.DEFAULT_HP;
        this.animations = this.importSpriteSheets(); 
        this.activeFrameSet;
        this.frame = 0;
        this.gameFrame = 0;
        this.gravity = .75
    }


    importSpriteSheets(){

        let idleLeft = new Image(), idleRight = new Image(), damagedLeft = new Image(), damagedRight = new Image(), postDamageLeft = new Image(), postDamageRight = new Image();
        const allAnimations = [idleLeft, idleRight, damagedLeft, damagedRight, postDamageLeft, postDamageRight]
        const allPaths =[
            './assets/image/mushroom/mushroom_idle_left.png',
            './assets/image/mushroom/mushroom_idle_right.png',
            './assets/image/mushroom/mushroom_damage_left.png',
            './assets/image/mushroom/mushroom_damage_right.png',
            './assets/image/mushroom/mushroom_post_damage_left.png',
            './assets/image/mushroom/mushroom_post_damage_right.png'
        ];    

        for(let i = 0; i < allPaths.length; i++) allAnimations[i].src = allPaths[i]
        
        return {idleLeft, idleRight, damagedLeft, damagedRight, postDamageLeft, postDamageRight}
    }

    frameChoice(){

        if (this.state === CONSTANTS.STATE.IDLE){
             if (this.animationDirection === 1) this.activeFrameSet = this.animations.idleLeft;
             else if (this.animationDirection === -1) this.activeFrameSet = this.animations.idleRight;

        }else if (this.state === CONSTANTS.STATE.DAMAGED){
            if (this.animationDirection === 1) this.activeFrameSet = this.animations.damagedLeft;
            else if (this.animationDirection === -1) this.activeFrameSet = this.animations.damagedRight;

        }else if (this.state === CONSTANTS.STATE.RECOVERY){
            if (this.animationDirection === 1) this.activeFrameSet = this.animations.postDamageLeft;
            else if (this.animationDirection === -1) this.activeFrameSet = this.animations.postDamageRight;
        }
    }
    
    //logic for chosing which frame of animation to render.

    frameSetAnimation(){ 
        if (this.state === 0){
            if (this.gameFrame % 8 === 0){
                if (this.frame < 4) this.frame++;
                else this.frame = 0;
            }
            this.gameFrame ++;

        }else if (this.state === 1){ //This logic needs to be tightened, should show damaged 1, then transition if no damage is done
            this.frame = 0;
            if (this.vel.y === 0 && this.vel.x < .3){
                this.state = 0;
            }

            this.gameFrame ++
        }
        //}else if (this.state === 2){
        //    this.frame = 0
        //    if (this.gameFrame % 4 === 0){
        //        this.state = 0;
        //    }
        //}

    }
    

   
    inCollision(playerChar){


        this.pos.x2 = this.pos.x + this.width;
        this.pos.y2 = this.pos.y + this.height;
        let lightAttackAOE = playerChar.lightAttack.areaOfEffect;


        if((playerChar.state === 0 || playerChar.state === 1) && ((playerChar.pos.x2 >= this.pos.x && playerChar.pos.x2 <= this.pos.x2)
            || (playerChar.pos.x <= this.pos.x2 && playerChar.pos.x >= this.pos.x) )&& 
            ((playerChar.pos.y2 >= this.pos.y && playerChar.pos.y2 <= this.pos.y2)
            || (playerChar.pos.y <= this.pos.y2 && playerChar.pos.y >= this.pos.y))){
                return true;

        }else if((playerChar.state === 3 || playerChar.state === 4) && 
            ((lightAttackAOE.right >= this.pos.x && lightAttackAOE.right <= this.pos.x2)||
             (lightAttackAOE.left <= this.pos.x2 && lightAttackAOE.right >= this.pos.x) )&& 
            ((lightAttackAOE.down >= this.pos.y && lightAttackAOE.down <= this.pos.y2)||
            (lightAttackAOE.up <= this.pos.y2 && lightAttackAOE.up >= this.pos.y))){
        return true
    }
        return false
    }

    convertMomentum(playerChar){
        let transferedVelocityY = 0, transferedVelocityX = 0
        this.direction.horizontal = playerChar.direction.horizontal
        //If the player is walking, or in jump, decriment their velocity
        if (playerChar.state === 1 || playerChar.state === 2){
            transferedVelocityX = playerChar.vel.x * playerChar.direction.horizontal/this.mass;
            transferedVelocityY = playerChar.vel.y * playerChar.direction.vertical/this.mass;
            playerChar.vel.x -= transferedVelocityX;
            playerChar.vel.y -= transferedVelocityY;


            //else if this is an attack, then we do not decriment player velocity

        }else if(playerChar.state === 3 || playerChar.state === 4){
            let activeAttack;

            this.state = CONSTANTS.STATE.DAMAGED; 
            if (playerChar.state === 3) activeAttack = playerChar.lightAttack;
            else activeAttack = playerChar.chargeAttack;
            //incriment hp
            this.hp += activeAttack.damage;
            this.direction.horizontal = playerChar.direction.horizontal;

             
            this.vel.x += activeAttack.velocityInput.x/this.mass * this.hp;

            this.vel.y -= activeAttack.velocityInput.y/this.mass * this.hp;
            //transferedVelocityX *= playerChar.direction.horizontal/this.mass * this.hp;
      
        }
      
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
        this.frameSetAnimation();
    }


    applyDrag(){

        if(this.vel.y <= 0 && this.vel.x > 0){
            this.vel.x -= this.drag;
        }
    }
    
    faceCharacter(playerChar){
        if (playerChar.pos.x  < this.pos.x) this.animationDirection = 1;
        else this.animationDirection = -1;

    }

    moveHorizontal(){
        this.pos.x += this.vel.x * this.direction.horizontal
    }

  
 

    update(){
        this.applyDrag()
        this.moveHorizontal();
        this.moveVertical();
        //this.changeAnimationState();
    }


    launchSandbag(){

    }
    
    reset(){
        this.pos.x = CONSTANTS.DEFAULT_POS_X;
        this.pos.x = CONSTANTS.DEFAULT_POS_Y;
        this.vel.x = CONSTANTS.DEFAULT_VEL;
        this.vel.y = CONSTANTS.DEFAULT_VEL;
        this.accel.x = CONSTANTS.DEFAULT_ACCEL;
        this.accel.y = CONSTANTS.DEFAULT_ACCEL;
        this.direction = CONSTANTS.DEFAULT_DIRECTION;
        this.hp = CONSTANTS.DEFAULT_HP;
    }
}
