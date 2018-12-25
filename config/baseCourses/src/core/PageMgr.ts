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
                page = new HomePagePanel();
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