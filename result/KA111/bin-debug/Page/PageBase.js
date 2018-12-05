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
var PageBase = (function (_super) {
    __extends(PageBase, _super);
    function PageBase() {
        var _this = _super.call(this) || this;
        _this.pageId = 0;
        _this.isLoadRes = false;
        return _this;
    }
    PageBase.prototype.receiveMsg = function (msg) {
    };
    /**
     * 初始化面板ui
     */
    PageBase.prototype.initUI = function () {
        TitleInfoPanel.titleInfo().addTitleInfo(this.pageId);
        if (GlobalData.isTeacher()) {
            TipsPanel.tips().addTipsInfo(this.pageId);
        }
        StudentPosPanel.studentPos().showStudentPos(this.pageId);
        this.getNextResLoad();
        callbackInPageLoaded(true, StudentPosPanel.studentPos().hasInteraction());
    };
    PageBase.prototype.setAuthority = function (tAuthority) {
    };
    PageBase.prototype.getNextResLoad = function () {
        var count = 3;
        var nextPageId = 0;
        var nextPage;
        for (var i = 0; i < count;) {
            i++;
            var nextPageId = this.pageId + i;
            if (nextPageId > PageMgr.pageMgr().pageNum) {
                nextPageId = 1;
            }
            nextPage = PageMgr.pageMgr().getPage(nextPageId);
            nextPage.getResLoad();
        }
    };
    PageBase.prototype.getResLoad = function () {
        if (this.isLoadRes) {
            return;
        }
        var jsonData = RES.getRes("page_info_json");
        var pageInfo = jsonData['page' + this.pageId];
        var resCount = 0;
        if (null != pageInfo) {
            resCount = pageInfo['resources'].length;
        }
        for (var i = 0; i < resCount; ++i) {
            RES.getResAsync(pageInfo['resources'][i], this.onResLoaded, this);
        }
        this.isLoadRes = true;
    };
    PageBase.prototype.onResLoaded = function () {
    };
    /**
     * 面板关闭后需要销毁的对象
     */
    PageBase.prototype.destroy = function () {
        FingerHintPanel.finger().destroy();
        PopupsPanel.popups().destroy();
        WordInterpretPanel.popups().destroy();
    };
    return PageBase;
}(eui.Component));
__reflect(PageBase.prototype, "PageBase");
//# sourceMappingURL=PageBase.js.map