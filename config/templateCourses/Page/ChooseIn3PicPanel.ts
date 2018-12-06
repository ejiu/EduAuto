class ChooseIn3PicPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChooseIn3PicSkin";
        this.interactiveCount = 3;
    }
    public img0:eui.Image;
    public img1:eui.Image;
    public img2:eui.Image;
    public select:eui.Image;
    public tbReset :eui.Image;

    private interactiveCount:number; 
    
    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
        }
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);        
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).touchEnabled = true;
            this.getInteractImg(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClick, this);
        }
        this.refresh();
        super.initUI();
    }
    
    public refresh():void
    {
        if(GlobalData.bAuthority)
        {
            this.setAllEffect(true);
        }
        else
        {
            this.setAllEffect(false);
        }
        this.setAllNomal();
    }

    private imgClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1201",type:"2",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
    }

    private refreshClick(evt:egret.TouchEvent)
    {
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"99",type:"1"});
        PageMgr.sendMsg(msg);
    }    
    
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "99":
            {
                for(var i:number = 0; i<this.interactiveCount; ++i)
                {      
                   this.getInteractImg(i).touchEnabled = true;
                }
                SoundManager.sound().PlayClick();
                this.refresh();
            }
            break;            
            case "1201":
            {
                for(var i:number = 0; i<this.interactiveCount; ++i)
                {      
                   this.getInteractImg(i).touchEnabled = true;
                   if(i == data['targetIndex'])
                   {
                       this.getInteractImg(i).touchEnabled = false;
                   }
                }
                this.dealImgChoose(data['targetIndex']);
            }
            break;           
        }
    }

    private dealImgChoose(tTargetIndex:number):void
    {
        SoundManager.sound().PlayClick();
        this.refresh();
        if(!this.select.visible)
        {
            this.select.visible = true;
        }

        if(0 == tTargetIndex)
        {
            this.select.x = this.img0.x + this.img0.width - 10;
        }
        else if(1 == tTargetIndex)
        {            
            this.select.x = this.img1.x + this.img1.width - 10;
        }
        else if(2 == tTargetIndex)
        {            
            this.select.x = this.img2.x + this.img2.width - 10;
        }
    }

    public setAuthority(tAuthority : boolean): void {
        super.setAuthority(tAuthority);
        if(tAuthority)
        {
            this.setAllEffect(true);
        }
        else
        {
            this.setAllEffect(false);
        }
    }

    private setAllNomal()
    {
        this.select.visible = false;
    }

    private setAllEffect(tVisible:boolean)
    {
        if(tVisible)
        {
            for(var i:number = 0; i<this.interactiveCount; ++i)
            {      
                this.getInteractImg(i).filters = [];
                if(this.getInteractImg(i).touchEnabled){
                    EffectUtils.useGlow(this.getInteractImg(i));
                }
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


    public destroy(): void {  
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClick, this);
        }
        super.destroy();
    }   
}