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
var TriggerPopPanel = (function (_super) {
    __extends(TriggerPopPanel, _super);
    function TriggerPopPanel() {
        var _this = _super.call(this) || this;
        _this.imgRes = "";
        _this.title = "";
        _this.skinName = "TriggerPopSkin";
        if (GlobalData.isTeacher()) {
            var star = new Role("star_play", _this.starPos0);
            star.posX = 0;
            star.posY = 0;
            star.scaleX = 0.4;
            star.scaleY = 0.4;
            star.aniName = "play";
            star.loadRes();
        }
        _this.role0 = new Role("betty", _this.group0);
        _this.role0.posX = 0;
        _this.role0.posY = 0;
        _this.role0.scaleX = 0.5;
        _this.role0.scaleY = 0.5;
        _this.role0.aniName = "talk";
        // this.role0.secAniName = "idle";
        // this.role0.times = 2;
        _this.role0.loadRes();
        return _this;
    }
    // public group1: eui.Group;
    TriggerPopPanel.prototype.initUI = function () {
        this.label0.textFlow = [
            { text: "Go " },
            { text: "straight", style: { "textColor": 0xFF0000, "href": "event:event1" } },
            { text: "." }
        ];
        this.label0.touchEnabled = true;
        this.label0.addEventListener(egret.TextEvent.LINK, this.TriggerText, this);
        // this.role0.replay();
        this.starPos0.touchEnabled = false;
        _super.prototype.initUI.call(this);
    };
    TriggerPopPanel.prototype.receiveMsg = function (msg) {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "201":
                {
                    switch (data['word']) {
                        case "event1":
                            this.imgRes = "post_item_21_png";
                            this.title = "straight";
                            break;
                    }
                    PopupsPanel.popups().showFrame(this.imgRes, this.title);
                }
                break;
            case "202":
                {
                    PopupsPanel.popups().closeFrame();
                }
                break;
        }
    };
    TriggerPopPanel.prototype.destroy = function () {
        this.label0.removeEventListener(egret.TextEvent.LINK, this.TriggerText, this);
        _super.prototype.destroy.call(this);
    };
    TriggerPopPanel.prototype.TriggerText = function (evt) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        var msg = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "201", type: "2", word: evt.text
        });
        PageMgr.sendMsg(msg);
    };
    return TriggerPopPanel;
}(PageBase));
__reflect(TriggerPopPanel.prototype, "TriggerPopPanel");
//# sourceMappingURL=TriggerPopPanel.js.map