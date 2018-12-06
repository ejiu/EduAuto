class PlayUFOPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "PlayUFOSkin";
        this.jsonData = RES.getRes("page_info_json");
        this.interactiveCount = this.jsonData['play_ufo_info']['image_path'].length;

        for(var i:number = 0; i<this.interactiveCount; ++i)
        {
            RES.getRes(this.jsonData['play_ufo_info']['sound_path'][i]);
        }        
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][0], this.onLetter0SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][1], this.onLetter1SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][2], this.onLetter2SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][3], this.onLetter3SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][4], this.onLetter4SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][5], this.onLetter5SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][6], this.onLetter6SoundLoaded, this );
        RES.getResAsync(this.jsonData['play_ufo_info']['sound_path'][7], this.onLetter7SoundLoaded, this );
       
        this.soundUFO = RES.getRes("ufo_mp3"); 
        RES.getResAsync("ufo_mp3", this.onUFOSoundLoaded, this );

        var star = new Role("star_play", this.UFOgroup);
        star.posX = 150;
        star.posY = 100;
        star.scaleX = 1;
        star.scaleY = 1;
        star.aniName = "play";
        star.loadRes();           
    }
    
    public UFOgroup: eui.Group;
    public item_0: eui.Image;
    public item_1: eui.Image;
    public item_2: eui.Image;
    public item_3: eui.Image;
    public item_4: eui.Image;
    public item_5: eui.Image;
    public item_6: eui.Image;
    public item_7: eui.Image;

    public resultPos_0: eui.Component;
    public resultPos_1: eui.Component;
    public resultPos_2: eui.Component;
    public resultPos_3: eui.Component;
    public resultPos_4: eui.Component;
    public resultPos_5: eui.Component;
    public resultPos_6: eui.Component;
    public resultPos_7: eui.Component;

    public lightImg: eui.Image;

    private sound_0: egret.Sound;
    private sound_1: egret.Sound;
    private sound_2: egret.Sound;
    private sound_3: egret.Sound;
    private sound_4: egret.Sound;
    private sound_5: egret.Sound;
    private sound_6: egret.Sound;
    private sound_7: egret.Sound;

    private timeOutId1:number; 
    private letterSet: number[];

    private soundLetter: egret.Sound;
    private soundUFO: egret.Sound;
    private channel:egret.SoundChannel;
    private ufoChannel:egret.SoundChannel;
    public planeAnim: egret.tween.TweenGroup;

    private isSounding: boolean;
    private pathStr: string;
    private star: Role;
    private letterCount:number;
    private interactiveCount:number; 
    private choosedNumber: number   //当前选中图片的索引值
    private jsonData:JSON;

    public initUI(): void {
        this.Refresh();

        this.letterCount = -1;
        this.isSounding = false;
        this.letterSet = [0, 1, 2, 3, 4, 5, 6, 7];
        
        this.UFOgroup.visible = true;
        this.UFOgroup.touchEnabled = true;
        this.UFOgroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUFOClick, this);
        
        this.planeAnim.stop();
        this.planeAnim.play();
        this.planeAnim.addEventListener('complete', this.onPlaneAnimComplete, this);

        super.initUI();        
    }
    
    public Refresh():void
    {
        var tImg: eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);
            tImg.filters = [];
            tImg.visible = false;
        }

        egret.Tween.removeAllTweens();       
        egret.clearTimeout(this.timeOutId1);    
        this.letterCount = -1;
        this.isSounding = false;
        this.lightImg.rotation = 0;
        this.lightImg.scaleX = 1;
    }

    private onUFOSoundLoaded():void
    {
        this.soundUFO = RES.getRes("ufo_mp3"); 
    }

    private onLetter0SoundLoaded(): void
    {
        this.sound_0 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][0])
    }

    private onLetter1SoundLoaded(): void
    {
        this.sound_1 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][1])
    }

    private onLetter2SoundLoaded(): void
    {
        this.sound_2 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][2])
    }

    private onLetter3SoundLoaded(): void
    {
        this.sound_3 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][3])
    }

    private onLetter4SoundLoaded(): void
    {
        this.sound_4 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][4])
    }

    private onLetter5SoundLoaded(): void
    {
        this.sound_5 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][5])
    }

    private onLetter6SoundLoaded(): void
    {
        this.sound_6 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][6])
    }

    private onLetter7SoundLoaded(): void
    {
        this.sound_7 = RES.getRes(this.jsonData['play_ufo_info']['sound_path'][7])
    }

    private dealUFOClick(tmpNum: number): void
    {
        if(null != this.ufoChannel){
            this.ufoChannel.stop();
            this.ufoChannel = null;
        }
        if(null != this.soundUFO)
        {
            this.ufoChannel = this.soundUFO.play(0, 1);
        }

        var degree: number;
        switch(this.letterCount){
            case 0:
                degree = 20;
                break;
            case 1:
                degree = 4;
                break;
            case 2:
                degree = -12;
                break;                
            case 3:
                degree = -28;
                break;
            case 4:
                degree = -36;
                break;
            case 5:
                degree = -45;
                break;
            case 6:
                degree = -52;
                break;
            case 7:
                degree = -58;
                break;
        }
        egret.Tween.get(this.lightImg).to({rotation: degree}, 800);

        this.UFOgroup.touchEnabled = false;
        var tImg :eui.Image = this.getInteractImg(tmpNum);
        tImg.source = this.jsonData['play_ufo_info']['image_path'][tmpNum];
        tImg.x = this.UFOgroup.x + 71;
        tImg.y = this.UFOgroup.y + 120;
        tImg.filters = [];
        tImg.scaleX = 0.5;
        tImg.scaleY = 0.5;
        tImg.visible = true;
        var tResult:eui.Component = this.getResultPos(this.letterCount);
        var x = tResult.x;
        var y = tResult.y;
        egret.Tween.get(tImg).to({x, y, scaleX:1, scaleY:1}, 1000);
        egret.Tween.get(tImg).to({rotation: 360}, 800);
        this.timeOutId1= egret.setTimeout(function ()
        {
            tImg.name = tmpNum.toString();
            tImg.touchEnabled = true;
            tImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLetterClick, this);
            EffectUtils.useGlow(tImg);
            this.UFOgroup.touchEnabled = true;
            if(this.letterCount >= this.interactiveCount-1){
                this.UFOgroup.touchEnabled = false;
                this.UFOgroup.visible = false;
                egret.Tween.get(this.lightImg).to({scaleX: 0}, 600);
            }
        },this,1000);

    }

    private dealLetterClick(tTargetIndex: number): void{
        if(!this.isSounding){
            this.isSounding = true;
            this.choosedNumber = tTargetIndex;

            //Letter图片响应点击动画效果
            var tImage :eui.Image = this.getInteractImg(tTargetIndex);
            tImage.touchEnabled = false
            egret.Tween.get(tImage).to({scaleX: 1.4, scaleY: 1.4}, 300);
            EffectUtils.rockObj(tImage,100,10);

            //播放音乐
            this.soundLetter = this.getSound(tTargetIndex);
            this.channel = this.soundLetter.play(0, 1);
            this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        }
    }

    private onSoundComplete(): void{
        this.isSounding = false;
        var tImage :eui.Image = this.getInteractImg(this.choosedNumber);
        tImage.touchEnabled = true;
        egret.Tween.get(tImage).to({scaleX: 1, scaleY: 1}, 300);
    }

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "1401":
            {
                this.letterSet.splice(this.letterSet.indexOf(data['num']),1);
                this.letterCount++;
                this.dealUFOClick(data['num']);
            }
            case "1402":
            {
                switch(data['name']){
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                        this.dealLetterClick(parseInt(data['name']));
                        break;
                }    
            }
            break;
        }
    }

    public destroy(): void {
        this.removeAllFilters();
        this.UFOgroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUFOClick, this);
        this.planeAnim.removeEventListener('complete', this.onPlaneAnimComplete, this);
        
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {
            var tImg :eui.Image = this.getInteractImg(i);
            tImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLetterClick, this);
        }

        if(null != this.channel)
        {
            this.channel.stop();
            this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.channel = null;
        }
        if(null != this.ufoChannel)
        {
            this.ufoChannel.stop();
            this.ufoChannel = null;
        }
        super.destroy();
    }

    private onUFOClick(evt: egret.TouchEvent) {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }        

        var randomNumber : number;
        randomNumber = this.letterSet[Math.ceil(Math.random() * this.letterSet.length - 1 )];
       

        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "1401", type: "3",num: randomNumber
        });
        PageMgr.sendMsg(msg);
    }

    private onLetterClick(evt: egret.TouchEvent) {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }        
        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "1402", type: "4",name:evt.target.name
        });
        PageMgr.sendMsg(msg);
    }
   
    private getResultPos(num:number):eui.Component
    { 
        switch(num)
        {
            case 0:
                return this.resultPos_0;
            case 1:
                return this.resultPos_1;
            case 2:
                return this.resultPos_2;
            case 3:
                return this.resultPos_3;
            case 4:
                return this.resultPos_4;
            case 5:
                return this.resultPos_5;
            case 6:
                return this.resultPos_6;
            case 7:
                return this.resultPos_7;
            default:
                return this.resultPos_0;
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
            case 2:
                return this.item_2;
            case 3:
                return this.item_3;
            case 4:
                return this.item_4;
            case 5:
                return this.item_5;
            case 6:
                return this.item_6;
            case 7:
                return this.item_7;
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
            case 2:
                return this.sound_2;
            case 3:
                return this.sound_3;
            case 4:
                return this.sound_4;
            case 5:
                return this.sound_5;
            case 6:
                return this.sound_6;
            case 7:
                return this.sound_7;
            default:
                return this.sound_0;
        }
    }

    private onPlaneAnimComplete(): void{
        this.planeAnim.stop();
        this.planeAnim.play();
    }

    private removeAllFilters():void
    {
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {  
            this.getInteractImg(i).filters = [];   
        }
    }
}