class PlaySomeSoundPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PlaySomeSoundSkin";
        this.itemCount = 2;

        this.sound_0 = RES.getRes("PK001_16_1_mp3");
        if(null == this.sound_0)
        {
            RES.getResAsync("PK001_16_1_mp3", this.onResSound_0Loaded, this );
        }

        this.sound_1 = RES.getRes("PK001_16_2_mp3");
        if(null == this.sound_1)
        {
            RES.getResAsync("PK001_16_2_mp3", this.onResSound_1Loaded, this );
        }

         this.timer = new egret.Timer(5000, 1);
    }

    private onResSound_0Loaded():void
    {
        this.sound_0 = RES.getRes("PK001_16_1_mp3"); 
    }

    private onResSound_1Loaded():void
    {
        this.sound_1 = RES.getRes("PK001_16_2_mp3"); 
    }
    
    public item_0:eui.Image;
    public item_1:eui.Image;

    private timer: egret.Timer;
    private sound_0: egret.Sound;
    private sound_1: egret.Sound;
    private soundChannel:egret.SoundChannel;
    private itemCount: number;
    private isSounding: boolean;
    private choosedNumber: number;   //当前选中图片的索引值
    private floatNumber: number;

    public initUI(): void {   
        this.item_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);   
        this.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);  
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCom, this);
        this.timer.start();

        this.Refresh();
        super.initUI();  
    }

    private onClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }  
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"1402",type:"4",name:evt.target.name});
        PageMgr.sendMsg(msg);
    }
   
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1402":
            {
                switch(data['name']){
                    case "0":
                    case "1":
                    // case "2":
                    // case "3":
                    // case "4":
                    // case "5":
                    // case "6":
                    // case "7":
                        this.dealPlaySound(parseInt(data['name']));
                    break;
                }
            }
            break;    
        }
    }

    private dealPlaySound(index: number): void{
        this.choosedNumber = index;
        this.isSounding = true;
        this.setAllImgTouchable(false);

        var tImage :eui.Image = this.getInteractImg(index);
        egret.Tween.get(tImage).to({scaleX: 1.4, scaleY: 1.4}, 300);

        this.soundChannel = this.getSound(index).play(0, 1);
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    private onSoundComplete():void{
        this.isSounding = false;
        var tImage :eui.Image = this.getInteractImg(this.choosedNumber);
        egret.Tween.get(tImage).to({scaleX: 1, scaleY: 1}, 300);
        this.setAllImgTouchable(true);
    }

    public destroy(): void {
        if(null != this.soundChannel)
        {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
         this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCom, this);
        this.item_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        super.destroy();
    }

    public Refresh():void
    {
        for(var i:number = 0; i < this.itemCount; i++){
            this.getInteractImg(i).scaleX = 1;
            this.getInteractImg(i).scaleY = 1;
            this.getInteractImg(i).rotation = 0;
        }
        this.setAllImgTouchable(true);
        egret.Tween.removeAllTweens();       
        this.isSounding = false;
    }

    private timerCom(): void {
        this.timer.reset();
        this.timer.start();
        if(false == this.isSounding){
            for(var i:number = 0; i < this.itemCount; ++i){
                EffectUtils.rockObj(this.getInteractImg(i), 200, 10);
            }
        }
    }

    private getInteractImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.item_0;
            case 1:
                return this.item_1;
            // case 2:
            //     return this.item_2;
            // case 3:
            //     return this.item_3;
            // case 4:
            //     return this.item_4;
            // case 5:
            //     return this.item_5;
            // case 6:
            //     return this.item_6;
            // case 7:
            //     return this.item_7;
            default:
                return this.item_0;
        }
    }

    private getSound(index: number):egret.Sound
    {        
        switch(index)
        {
            case 0:
                return this.sound_0;
            case 1:
                return this.sound_1;
            // case 2:
            //     return this.sound_2;
            // case 3:
            //     return this.sound_3;
            // case 4:
            //     return this.sound_4;
            // case 5:
            //     return this.sound_5;
            // case 6:
            //     return this.sound_6;
            // case 7:
            //     return this.sound_7;
            default:
                return this.sound_0;
        }
    }

    private setAllImgTouchable(status: boolean){
        for(var i:number = 0; i < this.itemCount; i++){
            this.getInteractImg(i).touchEnabled = status;
        }
    }
    
}