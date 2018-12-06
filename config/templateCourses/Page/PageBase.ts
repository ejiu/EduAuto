// TypeScript file
declare function callbackInPageLoaded(isSingle, haveVideo);
class PageBase extends eui.Component {
    public pageId: number = 0;
    public constructor() {
        super();
    }
    
    public receiveMsg(msg: string): void {
    }
    
    /**
	 * 初始化面板ui
	 */
    public initUI(): void { 
        TitleInfoPanel.titleInfo().addTitleInfo(this.pageId);
        if(GlobalData.isTeacher())
        {
            TipsPanel.tips().addTipsInfo(this.pageId);
        }
        StudentPosPanel.studentPos().showStudentPos(this.pageId);
        this.getNextResLoad();
        callbackInPageLoaded(true,StudentPosPanel.studentPos().hasInteraction());

        // PageMgr.receiveMsg('  {"pageIndex":26,"cmd":"901","type":"3","cardId":0}       ');
        // PageMgr.receiveMsg('  {"pageIndex":26,"cmd":"901","type":"3","cardId":2}       '); 
        // PageMgr.receiveMsg('  {"pageIndex":26,"cmd":"98","type":"3"}                   '); 
        // PageMgr.receiveMsg('  {"pageIndex":26,"cmd":"901","type":"3","cardId":1}       '); 
        // PageMgr.receiveMsg('  {"pageIndex":26,"cmd":"901","type":"3","cardId":3}       '); 
    }
    
    public setAuthority(tAuthority : boolean): void {
    }
    
    public getNextResLoad():void
    {
        var count:number = 3;
        var nextPageId:number = 0;
        var nextPage:PageBase;    
        for(var i:number = 0; i<count;)
        {
            i++;
            var nextPageId = this.pageId +i;
            if(nextPageId > PageMgr.pageMgr().pageNum)
            {
                nextPageId = 1;
            }
            nextPage = PageMgr.pageMgr().getPage(nextPageId);
            nextPage.getResLoad();
        }
    }

    private isLoadRes:boolean = false;
    public getResLoad():void
    {
        if(this.isLoadRes)
        {
            return;
        }
        var jsonData:JSON = RES.getRes("page_info_json");
        var pageInfo = jsonData['page'+this.pageId];
        var resCount:number = 0;
        if(null != pageInfo)
        {
            resCount = pageInfo['resources'].length;
        }
        
        for(var i:number = 0; i<resCount; ++i)
        {      
            RES.getResAsync( pageInfo['resources'][i], this.onResLoaded, this);
        }  
        this.isLoadRes = true; 
    }

    private onResLoaded():void
    {
    }

    /**
	 * 面板关闭后需要销毁的对象
	 */
    public destroy(): void {
        FingerHintPanel.finger().destroy();
        PopupsPanel.popups().destroy();
        WordInterpretPanel.popups().destroy();
    }
}