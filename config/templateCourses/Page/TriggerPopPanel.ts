class TriggerPopPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "TriggerPopSkin";
        if (GlobalData.isTeacher()) {
            var star: Role = new Role("star_play", this.starPos0);
            star.posX = 0;
            star.posY = 0;
            star.scaleX = 0.4;
            star.scaleY = 0.4;
            star.aniName = "play";
            star.loadRes();           
        }

        this.role0 = new Role("uu_j", this.group1);
        this.role0.posX = 0;
        this.role0.posY = 0;
        this.role0.scaleX = -0.65;
        this.role0.scaleY = 0.65;
        this.role0.aniName = "talk";
        this.role0.loadRes();

    }
    private imgRes: string = "";
    private title: string = "";
    private role0: Role;
    // private role1: Role;
    public label0: eui.Label;
    // public label1: eui.Label;
    public starPos0: eui.Group;
    public group0: eui.Group;
    public group1: eui.Group;

    public initUI(): void {
        this.label0.textFlow = <Array<egret.ITextElement>>[
            { text: "Go " },
            { text: "straight", style: { "textColor": 0xFF0000, "href": "event:event1" } },
            { text: "." }
        ];
        this.label0.touchEnabled = true;
        this.label0.addEventListener(egret.TextEvent.LINK, this.TriggerText, this);
        this.role0.replay();
        this.starPos0.touchEnabled = false;
        super.initUI();
    }
    public receiveMsg(msg: string): void {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "201":
                {
                    switch (data['word']) {
                        case "event1":
                            this.imgRes = "post_item_143_png";
                            this.title = "straight";
                            break;
                        // case "event2":
                        //     this.imgRes = "post_item_2_png";
                        //     this.title = "skirt";
                        //     break;
                    }
                     PopupsPanel.popups().showFrame(this.imgRes, this.title);
                    // WordInterpretPanel.popups().showFrame(this.imgRes);
                }
                break;
            case "202":
                {
                    PopupsPanel.popups().closeFrame();
                    // WordInterpretPanel.popups().closeFrame();
                }
                break;
        }
    }

    public destroy(): void {
        this.label0.removeEventListener(egret.TextEvent.LINK, this.TriggerText, this);
        super.destroy();
    }

    private TriggerText(evt: egret.TextEvent) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "201", type: "2", word: evt.text
        });
        PageMgr.sendMsg(msg);
    }

}