import SandbagTotem from "./sandbag";
const CONSTANTS = {
            FRAME_SIZE: {WIDTH: 200,
                        HEIGHT: 214
                        }
            }

export default class OffScreenSandbag{
    constructor(){
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

        let mushroomLeft = new Image(), mushroomRight = new Image();

        const allAnimations = [mushroomLeft, mushroomRight]
        const allPaths =[
            './assets/image/offscreen_mushroom/mushroom_left.png',
            './assets/image/offscreen_mushroom/mushroom_right.png'
        ];
        
        for(let i = 0; i < allPaths.length; i++){
            allAnimations[i].src = allPaths[i]
        }
        return {mushroomLeft, mushroomRight}
    }
    //check if the sandbag is offscreen
    sandbagOffScreen(sandbag){

        if (sandbag.pos.y2 <= 0){
            this.pos.x = sandbag.pos.x;
            this.pos.y = 0;
            return true;
        }
        else return false;
    }

    frameChoice(sandbag){
        if (sandbag.direction.horizontal === -1) this.activeFrameSet = this.frameSet.mushroomLeft;
        else this.activeFrameSet = this.frameSet.mushroomRight;
    }
    
    //logic for chosing which frame of animation to render.

    draw(ctx, sandbag){

        this.frameChoice(sandbag);
        ctx.drawImage(this.activeFrameSet, 0, 0, this.width, this.height, 
                    this.pos.x, this.pos.y, this.width, this.height);

    }


    update(sandbag){

    }

    animate(ctx, sandbag){
        
        if (this.sandbagOffScreen(sandbag)){
            this.draw(ctx, sandbag);
        }
    }
}