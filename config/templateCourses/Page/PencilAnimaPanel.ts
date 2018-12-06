class PencilAnimaPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PencilAnimaSkin";
        this.label1.textFlow = <Array<egret.ITextElement>>[
            { text: "What’s your\nfavourite " },
            { text: "fruit", style: { "textColor": 0x0066C9 } },
            { text: "?" }
        ];
       
        this.timer0 = new egret.Timer(480, 1);
        this.timer1 = new egret.Timer(980, 1);
        this.timer2 = new egret.Timer(1400, 1);
        this.timer3 = new egret.Timer(1800, 1);

        this.role = new Role("uu", this.group1);
        this.role.posX = 0;
        this.role.posY = 0;
        this.role.scaleX = -0.5;
        this.role.scaleY = 0.5;
        this.role.aniName = "talk_raise";
        this.role.secAniName = "talk_raise"
        this.role.times = 4;
        this.role.loadRes();
    }
    
    public label1: eui.Label;
    public pencil: eui.Image;
    public pencilAni: egret.tween.TweenGroup;
    public group1: eui.Group;

    private timer0: egret.Timer;
    private timer1: egret.Timer;
    private timer2: egret.Timer;
    private timer3: egret.Timer;
    private role: Role;

    public word: eui.Label;
    public word1: eui.Label;
    public word2: eui.Label;
    public word3: eui.Label;
    public word4: eui.Label;

    public initUI(): void {
        if (GlobalData.isTeacher()) {
            EffectUtils.useGlow(this.pencil);
        }
        this.pencil.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencilAni.addEventListener('complete', this.onPencilAniComplete, this);
        this.timer0.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer0Com, this);
        this.timer1.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer1Com, this);
        this.timer2.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer2Com, this);
        this.timer3.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer3Com, this);

        this.word.textColor = 0xA5A5A5;
        this.word1.textColor = 0xA5A5A5;
        this.word2.textColor = 0xA5A5A5;
        this.word3.textColor = 0xA5A5A5;
        this.word4.textColor = 0xA5A5A5;

        super.initUI();
    }

    private drawClick(evt: egret.TouchEvent) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }

        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "602", type: "2"
        });
        PageMgr.sendMsg(msg);
    }

    public receiveMsg(msg: string): void {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "602":
                {
                    this.draw();
                }
                break;
        }
    }


    private draw(): void {
        this.pencilAni.stop();
        this.pencilAni.play();
        this.pencil.filters = [];
        this.timer0.reset();
        this.timer0.start();
        this.timer1.reset();
        this.timer1.start();
        this.timer2.reset();
        this.timer2.start();
        this.timer3.reset();
        this.timer3.start();
        this.word.textColor = 0xA5A5A5;
        this.word1.textColor = 0xA5A5A5;
        this.word2.textColor = 0xA5A5A5;
        this.word3.textColor = 0xA5A5A5;
        this.word4.textColor = 0xA5A5A5;
    }

    private timer0Com(): void {
        this.word.textColor = 0xfe1229;
    }
    private timer1Com(): void {
        this.word1.textColor = 0xfe1229;
    }
    private timer2Com(): void {
        this.word2.textColor = 0xfe1229;
    }
    private timer3Com(): void {
        this.word3.textColor = 0xfe1229;
    }
    private onPencilAniComplete(event: egret.Event): void {
        if (GlobalData.isTeacher()) {
            EffectUtils.useGlow(this.pencil);
        }
        this.word4.textColor = 0xfe1229;
        SoundManager.sound().PlayClick();
    }

    public destroy(): void {
        this.pencilAni.play(0);
        this.pencilAni.stop();
        this.pencil.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencilAni.removeEventListener('complete', this.onPencilAniComplete, this);
        this.timer0.stop();
        this.timer1.stop();
        this.timer2.stop();
        this.timer3.stop();
        this.timer0.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer0Com, this);
        this.timer1.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer1Com, this);
        this.timer2.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer2Com, this);
        this.timer3.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer3Com, this);
        super.destroy();
    }
}