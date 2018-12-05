// TypeScript file

class CheckAnswerPanel extends eui.Component {
    private static _instance: CheckAnswerPanel;
    public static checkAnswer(): CheckAnswerPanel {
        if(null == CheckAnswerPanel._instance)
        {
            CheckAnswerPanel._instance = new CheckAnswerPanel();
        }
        return CheckAnswerPanel._instance;
    }

    public constructor() {
        super();
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    }

    private checks: Array<PageBase> = [];

    public showResult(tPoint:egret.Point,isRight:boolean):void
    {    
        var checkImg:eui.Image = new eui.Image;

        if(isRight)
        {
            var factory: dragonBones.EgretFactory = GameMaths.addArmatureToFactory("right");
            let armatureDisplay: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Sprite", "right");
            this.addChild(armatureDisplay);
            armatureDisplay.x = tPoint.x;
            armatureDisplay.y = tPoint.y;        
            armatureDisplay.animation.play("Sprite");
        }
        else
        {
            var factory: dragonBones.EgretFactory = GameMaths.addArmatureToFactory("error");
            let armatureDisplay: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Sprite", "error");
            this.addChild(armatureDisplay);
            armatureDisplay.x = tPoint.x;
            armatureDisplay.y = tPoint.y;        
            armatureDisplay.animation.play("Sprite");
        }
    }

    public destroy(): void {
        this.removeChildren();
    }
}