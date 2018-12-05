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
var TipsPanel = (function (_super) {
    __extends(TipsPanel, _super);
    function TipsPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "TipsSkin";
        GameLayerManager.gameLayer().effectLayer.addChild(_this);
        _this.jsonData = RES.getRes("page_info_json");
        return _this;
    }
    TipsPanel.tips = function () {
        if (null == TipsPanel._instance) {
            TipsPanel._instance = new TipsPanel();
        }
        return TipsPanel._instance;
    };
    TipsPanel.prototype.addTipsInfo = function (pageId) {
        var pageInfo = this.jsonData['page' + pageId];
        var hasTips = false;
        if (null != pageInfo) {
            var tips = pageInfo['tips'];
            if (null != tips) {
                hasTips = true;
                this.visible = true;
                this.addText(tips);
                this.tipsGroup.scaleY = 0;
                this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
            }
        }
        if (!hasTips) {
            this.visible = false;
        }
    };
    TipsPanel.prototype.addText = function (tTips) {
        //this.tipsText.text = tTips;
        this.tipsText.textFlow = new egret.HtmlTextParser().parser(tTips);
    };
    TipsPanel.prototype.closeClick = function (evt) {
        this.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
        egret.Tween.get(this.tipsGroup).to({ scaleY: 0 }, 500, egret.Ease.quadOut);
        SoundManager.sound().PlayClick();
    };
    TipsPanel.prototype.hintClick = function (evt) {
        this.hint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hintClick, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        egret.Tween.get(this.tipsGroup).to({ scaleY: 1 }, 500, egret.Ease.quadOut);
        SoundManager.sound().PlayClick();
    };
    return TipsPanel;
}(eui.Component));
__reflect(TipsPanel.prototype, "TipsPanel");
//# sourceMappingURL=TipsPanel.js.map