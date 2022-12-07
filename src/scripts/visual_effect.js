const CONSTANTS = {
    FRAME_SIZE: {WIDTH: 255,
                HEIGHT: 213
                }
    }


export default class VisualEFX{

    constructor(){
        this.frameSet = importSpriteSheets()
        this.activeFrameSet;
        this.width= CONSTANTS.FRAME_SIZE.WIDTH;
        this.height = CONSTANTS.FRAME_SIZE.HEIGHT;
        this.pos= {
            x: 0,
            y:0,
        },
        this.frameSet = this.importSpriteSheets()
    }

    importSpriteSheets(){

        let damageEffect, dragonSpearLeft, dragonSpearRight

        const allAnimations = [damageEffect, dragonSpearLeft, dragonSpearRight]
        const allPaths =[
            './assets/image/',
            './assets/image/special_effects/dragon_spear_left.png',
            './assets/image/special_effects/dragon_spear_right.png',
        ];

        
        for(let i = 0; i < allPaths.length; i++){
            allAnimations[i].src = allPaths[i]
        }
        return {damageEffect, dragonSpearLeft, dragonSpearRight}

    }

    //EDIT THIS
    frameChoice(){
        if (sandbag.direction.horizontal === -1) this.activeFrameSet = this.frameSet.mushroomLeft;
        else this.activeFrameSet = this.frameSet.mushroomRight;
    }
    

    draw(ctx, ){

        this.frameChoice();
        ctx.drawImage(this.activeFrameSet, 0, 0, this.width, this.height, 
                    this.pos.x, this.pos.y, this.width, this.height);

    }


    update(){

    }



    animate(ctx){
        this.update()
        this.draw(ctx);
    }


}