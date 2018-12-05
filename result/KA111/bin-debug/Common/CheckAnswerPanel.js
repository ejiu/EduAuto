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
var CheckAnswerPanel = (function (_super) {
    __extends(CheckAnswerPanel, _super);
    function CheckAnswerPanel() {
        var _this = _super.call(this) || this;
        _this.checks = [];
        GameLayerManager.gameLayer().panelLayer.addChild(_this);
        return _this;
    }
    CheckAnswerPanel.checkAnswer = function () {
        if (null == CheckAnswerPanel._instance) {
            CheckAnswerPanel._instance = new CheckAnswerPanel();
        }
        return CheckAnswerPanel._instance;
    };
    CheckAnswerPanel.prototype.showResult = function (tPoint, isRight) {
        var checkImg = new eui.Image;
        if (isRight) {
            var factory = GameMaths.addArmatureToFactory("right");
            var armatureDisplay = factory.buildArmatureDisplay("Sprite", "right");
            this.addChild(armatureDisplay);
            armatureDisplay.x = tPoint.x;
            armatureDisplay.y = tPoint.y;
            armatureDisplay.animation.play("Sprite");
        }
        else {
            var factory = GameMaths.addArmatureToFactory("error");
            var armatureDisplay = factory.buildArmatureDisplay("Sprite", "error");
            this.addChild(armatureDisplay);
            armatureDisplay.x = tPoint.x;
            armatureDisplay.y = tPoint.y;
            armatureDisplay.animation.play("Sprite");
        }
    };
    CheckAnswerPanel.prototype.destroy = function () {
        this.removeChildren();
    };
    return CheckAnswerPanel;
}(eui.Component));
__reflect(CheckAnswerPanel.prototype, "CheckAnswerPanel");
//# sourceMappingURL=CheckAnswerPanel.js.map