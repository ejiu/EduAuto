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
var HomeworkPanel15 = (function (_super) {
    __extends(HomeworkPanel15, _super);
    // public label1: eui.Label;
    // public label2: eui.Label;
    function HomeworkPanel15() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeworkSkin15";
        return _this;
        // this.label1.textFlow = <Array<egret.ITextElement>>[
        //     { text: "I " },
        //     { text: "watch fireworks", style: { "textColor": 0x0066C9, "underline": true } },
        //     { text: " during the Chinese New Year." }
        // ];
        // this.label2.textFlow = <Array<egret.ITextElement>>[
        //     { text: "o-e [long’o’ ]\nh" },
        //     { text: "o", style: { "textColor": 0x0066C9} },
        //     { text: "m"},
        //     { text: "e", style: { "textColor": 0x0066C9} },
        //     { text: ", b" },
        //     { text: "o", style: { "textColor": 0x0066C9} },
        //     { text: "n"},
        //     { text: "e", style: { "textColor": 0x0066C9} },
        // ]
    }
    HomeworkPanel15.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    HomeworkPanel15.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return HomeworkPanel15;
}(PageBase));
__reflect(HomeworkPanel15.prototype, "HomeworkPanel15");
//# sourceMappingURL=HomeworkPanel15.js.map