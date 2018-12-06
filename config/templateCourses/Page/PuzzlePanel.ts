class PuzzlePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PuzzleSkin";

        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['puzzle_info']['items'].length;
        this.canClick = this.jsonData['puzzle_info']['canClick'];
        
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {        
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['puzzle_info']['items'][i];

            tBgImg = this.getInteractBgImg(i);
            tBgImg.source = this.jsonData['puzzle_info']['items'][i]; 
            tBgImg.x = tImg.x;
            tBgImg.y = tImg.y;
            tBgImg.scaleX = tImg.scaleX;
            tBgImg.width = tImg.width;
            tBgImg.height = tImg.height;
            tBgImg.anchorOffsetX = tImg.anchorOffsetX;
            tBgImg.anchorOffsetY = tImg.anchorOffsetY;
            EffectUtils.useError(tBgImg);
        } 
        for(var i:number = this.interactiveCount; i<8; ++i)
        {
            tImg = this.getInteractImg(i);   
            tImg.touchEnabled = false;
        }

    }
    
    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);        
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);    
        this.showImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showImgClick, this);    
        this.showBImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showImgClick, this);    
        
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.refresh();
        if(this.canClick)
        {
            EffectUtils.useGlow(this.showImg);
        }
        this.resetImgLayer();
        super.initUI();  

    }
    
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_8: eui.Image;
    public item_9: eui.Image;
    public item_10: eui.Image;
    public item_11: eui.Image;
    public item_12: eui.Image;
    public resultPos_0: eui.Image;
    public resultPos_1: eui.Image;
    public resultPos_2: eui.Image;
    public resultPos_3: eui.Image;
    public showImg: eui.Image;
    public showBImg: eui.Image;
    public roombg :eui.Image;  

    public tbReset :eui.Image; 
    private lastInteractiveImg:eui.Image;

    private jsonData:JSON; 
    private interactiveCount:number; 
    private chooseNumL: Array<number> = [];
    private canClick:boolean;

    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private mouseDown(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        this._touchStatus = true;        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"505",type:"4",targetIndex:parseInt(evt.target.name),x:Math.floor(evt.stageX), y:Math.floor(evt.stageY)});
        PageMgr.sendMsg(msg);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
            var posX:number = evt.stageX - this._distance.x;
            var posY:number = evt.stageY - this._distance.y;
            if(null != this.lastInteractiveImg)
            {
                var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                    cmd:"501",type:"4",targetIndex:parseInt(this.lastInteractiveImg.name),x:Math.floor(posX), y:Math.floor(posY)});
                PageMgr.sendMsg(msg);
            }
        }
    }

    private mouseUpPanel(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }

        this._touchStatus = false;
        if(null != this.lastInteractiveImg)
        {
            var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"503",type:"3",targetIndex:parseInt(this.lastInteractiveImg.name),x:Math.floor(this.lastInteractiveImg.x), y:Math.floor(this.lastInteractiveImg.y)});
            PageMgr.sendMsg(msg);
            this.lastInteractiveImg = null;
        }
    }

    private showImgClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"504",type:"2",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
    }

    public refresh():void
    {        
        this.removeAllTweensEffect();
        this._touchStatus = false;

        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            tImg.visible = true;
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tImg);
            }
        }

        this.showImg.visible = false;
        this.showBImg.visible = false;
        this.showImg.scaleX = 1;
        this.showBImg.scaleX = 1;
        egret.Tween.removeTweens(this.showImg);
        egret.Tween.removeTweens(this.showBImg);
        this.setAllImageTouch(true);
        this.resetAllImagePos();
        this.chooseNumL.splice(0, this.chooseNumL.length);

        if(GlobalData.bAuthority)
        {
            tImg = this.getInteractBgImg(0);   
            var tResult:eui.Image =  this.getInteractResultImg(0);               
            FingerHintPanel.finger().showFingerMove(new egret.Point(tImg.x,tImg.y), new egret.Point(tResult.x,tResult.y),3000);
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

    private setAllImageTouch(bTouchEnable):void
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.touchEnabled = bTouchEnable;
        }
    }   

    private setAllImageVisible(bVisible):void
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount-1; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.visible = bVisible;
        }
    }

    private resetAllImagePos():void
    {
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tBgImg = this.getInteractBgImg(i);
            tImg.x = tBgImg.x;
            tImg.y = tBgImg.y;
        }
    }

    private refreshClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
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
            default:
                return  this.item_0;
        }
    }   

    private getInteractBgImg(index: number):eui.Image
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
            case 4:
                return this.item_12;
            default:
                return  this.item_8;
        }
    } 

    private getInteractResultImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.resultPos_0;
            case 1:
                return this.resultPos_1;
            case 2:
                return this.resultPos_2;
            case 3:
                return this.resultPos_3;
            default:
                return  this.resultPos_0;
        }
    }
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "501":
            {
               this.dealMoveMsg(data['targetIndex'],data['x'],data['y']);
            }
            break;
            case "503":
            {
                SoundManager.sound().PlayDrag();
                this.dealMouseupMsg(data['targetIndex'],data['x'],data['y']);
            }
            break;
            case "99":
            {
                SoundManager.sound().PlayClick();
                this.refresh();
            }
            break;  
            case "504":
            {
                SoundManager.sound().PlayClick();
                this.revCard(data['targetIndex']);
            }
            break;   
            case "505":
            {
               this.dealMouseDownMsg(data['targetIndex'],data['x'],data['y']);
            }
            break;      
        }
    }

    private dealMouseDownMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
        var tImage :eui.Image = this.getInteractImg(tTargetIndex);
        GameLayerManager.gameLayer().addChildAt(tImage,GameLayerManager.gameLayer().numChildren);
        this._distance.x = tPosX - tImage.x;
        this._distance.y = tPosY - tImage.y;
        this.lastInteractiveImg = tImage;
    }

    private dealMoveMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
        var tImage :eui.Image = this.getInteractImg(tTargetIndex);
        tImage.x = tPosX;
        tImage.y = tPosY;
    }

    private dealMouseupMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
        this.lastInteractiveImg = null;
        var tImage :eui.Image = this.getInteractImg(tTargetIndex);
        this.addChildAt(tImage,this.numChildren);
        egret.Tween.removeTweens(tImage);
        var isHit:boolean = false;
        var tEndImage:eui.Image;
        if(tTargetIndex < this.interactiveCount-1)
        {
            tEndImage = this.getInteractResultImg(tTargetIndex);
            isHit = GameMaths.hasHit(tEndImage.x-tEndImage.anchorOffsetX,tEndImage.y-tEndImage.anchorOffsetY,tEndImage.width,tEndImage.height, tPosX, tPosY); 
        }

        if(isHit)
        {
            egret.Tween.get(tImage).to({x:tEndImage.x, y:tEndImage.y},20,egret.Ease.sineInOut).call(this.removeEffect,this,[tImage]);
            tImage.touchEnabled = false;
            this.chooseNumL.push(tTargetIndex);
            if(this.chooseNumL.length == this.interactiveCount-1)
            {
                this.removeAllFilters();
                this.setAllImageTouch(false);
                this.showImg.visible = true;
                if(this.canClick)
                {
                        this.showImg.touchEnabled = true;
                }
                this.setAllImageVisible(false);
            }
        }
        else
        {            
            var tBgImg:eui.Image = this.getInteractBgImg(tTargetIndex);
            egret.Tween.get(tImage).to({x:tBgImg.x, y:tBgImg.y},20,egret.Ease.sineInOut);
        }
    }     

    private removeEffect(tImage:eui.Image)
    {
        egret.Tween.removeTweens(tImage);
        tImage.filters = [];
    }

    private revCard(tTargetIndex:number):void
    {
        if(0 == tTargetIndex)
        {
            this.showImg.visible = true;
            this.showImg.touchEnabled = false;
            this.showImg.scaleX = 1;
            egret.Tween.get(this.showImg).to({scaleX:0}, 300, egret.Ease.sineOut).call(this.revShowImgCard,this);
            this.showBImg.visible = true;
            this.showBImg.scaleX = 0;
        }
        else if(1 == tTargetIndex)
        {
            this.showBImg.visible = true;
            this.showBImg.touchEnabled = false;
            this.showBImg.scaleX = 1;
            egret.Tween.get(this.showBImg).to({scaleX:0}, 300, egret.Ease.sineOut).call(this.revShowBImgCard,this);
            this.showImg.visible = true;
            this.showImg.scaleX = 0;
        }
    }       

    private revShowImgCard():void
    {
        egret.Tween.get(this.showBImg).to({scaleX:1}, 300, egret.Ease.sineOut);
        this.showBImg.touchEnabled = true;
    }

    private revShowBImgCard():void
    {
        egret.Tween.get(this.showImg).to({scaleX:1}, 300, egret.Ease.sineOut);
        this.showImg.touchEnabled = true;
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

            tImg = this.getInteractBgImg(0);   
            var tResult:eui.Image =  this.getInteractResultImg(0);               
            FingerHintPanel.finger().showFingerMove(new egret.Point(tImg.x,tImg.y), new egret.Point(tResult.x,tResult.y),3000);
        }
        else
        {                
            this._touchStatus = false;
            if(null != this.lastInteractiveImg)
            {
                var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                        cmd:"503",type:"3",targetIndex:parseInt(this.lastInteractiveImg.name),x:Math.floor(this.lastInteractiveImg.x), y:Math.floor(this.lastInteractiveImg.y)});
                PageMgr.sendMsg(msg);
                this.lastInteractiveImg = null;
            }
            this.removeAllFilters();
        }
    }
    
    private removeAllFilters():void
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {  
            this.getInteractImg(i).filters = [];   
        }
    }

    private resetImgLayer():void
    {
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {   
            tImg = this.getInteractImg(i);   
            this.addChildAt(tImg,this.numChildren);
        }
    }

    public destroy(): void {
        egret.Tween.removeTweens(this.showImg);
        egret.Tween.removeTweens(this.showBImg);
        this.removeAllFilters();
        this.removeAllTweensEffect();
        this.resetImgLayer();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        super.destroy();
    }
}