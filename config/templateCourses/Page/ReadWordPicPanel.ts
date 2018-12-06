class ReadWordPicPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ReadWordPicSkin";

        this.str1[0] = "n";
        this.str1[1] = "i";
        this.str1[2] = "n";
        this.str1[3] = "e";

        this.str2[0] = "k";
        this.str2[1] = "i";
        this.str2[2] = "t";
        this.str2[3] = "e";        

        this.EndLab0.textFlow = <Array<egret.ITextElement>>[
              {text: this.str1[0], style: {"textColor": 0x000000}}
            , {text: this.str1[1], style: {"textColor": 0xfe1229}}
            , {text: this.str1[2], style: {"textColor": 0x000000}}
            , {text: this.str1[3], style: {"textColor": 0xfe1229}}
        ];

        this.EndLab1.textFlow = <Array<egret.ITextElement>>[
              {text: this.str2[0], style: {"textColor": 0x000000}}
            , {text: this.str2[1], style: {"textColor": 0xfe1229}}
            , {text: this.str2[2], style: {"textColor": 0x000000}}
            , {text: this.str2[3], style: {"textColor": 0xfe1229}}
        ];

        if(GlobalData.isTeacher())
        {
            var star:Role = new Role("star_play",this.effect0);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 1.4;   
            star.scaleY = 1.4;  
            star.aniName = "play"; 
            this.effect0.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect1);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 1.4;   
            star.scaleY = 1.4;  
            star.aniName = "play"; 
            this.effect1.touchEnabled= false;
            star.loadRes();
        }
        this.endPoint = new egret.Point(); 
    }

    public initUI(): void {        
        this.group.visible = false;
        this.group0.visible = false;
        this.group1.visible = false;
        this.group2.visible = false;
        this.groupEnd.visible = false;

        this.canInteractive = true;
        this.clickImg0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TriggerText, this );
        this.clickImg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TriggerText, this );
        this.wordAni.addEventListener('complete', this.onWordAniComplete, this); 
        this.EndLab0.visible = true;
        this.EndLab1.visible = true; 
        super.initUI();     
    }

    public group:eui.Group;
    public group0:eui.Group;
    public group1:eui.Group;
    public group2:eui.Group;
    public groupEnd:eui.Group;
    public Lab:eui.Label;
    public Lab0:eui.Label;
    public Lab1:eui.Label;
    public Lab2:eui.Label;
    public LabEnd:eui.Label;

    public EndLab0:eui.Label;
    public EndLab1:eui.Label;   
    public clickImg0:eui.Image;
    public clickImg1:eui.Image;  
    public effect0:eui.Component;
    public effect1:eui.Component;
    public wordAni: egret.tween.TweenGroup;
    public ie:eui.Label;

    private canInteractive:boolean = false;
    private endPoint:egret.Point;
    private str1: string[] = [];
    private str2: string[] = [];

    private TriggerText(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        if(!this.canInteractive)
        {
            return;
        }

        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"602",type:"2",word:evt.target.name});
        PageMgr.sendMsg(msg); 
    } 

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "602":
            {
                SoundManager.sound().PlayClick();
                this.dealAni(data['word']);
                this.ie.visible=false;
            }
            break;        
        }
    }

    public dealAni(tName:string):void
    {
        this.canInteractive = false;
        if("0" == tName)
        {
            
            this.Lab.text = this.str1[0];
            this.Lab.textColor = 0x000000;
            this.Lab0.text = this.str1[1];
            this.Lab0.textColor = 0xfe1229;
            this.Lab1.text = this.str1[2];
            this.Lab1.textColor = 0x000000;
            this.Lab2.text = this.str1[3];
            this.Lab2.textColor = 0xfe1229;
            this.LabEnd.textFlow = <Array<egret.ITextElement>>[
                  {text: this.str1[0], style: {"textColor": 0x000000}}
                , {text: this.str1[1], style: {"textColor": 0xfe1229}}
                , {text: this.str1[2], style: {"textColor": 0x000000}}
                , {text: this.str1[3], style: {"textColor": 0xfe1229}}
            ];
            this.EndLab0.visible = false;
            this.endPoint.x = this.EndLab0.x;
            this.endPoint.y = this.EndLab0.y;
        }
        else if("1" == tName)
        {
            this.Lab.text = this.str2[0];
            this.Lab.textColor = 0x000000;
            this.Lab0.text = this.str2[1];
            this.Lab0.textColor = 0xfe1229;
            this.Lab1.text = this.str2[2];
            this.Lab1.textColor = 0x000000;
            this.Lab2.text = this.str2[3];
            this.Lab2.textColor = 0xfe1229;
            this.LabEnd.textFlow = <Array<egret.ITextElement>>[
                  {text: this.str2[0], style: {"textColor": 0x000000}}
                , {text: this.str2[1], style: {"textColor": 0xfe1229}}
                , {text: this.str2[2], style: {"textColor": 0x000000}}
                , {text: this.str2[3], style: {"textColor": 0xfe1229}}
            ];
            this.EndLab1.visible = false;
            this.endPoint.x = this.EndLab1.x;
            this.endPoint.y = this.EndLab1.y;
        }
        this.wordAni.play(0);
        this.group.visible = true;
        this.group0.visible = true;
        this.group1.visible = true;
        this.group2.visible = true;
        this.groupEnd.visible = true;
        this.groupEnd.scaleX = 1;
        this.groupEnd.scaleY = 1;
        
    }

    private onWordAniComplete(): void {        
        egret.Tween.get(this.groupEnd).to({x:this.endPoint.x, y:this.endPoint.y,scaleX:0.4, scaleY:0.4},1000,egret.Ease.sineInOut).call(this.removeEffect,this);
        this.ie.visible=true;
    }

    private removeEffect()
    {
        egret.Tween.removeTweens(this.groupEnd);
        this.groupEnd.visible = false;
        this.EndLab0.visible = true;
        this.EndLab1.visible = true;
        this.canInteractive = true;
    }

    public destroy(): void {
        this.wordAni.play(0);
        this.wordAni.stop();
        this.removeEffect();
        this.clickImg0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TriggerText, this );
        this.clickImg1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TriggerText, this );
        this.wordAni.removeEventListener('complete', this.onWordAniComplete, this);
        super.destroy();
    }
}