import PhysicsObject from "./phy_object";


const CONSTANTS = {
    HEIGHT: 150,
    WIDTH: 130,
    MASS: 10,
    DEFAULT_DIRECTION:{
        HORIZONTAL: -1,
        VERTICAL: -1
    },  //refers to the direction we're facing, 1 = right, -1 = left
    DEFAULT_ACCEL: 0,
    DEFAULT_VEL: 0,
    DEFAULT_HP: 0,
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

        //10 here is a manual offset, im not sure why we need it, but it fixes the picture
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

        //this.hp = CONSTANTS.DEFAULT_HP;
        this.hp = 20
        this.animations = this.importSpriteSheets(); 
        this.activeFrameSet;
        this.frame = 0;
        this.gameFrame = 0;
        
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
             if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.idleLeft;
             else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.idleRight;

        }else if (this.state === CONSTANTS.STATE.DAMAGED){
            if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.damagedLeft;
            else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.damagedRight;

        }else if (this.state === CONSTANTS.STATE.RECOVERY){
            if (this.direction.horizontal === -1) this.activeFrameSet = this.animations.postDamageLeft;
            else if (this.direction.horizontal === 1) this.activeFrameSet = this.animations.postDamageRight;
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
            if (this.gameFrame % 127 === 0){
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

        //this can be optimized by looking at the player char state
        this.pos.x2 = this.pos.x + this.width;
        this.pos.y2 = this.pos.y + this.height;
        //if the x2 coordinate of the player is in between the xs
        if(((playerChar.pos.x2 >= this.pos.x && playerChar.pos.x2 <= this.pos.x2)
            || (playerChar.pos.x <= this.pos.x2 && playerChar.pos.x >= this.pos.x) )&& 
            ((playerChar.pos.y2 >= this.pos.y && playerChar.pos.y2 <= this.pos.y2)
            || (playerChar.pos.y <= this.pos.y2 && playerChar.pos.y >= this.pos.y)))
            {
            return true
        }
        return false
    }

    convertMomentum(playerChar){
        let transferedVelocityY = 0, transferedVelocityX = 0
        this.direction.horizontal = playerChar.direction.horizontal
        //If the player is walking, or in jump, decriment their velocity
        if (playerChar.state === 1 || playerChar.state === 2){
            transferedVelocityX = playerChar.vel.x * playerChar.direction.horizontal/this.mass 
            transferedVelocityY = playerChar.vel.y * playerChar.direction.vertical/this.mass
            playerChar.vel.x -= transferedVelocityX;
            playerChar.vel.y -= transferedVelocityY;


            //else if this is an attack, then we do not decriment player velocity

        }else if(playerChar.state === 3 || playerChar.state === 4){
            let activeAttack;

            this.state = CONSTANTS.STATE.DAMAGED; 
            //light attack
            if (playerChar.state === 3) activeAttack = playerChar.lightAttack;
            else activeAttack = playerChar.chargeAttack;

            this.hp += activeAttack.damage;
            transferedVelocityX = activeAttack.velocityInput;
            transferedVelocityY = transferedVelocityX * playerChar.direction.vertical/this.mass;
            transferedVelocityX *= playerChar.direction.horizontal/this.mass;
            if (playerChar.vel.y === 0) transferedVelocityY = 0; 
            if (playerChar.vel.x === 0) transferedVelocityX = 0;
        
        }
        this.vel.x += transferedVelocityX;
        this.vel.y += transferedVelocityY;
        
    }


    increaseVelX(){
        if (this.vel.x < 12) this.vel.x = 12
        else if (this.vel.x >= 14 && this.vel.x < 25) this.vel.x += .5
        if(this.pos.x + this.vel.x <= this.boundaries.leftBound){
            this.vel.x -= this.drag;
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
    
    update(){
        this.moveHorizontal();
        this.moveVertical();
        //this.changeAnimationState();
    }

   

    absorbDamage(){

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
