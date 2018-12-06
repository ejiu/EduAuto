// TypeScript file

class DicePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "DiceSkin";
        this.diceSound = RES.getRes("dice_mp3");
        if(null == this.diceSound)
        {
            RES.getResAsync("dice_mp3", this.onResSoundDiceLoaded, this );
        } 
        this.jsonData = RES.getRes("page_info_json"); 

        var factory: dragonBones.EgretFactory = GameMaths.addArmatureToFactory("diceloop_turn");
        this.armatureDisplay = factory.buildArmatureDisplay("turn", "diceloop_turn");
        this.armatureDisplay.scaleX = 1.16;
        this.armatureDisplay.scaleY = 1.16;
        this.armatureDisplay.x = 600;
        this.armatureDisplay.y = 390;
        this.addChild(this.armatureDisplay);   


        var count:number = this.jsonData['dice_info']['dices'].length;
        for(var i:number=0; i<count; ++i)
        {
            factory = GameMaths.addArmatureToFactory(this.jsonData['dice_info']['dices'][i]);
            var tArmatureDisplay:dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("turn", this.jsonData['dice_info']['dices'][i]);
            tArmatureDisplay.name = i.toString();
            this.addChild(tArmatureDisplay);
            this.armatureLDisplay.push(tArmatureDisplay);
        }

        this.timerRestart = new egret.Timer(5000,1);
        this.diceNum = 0;
    }

    private onResSoundDiceLoaded():void
    {
        this.diceSound = RES.getRes("dice_mp3"); 
    }


    public initUI(): void {
        var count:number = 6;
        var tDisPlay:dragonBones.EgretArmatureDisplay;
        for(var i:number=0; i<count; ++i)
        {
            tDisPlay = this.armatureLDisplay[i];
            tDisPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.diceClick, this);
            tDisPlay.addEventListener('complete',this.turnShowComplete,this);
            tDisPlay.x = 600;
            tDisPlay.y = 390;  
            tDisPlay.scaleX = 1.16;
            tDisPlay.scaleY = 1.16;
        }
        this.armatureDisplay.addEventListener('complete',this.turnComplete,this);
        this.diceNum = 0;
        this.showAllDice(false);
        
        this.armatureLDisplay[0].animation.gotoAndStopByFrame("turn",4);
        this.refreshDice();
        this.timerRestart.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerRestartGame,this);
        super.initUI();  
    }
    
    private armatureDisplay: dragonBones.EgretArmatureDisplay;
     private armatureLDisplay: Array<dragonBones.EgretArmatureDisplay> = [];
    private diceSound: egret.Sound;
    private jsonData: JSON;
    private diceNum:number;  
    private timerRestart:egret.Timer;
    private soundChannel:egret.SoundChannel;
    private randomArray : Array<number> = [];

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "602":
            {
                this.diceNum = data['diceNum'];
                this.diceAni();
            }
            break;      
        }
    }

    private refreshDice()
    {
        this.removeAllGlow();
        this.armatureDisplay.visible = false;
        this.armatureLDisplay[this.diceNum].visible = true;
        this.armatureLDisplay[this.diceNum].touchEnabled = true;
        if(GlobalData.bAuthority)
        {
            EffectUtils.useGlow(this.armatureLDisplay[this.diceNum]);
        }
    }

    private diceClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        if(this.randomArray.length == 0){
            this.randomArray = GameMaths.getRandomArray(6,6);
        }
        this.diceNum = this.randomArray.pop();
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"602",type:"2",diceNum:this.diceNum});
        PageMgr.sendMsg(msg);
    } 

    //滚动
    private diceAni():void
    {
        this.showAllDice(false);
        this.armatureDisplay.visible = true;
        this.armatureDisplay.animation.reset();
        this.armatureDisplay.animation.play("turn",3);
        if(null != this.soundChannel)
        {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        if(null != this.diceSound)
        {
            this.soundChannel = this.diceSound.play(0,1);
        }
    }

    private turnComplete():void
    {
        this.armatureDisplay.visible = false;
        this.armatureLDisplay[this.diceNum].visible = true;
        this.armatureLDisplay[this.diceNum].filters = [];
        this.armatureLDisplay[this.diceNum].animation.reset();
        this.armatureLDisplay[this.diceNum].animation.play("turn",1);
    }

    private turnShowComplete():void
    {
        this.timerRestart.reset();
        this.timerRestart.start();
    }

    private timerRestartGame():void
    {
        this.refreshDice();
    }

    private showAllDice(tVisible:boolean):void
    {
        var count:number = 6;
        var tDisPlay:dragonBones.EgretArmatureDisplay;
        for(var i:number=0; i<count; ++i)
        {
            tDisPlay = this.armatureLDisplay[i];
            tDisPlay.visible = tVisible;
            tDisPlay.touchEnabled = tVisible;
        }
    }

    private removeAllGlow():void
    {
        var count:number = 6;
        for(var i:number=0; i<count; ++i)
        {
            this.armatureLDisplay[i].filters = [];
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            EffectUtils.useGlow(this.armatureLDisplay[this.diceNum]);
        }
        else
        {
            this.removeAllGlow();
        }
    }

    public destroy(): void {
        if(null != this.soundChannel)
        {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        this.timerRestart.reset();
        this.timerRestart.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerRestartGame,this);
        this.armatureDisplay.animation.stop();
        this.armatureLDisplay[this.diceNum].animation.stop();
        var count:number = 6;
        var tDisPlay:dragonBones.EgretArmatureDisplay;
        for(var i:number=0; i<count; ++i)
        {
            tDisPlay = this.armatureLDisplay[i];
            tDisPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.diceClick, this);
            tDisPlay.removeEventListener('complete',this.turnShowComplete,this);
        }
        this.armatureDisplay.removeEventListener('complete',this.turnComplete,this);
        super.destroy();
    }
}