// TypeScript file

class PopupsPanel extends eui.Component {
    private static _instance: PopupsPanel;
    public static popups(): PopupsPanel {
        if(null == PopupsPanel._instance)
            PopupsPanel._instance = new PopupsPanel();
        return PopupsPanel._instance;
    }
    public constructor() {
        super();
        this.skinName = "PopupsSkin";
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
    }

    public showFrame(imgRes:string,titleText:string): void {    
        SoundManager.sound().PlayPopups(); 
        if(GlobalData.isTeacher())
        {
            this.close.visible = true;
            this.close.touchEnabled = true;   
        }
        else
        {
            this.close.visible = false;
        }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showText.text = titleText;
        this.showImg.source = imgRes;
    }  

    public showTextFlowFrame(imgRes:string,titleTextFlow:egret.ITextElement[]): void {    
        SoundManager.sound().PlayPopups(); 
        if(GlobalData.isTeacher())
        {
            this.close.visible = true;
            this.close.touchEnabled = true;   
        }
        else
        {
            this.close.visible = false;
        }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showText.textFlow = titleTextFlow;
        this.showImg.source = imgRes;
    }   

    public showImg: eui.Image;
    public close: eui.Image;
    public showText:eui.Label;

    private closeClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"202",type:"2"});
        PageMgr.sendMsg(msg);  
    } 

    public closeFrame()
    {  
        if(null != this.parent)
        {    
            SoundManager.sound().PlayClick();
            this.close.touchEnabled = false;         
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    }

    public  destroy(): void {
        if(null != this.parent)
        { 
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    } 
}
