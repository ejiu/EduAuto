class WeChatPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "WeChatSkin";

        this.titleStr = "supermarket";
        this.imgResStr = "post_item_19_png";
        
        this.text2.textFlow = <Array<egret.ITextElement>>[
            {text: "It’s next to the "}
            , {text: "supermarket", style: {"textColor": 0xff0000,"href" : "event:event1"}}
            , {text: " ."}
        ];

        this.text2.touchEnabled = true;
        this.talkTimer = new egret.Timer(3000,1);        

        if(GlobalData.isTeacher())
        {
            var star:Role = new Role("star_play",this.group2);
            star.posX = 281;
            star.posY = 75;  
            star.scaleX = 0.85;   
            star.scaleY = 0.4;  
            star.aniName = "play"; 
            star.loadRes();
        }
    }

    public initUI(): void {
        super.initUI();
        
        SoundManager.sound().PlayWechat();
        this.group.visible = true;
        this.group2.visible = false;
        this.talkAni.play(0);

        this.text2.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );
        this.talkTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.talkComplete,this);
        this.talkTimer.reset();
        this.talkTimer.start();
    }

    public text2:eui.Label;
    public group2:eui.Group;
    public group:eui.Group;
    public talkTimer:egret.Timer;
    public talkAni: egret.tween.TweenGroup;
    public talkAni2: egret.tween.TweenGroup;

    private imgRes:string;
    private title:string; 

    private imgResStr: string;
    private titleStr: string;
    

    private talkComplete():void
    {
        SoundManager.sound().PlayWechat();
        this.group2.visible = true;
        this.talkAni2.play(0);
    }

    private TriggerText(evt:egret.TextEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"201",type:"2",word:evt.text});
        PageMgr.sendMsg(msg); 
    } 

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "201":
            {
                switch(data['word'])
                {
                    case "event1":
                        this.imgRes = this.imgResStr;
                        this.title = this.titleStr;                     
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
    }

    public destroy(): void {
        super.destroy();
        this.talkTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.talkComplete,this);
        this.text2.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );
        this.talkAni.stop();
        this.talkAni2.stop();
    }
}
