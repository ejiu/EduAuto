  /**
    * 游戏容器类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * EgerPro显示对象层级
    * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
    * 
    */
declare function mouseClickIn(tStageX,tStageY);
declare function mouseDownIn(tStageX,tStageY);
declare function mouseMoveIn(tStageX,tStageY);
declare function mouseUpIn(tStageX,tStageY);
class GameLayerManager extends eui.UILayer{

    // 场景层 如 战场、主城、副本战场之类的
    public sceneLayer:eui.UILayer = new eui.UILayer();
    // 主UI层 如 底部功能栏
    public mainLayer:eui.UILayer = new eui.UILayer();
    // 弹窗层 如 设置、背包、装备之类的
    public panelLayer:eui.UILayer = new eui.UILayer();
    // 特效层 如 闪烁、飘字之类的
    public effectLayer:eui.UILayer = new eui.UILayer();   
    // 加载遮罩层 场景切换的时候加载资源UI
    public loadLayer:eui.UILayer = new eui.UILayer();

    private static _instance:GameLayerManager; 
    private factor:number = 1;

    //构造方法
    public constructor(){
        super();
        this.init();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseTouchMove, this);
        document.addEventListener('mousemove',this.mouseMove);
    }

    private mouseClick(evt:egret.TouchEvent)
    {
        mouseClickIn(Math.floor(evt.stageX*this.factor),Math.floor(evt.stageY*this.factor));         
    }

    private mouseDown(evt:egret.TouchEvent)
    {  
        this.factor = document.body.clientWidth/GameConfig.curStage().stageWidth;   
        mouseDownIn(Math.floor(evt.stageX*this.factor),Math.floor(evt.stageY*this.factor));         
    }

    private mouseMove(evt:MouseEvent)
    { 
        mouseMoveIn(Math.floor(evt.x),Math.floor(evt.y));        
    }

    private mouseTouchMove(evt:egret.TouchEvent)
    { 
        mouseMoveIn(Math.floor(evt.stageX*this.factor),Math.floor(evt.stageY*this.factor));  
    }      
    

    private mouseUp(evt:egret.TouchEvent)
    {   
        mouseUpIn(Math.floor(evt.stageX*this.factor),Math.floor(evt.stageY*this.factor));      
    }

    //游戏容器管理器单例
    public static gameLayer():GameLayerManager  
    {  
        if(!this._instance)  
            this._instance = new GameLayerManager();  
        return this._instance;  
    }  

    //初始化场景类
    public init():void {

        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.mainLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.loadLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.loadLayer);
    }

    public gameStart(): void
    {
       this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSoundHandler, this);
        PageMgr.pageMgr().init();
    }
    /*
    //首次进入的声音问题
    private firstSoundChannel:egret.SoundChannel;*/ 

    private playSoundHandler(event:egret.TouchEvent):void{
        SoundManager.sound().PlayClick();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSoundHandler,this);
    }
       
}

