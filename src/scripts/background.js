import PhotoImport from "./png_asset_management";

const DUMMYBG ={
    DUMMY_COLOR: "#F5F5DC",
};


export default class Background{
    constructor(dimensions){
        this.dimensions = dimensions;
        this.dynamicWidth = this.dimensions.width
        this.background;
    }

    draw(ctx){
        //this should take care of colo
        ctx.fillStyle = DUMMYBG.DUMMY_COLOR;
        ctx.fillRect(0, 0, this.dynamicWidth, this.dimensions.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, this.dimensions.height * (3/5), this.dynamicWidth, 4);
        ctx.fillStyle = 'black'
        ctx.fillRect(0, this.dimensions.height * (85/100), this.dynamicWidth, 4);


        //For bounce points

        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 640, this.dynamicWidth, 4);
    }
    
    animate(ctx){
        this.draw(ctx);

    }

    
}

