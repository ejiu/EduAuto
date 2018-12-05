// TypeScript file
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
var WordInterpretPanel = (function (_super) {
    __extends(WordInterpretPanel, _super);
    function WordInterpretPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "WordInterpretSkin";
        _this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeClick, _this);
        return _this;
    }
    WordInterpretPanel.popups = function () {
        if (null == WordInterpretPanel._instance)
            WordInterpretPanel._instance = new WordInterpretPanel();
        return WordInterpretPanel._instance;
    };
    WordInterpretPanel.prototype.showFrame = function (imgRes) {
        SoundManager.sound().PlayPopups();
        if (GlobalData.isTeacher()) {
            this.close.visible = true;
            this.close.touchEnabled = true;
        }
        else {
            this.close.visible = false;
        }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.f_Img.source = imgRes;
    };
    WordInterpretPanel.prototype.closeClick = function (evt) {
        var msg = JSON.stringify({ pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "202", type: "2" });
        PageMgr.sendMsg(msg);
    };
    WordInterpretPanel.prototype.closeFrame = function () {
        if (null != this.parent) {
            SoundManager.sound().PlayClick();
            this.close.touchEnabled = false;
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    };
    WordInterpretPanel.prototype.destroy = function () {
        if (null != this.parent) {
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    };
    return WordInterpretPanel;
}(eui.Component));
__reflect(WordInterpretPanel.prototype, "WordInterpretPanel");
//# sourceMappingURL=WordInterpretPanel.js.map