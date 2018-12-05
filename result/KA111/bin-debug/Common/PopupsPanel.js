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
var PopupsPanel = (function (_super) {
    __extends(PopupsPanel, _super);
    function PopupsPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PopupsSkin";
        _this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeClick, _this);
        return _this;
    }
    PopupsPanel.popups = function () {
        if (null == PopupsPanel._instance)
            PopupsPanel._instance = new PopupsPanel();
        return PopupsPanel._instance;
    };
    PopupsPanel.prototype.showFrame = function (imgRes, titleText) {
        SoundManager.sound().PlayPopups();
        if (GlobalData.isTeacher()) {
            this.close.visible = true;
            this.close.touchEnabled = true;
        }
        else {
            this.close.visible = false;
        }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showText.text = titleText;
        this.showImg.source = imgRes;
    };
    PopupsPanel.prototype.showTextFlowFrame = function (imgRes, titleTextFlow) {
        SoundManager.sound().PlayPopups();
        if (GlobalData.isTeacher()) {
            this.close.visible = true;
            this.close.touchEnabled = true;
        }
        else {
            this.close.visible = false;
        }
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showText.textFlow = titleTextFlow;
        this.showImg.source = imgRes;
    };
    PopupsPanel.prototype.closeClick = function (evt) {
        var msg = JSON.stringify({ pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "202", type: "2" });
        PageMgr.sendMsg(msg);
    };
    PopupsPanel.prototype.closeFrame = function () {
        if (null != this.parent) {
            SoundManager.sound().PlayClick();
            this.close.touchEnabled = false;
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    };
    PopupsPanel.prototype.destroy = function () {
        if (null != this.parent) {
            GameLayerManager.gameLayer().panelLayer.removeChild(this);
        }
    };
    return PopupsPanel;
}(eui.Component));
__reflect(PopupsPanel.prototype, "PopupsPanel");
//# sourceMappingURL=PopupsPanel.js.map