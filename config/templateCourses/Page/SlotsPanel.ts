class SlotsPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "SlotsSkin";
        this.timerShowRestart = new egret.Timer(1000,1);//定时Start按钮延迟显示
        this.internalCount = 3;
        this.jsonData = RES.getRes("page_info_json"); 
        this.slotsSound = RES.getRes("slots_mp3");
        if(null == this.slotsSound)
        {
            RES.getResAsync("slots_mp3", this.onResSoundTurnLoaded, this );
        } 

        this.seccussSound = RES.getRes("slotsEnd_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("slotsEnd_mp3", this.onResSoundSecLoaded, this );
        }   
        this.interactiveCount = this.jsonData['slots_info']['items'].length;     
    }

    public start:eui.Image;
    public Img0:eui.Image;
    public Img1:eui.Image;
    public Img0_bg:eui.Image;
    public Img1_bg:eui.Image;

    public Img2:eui.Image;
    public Img3:eui.Image;
    public Img0_bg0:eui.Image;
    public Img1_bg0:eui.Image;

    public Img4:eui.Image;
    public Img5:eui.Image;
    public Img0_bg1:eui.Image;
    public Img1_bg1:eui.Image;

    private timerShowRestart:egret.Timer;
    private soltNum:number = 0;
    private internalCount:number = 0;
    private curOneIndex:number = 0;
    private curTwoIndex:number = 0;
    private curThreeIndex:number = 0;
    private jsonData: JSON;
    private slotsSound: egret.Sound;
    private seccussSound: egret.Sound;
    private slotsChannelSound: egret.SoundChannel;
    private endNum:number;
    private interactiveCount:number;

    public initUI(): void {
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);     
        this.timerShowRestart.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtnImage,this);
        EffectUtils.useGlow(this.start);
        this.start.touchEnabled = true;
        this.soltNum = 0;
        this.curOneIndex = 0;
        this.curTwoIndex = 0;
        this.curThreeIndex = 0;
        this.Img0.y = 26;
        this.Img0.source = this.jsonData['slots_info']['items'][0];
        this.Img0_bg.y =-4;
        this.Img2.y = 26;
        this.Img2.source = this.jsonData['slots_info']['items'][0];
        this.Img0_bg0.y =-4;
        this.Img4.y = 26;
        this.Img4.source = this.jsonData['slots_info']['items'][0];
        this.Img0_bg1.y =-4;
        this.Img1.y = 324;
        this.Img1_bg.y = 290;
        this.Img3.y = 324;
        this.Img1_bg0.y = 290;
        this.Img5.y = 324;
        this.Img1_bg1.y = 290;
        super.initUI();
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("slotsEnd_mp3"); 
    }

    private onResSoundTurnLoaded():void
    {
        this.slotsSound = RES.getRes("slots_mp3"); 
    }

    private startClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }

        var group1 = Math.ceil(Math.random()*(this.interactiveCount-1) + 0.1)-1;
        var group2 = Math.ceil(Math.random()*(this.interactiveCount-1) + 0.1)-1; 
        var group3 = 0;
        if(this.soltNum == this.internalCount)
        {
            group3 = group1;
            group2 = group1;
        }
        else
        {            
            if(group1 == group2)
            {
                group3 = group1 + 1;
                if(group3 > (this.interactiveCount-1))
                {
                    group3 = 0;
                }
            }
            else
            {
                if(0 == this.soltNum%2)
                {
                    group3 = group1;
                }
                else
                {
                    group3 = group2;
                }
            }
        }
        this.soltNum++;
        if(this.soltNum > this.internalCount)
        {
            this.soltNum = 0;
        }
        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"401",type:"2",soltNum:this.soltNum,oneIndex:group1,twoIndex:group2,threeIndex:group3});
        PageMgr.sendMsg(msg);
    }  
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "401":
            {
                this.soltNum = data['soltNum'];
                this.starTurn(data['oneIndex'],data['twoIndex'],data['threeIndex']);
            }
            break;    
        }
    }

    private starTurn(oneIndex:number,twoIndex:number,threeIndex:number):void
    {        
        if(null != this.slotsChannelSound)
        {
            this.slotsChannelSound.stop();
            this.slotsChannelSound = null;
        }

        if(null != this.slotsSound)
        {
            this.slotsChannelSound = this.slotsSound.play(0,0);
        }
        this.start.touchEnabled = false;
        EffectUtils.useError(this.start);
        this.Img0.y = 26;
        this.Img0_bg.y =-4;
        this.Img2.y = 26;
        this.Img0_bg0.y =-4;
        this.Img4.y = 26;
        this.Img0_bg1.y =-4;
        this.endNum = 0;
        
        this.curOneIndex %= this.interactiveCount;
        this.curTwoIndex %= this.interactiveCount;
        this.curThreeIndex %= this.interactiveCount;
        var runTime:number = 3*this.interactiveCount*250;
        var run1Index = oneIndex+3*this.interactiveCount - this.curOneIndex;
        var run2Index = twoIndex+3*this.interactiveCount - this.curTwoIndex;
        var run3Index = threeIndex+3*this.interactiveCount - this.curThreeIndex;
        var Index1 = run1Index-9;//设定转至目标图需经过多少张图片
        var Index2 = run2Index-9;
        var Index3 = run3Index-9;
        this.turnImg(Index1,0,this.Img0,this.Img0_bg,this.Img1,this.Img1_bg,runTime/run1Index);
        this.turnImg(Index2,1,this.Img2,this.Img0_bg0,this.Img3,this.Img1_bg0,runTime/run2Index);
        this.turnImg(Index3,2,this.Img4,this.Img0_bg1,this.Img5,this.Img1_bg1,runTime/run3Index);
    }

    private turnImg(index:number,tag:number,Img0:eui.Image,Img0_bg:eui.Image,Img1:eui.Image,Img1_bg:eui.Image,preTime:number):void
    {   
        index--;
        if(index > 0)
        {
            var curIndex:number = 0;
            if(0 == tag)
            {
                curIndex = this.curOneIndex;
            }
            else if(1 == tag)
            {
                curIndex = this.curTwoIndex;
            }
            else if(2 == tag)
            {
                curIndex = this.curThreeIndex;
            }
            Img0.source = this.jsonData['slots_info']['items'][curIndex];
            curIndex++;
            if(curIndex > (this.interactiveCount-1))
            {
                curIndex = 0;

            }
            Img1.source = this.jsonData['slots_info']['items'][curIndex];
            
            egret.Tween.get(Img0).to({ y:-240}, preTime);
            egret.Tween.get(Img0_bg).to({ y:-289}, preTime);
            Img1.y = 324;
            Img1_bg.y = 290;
            egret.Tween.get(Img1).to({ y:26}, preTime);
            egret.Tween.get(Img1_bg).to({ y:-4}, preTime).call(this.turnNextImg,this,[index,tag,Img0,Img0_bg,Img1,Img1_bg,preTime]);
            if(0 == tag)
            {
                this.curOneIndex = curIndex;
            }
            else if(1 == tag)
            {
                this.curTwoIndex = curIndex;
            }
            else if(2 == tag)
            {
                this.curThreeIndex = curIndex;
            }
        }
        else
        {      
            this.endNum ++;
            if(3 == this.endNum) 
            {
                if(null != this.seccussSound)
                {
                    this.seccussSound.play(0,1);
                }
                if(null != this.slotsChannelSound)
                {
                    this.slotsChannelSound.stop();
                    this.slotsChannelSound = null;
                }

                this.timerShowRestart.reset();
                this.timerShowRestart.start();
            }
        }
    }

    private turnNextImg(index:number,tag:number,Img0:eui.Image,Img0_bg:eui.Image,Img1:eui.Image,Img1_bg:eui.Image,preTime:number):void
    {
        index--;
        if(index > 0)
        {
            var curIndex:number = 0;
            if(0 == tag)
            {
                curIndex = this.curOneIndex;
            }
            else if(1 == tag)
            {
                curIndex = this.curTwoIndex;
            }
            else if(2 == tag)
            {
                curIndex = this.curThreeIndex;
            }
            Img1.source = this.jsonData['slots_info']['items'][curIndex];
            curIndex++;
            if(curIndex > (this.interactiveCount-1))
            {
                curIndex = 0;
            }
            Img0.source = this.jsonData['slots_info']['items'][curIndex];
            egret.Tween.get(Img1).to({ y:-240}, preTime);
            egret.Tween.get(Img1_bg).to({ y:-289}, preTime);
            Img0.y = 324;
            Img0_bg.y = 290;
            egret.Tween.get(Img0).to({ y:26}, preTime);
            egret.Tween.get(Img0_bg).to({ y:-4}, preTime).call(this.turnImg,this,[index,tag,Img0,Img0_bg,Img1,Img1_bg,preTime]);            
            if(0 == tag)
            {
                this.curOneIndex = curIndex;
            }
            else if(1 == tag)
            {
                this.curTwoIndex = curIndex;
            }
            else if(2 == tag)
            {
                this.curThreeIndex = curIndex;
            }
        }
        else
        {
            this.endNum ++;
            if(3 == this.endNum) 
            {
                if(null != this.seccussSound)
                {
                    this.seccussSound.play(0,1);
                }
                if(null != this.slotsChannelSound)
                {
                    this.slotsChannelSound.stop();
                    this.slotsChannelSound = null;
                }

                this.timerShowRestart.reset();
                this.timerShowRestart.start();
            }
        }
    }

    private showRestartBtnImage():void
    {
        EffectUtils.useGlow(this.start);
        this.start.touchEnabled = true;
    }


    public destroy(): void {
        super.destroy();

        if(null != this.slotsChannelSound)
        {
            this.slotsChannelSound.stop();
            this.slotsChannelSound = null;
        }
        egret.Tween.removeTweens(this.Img0);
        egret.Tween.removeTweens(this.Img1);
        egret.Tween.removeTweens(this.Img2);
        egret.Tween.removeTweens(this.Img3);
        egret.Tween.removeTweens(this.Img4);
        egret.Tween.removeTweens(this.Img5);
        egret.Tween.removeTweens(this.Img0_bg);
        egret.Tween.removeTweens(this.Img1_bg);
        egret.Tween.removeTweens(this.Img0_bg0);
        egret.Tween.removeTweens(this.Img1_bg0);
        egret.Tween.removeTweens(this.Img0_bg1);
        egret.Tween.removeTweens(this.Img1_bg1);
        this.timerShowRestart.reset();
        this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.timerShowRestart.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtnImage,this);
    }
}