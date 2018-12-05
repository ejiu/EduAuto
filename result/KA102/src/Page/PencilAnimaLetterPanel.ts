class PencilAnimaLetterPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PencilAnimaLetterSkin";

    }
    public pencil0: eui.Image;
    public pencil1: eui.Image;
    public pencilAni0: egret.tween.TweenGroup;
    public pencilAni1: egret.tween.TweenGroup;

    public img0: eui.Image;
    public img1: eui.Image;

    private normalResImg0:string = "post_item_53_png";
    private normalResImg1:string = "post_item_54_png";
    private chooseResImg0:string = "post_item_55_png";
    private chooseResImg1:string = "post_item_56_png";


    public initUI(): void {
        if (GlobalData.isTeacher()) {
            EffectUtils.useGlow(this.pencil0);
            EffectUtils.useGlow(this.pencil1);
        }
        this.pencil0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencil1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencilAni0.addEventListener('complete', this.onPencilAni0Complete, this);
        this.pencilAni1.addEventListener('complete', this.onPencilAni1Complete, this);
        this.img0.source = this.normalResImg0;
        this.img1.source = this.normalResImg1;
        super.initUI();
    }

    private drawClick(evt: egret.TouchEvent) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }

        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "602", type: "2", targetIndex: parseInt(evt.target.name)
        });
        PageMgr.sendMsg(msg);
    }

    public receiveMsg(msg: string): void {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "602":
                {
                    this.draw(data['targetIndex']);
                }
                break;
        }
    }

    private draw(tTargetIndex: number): void {

        if(tTargetIndex == 0){
            this.img0.source = this.normalResImg0;
            this.pencilAni0.stop();
            this.pencilAni0.play();
            this.pencil0.filters = [];
        }else{
            this.img1.source = this.normalResImg1;
            this.pencilAni1.stop();
            this.pencilAni1.play();
            this.pencil1.filters = [];
        }
    }

    private onPencilAni0Complete(event: egret.Event): void {
        if (GlobalData.isTeacher()) {
            EffectUtils.useGlow(this.pencil0);
        }
        this.img0.source = this.chooseResImg0;
        SoundManager.sound().PlayClick();
    }
    private onPencilAni1Complete(event: egret.Event): void {
        if (GlobalData.isTeacher()) {
            EffectUtils.useGlow(this.pencil1);
        }
        this.img1.source = this.chooseResImg1;
        SoundManager.sound().PlayClick();
    }

    public destroy(): void {
        this.pencilAni0.play(0);
        this.pencilAni1.play(0);
        this.pencilAni0.stop();
        this.pencilAni1.stop();
        this.pencil0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencil1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.drawClick, this);
        this.pencilAni0.removeEventListener('complete', this.onPencilAni0Complete, this);
        this.pencilAni1.removeEventListener('complete', this.onPencilAni1Complete, this);

        super.destroy();
    }
}