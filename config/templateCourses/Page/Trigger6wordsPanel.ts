// TypeScript file

class Trigger6wordsPanel extends PageBase {
    public label1:eui.Label;   
    public label2:eui.Label;   
    public label3:eui.Label;   
    public label4:eui.Label;   
    public label5:eui.Label;   
    public label6:eui.Label;   
    // public stageBG:eui.Image;

    public effect0:eui.Component; 
    public effect1:eui.Component; 
    public effect2:eui.Component; 
    public effect3:eui.Component; 
    public effect4:eui.Component; 
    public effect5:eui.Component; 

    private textTitle:egret.ITextElement[];
    private textContent:egret.ITextElement[];

    private imgRes:string ="";

    public constructor() {
        super();
        this.skinName = "Trigger6wordsSkin";  
        // var blurFliter = new egret.BlurFilter( 5 , 5);  
        // this.stageBG.filters = [blurFliter];     //高斯模糊  

        if(GlobalData.isTeacher())
        {           
            var star:Role = new Role("star_play",this.effect0);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect0.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect1);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect1.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect2);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect2.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect3);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect3.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect4);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect4.touchEnabled= false;
            star.loadRes();

            star = new Role("star_play",this.effect5);
            star.posX = 0;
            star.posY = 0;  
            star.scaleX = 0.6;   
            star.scaleY = 0.6;  
            star.aniName = "play"; 
            this.effect5.touchEnabled= false;
            star.loadRes();
        }
    }
    
    public initUI(): void {
        super.initUI();        
        this.label1.textFlow = <Array<egret.ITextElement>>[        
            {text: "left", style: {"textColor": 0x026ED8,"href" : "event:event1"}}           
        ];
        this.label1.touchEnabled = true;
        this.label1.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );     

        this.label2.textFlow = <Array<egret.ITextElement>>[           
            {text: "how", style: {"textColor": 0x026ED8,"href" : "event:event2"}}            
        ];
        this.label2.touchEnabled = true;
        this.label2.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );     

        this.label3.textFlow = <Array<egret.ITextElement>>[           
            {text: "meet", style: {"textColor": 0x026ED8,"href" : "event:event3"}}            
        ];
        this.label3.touchEnabled = true;
        this.label3.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );   

        this.label4.textFlow = <Array<egret.ITextElement>>[           
            {text: "see", style: {"textColor": 0x026ED8,"href" : "event:event4"}}            
        ];
        this.label4.touchEnabled = true;
        this.label4.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );  

        this.label5.textFlow = <Array<egret.ITextElement>>[           
            {text: "where", style: {"textColor": 0x026ED8,"href" : "event:event5"}}            
        ];
        this.label5.touchEnabled = true;
        this.label5.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );  

        this.label6.textFlow = <Array<egret.ITextElement>>[           
            {text: "walk", style: {"textColor": 0x026ED8,"href" : "event:event6"}}            
        ];
        this.label6.touchEnabled = true;
        this.label6.addEventListener( egret.TextEvent.LINK, this.TriggerText, this );  
    }

    public destroy(): void {
        this.label1.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this ); 
        this.label2.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );   
        this.label3.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );  
        this.label4.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );  
        this.label5.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );  
        this.label6.removeEventListener( egret.TextEvent.LINK, this.TriggerText, this );                  
        super.destroy();
    }

    private TriggerText(evt:egret.TextEvent)
    {
        if(!GlobalData.isTeacher() && !GlobalData.bAuthority)
        {
            return;
        }        
        var msg :string = JSON.stringify({pageIndex:PageMgr.pageMgr().curPage.pageId,
            cmd:"201",type:"2",word:evt.text});
        PageMgr.sendMsg(msg);        
    }  

    public receiveMsg(msg: string): void {
        var data =  JSON.parse(msg);
        switch(data['cmd'])
        {
            case "201":
            {
                switch(data['word'])
                {
                    case "event1":
                        this.imgRes ="pre_Card_left_png";
                    break;
                    case "event2":
                        this.imgRes ="pre_Card_how_png";
                    break;
                    case "event3":
                        this.imgRes ="pre_Card_meet_png";
                    break;
                    case "event4":
                        this.imgRes ="pre_Card_see_png";
                    break;
                    case "event5":
                        this.imgRes ="pre_Card_where_png";
                    break;
                    case "event6":
                        this.imgRes ="pre_Card_walk_png";
                    break;                   
                }             
                WordInterpretPanel.popups().showFrame(this.imgRes);
                // WordInterpretPanel.popups().destroy(); //注意在父类增加destroy方法。
            }
            break;    
            case "202":
            {
               WordInterpretPanel.popups().closeFrame();
            }
            break;      
        }
    }    
}