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
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "TestSkin";
        _this.prev.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.prevClick, _this);
        _this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextClick, _this);
        _this.turn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnClick, _this);
        _this.current.text = "page" + PageMgr.curPage() + "/" + PageMgr.allPage();
        return _this;
    }
    TestPanel.test = function () {
        if (null == TestPanel._instance)
            TestPanel._instance = new TestPanel();
        return TestPanel._instance;
    };
    TestPanel.prototype.prevClick = function (evt) {
        PageMgr.prevPage();
        this.current.text = "page" + PageMgr.curPage() + "/" + PageMgr.allPage();
    };
    TestPanel.prototype.nextClick = function (evt) {
        PageMgr.nextPage();
        this.current.text = "page" + PageMgr.curPage() + "/" + PageMgr.allPage();
    };
    TestPanel.prototype.turnClick = function (evt) {
        PageMgr.turnPage(PageMgr.curPage() + 5);
        this.current.text = "page" + PageMgr.curPage() + "/" + PageMgr.allPage();
    };
    return TestPanel;
}(eui.Component));
__reflect(TestPanel.prototype, "TestPanel");
//# sourceMappingURL=TestPanel.js.map