class DragPic6In4Panel extends PageBase {
    public constructor() {
        super();
        this.skinName = "DragPic6In4Skin";   
        this.label0.textFlow = <Array<egret.ITextElement>>[
            // { text: "volleyball" },
            { text: "Right", style: { "textColor": 0x0066C9} },
            { text:" , /r/!" }
        ];

        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['drag_info_6In4']['items'].length;
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        this.rightNum = 0;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['drag_info_6In4']['items'][i].res_path;

            tBgImg = this.getInteractBgImg(i);
            tBgImg.source = this.jsonData['drag_info_6In4']['items'][i].res_path; 
            tBgImg.x = tImg.x;
            tBgImg.y = tImg.y;
            tBgImg.width = tImg.width;
            tBgImg.height = tImg.height;
            tBgImg.anchorOffsetX = tImg.anchorOffsetX;
            tBgImg.anchorOffsetY = tImg.anchorOffsetY;
            EffectUtils.useError(tBgImg);

            if(this.jsonData['drag_info_6In4']['items'][i].isright)
            {
                this.rightNum++;
            }
        }   
        for(var i:number = 0; i<this.rightNum; ++i)
        {
            this.existNum[i] = true;
        }
    }

    public label0: eui.Label;
    public tbReset :eui.Image;
    public tbCheck :eui.Image;
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_5: eui.Image;

    public item_8: eui.Image;
    public item_9: eui.Image;
    public item_10: eui.Image;
    public item_11: eui.Image;
    public item_12: eui.Image;
    public item_13: eui.Image;

    private rightNum:number;
    private interactiveCount:number;
    private dragCount:number;
    private lastInteractiveImg:eui.Image;
    
    public resultPos_0: eui.Image;
    public resultPos_1: eui.Image;
    public resultPos_2: eui.Image;
    public resultPos_3: eui.Image;
    
    private chooseNumL: Array<number> = []; 
    private existNum: Array<boolean> = [];

    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
            this.tbCheck.visible = false;
        }
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        
        this.refresh(); 
        this.resetImgLayer();
        super.initUI();
    }
    
    public destroy(): void {
        this.removeAllFilters();
        this.resetImgLayer();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        this.removeAllEffect();
        super.destroy();
    }

    public refresh():void
    {
        this.removeAllEffect();
        this.dragCount = 0;
        this._touchStatus = false;

        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tImg);
            }
        }
        for(var i:number = 0; i<this.rightNum; ++i)
        {
            this.existNum[i] = true;
        }

        this.setAllImageTouch(true);
        this.resetAllImagePos();
                 
        if(GlobalData.bAuthority)
        {
            tImg = this.getInteractImg(5);   
            FingerHintPanel.finger().showFingerMove(new egret.Point(tImg.x,tImg.y), new egret.Point(this.resultPos_0.x,this.resultPos_0.y),3000);
        }
        this.chooseNumL.splice(0, this.chooseNumL.length);
    }

    private jsonData:JSON;
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

    private refreshClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
    }

    private checkClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"502",type:"3"});
        PageMgr.sendMsg(msg);
    }    

    private removeEffect(tImage:eui.Image)
    {
        egret.Tween.removeTweens(tImage);
        tImage.filters = [];
    }

    private removeAllEffect()
    {
        this.removeAllTweensEffect();
        this.removeAllResultEffect();
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

    private removeAllResultEffect()
    {
        CheckAnswerPanel.checkAnswer().destroy();
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
            case 5:
                return this.item_13;
            default:
                return  this.item_8;
        }
    }

    private getResultPos(num:number):eui.Image
    { 
        switch(num)
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
                return this.resultPos_0;

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
            case "502":
            {
                SoundManager.sound().PlayClick();
                this.showResult();
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
        var isHit0:boolean = false;
        var isHit1:boolean = false;
        var isHit2:boolean = false;
        var isHit3:boolean = false;
        var isHit:number = -1;

        if(this.dragCount < this.rightNum) 
        {
            isHit0 = GameMaths.hasHit(this.resultPos_0.x-this.resultPos_0.anchorOffsetX,this.resultPos_0.y-this.resultPos_0.anchorOffsetY,this.resultPos_0.width,this.resultPos_0.height, tPosX, tPosY); 
            isHit1 = GameMaths.hasHit(this.resultPos_1.x-this.resultPos_1.anchorOffsetX,this.resultPos_1.y-this.resultPos_1.anchorOffsetY,this.resultPos_1.width,this.resultPos_1.height, tPosX, tPosY); 
            isHit2 = GameMaths.hasHit(this.resultPos_2.x-this.resultPos_2.anchorOffsetX,this.resultPos_2.y-this.resultPos_2.anchorOffsetY,this.resultPos_2.width,this.resultPos_2.height, tPosX, tPosY); 
            isHit3 = GameMaths.hasHit(this.resultPos_3.x-this.resultPos_3.anchorOffsetX,this.resultPos_3.y-this.resultPos_3.anchorOffsetY,this.resultPos_3.width,this.resultPos_3.height, tPosX, tPosY); 
        }
        if(isHit0 && this.existNum[0]){
            this.existNum[0] = false;
            isHit = 0;
        }else if(isHit1 && this.existNum[1]){
            this.existNum[1] = false;
            isHit = 1;
        }else if(isHit2 && this.existNum[2]){
            this.existNum[2] = false;
            isHit = 2;
        }else if(isHit3 && this.existNum[3]){
            this.existNum[3] = false;
            isHit = 3;
        }

        if(isHit != -1){
            var tResult:eui.Image = this.getResultPos(isHit);
            tImage.x = tResult.x;
            tImage.y = tResult.y;
            tImage.filters = [];
            tImage.touchEnabled = false;
            this.dragCount++;
            if(this.dragCount == this.rightNum)
            {
                this.setAllImageTouch(false);
                this.removeAllFilters();
            }
            this.chooseNumL.push(tTargetIndex);
        }
        else
        {            
            var tBgImg:eui.Image = this.getInteractBgImg(tTargetIndex);
            egret.Tween.get(tImage).to({x:tBgImg.x, y:tBgImg.y},20,egret.Ease.sineInOut);
        }
    } 

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            if(this.dragCount == this.rightNum)
            {
                return;
            }
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

            tImg = this.getInteractBgImg(5);                 
            FingerHintPanel.finger().showFingerMove(new egret.Point(tImg.x,tImg.y), new egret.Point(this.resultPos_0.x,this.resultPos_0.y),3000);
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

    private showResult():void
    {  
        this.setAllImageTouch(false);
        FingerHintPanel.finger().destroy();

        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {    
            tImg = this.getInteractImg(i);              
            CheckAnswerPanel.checkAnswer().showResult(new egret.Point(tImg.x,tImg.y),this.jsonData['drag_info_6In4']['items'][i].isright);              
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
}