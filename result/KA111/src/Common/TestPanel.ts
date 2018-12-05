// TypeScript file

class TestPanel extends eui.Component {
    private static _instance: TestPanel;
    public current:eui.Label;
    public static test(): TestPanel {
        if(null == TestPanel._instance)
            TestPanel._instance = new TestPanel();        
        return TestPanel._instance;
    }
    public constructor() {
        super();
        this.skinName = "TestSkin";
        this.prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prevClick, this);
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextClick, this);
        this.turn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnClick, this);
        this.current.text="page"+PageMgr.curPage()+"/"+PageMgr.allPage();
    }   

    public prev: eui.Image;
    public next: eui.Image;
    public turn: eui.Image;

    public prevClick(evt:egret.TouchEvent)
    {
        PageMgr.prevPage();
        this.current.text="page"+PageMgr.curPage()+"/"+PageMgr.allPage();
    } 

    public nextClick(evt:egret.TouchEvent)
    {
        PageMgr.nextPage();
        this.current.text="page"+PageMgr.curPage()+"/"+PageMgr.allPage();
    } 

    public turnClick(evt:egret.TouchEvent)
    {
        PageMgr.turnPage(PageMgr.curPage()+5);
        this.current.text="page"+PageMgr.curPage()+"/"+PageMgr.allPage();
    } 
}