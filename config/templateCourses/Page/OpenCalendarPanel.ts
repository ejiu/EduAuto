// TypeScript file

class OpenCalendarPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "OpenCalendarSkin";  
        this.jsonData = RES.getRes("page_info_json"); 
        this.pageNum = this.jsonData['open_calendar_info']['cards'].length;  
    }

    public initUI(): void {        
        this.index = 0;
        this.ImgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEventHandler, this);
        this.ImgFront.skewX = 270; 
        this.Img.source = this.jsonData['open_calendar_info']['cards'][this.index];
        if(GlobalData.bAuthority)
        {
            EffectUtils.useGlow(this.ImgBg);
        }
        else
        {
            this.ImgBg.filters = [];
        }
        super.initUI();
    }

    public destroy(): void {
        super.destroy();
        this.ImgBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEventHandler, this);
    }

    public Img: eui.Image;
    public ImgBg: eui.Image;
    public ImgFront: eui.Image;
    private index:number;
    private jsonData: JSON;
    private pageNum:number;

    private clickEventHandler(evt:egret.TextEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"802",type:"2",cardId:this.index});
        PageMgr.sendMsg(msg);  
    } 

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {   
            case "802":
            {
                SoundManager.sound().PlayClick();
                this.openClick(data['cardId']);
            }
            break;      
        }
    }

    private openClick(tCardId:number) : void
    {   
        this.index = tCardId;
        egret.Tween.removeTweens(this.ImgFront);
        this.ImgFront.scaleY = 1;
        this.ImgFront.skewY = 0;
        this.ImgFront.skewX = 0;        
        egret.Tween.get(this.ImgFront).to({skewX:270},500);
        this.index++;
        if(this.index >= this.pageNum)
        {
            this.index = 0;
        }
        this.Img.source = this.jsonData['open_calendar_info']['cards'][this.index];   
    } 

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
             EffectUtils.useGlow(this.ImgBg);
        }
        else
        {
            this.ImgBg.filters = [];
        }
    }
}