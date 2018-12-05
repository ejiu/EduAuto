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
var StudentPosPanel = (function (_super) {
    __extends(StudentPosPanel, _super);
    function StudentPosPanel() {
        var _this = _super.call(this) || this;
        _this.posLInfo = [];
        _this.usePosLInfo = [];
        GameLayerManager.gameLayer().panelLayer.addChild(_this);
        _this.jsonData = RES.getRes("page_info_json");
        return _this;
    }
    StudentPosPanel.studentPos = function () {
        if (null == StudentPosPanel._instance) {
            StudentPosPanel._instance = new StudentPosPanel();
        }
        return StudentPosPanel._instance;
    };
    StudentPosPanel.prototype.showStudentPos = function (pageId) {
        this.removeChildren();
        this.posLInfo.splice(0, this.posLInfo.length);
        this.usePosLInfo.splice(0, this.usePosLInfo.length);
        var pageInfo = this.jsonData['page' + pageId];
        var hasPos = false;
        this.isInteraction = false;
        if (null != pageInfo) {
            if (null != pageInfo['isInteraction']) {
                this.isInteraction = pageInfo['isInteraction'];
            }
            var poses = pageInfo['studentPos'];
            if (null != poses) {
                hasPos = true;
                this.visible = true;
                for (var i = 0; i < poses.length; ++i) {
                    if (GlobalData.isTeacher()) {
                        var img = new eui.Image("preload_json.student_pos");
                        img.x = poses[i]['posX'];
                        img.y = poses[i]['posY'];
                        img.width = 180;
                        img.height = 180;
                        this.addChild(img);
                    }
                    this.posLInfo.push(JSON.stringify({ index: i.toString(), x: poses[i]['posX'], y: poses[i]['posY'] }));
                }
            }
        }
        if (!hasPos) {
            this.visible = false;
        }
    };
    StudentPosPanel.prototype.hasInteraction = function () {
        return this.isInteraction;
    };
    return StudentPosPanel;
}(eui.Component));
__reflect(StudentPosPanel.prototype, "StudentPosPanel");
//# sourceMappingURL=StudentPosPanel.js.map