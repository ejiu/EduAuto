// TypeScript file

class CatchEntityPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "CatchEntitySkin";   
        // this.label0.textFlow = <Array<egret.ITextElement>>[
        //     // { text: "volleyball" },
        //     { text: "Right", style: { "textColor": 0x0066C9} },
        //     { text:" , /r/!" }
        // ];        
        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['catch_entity_info']['items'].length;
        this.catchNum = this.jsonData['catch_entity_info']['catchNum'];
        var tImg:eui.Image;
        var tBgImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);      
            tImg.source = this.jsonData['catch_entity_info']['items'][i];

            tBgImg = this.getInteractBgImg(i);
            tBgImg.source = this.jsonData['catch_entity_info']['items'][i]; 
            tBgImg.x = tImg.x;
            tBgImg.y = tImg.y;
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

    public label0: eui.Label;
    public tbReset :eui.Image;
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

    private catchNum:number;
    private interactiveCount:number;
    private dragCount:number;
    private lastInteractiveImg:eui.Image;
    
    public resultPos_0: eui.Component;
    public resultPos_1: eui.Component;
    public resultPos_2: eui.Component;
    public resultPos_3: eui.Component;

    
    private chooseNumL: Array<number> = []; 

    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.entityClick, this);
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);     
        this.refresh(); 
        super.initUI();
    }
    
    public destroy(): void {
        this.removeAllFilters();
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);    
            tImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.entityClick, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        super.destroy();
    }

    public refresh():void
    {
        this.dragCount = 0;
        var tImg:eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            tImg.scaleX = 1;
            tImg.scaleY = 1;
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tImg);
            }
        }

        this.setAllImageTouch(true);
        this.resetAllImagePos();
        this.chooseNumL.splice(0, this.chooseNumL.length);
    }

    private jsonData:JSON;
    private entityClick(evt:egret.TouchEvent)
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
            case 6:
                return this.item_14;
            case 7:
                return this.item_15;
            default:
                return  this.item_8;
        }
    }

    private getResultPos(num:number):eui.Component
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
            case "503":
            {   
                SoundManager.sound().PlayDrag();
                this.dealEntityClick(data['targetIndex']);
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


    private dealEntityClick(tTargetIndex:number)
    {
        var tImage :eui.Image = this.getInteractImg(tTargetIndex);
        tImage.filters = [];
        var tResult:eui.Component = this.getResultPos(this.dragCount);
        tImage.x = tResult.x;
        tImage.y = tResult.y;
        tImage.scaleX = 0.8;
        tImage.scaleY = 0.8;
        tImage.touchEnabled = false;
        this.dragCount++;
        if(this.dragCount == this.catchNum)
        {
            this.setAllImageTouch(false);
            this.removeAllFilters();
        }
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