// TypeScript file

class DragMultiLetterPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "DragMultiLetterSkin";

        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['drag_multi_letter_info']['items'].length;
        
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.text = this.jsonData['drag_multi_letter_info']['items'][i]['word'];
            this.originPosesNumL.push(new egret.Point(tLab.x, tLab.y));
        }
        this.interactiveEndCount = 2;
        this.result_word0.text = this.jsonData['drag_multi_letter_info']['result'][0];
        this.result_word1.text = this.jsonData['drag_multi_letter_info']['result'][1];

        var tNeedCheck = this.jsonData["drag_multi_letter_info"]['needCheck'];
        if(tNeedCheck)
        {           
            this.tbCheck.visible = true; 
        }
        else
        {
            this.tbCheck.visible = false; 
        }
    }
    
    public initUI(): void { 
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
            this.tbCheck.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);  
        this.tbCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);      
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.refresh();
        this.resetWordLayer();
        super.initUI(); 
    }

    public word0:eui.Label;
    public word1:eui.Label;
    public word2:eui.Label;
    public word3:eui.Label;
    public result_word0:eui.Label;
    public result_word1:eui.Label;
    public resultPos_0: eui.Label;
    public resultPos_1: eui.Label;
    public tbReset :eui.Image; 
    public tbCheck :eui.Image;
    private lastInteractiveLab:eui.Label;

    private jsonData:JSON; 
    private interactiveCount:number; 
    private interactiveEndCount:number; 
    private chooseNumL: Array<number> = [];
    private dealNumL: Array<number> = [];
    private originPosesNumL: Array<egret.Point> = [];

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
            if(null != this.lastInteractiveLab)
            {
                var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                    cmd:"501",type:"4",targetIndex:parseInt(this.lastInteractiveLab.name),x:Math.floor(posX), y:Math.floor(posY)});
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
        if(null != this.lastInteractiveLab)
        {
            var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"503",type:"3",targetIndex:parseInt(this.lastInteractiveLab.name),x:Math.floor(this.lastInteractiveLab.x), y:Math.floor(this.lastInteractiveLab.y)});
            PageMgr.sendMsg(msg);
            this.lastInteractiveLab = null;
        }
    }

    private checkClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"502",type:"3"});
        PageMgr.sendMsg(msg);
    }

    public refresh():void
    {        
        this.removeAllTweensEffect();
        this.removeAllResultEffect();
        this._touchStatus = false;

        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);   
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tLab);
            }
        }

        this.setAllWordTouch(true);
        this.resetAllLabPos();
        this.chooseNumL.splice(0, this.chooseNumL.length);
        this.dealNumL.splice(0, this.dealNumL.length);
        this.result_word0.visible = false;
        this.result_word1.visible = false;
    }

    private removeAllTweensEffect()
    {
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);    
            egret.Tween.removeTweens(tLab);
        }
    }

    private setAllWordTouch(bTouchEnable):void
    {        
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);   
            tLab.touchEnabled = bTouchEnable;
        }
    }

    private resetAllLabPos():void
    {
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {     
            tLab = this.getInteractWord(i);    
            tLab.x = this.originPosesNumL[i].x;
            tLab.y = this.originPosesNumL[i].y;
        }
    }

    private refreshClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
    }

    private getInteractWord(index: number):eui.Label
    {        
        switch(index)
        {
            case 0:
                return this.word0;
            case 1:
                return this.word1;
            case 2:
                return this.word2;
            case 3:
                return this.word3;
            default:
                return  this.word0;
        }
    }  

    private getInteractResultWord(index: number): eui.Label {
        switch (index) {
            case 0:
                return this.resultPos_0;
            case 1:
                return this.resultPos_1;
            default:
                return this.resultPos_0;
        }
    } 

    private showResultWord(index:number):void
    {
        if(0 == index)
        {
            this.result_word0.visible = true;
        }
        else
        {
            this.result_word1.visible = true;
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
            case "505":
            {
               this.dealMouseDownMsg(data['targetIndex'],data['x'],data['y']);
            }
            break;
            case "502":
            {
                SoundManager.sound().PlayClick();
                this.showResult();
            }            
            break;        
        }
    }

    private dealMouseDownMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
        var tLab:eui.Label = this.getInteractWord(tTargetIndex);
        GameLayerManager.gameLayer().addChildAt(tLab,GameLayerManager.gameLayer().numChildren);
        this._distance.x = tPosX- tLab.x;
        this._distance.y = tPosY - tLab.y;
        this.lastInteractiveLab = tLab;
    }

    private dealMoveMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
            var tLab:eui.Label = this.getInteractWord(tTargetIndex);
            tLab.x = tPosX;
            tLab.y = tPosY;
    }

    private dealMouseupMsg(tTargetIndex:number, tPosX:number, tPosY:number)
    {
        this.lastInteractiveLab = null;
        var tLab:eui.Label = this.getInteractWord(tTargetIndex);
		this.addChildAt(tLab,this.numChildren);
        egret.Tween.removeTweens(tLab);
        var dealCount:number = this.dealNumL.length;
        var hasDeal:boolean = false;
        var tEndLab: eui.Label;
        var isHit:boolean = false;
        for(var i:number = 0; i<this.interactiveEndCount; ++i)
        {     
            hasDeal = false;
            for(var j:number = 0; j<dealCount; ++j)
            {
                if(i == this.dealNumL[j])
                {
                    hasDeal = true;
                    break;
                }
            }
            if(hasDeal)
            {
                continue;
            }
            tEndLab = this.getInteractResultWord(i);
            isHit = GameMaths.hasHit(tEndLab.x - tEndLab.anchorOffsetX, tEndLab.y - tEndLab.anchorOffsetY, tEndLab.width, tEndLab.height, tPosX, tPosY);
            if (isHit) {
                break;
            }
        }

        if(isHit)
        {
            egret.Tween.get(tLab).to({ x: tEndLab.x, y: tEndLab.y }, 20, egret.Ease.sineInOut).call(this.removeEffect, this, [tLab]);
            tLab.touchEnabled = false;
            this.dealNumL.push(parseInt(tEndLab.name));
            if(this.dealNumL.length == this.interactiveEndCount)
            {
                this.setAllWordTouch(false);
                this.removeAllFilters();
            }
            this.chooseNumL.push(tTargetIndex);
        }
        else
        {            
            egret.Tween.get(tLab).to({x:this.originPosesNumL[tTargetIndex].x, y:this.originPosesNumL[tTargetIndex].y},20,egret.Ease.sineInOut);
        }
    }     

    private removeEffect(tLab:eui.Label)
    {
        egret.Tween.removeTweens(tLab);
        tLab.filters = [];
    }

    private showResult():void
    {  
        this.setAllWordTouch(false);   
        var tLab:eui.Label;
        var tCount:number = this.dealNumL.length;
        var hasDeal:boolean = false;
        var tResultLab:eui.Label;
        for(var i:number = 0; i<this.interactiveEndCount; ++i)
        {    
            hasDeal = false; 
            tResultLab = this.getInteractResultWord(i);
            for(var j:number = 0; j<tCount; ++j)
            {
                if(i == this.dealNumL[j])
                {
                    hasDeal = true;
                    if(this.jsonData['drag_multi_letter_info']['items'][this.chooseNumL[j]]['word']
                        == this.jsonData['drag_multi_letter_info']['result'][i])
                    {
                        CheckAnswerPanel.checkAnswer().showResult(new egret.Point(tResultLab.x+30,tResultLab.y+45),true);                        
                    }
                    else
                    {
                        CheckAnswerPanel.checkAnswer().showResult(new egret.Point(tResultLab.x+30,tResultLab.y+55),false); 
                        this.showResultWord(i);
                    }
                    break;
                }
            } 
            if(!hasDeal)
            {
                CheckAnswerPanel.checkAnswer().showResult(new egret.Point(tResultLab.x,tResultLab.y),false); 
                this.showResultWord(i);

            }
        }  
    }

    private removeAllResultEffect()
    {
        CheckAnswerPanel.checkAnswer().destroy();
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            var tLab:eui.Label;
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
                    tLab = this.getInteractWord(i);   
                    EffectUtils.useGlow(tLab);
                }
            }
        }
        else
        {
            this._touchStatus = false;
            if(null != this.lastInteractiveLab)
            {
                var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                    cmd:"503",type:"3",targetIndex:parseInt(this.lastInteractiveLab.name),x:Math.floor(this.lastInteractiveLab.x), y:Math.floor(this.lastInteractiveLab.y)});
                PageMgr.sendMsg(msg);
                this.lastInteractiveLab = null;
            }
            this.removeAllFilters();
        }
    }

    private removeAllFilters():void
    {
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {  
            this.getInteractWord(i).filters = [];   
        }
    }

    private resetWordLayer():void
    {
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);   
            this.addChildAt(tLab,this.numChildren);
        }
    }

    public destroy(): void {
        this.removeAllFilters();
        this.removeAllTweensEffect();
        this.removeAllResultEffect();
        this.resetWordLayer();
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);    
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpPanel, this);
        GameLayerManager.gameLayer().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        super.destroy();
    }
}