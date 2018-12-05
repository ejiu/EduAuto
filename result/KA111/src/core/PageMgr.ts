/**
  * 页面管理
  * by chenhf
  * (c) copyright 2017 - 2035
  * All Rights Reserved. 
  */
declare function callbackInSendMsg(msg:string);
class PageMgr {
    private static _instance:PageMgr; 
    //课程总页数
    public pageNum: number = 0;
    private pages: Array<PageBase> = [];
    public curPage:PageBase;
    public curPageIndex: number = 0;

    public constructor() {
        var jsonData: JSON = RES.getRes("page_info_json");
        this.pageNum = jsonData['pageCount'];
    }

    //页面管理器单例
    public static pageMgr():PageMgr  
    {  
        if(!this._instance)  
            this._instance = new PageMgr();  
        return this._instance;  
    }

    public init(): void{
        PageMgr.turnPage(1);
        GameLayerManager.gameLayer().loadLayer.addChild(TestPanel.test());
    }

    //上一页
    public static prevPage(): void {
        PageMgr.pageMgr().curPageIndex--;
        if(PageMgr.pageMgr().curPageIndex < 1)
        {
            PageMgr.pageMgr().curPageIndex = PageMgr.pageMgr().pageNum;
        }
        PageMgr.turnPage(PageMgr.pageMgr().curPageIndex);
    }

    //下一页
    public static nextPage(): void {
        PageMgr.pageMgr().curPageIndex++;
        if(PageMgr.pageMgr().curPageIndex > PageMgr.pageMgr().pageNum)
        {
            PageMgr.pageMgr().curPageIndex = 1;
        }
        PageMgr.turnPage(PageMgr.pageMgr().curPageIndex);
    }

    //跳转到某页
    public static turnPage(num: number): void {
        if(num < 1)
        {
            PageMgr.pageMgr().curPageIndex = 1;
        }
        else if(num > PageMgr.pageMgr().pageNum)
        {
            PageMgr.pageMgr().curPageIndex = PageMgr.pageMgr().pageNum;
        }
        else
        {
            PageMgr.pageMgr().curPageIndex = num;
        }

        if(null != PageMgr.pageMgr().curPage
            && PageMgr.pageMgr().curPageIndex == PageMgr.pageMgr().curPage.pageId)
        {
            return;
        }
       PageMgr.pageMgr().changePage();
    }

    private changePage():void
    {
        if(null != this.curPage)
        {
            this.curPage.destroy();
            if(null != this.curPage.parent)
            {
                GameLayerManager.gameLayer().sceneLayer.removeChild(this.curPage);
            }
        }
        this.curPage = this.getPage(PageMgr.pageMgr().curPageIndex);
        this.curPage.initUI();
        GameLayerManager.gameLayer().sceneLayer.addChild(this.curPage);
    }

    //得到指定页面
    public getPage(num:number): PageBase
    {
        var lenght: number = this.pages.length;
        for( var i:number =0; i<lenght; ++i)
        {
            if(this.pages[i].pageId == num)
            {
                return this.pages[i];
            }
        }
        var page:PageBase;
        switch(num)
        {
            case 1:{
                page = new HomeworkPanel1();
                break;
            }     
            case 2:{
                page = new PlaySoundPanel2();
                break;
            }  
            case 3:{
                page = new HomeworkPanel3();
                break;
            }  
            case 4:{
                page = new HomeworkPanel4();
                break;
            }  
            case 5:{
                page = new HomeworkPanel5();
                break;
            }     
            case 6:{
                page = new HomeworkPanel6();
                break;
            } 
            case 7:{
                page = new HomeworkPanel7();
                break;
            } 
            case 8:{
                page = new HomeworkPanel8();
                break;
            } 
            case 9:{
                page = new HomeworkPanel9();
                break;
            } 
            case 10:{
                page = new HomeworkPanel10();
                break;
            } 
            case 11:{
                page = new HomeworkPanel11();
                break;
            }  
            case 12:{
                page = new HomeworkPanel12();
                break;
            } 
            case 13:{
                page = new HomeworkPanel13();
                break;
            } 
            case 14:{
                page = new HomeworkPanel14();
                break;
            } 
            case 15:{
                page = new HomeworkPanel15();
                break;
            } 
            case 16:{
                page = new HomeworkPanel16();
                break;
            } 
            case 17:{
                page = new HomeworkPanel17();
                break;
            } 
            case 18:{
                page = new HomeworkPanel18();
                break;
            }             
            case 19:{
                page = new HomeworkPanel19();
                break;
            } 
            case 20:{
                page = new HomeworkPanel20();
                break;
            } 
            case 21:{
                page = new HomeworkPanel21();
                break;
            } 
            case 22:{
                page = new HomeworkPanel22();
                break;
            } 
            case 23:{
                page = new HomeworkPanel23();
                break;
            }
            case 24:{
                page = new HomeworkPanel24();
                break;
            }
            case 25:{
                page = new HomeworkPanel25();
                break;
            }
            case 26:{
                page = new HomeworkPanel26();
                break;
            }
            case 27:{
                page = new HomeworkPanel27();
                break;
            }
            case 28:{
                page = new HomeworkPanel28();
                break;
            }
            case 29:{
                page = new HomeworkPanel29();
                break;
            }
            case 30:{
                page = new HomeworkPanel30();
                break;
            }
            case 31:{
                page = new HomeworkPanel31();
                break;
            }
            case 32:{
                page = new HomeworkPanel32();
                break;
            }
            case 33:{
                page = new HomeworkPanel33();
                break;
            }
            case 34:{
                page = new HomeworkPanel34();
                break;
            }
            case 35:{
                page = new HomeworkPanel35();
                break;
            }
            case 36:{
                page = new HomeworkPanel36();
                break;
            }
            case 37:{
                page = new HomeworkPanel37();
                break;
            }
            case 38:{
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
    }

    //获取总页码数
    public static allPage(): number {
        return PageMgr.pageMgr().pageNum;
    }

    public static get all_page(): number 
    {
        return PageMgr.pageMgr().pageNum;
    }

    //获取当前页码
    public static curPage(): number {
        return PageMgr.pageMgr().curPageIndex;
    }

    public static get cur_page(): number 
    {
        return PageMgr.pageMgr().curPageIndex;
    }

    //接收页面消息
    public static receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        if(data['pageIndex'] == PageMgr.pageMgr().curPage.pageId)
        {
            PageMgr.pageMgr().curPage.receiveMsg(msg);
        }
        else
        {
            PageMgr.turnPage(data['pageIndex']);
            PageMgr.pageMgr().curPage.receiveMsg(msg);
        }
    }

    public static sendMsg(msg:string)
    {
        callbackInSendMsg(msg);
    }

    public static cursorIcon(tIconUrl,offsetX,offsetY)
    {
        if(tIconUrl == "auto" || tIconUrl == "crosshair" || 
            tIconUrl == "default" || tIconUrl == "hand" || tIconUrl == "move" || 
            tIconUrl == "help" || tIconUrl == "wait" || tIconUrl == "text" || 
            tIconUrl == "w-resize" || tIconUrl == "s-resize" || tIconUrl == "n-resize" || 
            tIconUrl == "e-resize" || tIconUrl == "ne-resize" || tIconUrl == "sw-resize" || 
            tIconUrl == "se-resize" || tIconUrl == "nw-resize" || tIconUrl == "pointer")
        {
            document.body.style.cursor = tIconUrl;
        }
        else
        {
            document.body.style.cursor = "url("+tIconUrl+") "+offsetX+" "+offsetY+",auto";
        }
    }
}