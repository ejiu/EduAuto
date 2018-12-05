// TypeScript file

class FingerHintPanel extends eui.Component {
    private static _instance: FingerHintPanel;
    public static finger(): FingerHintPanel {
        if(null == FingerHintPanel._instance)
        {
            FingerHintPanel._instance = new FingerHintPanel();
        }
        return FingerHintPanel._instance;
    }

    public constructor() {
        super();
        this.finger = new eui.Image;
        this.finger.source = "preload_json.finger";
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    }


    private beginMoveTimer:egret.Timer;
    private revMoveTime:egret.Timer;
    private endMoveTimer:egret.Timer;
    private beginPoint:egret.Point;
    private endPoint:egret.Point;
    private finger:eui.Image;
    private moveTime:number;
    public showFingerMove(tBeginPoint:egret.Point,tEndPoint:egret.Point,tMoveTime:number):void
    {        
        this.beginPoint = tBeginPoint;
        this.endPoint = tEndPoint;
        this.finger.x = tBeginPoint.x;
        this.finger.y = tBeginPoint.y;
        this.moveTime = tMoveTime;
        this.addChild(this.finger);
        egret.Tween.get(this.finger).to({x:this.endPoint.x, y:this.endPoint.y},tMoveTime).call(this.revMove,this);
    }

    private revMove():void
    {
        var offsetx = this.beginPoint.x + 2*(this.endPoint.x - this.beginPoint.x)/3.0;
        var offsety = this.beginPoint.y + 2*(this.endPoint.y - this.beginPoint.y)/3.0;
        egret.Tween.get(this.finger).to({x:offsetx, y:offsety,scaleX:1.2,scaleY:1.2},this.moveTime/5).call(this.revMove2,this);
    }

    private revMove2():void
    {
        egret.Tween.get(this.finger).to({x:this.beginPoint.x, y:this.beginPoint.y,scaleX:1,scaleY:1},this.moveTime/4).call(this.secMove,this);
    }

    private secMove():void
    {
        egret.Tween.get(this.finger).to({x:this.endPoint.x, y:this.endPoint.y},this.moveTime).call(this.endMove,this);
    }

    private endMove()
    {
        if(null != this.finger.parent)
        {
            this.removeChild(this.finger);
        }
    }

    public destroy(): void {
        egret.Tween.removeTweens(this.finger);
        this.removeChildren();
    }
}