// TypeScript file

class TipsPanel extends eui.Component {
    private static _instance: TipsPanel;
    public static tips(): TipsPanel {
        if(null == TipsPanel._instance)
        {
            TipsPanel._instance = new TipsPanel();
        }
        return TipsPanel._instance;
    }

    public constructor() {
        super();
        this.skinName = "TipsSkin";
        GameLayerManager.gameLayer().effectLayer.addChild(this);
        this.jsonData = RES.getRes("page_info_json");
    }

    public tipsText:eui.Label;
    public tipsGroup:eui.Group;  
    public hint: eui.Image;
    public close: eui.Image;
    private jsonData: JSON;
    

    public addTipsInfo(pageId:number):void
    {        
        var pageInfo = this.jsonData['page'+pageId];
        var hasTips:boolean = false;
        if(null != pageInfo)
        {
            var tips = pageInfo['tips'];
            if(null != tips)
            {
                hasTips = true;
                this.visible = true;
                this.addText(tips);
                this.tipsGroup.scaleY = 0;
                this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
            }
        }
        if(!hasTips)
        {
            this.visible = false;
        }
    }

    private addText(tTips:string): void{        
        //this.tipsText.text = tTips;
        this.tipsText.textFlow = new egret.HtmlTextParser().parser(tTips);        
    }

    private closeClick(evt:egret.TouchEvent)
    {
        this.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
        egret.Tween.get(this.tipsGroup).to({scaleY:0},500,egret.Ease.quadOut);
        SoundManager.sound().PlayClick();
    } 

    private hintClick(evt:egret.TouchEvent)
    {
        this.hint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        egret.Tween.get(this.tipsGroup).to({scaleY:1},500,egret.Ease.quadOut);
        SoundManager.sound().PlayClick();
    }     

}