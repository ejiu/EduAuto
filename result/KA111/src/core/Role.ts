// TypeScript file

class Role {
    private _num: number = 0;
    private resName:string;
    private _parent:any;
    public posX: number = 0;
    public posY: number = 0;
    public scaleX: number = 1;
    public scaleY: number = 1;
    public times: number = 0;
    public armatureDisplay: dragonBones.EgretArmatureDisplay = null;
    public callback:Function = null;
    public aniName:string = "idle";
    public secAniName:string = "idle";
    public timeScale: number = 1;
    public constructor(_name:string,tParent: any) {
        this._num = 0;
        this.resName = _name;  
        this._parent = tParent;     
    }

    public loadRes():void
    {
        RES.getResAsync( this.resName + "_ske_json", this.onResLoaded, this );
        RES.getResAsync( this.resName + "_tex_json" , this.onResLoaded, this );
        RES.getResAsync( this.resName + "_tex_png" , this.onResLoaded, this );
    }

     private onResLoaded():void
    {
        this._num++;
        if(3 == this._num)
        {
            this.initRole();
        }
    }

    private initRole():void
    {
        var factory: dragonBones.EgretFactory = GameMaths.addArmatureToFactory(this.resName);
        this.armatureDisplay = factory.buildArmatureDisplay(this.resName);
        this._parent.addChild(this.armatureDisplay);
        this.armatureDisplay.x = this.posX;
        this.armatureDisplay.y = this.posY;  
        this.armatureDisplay.scaleX = this.scaleX;   
        this.armatureDisplay.scaleY = this.scaleY;  
        this.armatureDisplay.animation.play(this.aniName,this.times);
        this.armatureDisplay.animation.timeScale = this.timeScale;
        if(null != this.callback)
        {
            this.callback(this);
        }
        if(0 != this.times)
        {
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        }

    }

    //每次初始化课件时需要重播非"idle"动画
    public replay():void
    {
        if(null != this.armatureDisplay)
        {
            this.armatureDisplay.animation.play(this.aniName,this.times);            
            if(0 != this.times)
            {
                this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
            }
        }
    }

    private animationEventHandler(event: dragonBones.EgretEvent): void 
    {
        //let eventObject = event.eventObject;
        //console.log(eventObject.animationState.name, event.type, eventObject.name ? eventObject.name : "");
        this.armatureDisplay.animation.play(this.secAniName,0);
        this.armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
    }
}