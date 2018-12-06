class WordLinkPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "WordLinkSkin";

        this.seccussSound = RES.getRes("success_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("success_mp3", this.onResSoundSecLoaded, this );
        }

        this.jsonData = RES.getRes("page_info_json");

        this.interactiveCount = this.jsonData['word_link_info']['cards'].length;
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['word_link_info']['cards'][i];  
            this.originPosesNumL.push(new egret.Point(tImg.x, tImg.y));
            this.cardEndL.push(i);      
        }  
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("success_mp3"); 
    }

    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        else
        {
            this.tbReset.visible = true;
        }
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        }

        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.lastClickNum = -1;
        this.resetAllCard();
        super.initUI();  
    }

    public tbReset:eui.Image;
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_5: eui.Image;
    public item_6: eui.Image;
    public item_7: eui.Image;
    public result_0: eui.Component;
    public result_1: eui.Component;
    public result_2: eui.Component;
    public result_3: eui.Component;
    
    private interactiveCount:number;   
    private seccussSound: egret.Sound;
    private jsonData: JSON;    
    private originPosesNumL: Array<egret.Point> = [];
    private rightNum:number;
    private cardEndL:Array<number> = [];
    private lastClickNum:number;
    private chooseNumL: Array<number> = [];

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {   
            case "901":
            {
                this.clickCard(data['cardId']);
            } 
            break; 
            case "99":
            {
                this.cardEndL = data['cards'];
                this.resetAllCard();
            }
            break;    
        }
    }

    private resetAllCard()
    {
        this.removeAllTweensEffect();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);  
            tImg.visible = true;  
            tImg.touchEnabled = true; 
            if(GlobalData.bAuthority)
            {
                EffectUtils.useGlow(tImg);
            }
            tImg.x = this.originPosesNumL[i].x;
            tImg.y = this.originPosesNumL[i].y;
            tImg.rotation = 0;//
            tImg.source = this.jsonData['word_link_info']['cards'][this.cardEndL[i]];  
        }
        this.chooseNumL.splice(0, this.chooseNumL.length);
        this.rightNum = 0;
    }

    private resetClick(evt:egret.TouchEvent):void
    {
        this.cardEndL = GameMaths.getRandomArray(this.interactiveCount,this.interactiveCount);
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"99",type:"1",cards:this.cardEndL});
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

    private clickCard(curClickCard:number):void
    {
        var tImg:eui.Image = this.getInteractImg(curClickCard);
        if(-1 != this.lastClickNum)
        {
            var tLastImg:eui.Image = this.getInteractImg(this.lastClickNum);  
            if(tLastImg.source.toString().substr(6,2) == tImg.source.toString().substr(6,2))
            {
                if(null != this.seccussSound)
                {
                    this.seccussSound.play(0,1);
                }
                var posX = tLastImg.x + (tImg.x - tLastImg.x)/2;
                var posY = tLastImg.y + (tImg.y - tLastImg.y)/2;
                egret.Tween.removeTweens(tImg); 
                egret.Tween.removeTweens(tLastImg);
                tImg.scaleX = 1;
                tImg.scaleY = 1;
                tImg.rotation = 0;
                tLastImg.scaleX = 1;
                tLastImg.scaleY = 1;
                tLastImg.rotation = 0;
                tImg.filters = [];
                tLastImg.filters = [];
                this.addChildAt(tImg,this.numChildren);
                this.addChildAt(tLastImg,this.numChildren);
                egret.Tween.get(tImg).to({x:posX,y:posY}, 300, egret.Ease.sineOut).call(this.aniCenterCard,this,[tImg,-1]); 
                egret.Tween.get(tLastImg).to({x:posX,y:posY}, 300, egret.Ease.sineOut).call(this.aniCenterCard,this,[tLastImg,this.rightNum]); 
                this.lastClickNum = -1;
                tImg.touchEnabled = false;
                tLastImg.touchEnabled = false;
                this.rightNum++;
                this.chooseNumL.push(curClickCard);
                this.chooseNumL.push(this.lastClickNum);
            } 
            else
            {
                SoundManager.sound().PlayClick();
                this.lastClickNum = -1;
                EffectUtils.rockObj(tImg,100,10);
                tLastImg.touchEnabled = true;
                EffectUtils.useGlow(tLastImg);
            }             
        }
        else
        {
            SoundManager.sound().PlayClick();
            this.lastClickNum = curClickCard;
            EffectUtils.rockObj(tImg,200,10);
            tImg.touchEnabled = false;
            tImg.filters = [];
        }
    }

    private aniCenterCard(tAniImg:eui.Image, tNum:number):void
    {
        if(-1 == tNum)
        {
            tAniImg.visible = false;
        }
        else
        {
            var tResult:eui.Component = this.getResultPos(tNum);
            egret.Tween.get(tAniImg).to({x:tResult.x,y:tResult.y}, 300, egret.Ease.sineOut);  
        }
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
            case 4:
                return this.item_4;
            case 5:
                return this.item_5;
            case 6:
                return this.item_6;
            case 7:
                return this.item_7;
            default:
                return  this.item_0;
        }
    }  

    private getResultPos(num:number):eui.Component
    { 
        switch(num)
        {
            case 0:
                return this.result_0;
            case 1:
                return this.result_1;
            case 2:
                return this.result_2;
            case 3:
                return this.result_3;
            default:
                return this.result_0;

        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {            
            var tImg:eui.Image;
            var isChoose:boolean = false;
            var count:number = 0;
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                isChoose = false;
                count = this.chooseNumL.length;
                for(var j:number = 0; j<count; ++j)
                {
                    if(this.chooseNumL[j] == i)
                    {
                        isChoose = true;
                        break;
                    }
                }
                if(!isChoose)
                {
                    tImg = this.getInteractImg(i);   
                    EffectUtils.useGlow(tImg);
                }
            }
        }
        else
        {
            var tImg:eui.Image;
            for(var i:number = 0; i<this.interactiveCount; ++i)
            { 
                tImg = this.getInteractImg(i);   
                tImg.filters = [];
            }
        }
    }

    private removeAllTweensEffect()
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            egret.Tween.removeTweens(tImg);  
        }
    }

    public destroy(): void {
        this.removeAllTweensEffect();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenClick, this);
        }

        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        super.destroy();
    }
}