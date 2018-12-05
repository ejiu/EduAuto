// TypeScript file

class HomePagePanel extends PageBase {
    public constructor() {
        super();
        this.skinName = "HomePageSkin";

        var betty:Role = new Role("betty",this);
        betty.posX = 780;
        betty.posY = 680;  
        betty.scaleX = -0.8;   
        betty.scaleY = 0.8;   
        betty.loadRes();
    }

    /**
     * EXML中对应id为beginGroup的动画组对象
     */
    public beginGroup: egret.tween.TweenGroup;
    public className:eui.Label;
    
    public initUI(): void {
        super.initUI();        

        //循环播放动画
        for(var key in this.beginGroup.items)
        {
            this.beginGroup.items[key].props = {loop:true};
        }
        this.beginGroup.play();   
        
        this.className.textFlow = <Array<egret.ITextElement>>[
            {text: "Junior Level A\nStarting School 1", style: {"strokeColor":0xffffff,stroke:4}}];
    }

    public destroy(): void {
        this.beginGroup.stop();
        super.destroy();
    }
}