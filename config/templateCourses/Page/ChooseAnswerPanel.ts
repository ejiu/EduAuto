class ChooseAnswerPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "ChooseAnswerSkin";
        this.interactiveCount = 3;

        this.answerHeaderStr = "B.";
        this.answerContentStr = "Do you like to play on the swing?";
    }
    
    public tbAnswer:eui.Image;
    public tbReset :eui.Image;    
    public AnswerH:eui.Label;
    public AnswerC:eui.Label;
    public bg0:eui.Image;
    public bg1:eui.Image;
    public bg2:eui.Image;    

    private normalResImg:string = "empty_png";
    private chooseResImg:string = "select_png";
    private interactiveCount:number; 
    private answerHeaderStr:string = "";
    private answerContentStr:string = "";

    public initUI(): void {
        if(!GlobalData.isTeacher())
        {
            this.tbReset.visible = false;
            this.tbAnswer.visible = false;
        }
        this.AnswerH.filters = [];
        this.AnswerH.textFlow = <Array<egret.ITextElement>>[           
            {text: this.answerHeaderStr, style: {"textColor": 0x000000}}       
        ];
        this.AnswerC.filters = [];
        this.AnswerC.textFlow = <Array<egret.ITextElement>>[           
            {text: this.answerContentStr, style: {"textColor": 0x000000}}       
        ];
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).touchEnabled = true;
            this.getInteractImg(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClick, this);
        }       
        this.tbReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);        
        this.tbAnswer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AnswerClick, this);       

        this.refresh();        
        super.initUI();        
    }

    private AnswerClick(evt:egret.TextEvent){
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"502",type:"2"});
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
                this.AnswerH.filters = [];
                this.AnswerH.textFlow = <Array<egret.ITextElement>>[           
                    {text:  this.answerHeaderStr, style: {"textColor": 0x000000}}       
                ];
                this.AnswerC.filters = [];
                this.AnswerC.textFlow = <Array<egret.ITextElement>>[           
                    {text: this.answerContentStr, style: {"textColor": 0x000000}}       
                ];          
                      
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
            case "502":
            {
                SoundManager.sound().PlayClick();
                EffectUtils.useGlow(this.AnswerH);
                EffectUtils.useGlow(this.AnswerC);
                this.AnswerH.textFlow = <Array<egret.ITextElement>>[           
                    {text:  this.answerHeaderStr, style: {"textColor": 0xFF0000}}       
                ];                
                this.AnswerC.textFlow = <Array<egret.ITextElement>>[           
                    {text: this.answerContentStr, style: {"textColor": 0xFF0000}}       
                ];
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

    private setAllNomal()
    {
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).source = this.normalResImg;
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

    private imgClick(evt:egret.TouchEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"1201",type:"3",targetIndex:parseInt(evt.target.name)});
        PageMgr.sendMsg(msg);
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
        for(var i:number = 0; i<this.interactiveCount; ++i)
        {      
            this.getInteractImg(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.imgClick, this);
        }
        this.tbReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClick, this);
        this.tbAnswer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.AnswerClick, this);             
        super.destroy();
    }
}