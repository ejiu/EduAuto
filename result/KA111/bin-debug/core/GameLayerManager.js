var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameLayerManager = (function (_super) {
    __extends(GameLayerManager, _super);
    //构造方法
    function GameLayerManager() {
        var _this = _super.call(this) || this;
        // 场景层 如 战场、主城、副本战场之类的
        _this.sceneLayer = new eui.UILayer();
        // 主UI层 如 底部功能栏
        _this.mainLayer = new eui.UILayer();
        // 弹窗层 如 设置、背包、装备之类的
        _this.panelLayer = new eui.UILayer();
        // 特效层 如 闪烁、飘字之类的
        _this.effectLayer = new eui.UILayer();
        // 加载遮罩层 场景切换的时候加载资源UI
        _this.loadLayer = new eui.UILayer();
        _this.factor = 1;
        _this.init();
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.mouseClick, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseTouchMove, _this);
        document.addEventListener('mousemove', _this.mouseMove);
        return _this;
    }
    GameLayerManager.prototype.mouseClick = function (evt) {
        mouseClickIn(Math.floor(evt.stageX * this.factor), Math.floor(evt.stageY * this.factor));
    };
    GameLayerManager.prototype.mouseDown = function (evt) {
        this.factor = document.body.clientWidth / GameConfig.curStage().stageWidth;
        mouseDownIn(Math.floor(evt.stageX * this.factor), Math.floor(evt.stageY * this.factor));
    };
    GameLayerManager.prototype.mouseMove = function (evt) {
        mouseMoveIn(Math.floor(evt.x), Math.floor(evt.y));
    };
    GameLayerManager.prototype.mouseTouchMove = function (evt) {
        mouseMoveIn(Math.floor(evt.stageX * this.factor), Math.floor(evt.stageY * this.factor));
    };
    GameLayerManager.prototype.mouseUp = function (evt) {
        mouseUpIn(Math.floor(evt.stageX * this.factor), Math.floor(evt.stageY * this.factor));
    };
    //游戏容器管理器单例
    GameLayerManager.gameLayer = function () {
        if (!this._instance)
            this._instance = new GameLayerManager();
        return this._instance;
    };
    //初始化场景类
    GameLayerManager.prototype.init = function () {
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
    };
    GameLayerManager.prototype.gameStart = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSoundHandler, this);
        PageMgr.pageMgr().init();
    };
    /*
    //首次进入的声音问题
    private firstSoundChannel:egret.SoundChannel;*/
    GameLayerManager.prototype.playSoundHandler = function (event) {
        SoundManager.sound().PlayClick();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSoundHandler, this);
    };
    return GameLayerManager;
}(eui.UILayer));
__reflect(GameLayerManager.prototype, "GameLayerManager");
//# sourceMappingURL=GameLayerManager.js.map