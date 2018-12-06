class RecallOpenCardPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "RecallOpenCardSkin";
        this.reverseSound = RES.getRes("reverse_card_mp3");
        if(null == this.reverseSound)
        {
            RES.getResAsync("reverse_card_mp3", this.onResSoundDisLoaded, this );
        }

        this.seccussSound = RES.getRes("success_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("success_mp3", this.onResSoundSecLoaded, this );
        }

        this.jsonData = RES.getRes("page_info_json");

        this.interactiveCount = this.jsonData['recall_open_card_info']['cards'].length;
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        var tAniImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['recall_open_card_info']['cards'][i];

            tBgImg = this.getInteractBgImg(i);
            tBgImg.source = this.jsonData['recall_open_card_info']['bgCards'][i];
            tBgImg.x = tImg.x;
            tBgImg.y = tImg.y;
            tBgImg.width = tImg.width;
            tBgImg.height = tImg.height;
            tBgImg.anchorOffsetX = tImg.anchorOffsetX;
            tBgImg.anchorOffsetY = tImg.anchorOffsetY;

            tAniImg = this.getInteractAniImg(i);
            tAniImg.source = this.jsonData['recall_open_card_info']['cards'][i];
            tAniImg.x = tImg.x;
            tAniImg.y = tImg.y;
            tAniImg.width = tImg.width;
            tAniImg.height = tImg.height;
            tAniImg.anchorOffsetX = tImg.anchorOffsetX;
            tAniImg.anchorOffsetY = tImg.anchorOffsetY;            
        }  
        
        var effect:eui.Component;
        var star:Role;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            effect = this.getEffectComponent(i);            
            star = new Role("star_play",effect);
            star.posX = 0;
            star.posY = -50;  
            star.scaleX = 1.0;   
            star.scaleY = 1.0;  
            star.aniName = "play"; 
            star.loadRes(); 

            star = new Role("star_play",effect);
            star.posX = 0;
            star.posY = 50;  
            star.scaleX = 1.0;   
            star.scaleY = 1.0;  
            star.aniName = "play"; 
            star.loadRes();
        }       
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("success_mp3"); 
    }

    private onResSoundDisLoaded():void
    {
        this.reverseSound = RES.getRes("reverse_card_mp3"); 
    }

    public initUI(): void {
        this.tbReset.visible = false;
        if(!GlobalData.isTeacher())
        {
            this.tbStart.visible = false;
        }
        else
        {
            this.tbStart.visible = true;
			this.tbStart.touchEnabled = true;
        }
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
            tBgImg = this.getInteractBgImg(i);    
            tBgImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        }

        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.tbStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.refresh();
        super.initUI();  
    }

    public tbReset:eui.Image;
    public tbStart:eui.Image;
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_5: eui.Image;
    public item_6: eui.Image;
    public item_7: eui.Image;
    public item_8: eui.Image;
    public item_9: eui.Image;
    public item_10: eui.Image;
    public item_11: eui.Image;
    public item_12: eui.Image;
    public item_13: eui.Image;
    public item_14: eui.Image;
    public item_15: eui.Image;    
    public effect0:eui.Component;
    public effect1:eui.Component;
    public effect2:eui.Component;
    public effect3:eui.Component;
    
    private interactiveCount:number;    
    private reverseSound: egret.Sound;
    private seccussSound: egret.Sound;
    private jsonData: JSON;
    private isReset:boolean;
    private cardEndL:Array<number> = [];
    private centerPoint:eui.Component;

    public refresh():void
    {
        var tImg:eui.Image;
        var tBmImg: eui.Image;
        var tBgImg:eui.Image;
        var tAniImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);  
            tImg.source = this.jsonData['recall_open_card_info']['cards'][i];
            tImg.touchEnabled = true;       
            tImg.scaleX = 1;
            tBmImg = this.getInteractBmImg(i);
            tBmImg.scaleX = 1;
            tBgImg = this.getInteractBgImg(i);
            tBgImg.touchEnabled = false;
            tBgImg.scaleX = 0;    
            tAniImg = this.getInteractAniImg(i);
            tAniImg.scaleX = 0;
            tAniImg.source = this.jsonData['recall_open_card_info']['cards'][i];
        }
        this.isReset = true;
        if(GlobalData.bAuthority)
        {             
            this.setAllEffect(true);
        }
    }

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {   
            case "901":
            {
                if(this.isReset)
                {
                    this.closeCard(data['cardId']);
                }
                else
                {
                    this.openCard(data['cardId']);
                }
            } 
            break; 
            case "99":
            {
                this.tbReset.touchEnabled = false;
                this.cardEndL = data['cards'];
                this.resetAllCard();
            }
            break;    
            case "98":
            {
                this.tbStart.touchEnabled = false;
                this.coverAllCard();
            }
            break;  
        }
    }

    private resetAllCard()
    {
        this.isReset = true;
        if(null != this.reverseSound)
        {
            this.reverseSound.play(0,1);
        }
        this.setAllEffect(false);
        var tImg:eui.Image;
        var tBmImg:eui.Image;
        var tBgImg:eui.Image;
        var tAniImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {
            tImg = this.getInteractImg(i);    
            tImg.scaleX = 0;  
            tImg.touchEnabled = true;  
            egret.Tween.removeTweens(tImg);
            tBmImg = this.getInteractBmImg(i);    
            tBmImg.scaleX = 1;  
            tBgImg = this.getInteractBgImg(i);    
            tBgImg.scaleX = 0;  
            tBgImg.touchEnabled = false;
            tAniImg = this.getInteractAniImg(i);
            tAniImg.scaleX = 1;
            tAniImg.source = tImg.source;
            egret.Tween.removeTweens(tAniImg);
            egret.Tween.get(tAniImg).to({x:this.centerPoint.x,y:this.centerPoint.y}, 300, egret.Ease.sineOut).call(this.aniCenterCard,this,[tAniImg]);  
        }
    }

    private aniCenterCard(tAniImg:eui.Image):void
    {
        var index:number = parseInt(tAniImg.name);
        tAniImg.source = this.jsonData['recall_open_card_info']['cards'][this.cardEndL[index]];
        var tImg:eui.Image = this.getInteractImg(index);  
        tImg.source = tAniImg.source;
        var tBgImg:eui.Image = this.getInteractBgImg(index);
        tBgImg.source = this.jsonData['recall_open_card_info']['bgCards'][this.cardEndL[index]];
        egret.Tween.get(tAniImg).to({rotation:index*30+720}, 500, egret.Ease.sineOut).call(this.aniSecCenterCard,this,[tAniImg]);
    }

    private aniSecCenterCard(tAniImg:eui.Image):void
    {
        var index:number = parseInt(tAniImg.name);
        var tImg:eui.Image = this.getInteractImg(index);  
        egret.Tween.get(tAniImg).to({x:tImg.x,y:tImg.y,rotation:0}, 300, egret.Ease.sineOut).call(this.aniEndCard,this,[tAniImg]);
    }

    private aniEndCard(tAniImg:eui.Image):void
    {
        var index:number = parseInt(tAniImg.name);
        tAniImg.scaleX = 0;
        var tImg:eui.Image = this.getInteractImg(index); 
        var tBmImg:eui.Image = this.getInteractBmImg(index); 
        if(tImg.touchEnabled) 
        {
            tImg.scaleX = 1;
            tBmImg.scaleX = 1;
            var effect:eui.Component = this.getEffectComponent(index); 
            effect.visible = true;
        }
        if(GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
            this.tbStart.visible = true;
            this.tbStart.touchEnabled = true;
        }
    }

    private coverAllCard()
    {   
        this.isReset = false;
        if(null != this.reverseSound)
        {
            this.reverseSound.play(0,1);
        }
        this.removeAllTweensEffect();
        var tImg:eui.Image;
        var tBmImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);  
            tImg.touchEnabled = false;    
            tImg.scaleX = 1;
            tBmImg = this.getInteractBmImg(i);  
            tBmImg.scaleX = 1;
            tBgImg = this.getInteractBgImg(i);
            tBgImg.scaleX = 0;  
            egret.Tween.get(tImg).to({scaleX:0}, 300, egret.Ease.sineOut).call(this.revBgCard,this,[tBgImg]);
            egret.Tween.get(tBmImg).to({scaleX:0}, 300, egret.Ease.sineOut);
        }
    }

    private resetClick(evt:egret.TouchEvent):void
    {
        this.cardEndL = GameMaths.getRandomArray(this.interactiveCount,this.interactiveCount);
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"99",type:"1",cards:this.cardEndL});
            console.log(this.cardEndL);
        PageMgr.sendMsg(msg); 
    }

    private startClick(evt:egret.TouchEvent):void
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"98",type:"3"});
        PageMgr.sendMsg(msg); 
    }    

    private OpenClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"901",type:"3",cardId:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
    } 

    //翻卡
    private openCard(curClickCard:number):void
    {
        if(null != this.seccussSound)
        {
            this.seccussSound.play(0,1);
        }
        var tBgImg:eui.Image = this.getInteractBgImg(curClickCard);    
        tBgImg.touchEnabled = false;  
        var effect:eui.Component = this.getEffectComponent(curClickCard); 
        effect.visible = false;       
        egret.Tween.removeTweens(tBgImg);  
        egret.Tween.get(tBgImg).to({scaleX:0}, 300, egret.Ease.sineOut).call(this.revCard,this,[curClickCard]);
    }

    private revCard(curClickCard:number):void
    {
        var tImg:eui.Image = this.getInteractImg(curClickCard);    
        var tBmImg:eui.Image = this.getInteractBmImg(curClickCard);    
        egret.Tween.removeTweens(tImg);  
        egret.Tween.removeTweens(tBmImg);  
        egret.Tween.get(tImg).to({scaleX:1}, 300, egret.Ease.sineOut);
        egret.Tween.get(tBmImg).to({scaleX:1}, 300, egret.Ease.sineOut);
    } 

    private revBgCard(tBgImg:eui.Image):void
    {
        egret.Tween.removeTweens(tBgImg);  
        tBgImg.touchEnabled = true;    
        egret.Tween.get(tBgImg).to({scaleX:1}, 300, egret.Ease.sineOut).call(()=>{
            if(GlobalData.isTeacher())
            {
                this.tbReset.visible = true;
                this.tbReset.touchEnabled = true;
                this.tbStart.visible = false;
            }
        }); 
        var effect:eui.Component = this.getEffectComponent(parseInt(tBgImg.name)); 
        effect.visible = true;  
    }

    //盖卡
    private closeCard(curClickCard:number):void
    {
        if(null != this.seccussSound)
        {
            this.seccussSound.play(0,1);
        }
        var tImg:eui.Image = this.getInteractImg(curClickCard);   
        var tBmImg:eui.Image = this.getInteractBmImg(curClickCard);   
        tImg.rotation = 0;
        tImg.touchEnabled = false; 
        var effect:eui.Component = this.getEffectComponent(curClickCard); 
        effect.visible = false;  
        egret.Tween.removeTweens(tImg); 
        egret.Tween.removeTweens(tBmImg);
        var tBgImg = this.getInteractBgImg(curClickCard);
        tBgImg.touchEnabled = false;
        egret.Tween.get(tImg).to({scaleX:0}, 300, egret.Ease.sineOut).call(this.closeRevBgCard,this,[tBgImg]);
        egret.Tween.get(tBmImg).to({scaleX:0}, 300, egret.Ease.sineOut);
    } 

    private closeRevBgCard(tBgImg:eui.Image):void
    {
        egret.Tween.removeTweens(tBgImg);
        egret.Tween.get(tBgImg).to({scaleX:1}, 300, egret.Ease.sineOut);      
    }   

    private getInteractImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_0;
            case 1:
                return this.item_1;
            case 2:
                return this.item_2;
            case 3:
                return this.item_3;
            default:
                return  this.item_0;
        }
    }   
    private getInteractBmImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_12;
            case 1:
                return this.item_13;
            case 2:
                return this.item_14;
            case 3:
                return this.item_15;
            default:
                return  this.item_12;
        }
    }    

    private getInteractBgImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_4;
            case 1:
                return this.item_5;
            case 2:
                return this.item_6;
            case 3:
                return this.item_7;
            default:
                return  this.item_4;
        }
    }  

    private getInteractAniImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_8;
            case 1:
                return this.item_9;
            case 2:
                return this.item_10;
            case 3:
                return this.item_11;
            default:
                return  this.item_8;
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
            default:
                return  this.effect0;
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
            var tBgImg:eui.Image;
            var tImg:eui.Image;
            var effect:eui.Component;
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                if(this.isReset)
                {
                    tImg = this.getInteractImg(i);   
                    if(tImg.touchEnabled)
                    {
                        effect = this.getEffectComponent(i); 
                        effect.visible = true;
                    }             

                }
                else
                {
                    tBgImg = this.getInteractBgImg(i);        
                    if(tBgImg.touchEnabled)
                    {
                        effect = this.getEffectComponent(i); 
                        effect.visible = true;
                    }
                }
            }
        }
        else
        {
            this.setAllEffect(false);
        }
    }

    private removeAllTweensEffect()
    {
        var tImg:eui.Image;
        var tBmImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i); 
            tBmImg = this.getInteractBmImg(i); 
            tBgImg = this.getInteractBgImg(i);     
            egret.Tween.removeTweens(tImg);  
            egret.Tween.removeTweens(tBmImg);  
            egret.Tween.removeTweens(tBgImg);
        }
    }

    public destroy(): void {
        this.removeAllTweensEffect();
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
            tBgImg = this.getInteractBgImg(i);    
            tBgImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        }

        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.tbStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);   
        super.destroy();
    }
}