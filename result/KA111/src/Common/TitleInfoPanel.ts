// TypeScript file

class TitleInfoPanel extends eui.Component {
    private static _instance: TitleInfoPanel;
    public static titleInfo(): TitleInfoPanel {
        if(null == TitleInfoPanel._instance)
        {
            TitleInfoPanel._instance = new TitleInfoPanel();
        }
        return TitleInfoPanel._instance;
    }

    public constructor() {
        super();
        this.skinName = "TitleInfoSkin";
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.jsonData = RES.getRes("page_info_json");
    }

    public titleText:eui.Label;
    public secText:eui.Label;
    private jsonData: JSON;

    public addTitleInfo(pageId:number):void
    {        
        var pageInfo = this.jsonData['page'+pageId];
        var hasTitle:boolean = false;
        if(null != pageInfo)
        {
            var mainTitle = pageInfo['mainTitle'];
            if(null != mainTitle)
            {
                hasTitle = true;
                this.visible = true;
                this.addText(mainTitle,pageInfo['time'],pageInfo['secTitle']);
            }
        }
        if(!hasTitle)
        {
            this.visible = false;
        }
    }

    private addText(mainText:string,timeText:string,secText:string): void{   
        var mainTitle:string = mainText;
        if(GlobalData.isTeacher() && null != timeText)
        {
            mainTitle += " ("+ timeText +")";
        }    
        this.titleText.text = mainTitle;
        this.secText.text = secText;
    }
}