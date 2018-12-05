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
var TitleInfoPanel = (function (_super) {
    __extends(TitleInfoPanel, _super);
    function TitleInfoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "TitleInfoSkin";
        GameLayerManager.gameLayer().panelLayer.addChild(_this);
        _this.jsonData = RES.getRes("page_info_json");
        return _this;
    }
    TitleInfoPanel.titleInfo = function () {
        if (null == TitleInfoPanel._instance) {
            TitleInfoPanel._instance = new TitleInfoPanel();
        }
        return TitleInfoPanel._instance;
    };
    TitleInfoPanel.prototype.addTitleInfo = function (pageId) {
        var pageInfo = this.jsonData['page' + pageId];
        var hasTitle = false;
        if (null != pageInfo) {
            var mainTitle = pageInfo['mainTitle'];
            if (null != mainTitle) {
                hasTitle = true;
                this.visible = true;
                this.addText(mainTitle, pageInfo['time'], pageInfo['secTitle']);
            }
        }
        if (!hasTitle) {
            this.visible = false;
        }
    };
    TitleInfoPanel.prototype.addText = function (mainText, timeText, secText) {
        var mainTitle = mainText;
        if (GlobalData.isTeacher() && null != timeText) {
            mainTitle += " (" + timeText + ")";
        }
        this.titleText.text = mainTitle;
        this.secText.text = secText;
    };
    return TitleInfoPanel;
}(eui.Component));
__reflect(TitleInfoPanel.prototype, "TitleInfoPanel");
//# sourceMappingURL=TitleInfoPanel.js.map