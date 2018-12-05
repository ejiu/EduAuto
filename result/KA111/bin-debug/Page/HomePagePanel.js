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
var HomePagePanel = (function (_super) {
    __extends(HomePagePanel, _super);
    function HomePagePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomePageSkin";
        var betty = new Role("betty", _this);
        betty.posX = 780;
        betty.posY = 680;
        betty.scaleX = -0.8;
        betty.scaleY = 0.8;
        betty.loadRes();
        return _this;
    }
    HomePagePanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        //循环播放动画
        for (var key in this.beginGroup.items) {
            this.beginGroup.items[key].props = { loop: true };
        }
        this.beginGroup.play();
        this.className.textFlow = [
            { text: "Junior Level A\nStarting School 1", style: { "strokeColor": 0xffffff, stroke: 4 } }
        ];
    };
    HomePagePanel.prototype.destroy = function () {
        this.beginGroup.stop();
        _super.prototype.destroy.call(this);
    };
    return HomePagePanel;
}(PageBase));
__reflect(HomePagePanel.prototype, "HomePagePanel");
//# sourceMappingURL=HomePagePanel.js.map