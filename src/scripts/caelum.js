import Player from "./player"

export default class Caelum extends Player{
    constructor(dimensions){
        super(dimensions)
        this.animations = this.importSpriteSheets(); 
        
    }

    importSpriteSheets(){

        let idleLeft = new Image(), idleRight = new Image();
        let walkLeft = new Image(), walkRight = new Image();
        let jumpLeft = new Image(), jumpRight = new Image();
        let attackLeft = new Image(), attackRight = new Image();

        const allAnimations = [idleLeft, idleRight, walkLeft, walkRight, jumpLeft, jumpRight, attackLeft, attackRight]
        const allPaths =[
            './assets/image/character/caelum/idle_left.png',
            './assets/image/character/caelum/idle_right.png',
            './assets/image/character/caelum/walk_left.png',
            './assets/image/character/caelum/walk_right.png',
            './assets/image/character/caelum/jump_left.png',
            './assets/image/character/caelum/jump_right.png',
            './assets/image/character/caelum/attack_left.png',
            './assets/image/character/caelum/attack_right.png'

        ];

        
        for(let i = 0; i < allPaths.length; i++){
            allAnimations[i].src = allPaths[i]
        }
        return {idleLeft, idleRight, walkLeft, walkRight, jumpLeft, jumpRight, attackLeft, attackRight}
    }


}
