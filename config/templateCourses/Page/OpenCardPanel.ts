// TypeScript file

class OpenCardPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "OpenCardSkin";
        this.distributeSound = RES.getRes("distribute_card_mp3");
        if(null == this.distributeSound)
        {
            RES.getResAsync("distribute_card_mp3", this.onResSoundDisLoaded, this );
        }

        this.seccussSound = RES.getRes("success_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("success_mp3", this.onResSoundSecLoaded, this );
        }

        this.jsonData = RES.getRes("page_info_json");
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("success_mp3"); 
    }

    private onResSoundDisLoaded():void
    {
        this.distributeSound = RES.getRes("distribute_card_mp3"); 
    }

    public initUI(): void {
        this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.distributeAni.addEventListener('itemComplete', this.onDistributeItemComplete, this);
        this.Img0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.revAni.addEventListener('complete', this.onRevComplete, this);   
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.CloseClick, this);   
        
        // var blurFliter = new egret.BlurFilter( 5 , 5); 
        // this.roombg.filters = [blurFliter];
        this.canReset = false;        
        this.curClickCard = 0;
        this.initGroup.visible = true;   
        var curGroup:eui.Group;
        for(var i:number=0; i<6; ++i)
        {
            curGroup = this.getGroup(i);
            curGroup.visible = false;
        }

        this.grouprev.visible = false;
        this.groupshow.visible = false;
        if(!GlobalData.isTeacher())
        {
            this.close.visible = false;
            this.start.visible = false;
        }
        else
        {
            this.start.visible = true;
        }
        this.reset.visible = false;
        super.initUI();  
    }

    // public roombg:eui.Image;
    public reset:eui.Image;
    public start:eui.Image;
    public Img0:eui.Image;
    public Img1:eui.Image;
    public Img2:eui.Image;
    public Img3:eui.Image;
    public Img4:eui.Image;
    public Img5:eui.Image;
    public close:eui.Image;
    public showImg:eui.Image;    
    public group0: eui.Group;
    public group1: eui.Group;
    public group2: eui.Group;
    public group3: eui.Group;
    public group4: eui.Group;
    public group5: eui.Group;

    
    public distributeAni: egret.tween.TweenGroup;
    public revAni: egret.tween.TweenGroup;
    public endAni: egret.tween.TweenGroup;
    public grouprev: eui.Group;
    public groupshow: eui.Group;
    public labrev:eui.Label;
    public initGroup:eui.Group;
    
    private distributeSound: egret.Sound;
    private seccussSound: egret.Sound;
    private jsonData: JSON;
    private cardL:Array<number> = [];
    private canReset:boolean;
    private curClickCard:number;

    private randomCard()
    {
        var count:number = this.jsonData['open_card_info']['cards'].length;
        this.cardL = GameMaths.getRandomArray(count,count);
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"902",type:"3",cards:this.cardL});
        PageMgr.sendMsg(msg); 
    }

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "902":
            {
                this.cardL = data['cards'];
            }
            break;    
            case "901":
            {
                this.curClickCard = data['cardId'];
                this.openCard();
            } 
            break;
            case "903":
            {
                this.curClickCard = data['cardId'];
                this.closeCard();
            }
            break;  
            case "99":
            {
                this.curClickCard = data['cardId'];
                this.refreshCard();
            }
            break;    
        }
    }

    private refreshCard()
    {
        this.canReset = false;        
        this.curClickCard = 0;
        this.resetCard();
        this.initGroup.visible = false;
        this.distributeAni.play(0);
        if(null != this.distributeSound)
        {
            this.distributeSound.play(0,1);
        }
    }

    private resetCard():void
    {
        var curImg : eui.Image;
        var curGroup:eui.Group;
        for(var i:number=0; i<6; ++i)
        {
            curImg = this.getImg(i);
            curGroup = this.getGroup(i);
            curImg.touchEnabled = false;
            curImg.filters = [];
            curGroup.visible = true;
        }
    }

    private onDistributeItemComplete(event: egret.Event):void
    {      
        const item = event.data as egret.tween.TweenItem;  
        if(item.target.name == "group0")
        {
            if(GlobalData.isTeacher())
            {
                this.randomCard();
            }
            if(GlobalData.bAuthority)
            {
                EffectUtils.useGlow(this.getImg(this.curClickCard));
            }
            else
            {
                this.getImg(this.curClickCard).filters = [];
            }
            this.Img0.touchEnabled = true;
            return;
        }
        if(null != this.distributeSound)
        {
            this.distributeSound.play(0,1);
        }
    }

    private resetClick(evt:egret.TouchEvent):void
    {
        if(this.canReset)
        {
            var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
            PageMgr.sendMsg(msg); 
        }
    }

    private startClick(evt:egret.TouchEvent):void
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"99",type:"1"});
        PageMgr.sendMsg(msg); 
        this.start.visible = false;
        this.reset.visible = true; 
    }    

    private OpenClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"901",type:"3",cardId:this.curClickCard});
        PageMgr.sendMsg(msg);
    } 

    //翻卡
    private openCard():void
    {
        this.canReset = false; 
        this.getGroup(this.curClickCard).visible = false;        
        this.grouprev.visible = true;
        this.revAni.play(0);
        if(null != this.seccussSound)
        {
            this.seccussSound.play(0,1);
        }
        this.showImg.source = this.jsonData['open_card_info']['cards'][this.cardL[this.curClickCard]].res_path;    
        this.labrev.text = (this.curClickCard+1).toString();   
    }

    private onRevComplete(event: egret.Event):void
    {      
        egret.Tween.get(this.grouprev).to({scaleY:0}, 300, egret.Ease.sineOut).call(this.revCard,this);
        this.groupshow.visible = true;
        this.groupshow.x = 490;
        this.groupshow.y = 382;
        this.groupshow.scaleY = 0;
        this.groupshow.scaleX = 2.06;
        this.groupshow.rotation = 90;
    }

    private revCard():void
    {
        egret.Tween.get(this.groupshow).to({scaleY:2.06}, 300, egret.Ease.sineOut);
    }

    //关闭
    private CloseClick(event: egret.Event):void
    {         
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"903",type:"2",cardId:this.curClickCard});
        PageMgr.sendMsg(msg); 
    }

    private closeCard():void
    {
        this.revAni.stop();        
        this.grouprev.visible = false;
        this.endAni.play(0);
        this.curClickCard += 1;
        SoundManager.sound().PlayClick();
        if(this.curClickCard < 6)
        {
            
            if(GlobalData.bAuthority)
            {
                EffectUtils.useGlow(this.getImg(this.curClickCard));
            }
            else
            {
                this.getImg(this.curClickCard).filters = [];
            }
            this.getImg(this.curClickCard).touchEnabled = true;
        }
        this.canReset = true;
    }

    private getImg(tCardId: number):eui.Image
    {        
        switch(tCardId)
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
                return this.Img0;
        }
    }

    private getGroup(tCardId: number):eui.Group
    {        
        switch(tCardId)
        {
            case 0:
                return this.group0;
            case 1:
                return this.group1;
            case 2:
                return this.group2;
            case 3:
                return this.group3;
            case 4:
                return this.group4;
            case 5:
                return this.group5;
            default:
                return this.group0;
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            EffectUtils.useGlow(this.getImg(this.curClickCard));
        }
        else
        {
            this.getImg(this.curClickCard).filters = [];
        }
    }

    public destroy(): void {
        this.distributeAni.play(0);
        this.distributeAni.stop();
        this.revAni.play(0);
        this.revAni.stop();
        this.endAni.stop();
        this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.reset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.Img0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.Img5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        this.distributeAni.removeEventListener('itemComplete', this.onDistributeItemComplete, this);
        this.revAni.removeEventListener('complete', this.onRevComplete, this);   
        this.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.CloseClick, this);    
        super.destroy();
    }
}