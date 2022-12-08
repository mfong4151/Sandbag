const CONSTANTS = {
    FRAME_SIZE:{DRAGON_SPEAR :{WIDTH: 255,
                                HEIGHT: 213
                                },

                SHOCKWAVE: {
                            WIDTH:172,
                            HEIGHT:136
                            }
            }
            }


export default class VisualEFX{

    constructor(){
        this.frameSet = importSpriteSheets();
        this.activeFrameSet;
        this.frameSize = CONSTANTS.FRAME_SIZE;
        this.frame = 0;
        this.gameFrame = 0;
        this.width;
        this.height;
    }

    importSpriteSheets(){

        let damageEffect, dragonSpearLeft, dragonSpearRight

        const allAnimations = [damageEffect, dragonSpearLeft, dragonSpearRight]
        const allPaths =[
            './assets/image/special_effects/dragoon_slam_0_1.png',
            './assets/image/special_effects/dragon_spear_left.png',
            './assets/image/special_effects/dragon_spear_right.png',
        ];

        
        for(let i = 0; i < allPaths.length; i++){
            allAnimations[i].src = allPaths[i]
        }
        return {damageEffect, dragonSpearLeft, dragonSpearRight}

    }

    //edit this for dragon spear
    frameChoice(){
        if (sandbag.direction.horizontal === -1) this.activeFrameSet = this.frameSet.mushroomLeft;
        else this.activeFrameSet = this.frameSet.mushroomRight;
    }
    
    checkSandbagDamaged(sandbag){
        if(sandbag.state === 1) return true
        else return false
    }

    frameSetAnimation(){
        if (this.state === CONSTANTS.STATE.ATTACK || this.state === CONSTANTS.STATE.CHARGE_ATTACK){
            if (this.gameFrame % 10 === 0){
              if (this.frame < 4) this.frame++;
              else this.frame = 0;
            }
              this.gameFrame ++ 
        }

    }
    drawDamageEffect(ctx){
        //come back to this later
        ctx.drawImage(
            this.frameSet.damageEffect,
             this.frame * this.frameSize.damageEffect.width,
             0,
             this.frameSize.damageEffect.width,
             this.frameSize.damageEffect.height,
            this.pos.x,
            this.pos.y,
            this.frameSize.damageEffect.width,
            this.frameSize.damageEffect.height,
            )
        this.frameSetAnimation();
    }


    update(){

    }



    animate(ctx, sandbag){
        if (this.checkSandbagDamaged()) this.drawDamageEffect(ctx)

    }


}