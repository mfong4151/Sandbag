export default class Counter{

    constructor(dimensions){
        this.dimensions = dimensions;
        this.distanceTraveled = -20;
        this.maxHeight = 0 ;
        this.sandbagPrevPos = {x:0, y:0}
        this.sessionHighScore ={
                                maxHeight: 0,
                                maxDistanceTraveled: 0
                                
                                }
        this.recordUpdated = false;
        
    }
    
    reset(){
        this.maxHeight = 0;
        this.distanceTraveled = 0
        this.recordUpdated = false
    }

    updateDistanceTraveled(sandbag, time){
            if(time === 60) this.distanceTraveled = 0
            if ((time <= 60 && time !== 0) && sandbag.pos.x !== this.sandbagPrevPos.x || sandbag.pos.y != this.sandbagPrevPos.y
                
                ){
                this.distanceTraveled += Math.sqrt((sandbag.vel.x) ** 2 + (sandbag.vel.y) **2);
                }
        
    }


    updateMaxHeightYeeted(sandbagPosY, time){
        if(time === 60) this.maxHeight = 0
        if(time !== 60 && time !== 0) this.maxHeight = Math.max(this.maxHeight, this.dimensions.floorPlane - sandbagPosY)
    }
    
    updatePreviousPos(sandbag){
        if(sandbag.pos.x != this.sandbagPrevPos.x || sandbag.pos.y != this.sandbagPrevPos.y){
            this.sandbagPrevPos.x = sandbag.pos.x;
            this.sandbagPrevPos.y = sandbag.pos.y;
        }
    }
    
    updateEndgame(){
        if (!this.recordUpdated){

            this.sessionHighScore.maxHeight = Math.max(this.sessionHighScore.maxHeight, this.maxHeight);
            this.sessionHighScore.maxDistanceTraveled = Math.max(this.sessionHighScore.maxDistanceTraveled, this.distanceTraveled);
            this.recordUpdated = true;
        }
    }
    drawEndgame(ctx){ 
          
        ctx.fillText(`Times up!`, this.dimensions.width/2 - 75 , this.dimensions.height/3);

        ctx.fillText(`Your highest distance score: ${Math.floor(this.sessionHighScore.maxDistanceTraveled)} Meters`, this.dimensions.width/3 , this.dimensions.height/3 + 35)
        ctx.fillText(`Your highest height score: ${Math.floor(this.sessionHighScore.maxHeight + 139)} Meters`, this.dimensions.width/3 , this.dimensions.height/3 + 70)
    }

    animateEndgame(ctx){
        this.updateEndgame()
        this.drawEndgame(ctx)
        
    }

    draw(ctx){
        ctx.font = "30px Calibri"
        ctx.fillText(`Total distance: ${Math.floor(this.distanceTraveled)} Meters`, 30, 50)
        ctx.fillText(`Max Height: ${Math.floor(this.maxHeight) -139} Meters`, 30, 85)
    }
    
    update(sandbag){
        this.updatePreviousPos(sandbag)
    }
    animate(ctx){
        this.draw(ctx)
    }
}