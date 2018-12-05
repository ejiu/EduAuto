// TypeScript file

class StudentPosPanel extends eui.Component {
    private static _instance: StudentPosPanel;
    public static studentPos(): StudentPosPanel {
        if(null == StudentPosPanel._instance)
        {
            StudentPosPanel._instance = new StudentPosPanel();
        }
        return StudentPosPanel._instance;
    }

    public constructor() {
        super();
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.jsonData = RES.getRes("page_info_json");
    }

    public titleText:eui.Label;
    private jsonData: JSON;
    private posLInfo: Array<string> = [];
    private usePosLInfo: Array<string> = [];
    private isInteraction: boolean;

    public showStudentPos(pageId:number):void
    {        
        this.removeChildren();
        this.posLInfo.splice(0, this.posLInfo.length);
        this.usePosLInfo.splice(0, this.usePosLInfo.length);

        var pageInfo = this.jsonData['page'+pageId];
        var hasPos:boolean = false;
        this.isInteraction = false;
        if(null != pageInfo)
        {
            if(null != pageInfo['isInteraction'])
            {
                this.isInteraction = pageInfo['isInteraction'];
            }

            var poses:Array<number> = pageInfo['studentPos'];
            if(null != poses)
            {
                hasPos = true;
                this.visible = true;
                for(var i:number = 0; i<poses.length; ++i)
                {
                    if(GlobalData.isTeacher())
                    {
                        var img:eui.Image = new eui.Image("preload_json.student_pos");
                        img.x = poses[i]['posX'];
                        img.y = poses[i]['posY'];
                        img.width = 180;
                        img.height = 180;
                        this.addChild(img);
                    }
                    this.posLInfo.push(JSON.stringify({index:i.toString(),x:poses[i]['posX'],y:poses[i]['posY']}));
                }
            }
        }
        if(!hasPos)
        {
            this.visible = false;
        }
    }

    public hasInteraction():boolean
    {
        return this.isInteraction;
    }
}