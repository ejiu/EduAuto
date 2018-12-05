// TypeScript file

class WordInterpretPanel extends eui.Component {
    private static _instance: WordInterpretPanel;
    public static popups(): WordInterpretPanel {
        if(null == WordInterpretPanel._instance)
            WordInterpretPanel._instance = new WordInterpretPanel();
        return WordInterpretPanel._instance;
    }
    public constructor() {
        super();
        this.skinName = "WordInterpretSkin";
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
    }

    public showFrame(imgRes:string): void {    
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
        this.f_Img.source=imgRes;
    }   


    public close: eui.Image;
    public f_Img:eui.Image;

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