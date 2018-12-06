// TypeScript file

class TurnplatePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "TurnplateSkin";
        this.jsonData = RES.getRes("page_info_json");
        this.turnplate0.source = this.jsonData['turnplate_info']['items'][0];
        this.turnplate1.source = this.jsonData['turnplate_info']['items'][1];
        this.turnplate2.source = this.jsonData['turnplate_info']['items'][2];
        this.turnplate3.source = this.jsonData['turnplate_info']['items'][3];
        this.turnplate4.source = this.jsonData['turnplate_info']['items'][4];
        this.turnplate5.source = this.jsonData['turnplate_info']['items'][5];

        this.timerShow = new egret.Timer(1500,1);
        this.timerShowRestart = new egret.Timer(5000,1);
        this.turnTimer = new egret.Timer(3,0);
        this.turnplateSound = RES.getRes("turnplate_mp3");
        if(null == this.turnplateSound)
        {
            RES.getResAsync("turnplate_mp3", this.onResSoundTurnLoaded, this );
        } 

        this.seccussSound = RES.getRes("success_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("success_mp3", this.onResSoundSecLoaded, this );
        } 
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("success_mp3"); 
    }

    private onResSoundTurnLoaded():void
    {
        this.turnplateSound = RES.getRes("turnplate_mp3"); 
    }

    public start:eui.Image;
    public turnplate:eui.Group;
    public label1:eui.Label;

    public turnplate0:eui.Image;
    public turnplate1:eui.Image;
    public turnplate2:eui.Image;
    public turnplate3:eui.Image;
    public turnplate4:eui.Image;
    public turnplate5:eui.Image;
    public showImg:eui.Image;

    private lastHideImg:eui.Image;
    private turnTimer:egret.Timer;
    private timerShow:egret.Timer;
    private timerShowRestart:egret.Timer;
    
    private jsonData: JSON;
    private turnplateSound: egret.Sound;
    private seccussSound: egret.Sound;
    private turnplateChannelSound: egret.SoundChannel;
    private lastIndex:number = 0;
    private stopRot:number = 0;

    public initUI(): void {     
        // this.label1.textFlow = <Array<egret.ITextElement>>[
        //     { text: "This is a " },
        //     { text: "pig", style: { "textColor": 0x0055C1 } },
        //     { text: "." }
        // ];
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        
        this.timerShow.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.stopGame,this);
        this.timerShowRestart.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtnImage,this);
        this.turnTimer.addEventListener(egret.TimerEvent.TIMER,this.turnRun,this);
        this.showImg.visible = false;
        // EffectUtils.useGlow(this.start);
        this.start.visible = true;
        this.start.touchEnabled = true;
        this.turnplate.rotation = 0;  
        this.lastIndex = 0;
        super.initUI();        
    }

    private startClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }

        var rot = 360 + this.turnplate.rotation + Math.ceil(Math.random()*2 + 0.1)*60;      
        var index:number = this.rolToIndex(rot);
        if(index == this.lastIndex)
        {
            rot += 60;
        }
        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"401",type:"2",rot:rot});
        PageMgr.sendMsg(msg);
    }  
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "401":
            {
                this.stopRot = data['rot'];
                this.starTurn();
            }
            break;    
        }
    }

    private starTurn():void
    {        
        if(null != this.turnplateChannelSound)
        {
            this.turnplateChannelSound.stop();
            this.turnplateChannelSound = null;
        }

        if(null != this.turnplateSound)
        {
            this.turnplateChannelSound = this.turnplateSound.play(0,0);
        }
        
        if(null != this.lastHideImg)
        {
            this.lastHideImg.visible = true;
        }
        this.showImg.visible = false; 
        this.turnTimer.start();
        this.start.touchEnabled = false;
        // EffectUtils.useError(this.start);
        this.start.visible = false;
        this.timerShow.reset();
        this.timerShow.start();
    }

    private stopGame():void
    {   
        this.turnTimer.reset();
        this.timerShow.reset();
        egret.Tween.get(this.turnplate).to({rotation:this.stopRot},3000,egret.Ease.quadOut).call(this.showImage,this);
    }
    
    private showRestartBtnImage():void
    {
        // EffectUtils.useGlow(this.start);
        this.start.touchEnabled = true;
        this.start.visible = true;
    }

    private turnRun():void
    {
        this.turnplate.rotation += 4;
    }

    private showImage():void
    {
        this.turnplate.rotation %= 360;
        var showIndex:number = 0;
        if(this.turnplate.rotation<-150 || this.turnplate.rotation>150)
        {
            showIndex = 3;  
            this.lastHideImg = this.turnplate3;
            this.turnplate3.visible = false;  
        }
        else if(this.turnplate.rotation<-90)
        {
            showIndex = 2;   
            this.lastHideImg = this.turnplate2;
            this.turnplate2.visible = false;  
        }
        else if(this.turnplate.rotation<-30)
        {
            showIndex = 1;  
            this.lastHideImg = this.turnplate1;
            this.turnplate1.visible = false;  
        }
        else if(this.turnplate.rotation>90)
        {
            showIndex = 4;    
            this.lastHideImg = this.turnplate4;
            this.turnplate4.visible = false; 
        }
        else if(this.turnplate.rotation>30)
        {
            showIndex = 5;   
            this.lastHideImg = this.turnplate5;
            this.turnplate5.visible = false;  
        }
        else
        {
            showIndex = 0; 
            this.lastHideImg = this.turnplate0;
            this.turnplate0.visible = false;  
        }
        this.showImg.visible = true; 
        this.showImg.source = this.jsonData['turnplate_info']['items'][showIndex];
        this.timerShowRestart.reset();
        this.timerShowRestart.start();
        if(null != this.seccussSound)
        {
            this.seccussSound.play(0,1);
        }
        if(null != this.turnplateChannelSound)
        {
            this.turnplateChannelSound.stop();
            this.turnplateChannelSound = null;
        }
        this.lastIndex = showIndex;
    }

    private rolToIndex(rol:number):number
    {
        rol += 360;
        rol %= 360;
        var showIndex:number = 0;
        if(rol>330)
        {
            showIndex = 0;  
        }
        else if(rol>270)
        {
            showIndex = 1;    
        }
        else if(rol>210)
        {
            showIndex = 2;   
        }
        else if(rol>150)
        {
            showIndex = 3;    
        }
        else if(rol>90)
        {
            showIndex = 4;    
        }
        else  if(rol>30)
        {
            showIndex = 5; 
        }
        return showIndex;
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
    }

    public destroy(): void {
        super.destroy();
        if(null != this.turnplateChannelSound)
        {
            this.turnplateChannelSound.stop();
            this.turnplateChannelSound = null;
        }        
        if(null != this.lastHideImg)
        {
            this.lastHideImg.visible = true;
        }

        this.turnTimer.reset();
        this.timerShow.reset();
        this.timerShowRestart.reset();
        egret.Tween.removeTweens(this.turnplate);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.timerShow.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.stopGame,this);
        this.timerShowRestart.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtnImage,this);
        this.turnTimer.removeEventListener(egret.TimerEvent.TIMER,this.turnRun,this);
    }
}