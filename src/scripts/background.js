


export default class Background{
    constructor(dimensions){
        this.dimensions = dimensions;
        this.dynamicWidth = this.dimensions.width
        this.background = this.importBackground();
    }


    importBackground(){

        let background1 = new Image(), background2 = new Image();
      
        //let attackLeft = new Image(), attackRight = new Image()

        const allAnimations = [background1, background2]
        const allPaths =[
            './assets/image/background/field_1.jpg', './assets/image/background/field_1.jpg'];  

        
        for(let i = 0; i < allPaths.length; i++){
            allAnimations[i].src = allPaths[i]
        }
        return {background1, background2}
    }


    draw(ctx){

        ctx.drawImage(
            this.background.background1,
             0,
             0,
            )

    }
    update(){

    }
    //draw(ctx){
//        //this should take care of colo
//        ctx.fillStyle = DUMMYBG.DUMMY_COLOR;
//        ctx.fillRect(0, 0, this.dynamicWidth, this.dimensions.height);
//        ctx.fillStyle = 'black';
//        ctx.fillRect(0, this.dimensions.height * (3/5), this.dynamicWidth, 4);
//        ctx.fillStyle = 'black'
//        ctx.fillRect(0, this.dimensions.height * (85/100), this.dynamicWidth, 4);


//        //For bounce points

//        ctx.fillStyle = 'blue'
//        ctx.fillRect(0, 640, this.dynamicWidth, 4);
    //}
    
    animate(ctx){
        this.draw(ctx);

    }

    
}

