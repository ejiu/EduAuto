class PlaySoundPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PlaySoundSkin";
        this.farmSound = RES.getRes("hello_mp3");
        if(null == this.farmSound)
        {
            RES.getResAsync("hello_mp3", this.onResSoundFarmLoaded, this );
        }
    }

    private onResSoundFarmLoaded():void
    {
        this.farmSound = RES.getRes("hello_mp3"); 
    }
    
    public content:eui.Label;
    public start:eui.Image;
    public pause:eui.Image;
    public replay:eui.Image;
    public soundBg:eui.Image;    

    private farmSound: egret.Sound;//点击声音
    private playPos:number;
    private soundChannel:egret.SoundChannel;
    public initUI(): void {   
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);   
        this.pause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pausetClick, this);   
        this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replayClick, this);   
        this.playPos = 0;
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            this.start.visible = false;
            this.soundBg.visible = false;
        }
        else
        {
            this.start.visible = true;
        }
        this.pause.visible = false;
        this.replay.visible = false;
        super.initUI();  
    }


    private startClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"1001",type:"2"});
        PageMgr.sendMsg(msg);
    }  


    private pausetClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"1002",type:"2"});
        PageMgr.sendMsg(msg);
    }  


    private replayClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"99",type:"2"});
        PageMgr.sendMsg(msg);
    }  

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1001":
            {
                if(null != this.soundChannel)
                {
                    this.soundChannel.stop();
                    this.soundChannel = null;
                }
                if(null != this.farmSound)
                {
                    this.soundChannel = this.farmSound.play(this.playPos, 1);
                }
                if(GlobalData.isTeacher() || GlobalData.bAuthority)
                {
                    this.start.visible = false;
                    this.pause.visible = true;
                    this.replay.visible = true;
                }
            }
            break;    
            case "1002":
            {
                if(null != this.soundChannel)
                {
                    this.playPos = this.soundChannel.position;
                    this.soundChannel.stop();
                    this.soundChannel = null;
                }
                if(GlobalData.isTeacher() || GlobalData.bAuthority)
                {
                    this.start.visible = true;
                    this.pause.visible = false;
                    this.replay.visible = false;
                }
            }
            break;      
            case "99":
            {
                if(null != this.soundChannel)
                {
                    this.soundChannel.stop();
                    this.soundChannel = null;
                }
                this.playPos = 0;
                if(null != this.farmSound)
                {
                    this.soundChannel = this.farmSound.play(this.playPos, 1);
                }
                if(GlobalData.isTeacher() || GlobalData.bAuthority)
                {
                    this.start.visible = false;
                    this.pause.visible = true;
                    this.replay.visible = true;
                }
            }
            break;   
        }
    }

    public destroy(): void {
        if(null != this.soundChannel)
        {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);   
        this.pause.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pausetClick, this);   
        this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.replayClick, this);   
        super.destroy();
    }
}