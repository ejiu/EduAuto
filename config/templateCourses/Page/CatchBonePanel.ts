class CatchBonePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "CatchBoneSkin";   
        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['catch_bone_info']['items'].length;
        this.rightNum = 0;

        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.source = this.jsonData['catch_bone_info']['items'][i].res_path;
            tBgImg = this.getInteractBgImg(i);  
            tBgImg.x = tImg.x;
            tBgImg.y = tImg.y;
            if(this.jsonData['catch_bone_info']['items'][i].isRight)
            {
                this.rightNum++;
            }
            this.rotationNuml[i] = tImg.rotation;
        }   

        this.catchSound = RES.getRes("catch_entity_mp3");
        if(null == this.catchSound)
        {
            RES.getResAsync("catch_entity_mp3", this.onResSoundCatchLoaded, this);
        } 
    }

    public tbReset :eui.Image;
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_5: eui.Image;
    public item_6: eui.Image;
    public item_7: eui.Image;

    public item_10: eui.Image;
    public item_11: eui.Image;
    public item_12: eui.Image;
    public item_13: eui.Image;
    public item_14: eui.Image;
    public item_15: eui.Image;
    public item_16: eui.Image;
    public item_17: eui.Image;

    public resultPos0: eui.Component;
    public resultPos1: eui.Component;
    public resultPos2: eui.Component;
    public resultPos3: eui.Component;
    public resultPos4: eui.Component;
    public resultPos5: eui.Component;
    public resultPos6: eui.Component;
    public resultPos7: eui.Component;

    public countLabel: eui.Label;
    
    private clickCount:number;
    private rightNum:number;
    private interactiveCount:number;
    private lastInteractiveImg:eui.Image;
    private chooseNumL: Array<number> = []; 
    private rotationNuml: Array<number> = [];
    private catchSound: egret.Sound;
    private truePosL: Array<eui.Component> = [];
    private falsePosL: Array<eui.Component> = [];

    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);     
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boneClick, this);
           
        }

        this.refresh(); 
        super.initUI();
    }
    
    public destroy(): void {
        this.removeAllFilters();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boneClick, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        super.destroy();
    }

    private onResSoundCatchLoaded():void
    {
        this.catchSound = RES.getRes("catch_entity_mp3"); 
    }

    public refresh():void
    {
        this.clickCount = 0;
        this.countLabel.text = this.clickCount.toString();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tImg);
            }
        }
        this.setAllImageTouch(true);
        this.resetAllImagePos();
        this.chooseNumL.splice(0, this.chooseNumL.length);

        this.truePosL.splice(0, this.truePosL.length);
        for(var i:number = 0; i< this.interactiveCount/2; ++i){
            this.truePosL.push(this.getResultPos(i));
        }

        this.falsePosL.splice(0, this.falsePosL.length);
        for(var i:number = this.interactiveCount/2; i< this.interactiveCount; ++i){
            this.falsePosL.push(this.getResultPos(i));
        }
    }

    private jsonData:JSON;
    private boneClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"503",type:"3",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
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

    //返回BgImg的引用;
    //BgImg:暂存Img位置的img;
    private getInteractBgImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_10;
            case 1:
                return this.item_11;
            case 2:
                return this.item_12;
            case 3:
                return this.item_13;
            case 4:
                return this.item_14;
            case 5:
                return this.item_15;
            case 6:
                return this.item_16;
            case 7:
                return this.item_17;
            default:
                return  this.item_10;
        }
    }

    private getResultPos(index: number):eui.Component
    {
        switch(index)
        {
            case 0:
                return this.resultPos0;
            case 1:
                return this.resultPos1;
            case 2:
                return this.resultPos2;
            case 3:
                return this.resultPos3;
            case 4:
                return this.resultPos4;
            case 5:
                return this.resultPos5;
            case 6:                
                return this.resultPos6;
            case 7:
                return this.resultPos7;
            default:
                return this.resultPos0;
        }
    }

    private getPosition(flag: boolean):eui.Component{
        if(flag){
            return this.truePosL.pop();
        }else{
            return this.falsePosL.pop();
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
            tImg.rotation = this.rotationNuml[i];
            tImg.scaleX = 1;
            tImg.scaleY = 1;
        }
    }

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "503":
            {   
                if(null != this.catchSound)
                {
                    this.catchSound.play(0,1);
                }
                this.dealBoneClick(data['targetIndex']);
            }
            break;
            case "99":
            {
                SoundManager.sound().PlayClick();
                this.refresh();
            }
            break;          
        }
    }

    private dealBoneClick(tTargetIndex:number)
    {
        var isRight = this.jsonData['catch_bone_info']['items'][tTargetIndex].isRight;
        if(isRight)
        {
            this.clickCount++;
            this.countLabel.text = this.clickCount.toString();
        }
        var tResult:eui.Component  = this.getPosition(isRight);
        var tImage :eui.Image = this.getInteractImg(tTargetIndex);

        egret.Tween.get(tImage).to({x : tResult.x , y : tResult.y }, 500);
        egret.Tween.get(tImage).to({rotation: parseInt(tImage.name)*45+30}, 500);
        egret.Tween.get(tImage).to({scaleX: 0.5, scaleY: 0.5}, 500);

        tImage.filters = [];
        tImage.touchEnabled = false;

        this.chooseNumL.push(tTargetIndex);
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
}