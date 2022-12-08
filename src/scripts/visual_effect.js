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
        this.frameSet = this.importSpriteSheets();
        this.activeFrameSet;
        this.frameSize = CONSTANTS.FRAME_SIZE;
        this.frame = 0;
        this.gameFrame = 0;
        this.width;
        this.height;
        this.animateEffect = false
        this.effectPos = {x: 0,
                                y:0
                                }
    }

    importSpriteSheets(){

        let damageEffect = new Image();
        let dragonSpearLeft = new Image(), dragonSpearRight = new Image();
 
        const allAnimations = [damageEffect]; // dragonSpearLeft, dragonSpearRight]
        const allPaths =[
            './assets/image/special_effects/dragoon_slam_full_frames.png',];
            //'./assets/image/special_effects/dragon_spear_left.png',
            //'./assets/image/special_effects/dragon_spear_right.png',


        
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
    
    checkSandbagDamaged(sandbag, player){
        if(sandbag.state === 1 && !this.animateEffect && player.pos.y === 506.5){
            this.animateEffect = true;
            this.effectPos.x = sandbag.pos.x;
            this.effectPos.y = sandbag.pos.y;
            setTimeout(() => {
                this.animateEffect = false;

            }, 1000)

        }
        
    }

    frameSetAnimation(){
        if (this.activeFrameSet === this.frameSet.damageEffect){
            if (this.gameFrame % 5 === 0){
              if (this.frame < 5) this.frame++;
              else this.frame = 0;
            }
              this.gameFrame ++ 
        }

    }
    drawDamageEffect(ctx){
        //come back to this later
        this.activeFrameSet = this.frameSet.damageEffect;
        ctx.drawImage(
            this.activeFrameSet,
             this.frame * this.frameSize.SHOCKWAVE.WIDTH,
             0,
             this.frameSize.SHOCKWAVE.WIDTH,
             this.frameSize.SHOCKWAVE.HEIGHT,
             this.effectPos.x- 22,
             this.effectPos.y + 20,
            this.frameSize.SHOCKWAVE.WIDTH,
            this.frameSize.SHOCKWAVE.HEIGHT,
            )
        this.frameSetAnimation();
    }


    update(){

    }



    animate(ctx, sandbag, player){
        this.checkSandbagDamaged(sandbag, player)
        if (this.animateEffect) this.drawDamageEffect(ctx)

    }


}