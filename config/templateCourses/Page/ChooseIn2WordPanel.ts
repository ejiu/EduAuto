class ChooseIn2WordPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChooseIn2WordSkin";
    }
    
    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);

        this.firstWords0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.firstWordsClick, this);
        this.firstWords1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.firstWordsClick, this);
        this.secWords0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.secWordsClick, this);
        this.secWords1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.secWordsClick, this);
        this.refresh();
        super.initUI();  
    }

    public firstWords0:eui.Label;
    public firstWords1:eui.Label;
    public secWords0:eui.Label;
    public secWords1:eui.Label;
    public tbReset :eui.Image;
    public firstBg0 :eui.Image;
    public firstBg1 :eui.Image;
    public secBg1 :eui.Image;
    public secBg0 :eui.Image;
    
    private normalResImg:string = "preload_json.frame01_01";
    private chooseResImg:string = "preload_json.frame01_02";
    
    public refresh():void
    {
        
        if(GlobalData.bAuthority)
        {
            EffectUtils.useGlow(this.firstBg0);
            EffectUtils.useGlow(this.firstBg1);
            EffectUtils.useGlow(this.secBg1);
            EffectUtils.useGlow(this.secBg0);
        }
        else
        {
            this.firstBg0.filters = [];
            this.firstBg1.filters = [];
            this.secBg1.filters = [];
            this.secBg0.filters = [];
        }
        this.setAllWordTouch(true);
        this.firstBg0.source = this.normalResImg;
        this.firstBg1.source = this.normalResImg;
        this.secBg0.source = this.normalResImg;
        this.secBg1.source = this.normalResImg;
    }

    private setAllWordTouch(bTouchEnable):void
    {   
        this.firstWords0.touchEnabled = bTouchEnable;
        this.firstWords1.touchEnabled = bTouchEnable;
        this.secWords0.touchEnabled = bTouchEnable;
        this.secWords1.touchEnabled = bTouchEnable;
    }

    private refreshClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
    }

    private firstWordsClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1201",type:"3",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
    }

    private secWordsClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1202",type:"3",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
    }
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1201":
            {
                this.dealFirstWordChoose(data['targetIndex']);
            }
            break;
            case "99":
            {
                SoundManager.sound().PlayClick();
                this.refresh();
            }
            break;
            case "1202":
            {
                this.dealSecWordChoose(data['targetIndex']);
            }            
            break;            
        }
    }

    private dealFirstWordChoose(tTargetIndex:number):void
    {
        SoundManager.sound().PlayClick();
        this.firstWords0.touchEnabled = false;
        this.firstWords1.touchEnabled = false;
        this.firstBg0.filters = [];
        this.firstBg1.filters = [];
        if(tTargetIndex < 10)
        {
            this.firstBg0.source = this.chooseResImg;
        }
        else
        {            
            this.firstBg1.source = this.chooseResImg;
        }
    }

    private dealSecWordChoose(tTargetIndex:number):void
    {
        SoundManager.sound().PlayClick();
        this.secWords0.touchEnabled = false;
        this.secWords1.touchEnabled = false;
        this.secBg1.filters = [];
        this.secBg0.filters = [];
        if(tTargetIndex < 10)
        {
            this.secBg0.source = this.chooseResImg;
        }
        else
        {            
            this.secBg1.source = this.chooseResImg;
        }
    }


    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            if(this.firstWords0.touchEnabled)
            {
                EffectUtils.useGlow(this.firstBg0);
                EffectUtils.useGlow(this.firstBg1);
            }
            if(this.secWords0.touchEnabled)
            {
                EffectUtils.useGlow(this.secBg1);
                EffectUtils.useGlow(this.secBg0);
            }
        }
        else
        {
            this.firstBg0.filters = [];
            this.firstBg1.filters = [];
            this.secBg1.filters = [];
            this.secBg0.filters = [];
        }
    }

    public destroy(): void {        
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.firstWords0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.firstWordsClick, this);
        this.firstWords1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.firstWordsClick, this);
        this.secWords0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.secWordsClick, this);
        this.secWords1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.secWordsClick, this);
        super.destroy();
    }
}