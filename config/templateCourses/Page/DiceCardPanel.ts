// TypeScript file

class DiceCardPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "DiceCardSkin";
        this.diceSound = RES.getRes("dice_mp3");
        if(null == this.diceSound)
        {
            RES.getResAsync("dice_mp3", this.onResSoundDiceLoaded, this );
        } 
        this.jsonData = RES.getRes("page_info_json");

        this.interactiveCount = this.jsonData['dice_card_info']['cards'].length;
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['dice_card_info']['cards'][i];

            tBgImg = this.getInteractBgImg(i);
            // EffectUtils.useColorAdd(tBgImg);
        }  

        var factory: dragonBones.EgretFactory = GameMaths.addArmatureToFactory("diceloop_turn");
        this.armatureDisplay = factory.buildArmatureDisplay("turn", "diceloop_turn");
        this.armatureDisplay.scaleX = 1;
        this.armatureDisplay.scaleY = 1;
        this.armatureDisplay.x = 320;
        this.armatureDisplay.y = 350;
        this.addChild(this.armatureDisplay);   


        var count:number = this.jsonData['dice_card_info']['dices'].length;
        for(var i:number=0; i<count; ++i)
        {
            factory = GameMaths.addArmatureToFactory(this.jsonData['dice_card_info']['dices'][i]);
            var tArmatureDisplay:dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("turn", this.jsonData['dice_card_info']['dices'][i]);
            tArmatureDisplay.name = i.toString();
            this.addChild(tArmatureDisplay);
            this.armatureLDisplay.push(tArmatureDisplay);
        }

        // var blurFliter = new egret.BlurFilter( 5 , 5); 
        // this.roombg.filters = [blurFliter];

        this.timerRestart = new egret.Timer(5000,1);
        this.diceNum = 0;

        var effect:eui.Component;
        var star:Role;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            effect = this.getEffectComponent(i);            
            star = new Role("star_play",effect);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.4;   
            star.scaleY = 0.4;  
            star.aniName = "play"; 
            star.loadRes();
        }
        this.isDealDice = true;
        this.interactiveCardIndex = 0;
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
            tDisPlay.x = 320;
            tDisPlay.y = 350;  
            tDisPlay.scaleX = 1;
            tDisPlay.scaleY = 1;
        }
        this.armatureDisplay.addEventListener('complete',this.turnComplete,this);
        this.diceNum = 0;
        this.showAllDice(false);
        
        this.armatureLDisplay[0].animation.gotoAndStopByFrame("turn",4);
        this.refreshDice();
        this.timerRestart.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerRestartGame,this);

        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractBgImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardClick, this);

            // tImg = this.getSelectImg(i);  
            // tImg.visible = false;
        }
        this.setAllSelectImgInvisible();
        this.interactiveCardIndex = 0;
        super.initUI();  
    }

    public roombg:eui.Image;
    public Img0: eui.Image;
    public Img1: eui.Image;
    public Img2: eui.Image;
    public Img3: eui.Image;
    public Img4: eui.Image;
    public Img5: eui.Image;
    public bgImg0: eui.Image;
    public bgImg1: eui.Image;
    public bgImg2: eui.Image;
    public bgImg3: eui.Image;
    public bgImg4: eui.Image;
    public bgImg5: eui.Image;
    public selectImg0: eui.Image;
    public selectImg1: eui.Image;
    public selectImg2: eui.Image;
    public selectImg3: eui.Image;
    public selectImg4: eui.Image;
    public selectImg5: eui.Image;    

    public effect0:eui.Component;
    public effect1:eui.Component;
    public effect2:eui.Component;
    public effect3:eui.Component;
    public effect4:eui.Component;
    public effect5:eui.Component;
    private isDealDice:boolean;
    
    private armatureDisplay: dragonBones.EgretArmatureDisplay;
    private armatureLDisplay: Array<dragonBones.EgretArmatureDisplay> = [];
    private diceSound: egret.Sound;
    private jsonData: JSON;
    private diceNum:number;  
    private timerRestart:egret.Timer;
    private soundChannel:egret.SoundChannel;
    private interactiveCount:number;
    private interactiveCardIndex:number;
    private isFirstClick:boolean;
    private randomArray : Array<number> = [];

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1301":
            {
                this.diceNum = data['diceNum'];
                this.diceAni();
            }
            break;    
            case "1302":
            {
                this.dealCard(data['cardId']);
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

        // var tBgImg:eui.Image;
        // for(var i:number = 0; i<this.interactiveCount; ++i)
        // {      
        //     tBgImg = this.getInteractBgImg(i);
        //     // EffectUtils.useColorAdd(tBgImg);
        // }  
        this.setAllSelectImgInvisible();
        this.setAllImageTouch(false);
        this.setAllEffect(false);
        this.isDealDice = true;
        this.isFirstClick = false;
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
                cmd:"1301",type:"1",diceNum:this.diceNum});
        PageMgr.sendMsg(msg);
    } 

    private cardClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1302",type:"2",cardId:parseInt(evt.target.name)});
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
        this.setAllEffect(true);
        this.setAllImageTouch(true);
        this.isDealDice = false;
    }

    private timerRestartGame():void
    {
        this.refreshDice();
    }

    //处理卡片
    private dealCard(tTargetIndex:number):void
    {
        if(!this.isFirstClick)
        {
            this.timerRestart.reset();
            this.timerRestart.start();
            this.isFirstClick = true;
        }
        // var tImg:eui.Image = this.getInteractBgImg(this.interactiveCardIndex); 
        // EffectUtils.useColorAdd(tImg);
        SoundManager.sound().PlayClick();
        this.setAllEffect(false);
        this.setAllSelectImgInvisible();
        // var tImg:eui.Image = this.getInteractBgImg(tTargetIndex);         
        // tImg.filters = [];
        var tImg:eui.Image = this.getSelectImg(tTargetIndex);   
        tImg.visible = true;
        this.interactiveCardIndex = tTargetIndex;
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

    private getInteractImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.Img0;
            case 1:
                return this.Img1;
            case 2:
                return this.Img2;
            case 3:
                return this.Img3;
            case 4:
                return this.Img4;
            case 5:
                return this.Img5;
            default:
                return  this.Img0;
        }
    }   

    private getInteractBgImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.bgImg0;
            case 1:
                return this.bgImg1;
            case 2:
                return this.bgImg2;
            case 3:
                return this.bgImg3;
            case 4:
                return this.bgImg4;
            case 5:
                return this.bgImg5;
            default:
                return  this.bgImg0;
        }
    }

    private getSelectImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.selectImg0;
            case 1:
                return this.selectImg1;
            case 2:
                return this.selectImg2;
            case 3:
                return this.selectImg3;
            case 4:
                return this.selectImg4;
            case 5:
                return this.selectImg5;
            default:
                return  this.selectImg0;
        }
    }

    private getEffectComponent(index: number):eui.Component
    {        
        switch(index)
        {
            case 0:
                return this.effect0;
            case 1:
                return this.effect1;
            case 2:
                return this.effect2;
            case 3:
                return this.effect3;
            case 4:
                return this.effect4;
            case 5:
                return this.effect5;
            default:
                return  this.effect0;
        }
    }

    private setAllSelectImgInvisible(): void
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getSelectImg(i);
            tImg.visible = false;
        }  
    }

    private setAllImageTouch(bTouchEnable:boolean):void
    {
        var tbgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tbgImg = this.getInteractBgImg(i);    
            tbgImg.touchEnabled = bTouchEnable;
        }
    }

    private setAllEffect(bIsvisible:boolean):void
    {
        var effect:eui.Component;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            effect = this.getEffectComponent(i);    
            effect.visible = bIsvisible;
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {            
            if(this.isDealDice)
            {
                EffectUtils.useGlow(this.armatureLDisplay[this.diceNum]);
            }
            
            if(this.getInteractBgImg(0).touchEnabled)
            {
                this.setAllEffect(true);
            }
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