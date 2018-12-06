// TypeScript file

class DrawCardNoWordPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "DrawCardNoWordSkin";
        this.drawSound = RES.getRes("draw_card_mp3");
        if(null == this.drawSound)
        {
            RES.getResAsync("draw_card_mp3", this.onResSoundDrawLoaded, this );
        }
        this.jsonData = RES.getRes("page_info_json");
    }

    private onResSoundDrawLoaded():void
    {
        this.drawSound = RES.getRes("draw_card_mp3"); 
    }
    
    public initUI(): void {
        // if(GlobalData.isTeacher())
        // {
        //     EffectUtils.useGlow(this.rArrow);
        //     EffectUtils.useGlow(this.lArrow);
        // }
        
        this.lArrow.addEventListener( egret.TouchEvent.TOUCH_TAP, this.lArrowEventHandler, this );    
        this.rArrow.addEventListener( egret.TouchEvent.TOUCH_TAP, this.rArrowEventHandler, this );    
        this.lArrow.visible = false;
        this.rArrow.visible = true;
        this.curCardId = 0;
        this.canClick = true;

        this.boardImg.source = this.jsonData['draw_card_noword_info']['cards'][this.curCardId];
        this.runImg.source = this.jsonData['draw_card_noword_info']['cards'][this.curCardId];
        super.initUI();  
    }

    public runImg:eui.Image;
    public boardImg:eui.Image;
    public rArrow:eui.Image;
    public lArrow:eui.Image;
    public card:eui.Group;
    public endImg:eui.Image;
    public groupBegin:eui.Group;
    public groupEnd:eui.Group;
    
    private jsonData: JSON;
    private curCardId:number;
    private canClick:boolean;
    private drawSound: egret.Sound;//点击声音

    private lArrowEventHandler(evt:egret.TextEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        if(this.canClick)
        {
            var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"802",type:"2",cardId:this.curCardId});
            PageMgr.sendMsg(msg);  
            this.canClick = false; 
        }     
    } 

    private rArrowEventHandler(evt:egret.TextEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }
        
        if(this.canClick)
        {
            var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
                cmd:"801",type:"2",cardId:this.curCardId});
            PageMgr.sendMsg(msg);  
            this.canClick = false; 
        }      
    } 

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "801":
            {
                SoundManager.sound().PlayClick();
                this.moveDown(data['cardId']);
            }
            break;    
            case "802":
            {
                SoundManager.sound().PlayClick();
                this.moveUp(data['cardId']);
            }
            break;      
        }
    }

    private moveDown(tCardId:number) : void
    {
        var nextCardId = tCardId + 1;
        this.boardImg.source = this.jsonData['draw_card_noword_info']['cards'][nextCardId];

        this.runImg.source = this.jsonData['draw_card_noword_info']['cards'][tCardId];
        if(null != this.card.parent)
        {
            this.card.parent.removeChild(this.card);
        }
        this.groupBegin.addChild(this.card);
        this.card.x = 20;
        egret.Tween.get(this.card).to({x:635},800).call(this.firstMoveRComplete,this);  
        if(nextCardId >= this.jsonData['draw_card_noword_info']['cards'].length-1)
        {
            this.rArrow.visible = false;
        } 
        this.lArrow.visible = true;
        this.curCardId = nextCardId;
    }

    private firstMoveRComplete()
    {
        if(null != this.card.parent)
        {
            this.card.parent.removeChild(this.card);
        }
        this.groupEnd.addChild(this.card);
        this.card.x = 135;
        if(null != this.drawSound)
        {
            this.drawSound.play(0,1);
        }
        egret.Tween.get(this.card).to({x:-640},300).call(this.MoveComplete,this);           
    }

    private MoveComplete()
    {
        this.canClick = true;        
    }
    
    private firstMoveLComplete()
    {        
        if(null != this.drawSound)
        {
            this.drawSound.play(0,1);
        }
        if(null != this.card.parent)
        {
            this.card.parent.removeChild(this.card);
        }
        this.groupBegin.addChild(this.card);
        this.card.x = 635;
        egret.Tween.get(this.card).to({x:20},800).call(this.MoveComplete,this);           
    }

    private moveUp(tCardId:number) : void
    {
        var nextCardId = tCardId - 1;
        this.boardImg.source = this.jsonData['draw_card_noword_info']['cards'][tCardId];

        this.runImg.source = this.jsonData['draw_card_noword_info']['cards'][nextCardId];
        if(null != this.card.parent)
        {
            this.card.parent.removeChild(this.card);
        }
        this.groupEnd.addChild(this.card);
        this.card.x = -498;

        egret.Tween.get(this.card).to({x:135},300).call(this.firstMoveLComplete,this);  
        if(nextCardId < 1)
        {
            this.lArrow.visible = false;
        } 
        this.rArrow.visible = true;
        this.curCardId = nextCardId;
    }

    public destroy(): void {
        this.lArrow.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.lArrowEventHandler, this );    
        this.rArrow.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.rArrowEventHandler, this );    
        super.destroy();
    }
}