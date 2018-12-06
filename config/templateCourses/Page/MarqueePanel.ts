// TypeScript file

class MarqueePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "MarqueeSkin";
        this.jsonData = RES.getRes("page_info_json");
        var count:number = this.jsonData['marquee_info']['items'].length;
        for(var i:number=0; i<count; ++i)
        {
            this.getImg(i).source = this.jsonData['marquee_info']['items'][i];
        }
        
        this.runTime = new egret.Timer(250,0);
        this.endTime = new egret.Timer(350,3);
        this.runSound = RES.getRes("marquee_mp3");
        if(null == this.runSound)
        {
            RES.getResAsync("marquee_mp3", this.onResSoundRunLoaded, this );
        } 

        this.seccussSound = RES.getRes("success_mp3");
        if(null == this.seccussSound)
        {
            RES.getResAsync("success_mp3", this.onResSoundSecLoaded, this );
        } 
        this.timerShowRestart = new egret.Timer(5000,1);
        this.timerShowStop = new egret.Timer(3000,1);
        EffectUtils.useColorAdd(this.bgshowImg);
        this.picNameQuestion = "marquee_question_png";
        this.picNamebgImg = "preload_json.marquee";
        this.picNamebgImgcurrent = "preload_json.marquee_current";
        
    }

    private onResSoundSecLoaded():void
    {
        this.seccussSound = RES.getRes("success_mp3"); 
    }

    private onResSoundRunLoaded():void
    {
        this.runSound = RES.getRes("marquee_mp3"); 
    }

    public initUI(): void {
        this.label1.textFlow = <Array<egret.ITextElement>>[
            { text: "This is a " },
            { text: "pig", style: { "textColor": 0x0055C1 } },
            { text: "." }
        ];
        // var blurFliter = new egret.BlurFilter( 5 , 5); 
        // this.roombg.filters = [blurFliter];
        this.runTime.addEventListener(egret.TimerEvent.TIMER,this.runImg,this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);   
        this.timerShowRestart.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtn,this); 
        this.timerShowStop.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showStopBtn,this); 
        this.endTime.addEventListener(egret.TimerEvent.TIMER,this.runImg,this);
        this.endTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endTimeComFunc,this);
        // EffectUtils.useColorAdd(this.bgImg0);
        // this.showImg.source = this.Img0.source;
        this.showImg.source = this.picNameQuestion;
        this.curImgIndex = 0;
        // EffectUtils.useGlow(this.start);
        this.start.visible = true;
        this.start.touchEnabled = true;
        //this.bgshowImg.filters = [];
        super.initUI();
    }

    public destroy(): void {
        if(null != this.runChannelSound)
        {
            this.runChannelSound.stop();
            this.runChannelSound = null;
        }
        this.getBgImg(this.curImgIndex).filters = [];
        this.runTime.reset();
        this.timerShowRestart.reset();
        this.timerShowRestart.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showRestartBtn,this); 
        this.timerShowStop.reset();
        this.endTime.reset();
        this.timerShowStop.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showStopBtn,this); 
        this.runTime.removeEventListener(egret.TimerEvent.TIMER,this.runImg,this);
        this.endTime.removeEventListener(egret.TimerEvent.TIMER,this.runImg,this);
        this.endTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endTimeComFunc,this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);   
        this.initAllBgImg();
        super.destroy();
    }

    public Img0: eui.Image;
    public Img1: eui.Image;
    public Img2: eui.Image;
    public Img3: eui.Image;
    public Img4: eui.Image;
    public Img5: eui.Image;
    public Img6: eui.Image;
    public Img7: eui.Image;
    public Img8: eui.Image;
    public Img9: eui.Image;
    public Img10: eui.Image;
    public Img11: eui.Image;
    public showImg: eui.Image;
    public bgImg0: eui.Image;
    public bgImg1: eui.Image;
    public bgImg2: eui.Image;
    public bgImg3: eui.Image;
    public bgImg4: eui.Image;
    public bgImg5: eui.Image;
    public bgImg6: eui.Image;
    public bgImg7: eui.Image;
    public bgImg8: eui.Image;
    public bgImg9: eui.Image;
    public bgImg10: eui.Image;
    public bgImg11: eui.Image;
    public bgshowImg: eui.Image;
    public start:eui.Image;
    private endTime:egret.Timer;
    // public roombg:eui.Image;
    public label1:eui.Label;

    private runTime:egret.Timer;
    private curImgIndex:number;
    private jsonData: JSON;
    private runSound: egret.Sound;
    private seccussSound: egret.Sound;
    private runChannelSound: egret.SoundChannel;
    private timerShowRestart:egret.Timer;
    private timerShowStop:egret.Timer;
    private stopIndex:number = 0;
    private picNameQuestion:string ;
    private picNamebgImg:string;
    private picNamebgImgcurrent:string;

    private startClick(evt:egret.TouchEvent):void
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var gridIndex = this.curImgIndex + Math.ceil(Math.random()*3)+2        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1101",type:"2",gridIndex:gridIndex});
        PageMgr.sendMsg(msg);
    }       
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1101":
            {
                this.stopIndex = data['gridIndex'];
                this.starTurn();
            }
            break;    
        }
    }

    private starTurn():void
    {     
        this.endTime.reset(); 
        this.endTime.stop();
        this.runTime.reset();
        this.runTime.start();
        this.timerShowStop.reset();
        this.timerShowStop.start();
        if(null != this.runChannelSound)
        {
            this.runChannelSound.stop();
            this.runChannelSound = null;
        }        
        if(null != this.runSound)
        {
            this.runChannelSound = this.runSound.play(0,0);
        }        
        // this.start.touchEnabled = false;
        this.start.visible = false;
        // EffectUtils.useError(this.start);
    }
    
    private runImg()
    {
        this.getBgImg(this.curImgIndex).filters = [];
        this.curImgIndex++;
        if(this.curImgIndex > 11)
        {
            this.curImgIndex = 0;
        }
        // EffectUtils.useColorAdd(this.getBgImg(this.curImgIndex));
        this.initAllBgImg();
        this.getBgImg(this.curImgIndex).source = this.picNamebgImgcurrent;
        // this.showImg.source = this.getImg(this.curImgIndex).source;  
        this.showImg.source = this.picNameQuestion;
    }

    private initAllBgImg()
    {
        for(var i:number = 0; i <= 11; i++)
        {
            this.getBgImg(i).source = this.picNamebgImg;
        }
    }

    private showRestartBtn():void
    {
        this.start.visible = true;
        // EffectUtils.useGlow(this.start);
        this.start.touchEnabled = true;
    }

    private showStopBtn():void
    {
        this.runTime.reset();
        this.runTime.stop();
        this.timerShowStop.reset();
        this.timerShowStop.stop();
        this.endTime.reset();
        this.endTime.repeatCount = (this.stopIndex + 12 - this.curImgIndex)%12; 
        this.endTime.start();
        if(0 == this.endTime.repeatCount)
        {
            EffectUtils.useColorAdd(this.getBgImg(this.curImgIndex));
            // this.showImg.source = this.getImg(this.curImgIndex).source;  
            this.showImg.source = this.getShowImgSourse(this.curImgIndex);
            this.endTimeComFunc();
        } 
    }  

    private endTimeComFunc()
    {
        // this.showImg.source = this.getImg(this.curImgIndex).source;  
        this.showImg.source = this.getShowImgSourse(this.curImgIndex);
        this.endTime.stop(); 
        if(null != this.runChannelSound)
        {
            this.runChannelSound.stop();
            this.runChannelSound = null;
        }
        this.timerShowRestart.reset();
        this.timerShowRestart.start();  
        if(null != this.seccussSound)
        {
            this.seccussSound.play(0,1);
        }
    }

    private getImg(curIndex:number):eui.Image
    {
         switch(curIndex)
        {
            case 0:
                return this.Img0;
            case 1:
                return this.Img1;
            case 2:
                return this.Img2;
            case 3:
                return this.Img3;
            case 4:
                return this.Img4;
            case 5:
                return this.Img5;
            case 6:
                return this.Img6;
            case 7:
                return this.Img7;
            case 8:
                return this.Img8;
            case 9:
                return this.Img9;
            case 10:
                return this.Img10;
            case 11:
                return this.Img11;
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
    }

    private getBgImg(curIndex:number):eui.Image
    {
         switch(curIndex)
        {
            case 0:
                return this.bgImg0;
            case 1:
                return this.bgImg1;
            case 2:
                return this.bgImg2;
            case 3:
                return this.bgImg3;
            case 4:
                return this.bgImg4;
            case 5:
                return this.bgImg5;
            case 6:
                return this.bgImg6;
            case 7:
                return this.bgImg7;
            case 8:
                return this.bgImg8;
            case 9:
                return this.bgImg9;
            case 10:
                return this.bgImg10;
            case 11:
                return this.bgImg11;
        }
    }

    private getShowImgSourse(curIndex:number):string {
        if(curIndex < this.jsonData['marquee_info']['items_show'].length && curIndex >= 0)
        {
            return this.jsonData['marquee_info']['items_show'][curIndex];
        }
        else 
        {
            return this.picNameQuestion;
        }
        
    }

}