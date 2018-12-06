class TriggerPopGroupPanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "TriggerPopGroupSkin";
        if(GlobalData.isTeacher())
        {
            var star:Role = new Role("star_play",this.group0);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();

            var star:Role = new Role("star_play",this.group1);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();

            var star:Role = new Role("star_play",this.group2);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();

            var star:Role = new Role("star_play",this.group3);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();

            var star:Role = new Role("star_play",this.group4);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();

            var star:Role = new Role("star_play",this.group5);
            star.posX = 28;
            star.posY = 28;  
            star.scaleX = 0.3;   
            star.scaleY = 0.34;  
            star.aniName = "play"; 
            star.loadRes();                                                
        }        
    }
    
    private imgRes:string = "item_1_png";
    private title:string = "";

    public group0:eui.Group;
    public group1:eui.Group;  
    public group2:eui.Group;
    public group3:eui.Group;   
    public group4:eui.Group;
    public group5:eui.Group;   

    public initUI(): void {
        this.group0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);            
        this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);        
        this.group2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);            
        this.group3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);      
        this.group4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);            
        this.group5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);                      
        this.group0.touchEnabled=true;
        this.group1.touchEnabled=true;
        this.group2.touchEnabled=true;
        this.group3.touchEnabled=true;
        this.group4.touchEnabled=true;
        this.group5.touchEnabled=true;
        super.initUI();
    }

    public destroy(): void {
        this.group0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);                   
        this.group1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);           
        this.group2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);                   
        this.group3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this); 
        this.group4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);                   
        this.group5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);                 
        super.destroy();
    }

    private onClick(evt: egret.TouchEvent) {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }        
        var msg: string = JSON.stringify({
            pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "201", type: "2",name:evt.target.name
        });
        PageMgr.sendMsg(msg);
    } 
    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "201":
            {
                switch(data['name'])
                {
                    case "0":
                        this.imgRes = "item_1_png";
                        this.title = "";
                    break;
                    case "1":
                        this.imgRes = "item_2_png";
                        this.title = "";
                    break;
                    case "2":
                        this.imgRes = "item_3_png";
                        this.title = "";
                    break;
                    case "3":
                        this.imgRes = "item_4_png";
                        this.title = "";
                    break;
                    case "4":
                        this.imgRes = "item_5_png";
                        this.title = "";
                    break;
                    case "5":
                        this.imgRes = "item_6_png";
                        this.title = "";
                    break;                                                                                                    
                }    
                PopupsPanel.popups().showFrame(this.imgRes, this.title);
            }
            break;    
            case "202":
            {
               PopupsPanel.popups().closeFrame();
            }
            break;      
        }
    }   
}