// TypeScript file
module GameMaths {
    export function  getRandomArray(max:number,returnnum:number): Array<number> {        
        var des:Array<number> = [];
        for(var i= 0;i < max;i++)
        {
            des.push(i);
        }
        var random;
        var temp: Array<number> = [];
        for(var j = 0;j < returnnum; j++)
        {
            random = Math.ceil(Math.random() * des.length) - 1; //向上取整
            temp.push(des[random]);
            des.splice(random,1);
        }
        return temp;
    }

    var factory : dragonBones.EgretFactory = null;
    export function addArmatureToFactory(name:string):dragonBones.EgretFactory
    {
        if(null == factory)
        {
            factory = dragonBones.EgretFactory.factory;
        }
        var skeletonData = RES.getRes( name + "_ske_json" );
        var textureData = RES.getRes( name + "_tex_json" );
        var texture = RES.getRes( name + "_tex_png" );   
        if(null == factory.getDragonBonesData(name))   
        {
            factory.parseDragonBonesData(skeletonData);  
        } 
        if(null == factory.getTextureAtlasData(name))   
        {
            factory.parseTextureAtlasData(textureData, texture);
        }     
        return factory;
    }

    export function removeArmatureToFactory(name:string):void
    {
        if(null == factory)
        {
            return;
        }
        var skeletonData = RES.getRes( name + "_ske_json" );
        var textureData = RES.getRes( name + "_tex_json" );
        var texture = RES.getRes( name + "_tex_png" ); 
        if(null == factory.getDragonBonesData(name))   
        {         
            factory.removeDragonBonesData(skeletonData);  
        }
        if(null == factory.getTextureAtlasData(name))   
        {
            factory.removeTextureAtlasData(textureData, texture);
        }
    }

    export function hasHit(x:number,y:number,width:number,height:number,hitX:number,hitY:number):boolean
    {        
        if(x<hitX && hitX<x+width && y<hitY && hitY<y+height)
        {
            return true;
        }
        return false;
    }
}