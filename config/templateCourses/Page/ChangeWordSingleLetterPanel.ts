// TypeScript file

class ChangeWordSingleLetterPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChangeWordSingleLetterSkin";

        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData["change_wordsingleletter_info"]['items'].length;
        this.originPoint = egret.Point.create(0,0);
        
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.text = this.jsonData["change_wordsingleletter_info"]['items'][i]['word'];
        }
    }
    
    public initUI(): void {
        // var blurFliter = new egret.BlurFilter( 5 , 5); 
        // this.roombg.filters = [blurFliter];
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
            this.tbCheck.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);

        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wordClick, this);
        }
        this.curInteractiveIndex = -1;
        this.refresh();
        super.initUI();  
    }

    public word0:eui.Label;
    public word1:eui.Label;
    public word2:eui.Label;
    public endword:eui.Label;
    public tbCheck :eui.Image;
    public tbReset :eui.Image; 
    public roombg:eui.Image;

    private jsonData:JSON; 
    private interactiveCount:number; 
    private curInteractiveIndex:number; 
    private canInteractive:boolean;
    private originPoint:egret.Point;

    public refresh():void
    {
        var tLab:eui.Label;
        if(-1 != this.curInteractiveIndex)
        {
            tLab = this.getInteractWord(this.curInteractiveIndex); 
            tLab.x = this.originPoint.x;
            tLab.y = this.originPoint.y;    
            egret.Tween.removeTweens(tLab);        
            // tLab.size = 28;
        }
        this.removeAllResultEffect();
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);   
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tLab);
            }
            tLab.visible = true;
        }
        this.endword.visible = false; 

        this.setAllWordTouch(true);
        this.canInteractive = true;
        this.curInteractiveIndex = -1;
    }

    private removeAllResultEffect()
    {
        CheckAnswerPanel.checkAnswer().destroy();
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

    private refreshClick(evt:egret.TouchEvent)
    {
        if(!this.canInteractive)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
    }

    private checkClick(evt:egret.TouchEvent)
    {
        if(!this.canInteractive)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"502",type:"3"});
        PageMgr.sendMsg(msg);
    } 

    private wordClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        if(!this.canInteractive)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"201",type:"2",targetIndex:parseInt(evt.target.name)});
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
            default:
                return  this.word0;
        }
    }   
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "201":
            {
               this.dealWordClick(data['targetIndex']);
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
        }
    }

    private dealWordClick(tTargetIndex:number):void
    {
        SoundManager.sound().PlayClick();
        this.canInteractive = false;
        var tLab :eui.Label;
        if(-1 != this.curInteractiveIndex)
        {
            tLab = this.getInteractWord(this.curInteractiveIndex);
            tLab.visible = true;
            tLab.x = this.originPoint.x;
            tLab.y = this.originPoint.y;
            // tLab.size = 28;
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tLab);
            }
            this.endword.visible = false;
        }
        tLab = this.getInteractWord(tTargetIndex);
        this.setChildIndex(tLab, this.numChildren);
        tLab.filters = [];
        this.originPoint.x = tLab.x;
        this.originPoint.y = tLab.y;
        this.curInteractiveIndex = tTargetIndex;
        egret.Tween.get(tLab).to({x:this.endword.x, y:this.endword.y},1000,egret.Ease.sineInOut).call(this.movePosEnd,this);
    }

    private movePosEnd():void
    {
        var tLab :eui.Label = this.getInteractWord(this.curInteractiveIndex);
        this.endword.visible = true;
        this.endword.text = tLab.text;
        tLab.visible = false;
        this.canInteractive = true;
    }

    private showResult():void
    {  
        this.setAllWordTouch(false);   
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            if(-1 != this.curInteractiveIndex && i == this.curInteractiveIndex)
            {
                CheckAnswerPanel.checkAnswer().showResult(new egret.Point(this.endword.x+40,this.endword.y+40),this.jsonData["change_wordsingleletter_info"]['items'][i].isright);
            }
            else
            {
                tLab = this.getInteractWord(i);   
                CheckAnswerPanel.checkAnswer().showResult(new egret.Point(tLab.x+40,tLab.y+40),this.jsonData["change_wordsingleletter_info"]['items'][i].isright);
            }
        }  
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                EffectUtils.useGlow(this.getInteractWord(i));
            }
        }
        else
        {
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                this.getInteractWord(i).filters = [];
            }
        }
    }

    public destroy(): void {
        this.refresh();
        var tLab:eui.Label;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tLab = this.getInteractWord(i);  
            tLab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.wordClick, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkClick, this);
        super.destroy();
    }
}