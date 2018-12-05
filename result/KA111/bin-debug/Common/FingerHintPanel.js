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
var FingerHintPanel = (function (_super) {
    __extends(FingerHintPanel, _super);
    function FingerHintPanel() {
        var _this = _super.call(this) || this;
        _this.finger = new eui.Image;
        _this.finger.source = "preload_json.finger";
        GameLayerManager.gameLayer().panelLayer.addChild(_this);
        return _this;
    }
    FingerHintPanel.finger = function () {
        if (null == FingerHintPanel._instance) {
            FingerHintPanel._instance = new FingerHintPanel();
        }
        return FingerHintPanel._instance;
    };
    FingerHintPanel.prototype.showFingerMove = function (tBeginPoint, tEndPoint, tMoveTime) {
        this.beginPoint = tBeginPoint;
        this.endPoint = tEndPoint;
        this.finger.x = tBeginPoint.x;
        this.finger.y = tBeginPoint.y;
        this.moveTime = tMoveTime;
        this.addChild(this.finger);
        egret.Tween.get(this.finger).to({ x: this.endPoint.x, y: this.endPoint.y }, tMoveTime).call(this.revMove, this);
    };
    FingerHintPanel.prototype.revMove = function () {
        var offsetx = this.beginPoint.x + 2 * (this.endPoint.x - this.beginPoint.x) / 3.0;
        var offsety = this.beginPoint.y + 2 * (this.endPoint.y - this.beginPoint.y) / 3.0;
        egret.Tween.get(this.finger).to({ x: offsetx, y: offsety, scaleX: 1.2, scaleY: 1.2 }, this.moveTime / 5).call(this.revMove2, this);
    };
    FingerHintPanel.prototype.revMove2 = function () {
        egret.Tween.get(this.finger).to({ x: this.beginPoint.x, y: this.beginPoint.y, scaleX: 1, scaleY: 1 }, this.moveTime / 4).call(this.secMove, this);
    };
    FingerHintPanel.prototype.secMove = function () {
        egret.Tween.get(this.finger).to({ x: this.endPoint.x, y: this.endPoint.y }, this.moveTime).call(this.endMove, this);
    };
    FingerHintPanel.prototype.endMove = function () {
        if (null != this.finger.parent) {
            this.removeChild(this.finger);
        }
    };
    FingerHintPanel.prototype.destroy = function () {
        egret.Tween.removeTweens(this.finger);
        this.removeChildren();
    };
    return FingerHintPanel;
}(eui.Component));
__reflect(FingerHintPanel.prototype, "FingerHintPanel");
//# sourceMappingURL=FingerHintPanel.js.map