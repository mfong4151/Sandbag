export default class Counter{

    constructor(dimensions){
        this.dimensions = dimensions;
        this.distanceTraveled = 0;
        this.maxHeight = 0
        this.sandbagPrevPos = {x:0, y:0}
    }
    
    updateDistanceTraveled(sandbag){
            if (sandbag.pos.x != this.sandbagPrevPos.x || sandbag.pos.y != this.sandbagPrevPos.y){
                this.distanceTraveled += Math.sqrt((sandbag.vel.x) ** 2 + (sandbag.vel.y) **2);
                }
        
    }

    updateMaxHeightYeeted(sandbagPosY){
        this.maxHeight = Math.max(this.maxHeight, this.dimensions.floorPlane - sandbagPosY)
    }
    
    updatePreviousPos(sandbag){
        if(sandbag.pos.x != this.sandbagPrevPos.x || sandbag.pos.y != this.sandbagPrevPos.y){
            this.sandbagPrevPos.x = sandbag.pos.x;
            this.sandbagPrevPos.y = sandbag.pos.y;
        }
    }
    draw(ctx){
        ctx.font = "30px Calibri"
        ctx.fillText(`Total distance: ${Math.floor(this.distanceTraveled)} Meters`, 30, 50)
        ctx.fillText(`Max Height: ${Math.floor(this.maxHeight)} Meters`, 30, 85)
    }

    update(sandbag){
        this.updatePreviousPos(sandbag)
    }
    animate(ctx){
        this.draw(ctx)
    }
}