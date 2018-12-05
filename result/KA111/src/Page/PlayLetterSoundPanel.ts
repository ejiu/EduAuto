class PlayLetterSoundPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PlayLetterSoundSkin";
        this.itemCount = 2;

        this.sound_0 = RES.getRes("d_big_mp3");
        if(null == this.sound_0)
        {
            RES.getResAsync("d_big_mp3", this.onResSound_0Loaded, this );
        }

        this.sound_1 = RES.getRes("d_small_mp3");
        if(null == this.sound_1)
        {
            RES.getResAsync("d_small_mp3", this.onResSound_1Loaded, this );
        }

         this.timer = new egret.Timer(5000, 1);
    }

    private onResSound_0Loaded():void
    {
        this.sound_0 = RES.getRes("d_big_mp3"); 
    }

    private onResSound_1Loaded():void
    {
        this.sound_1 = RES.getRes("d_small_mp3"); 
    }

    public animGroup0: egret.tween.TweenGroup;
    public animGroup1: egret.tween.TweenGroup;
    
    public item_0:eui.Image;
    public item_1:eui.Image;
    public finger_0:eui.Image;
    public finger_1:eui.Image;

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

        this.item_0.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_0.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.item_1.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_1.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.animGroup0.addEventListener('complete', this.onAnimGroupComplete, this);
        this.animGroup1.addEventListener('complete', this.onAnimGroupComplete, this);
        this.finger_0.visible = false;
        this.finger_0.touchEnabled = false;
        this.finger_1.visible = false;
        this.finger_1.touchEnabled = false;        

        this.Refresh();
        super.initUI();  
    }


    private onMouseOver(e: egret.TouchEvent): void {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }  
        this.floatNumber = parseInt(e.target.name);

        this.getFinger(this.floatNumber).visible = true;
        this.getAnimGroup(this.floatNumber).play();
    }

    private onMouseOut(e: egret.TouchEvent): void {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }  
        this.getAnimGroup(this.floatNumber).stop();
        this.getFinger(this.floatNumber).visible =false;
    }

    private onAnimGroupComplete(): void{
        this.getAnimGroup(this.floatNumber).stop();
        this.getAnimGroup(this.floatNumber).play();
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
        this.hideAllFinger();

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
        this.item_0.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_0.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.item_1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.animGroup0.removeEventListener('complete', this.onAnimGroupComplete, this);
        this.animGroup1.removeEventListener('complete', this.onAnimGroupComplete, this);
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

    private getFinger(index: number):eui.Image
    {
       switch(index)
        {
            case 0:
                return this.finger_0;
            case 1:
                return this.finger_1;
            // case 2:
            //     return this.finger_2;
            // case 3:
            //     return this.finger_3;
            // case 4:
            //     return this.finger_4;
            // case 5:
            //     return this.finger_5;
            // case 6:
            //     return this.finger_6;
            // case 7:
            //     return this.finger_7;
            default:
                return this.finger_0;
        }
    }

    private getAnimGroup(index: number): egret.tween.TweenGroup
    {
        switch(index)
        {
            case 0:
                return this.animGroup0;
            case 1:
                return this.animGroup1;
            // case 2:
            //     return this.animGroup2;
            // case 3:
            //     return this.animGroup3;
            // case 4:
            //     return this.animGroup4;
            // case 5:
            //     return this.animGroup5;
            // case 6:
            //     return this.animGroup6;
            // case 7:
            //     return this.animGroup7;
            default:
                return this.animGroup0;
        }
    }

    private setAllImgTouchable(status: boolean){
        for(var i:number = 0; i < this.itemCount; i++){
            this.getInteractImg(i).touchEnabled = status;
        }
    }

    private hideAllFinger(){
        for(var i: number=0; i < this.itemCount; ++i)       
        {
            this.getAnimGroup(i).stop();
            this.getFinger(i).visible = false;
        }
    }
}