class ChooseCirclePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChooseCircleSkin";
        this.interactiveCount = 3;
    }
    
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

    public bg0:eui.Image;
    public bg1:eui.Image;
    public bg2:eui.Image;
    public tbReset :eui.Image;

    private normalResImg:string = "empty_png";
    private chooseResImg:string = "select_png";
    private interactiveCount:number; 
    
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
        if(0 == tTargetIndex)
        {
            this.bg0.source = this.chooseResImg;
        }
        else if(1 == tTargetIndex)
        {            
            this.bg1.source = this.chooseResImg;
        }
        else if(2 == tTargetIndex)
        {            
            this.bg2.source = this.chooseResImg;
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

    private setAllNomal()
    {
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).source = this.normalResImg;
        }
    }

    private getInteractImg(index: number):eui.Image
    {        
        switch(index)
        {
            case 0:
                return this.bg0;
            case 1:
                return this.bg1;
            case 2:
                return this.bg2;
            default:
                return  this.bg0;
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