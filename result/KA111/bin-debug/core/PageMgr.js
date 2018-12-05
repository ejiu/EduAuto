var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageMgr = (function () {
    function PageMgr() {
        //课程总页数
        this.pageNum = 0;
        this.pages = [];
        this.curPageIndex = 0;
        var jsonData = RES.getRes("page_info_json");
        this.pageNum = jsonData['pageCount'];
    }
    //页面管理器单例
    PageMgr.pageMgr = function () {
        if (!this._instance)
            this._instance = new PageMgr();
        return this._instance;
    };
    PageMgr.prototype.init = function () {
        PageMgr.turnPage(1);
        GameLayerManager.gameLayer().loadLayer.addChild(TestPanel.test());
    };
    //上一页
    PageMgr.prevPage = function () {
        PageMgr.pageMgr().curPageIndex--;
        if (PageMgr.pageMgr().curPageIndex < 1) {
            PageMgr.pageMgr().curPageIndex = PageMgr.pageMgr().pageNum;
        }
        PageMgr.turnPage(PageMgr.pageMgr().curPageIndex);
    };
    //下一页
    PageMgr.nextPage = function () {
        PageMgr.pageMgr().curPageIndex++;
        if (PageMgr.pageMgr().curPageIndex > PageMgr.pageMgr().pageNum) {
            PageMgr.pageMgr().curPageIndex = 1;
        }
        PageMgr.turnPage(PageMgr.pageMgr().curPageIndex);
    };
    //跳转到某页
    PageMgr.turnPage = function (num) {
        if (num < 1) {
            PageMgr.pageMgr().curPageIndex = 1;
        }
        else if (num > PageMgr.pageMgr().pageNum) {
            PageMgr.pageMgr().curPageIndex = PageMgr.pageMgr().pageNum;
        }
        else {
            PageMgr.pageMgr().curPageIndex = num;
        }
        if (null != PageMgr.pageMgr().curPage
            && PageMgr.pageMgr().curPageIndex == PageMgr.pageMgr().curPage.pageId) {
            return;
        }
        PageMgr.pageMgr().changePage();
    };
    PageMgr.prototype.changePage = function () {
        if (null != this.curPage) {
            this.curPage.destroy();
            if (null != this.curPage.parent) {
                GameLayerManager.gameLayer().sceneLayer.removeChild(this.curPage);
            }
        }
        this.curPage = this.getPage(PageMgr.pageMgr().curPageIndex);
        this.curPage.initUI();
        GameLayerManager.gameLayer().sceneLayer.addChild(this.curPage);
    };
    //得到指定页面
    PageMgr.prototype.getPage = function (num) {
        var lenght = this.pages.length;
        for (var i = 0; i < lenght; ++i) {
            if (this.pages[i].pageId == num) {
                return this.pages[i];
            }
        }
        var page;
        switch (num) {
            case 1: {
                page = new PlaySomeSoundPanel();
                break;
            }
            case 2: {
                page = new PlayLetterSoundPanel();
                break;
            }
            case 3: {
                page = new HomeworkPanel3();
                break;
            }
            case 4: {
                page = new HomeworkPanel4();
                break;
            }
            case 5: {
                page = new HomeworkPanel5();
                break;
            }
            case 6: {
                page = new HomeworkPanel6();
                break;
            }
            case 7: {
                page = new HomeworkPanel7();
                break;
            }
            case 8: {
                page = new HomeworkPanel8();
                break;
            }
            case 9: {
                page = new HomeworkPanel9();
                break;
            }
            case 10: {
                page = new HomeworkPanel10();
                break;
            }
            case 11: {
                page = new HomeworkPanel11();
                break;
            }
            case 12: {
                page = new HomeworkPanel12();
                break;
            }
            case 13: {
                page = new HomeworkPanel13();
                break;
            }
            case 14: {
                page = new HomeworkPanel14();
                break;
            }
            case 15: {
                page = new HomeworkPanel15();
                break;
            }
            case 16: {
                page = new HomeworkPanel16();
                break;
            }
            case 17: {
                page = new HomeworkPanel17();
                break;
            }
            case 18: {
                page = new HomeworkPanel18();
                break;
            }
            case 19: {
                page = new HomeworkPanel19();
                break;
            }
            case 20: {
                page = new HomeworkPanel20();
                break;
            }
            case 21: {
                page = new HomeworkPanel21();
                break;
            }
            case 22: {
                page = new HomeworkPanel22();
                break;
            }
            case 23: {
                page = new HomeworkPanel23();
                break;
            }
            case 24: {
                page = new HomeworkPanel24();
                break;
            }
            case 25: {
                page = new HomeworkPanel25();
                break;
            }
            case 26: {
                page = new HomeworkPanel26();
                break;
            }
            case 27: {
                page = new HomeworkPanel27();
                break;
            }
            case 28: {
                page = new HomeworkPanel28();
                break;
            }
            case 29: {
                page = new HomeworkPanel29();
                break;
            }
            case 30: {
                page = new HomeworkPanel30();
                break;
            }
            case 31: {
                page = new HomeworkPanel31();
                break;
            }
            case 32: {
                page = new HomeworkPanel32();
                break;
            }
            case 33: {
                page = new HomeworkPanel33();
                break;
            }
            case 34: {
                page = new HomeworkPanel34();
                break;
            }
            case 35: {
                page = new HomeworkPanel35();
                break;
            }
            case 36: {
                page = new HomeworkPanel36();
                break;
            }
            case 37: {
                page = new HomeworkPanel37();
                break;
            }
            case 38: {
                page = new HomeworkPanel38();
                break;
            }
            default:
                {
                    page = new HomePagePanel();
                    break;
                }
        }
        page.pageId = num;
        this.pages.push(page);
        return page;
    };
    //获取总页码数
    PageMgr.allPage = function () {
        return PageMgr.pageMgr().pageNum;
    };
    Object.defineProperty(PageMgr, "all_page", {
        get: function () {
            return PageMgr.pageMgr().pageNum;
        },
        enumerable: true,
        configurable: true
    });
    //获取当前页码
    PageMgr.curPage = function () {
        return PageMgr.pageMgr().curPageIndex;
    };
    Object.defineProperty(PageMgr, "cur_page", {
        get: function () {
            return PageMgr.pageMgr().curPageIndex;
        },
        enumerable: true,
        configurable: true
    });
    //接收页面消息
    PageMgr.receiveMsg = function (msg) {
        var data = JSON.parse(msg);
        if (data['pageIndex'] == PageMgr.pageMgr().curPage.pageId) {
            PageMgr.pageMgr().curPage.receiveMsg(msg);
        }
        else {
            PageMgr.turnPage(data['pageIndex']);
            PageMgr.pageMgr().curPage.receiveMsg(msg);
        }
    };
    PageMgr.sendMsg = function (msg) {
        callbackInSendMsg(msg);
    };
    PageMgr.cursorIcon = function (tIconUrl, offsetX, offsetY) {
        if (tIconUrl == "auto" || tIconUrl == "crosshair" ||
            tIconUrl == "default" || tIconUrl == "hand" || tIconUrl == "move" ||
            tIconUrl == "help" || tIconUrl == "wait" || tIconUrl == "text" ||
            tIconUrl == "w-resize" || tIconUrl == "s-resize" || tIconUrl == "n-resize" ||
            tIconUrl == "e-resize" || tIconUrl == "ne-resize" || tIconUrl == "sw-resize" ||
            tIconUrl == "se-resize" || tIconUrl == "nw-resize" || tIconUrl == "pointer") {
            document.body.style.cursor = tIconUrl;
        }
        else {
            document.body.style.cursor = "url(" + tIconUrl + ") " + offsetX + " " + offsetY + ",auto";
        }
    };
    return PageMgr;
}());
__reflect(PageMgr.prototype, "PageMgr");
//# sourceMappingURL=PageMgr.js.map