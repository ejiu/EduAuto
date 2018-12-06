class ChangePicPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChangePicSkin";
        this.interactiveCount = 3;           
    }

    public img0:eui.Image;
    public img1:eui.Image;    
    public img2:eui.Image;     
    public img0_orgin: eui.Image;
    public img1_orgin: eui.Image;
    public img2_orgin: eui.Image;
    public img_end: eui.Image
    private timeOutId1:number; 
    private interactiveCount:number; 

    public initUI():void
    {
        this.img0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);   
        this.img1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this); 
        this.img2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this); 
        this.Refresh();    
        super.initUI();    

    }
    public destroy(): void {
        this.img0.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.img1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.img2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);        
        super.destroy();
    }
    
    public Refresh():void
    {
        var tImg: eui.Image;
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            tImg = this.getInteractImg(i);   
            if(GlobalData.bAuthority)
            { 
                EffectUtils.useGlow(tImg);
            }
            tImg.visible = true;
        }

        egret.Tween.removeAllTweens();       
        egret.clearTimeout(this.timeOutId1);    
        this.img_end.visible = false;
        this.img0.x=this.img0_orgin.x;
        this.img0.y=this.img0_orgin.y;
        this.img0.scaleX=1;
        this.img0.scaleY=1;
        this.img0.touchEnabled=true;   
        this.img1.x=this.img1_orgin.x;
        this.img1.y=this.img1_orgin.y;
        this.img1.scaleX=1;
        this.img1.scaleY=1;
        this.img1.touchEnabled=true;  
        this.img2.x=this.img2_orgin.x;
        this.img2.y=this.img2_orgin.y;
        this.img2.scaleX=1;
        this.img2.scaleY=1;
        this.img2.touchEnabled=true;                
    }
    public receiveMsg(msg: string): void {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "302":
                {
                    switch (data['name']) {
                        case "img0":
                            SoundManager.sound().PlayClick();                    
                            this.Refresh();                          
                            this.img0.touchEnabled=false;  
                            this.img1.touchEnabled=false;    
                            this.img2.touchEnabled=false;
                            var x=this.img_end.x;
                            var y= this.img_end.y;
                            egret.Tween.get(this.img0).to({x,y,scaleX:1,scaleY:1}, 1000);    
                            this.timeOutId1= egret.setTimeout(function () 
                            {
                                this.img0.touchEnabled=false;                                  
                                this.img1.touchEnabled=true;    
                                this.img2.touchEnabled=true;
                                this.img_end.source = this.img0.source;
                                this.img_end.visible = true;
                                this.img0.visible = false;
                            },this,1000);                                                                                                           
                            break;  
                      case "img1":
                            SoundManager.sound().PlayClick();                  
                            this.Refresh();                        
                            this.img0.touchEnabled=false;  
                            this.img1.touchEnabled=false;    
                            this.img2.touchEnabled=false;  
                            var x=this.img_end.x;
                            var y= this.img_end.y;                               
                            egret.Tween.get(this.img1).to({x,y,scaleX:1,scaleY:1}, 1000);    
                            this.timeOutId1= egret.setTimeout(function () 
                            {
                                this.img0.touchEnabled=true;                                  
                                this.img1.touchEnabled=false;    
                                this.img2.touchEnabled=true;  
                                this.img_end.source = this.img1.source;
                                this.img_end.visible = true;
                                this.img1.visible = false;
                            },this,1000);                                                                                                           
                            break;  
                      case "img2":
                            SoundManager.sound().PlayClick();                  
                            this.Refresh();                        
                            this.img0.touchEnabled=false;  
                            this.img1.touchEnabled=false;    
                            this.img2.touchEnabled=false;    
                            var x=this.img_end.x;
                            var y= this.img_end.y;                                 
                            egret.Tween.get(this.img2).to({x,y,scaleX:1,scaleY:1}, 1000);   
                            this.timeOutId1= egret.setTimeout(function () 
                            {
                                this.img0.touchEnabled=true;                                  
                                this.img1.touchEnabled=true;    
                                this.img2.touchEnabled=false;  
                                this.img_end.source = this.img2.source;
                                this.img_end.visible = true;
                                this.img2.visible = false;                                
                            },this,1000);                                                                                                              
                            break;                                                                                  
                    }
                }
                break;
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                EffectUtils.useGlow(this.getInteractImg(i));
            }
        }
        else
        {
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                this.getInteractImg(i).filters = [];
            }
        }
    }

    private getInteractImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.img0;
            case 1:
                return this.img1;
            case 2:
                return this.img2;
            default:
                return  this.img0;
        }
    }    

    private onClick(evt:egret.TouchEvent)
    {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "302", type: "2", name: evt.target.name
        });
        PageMgr.sendMsg(msg);
    }         
}