// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Role = (function () {
    function Role(_name, tParent) {
        this._num = 0;
        this.posX = 0;
        this.posY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.times = 0;
        this.armatureDisplay = null;
        this.callback = null;
        this.aniName = "idle";
        this.secAniName = "idle";
        this.timeScale = 1;
        this._num = 0;
        this.resName = _name;
        this._parent = tParent;
    }
    Role.prototype.loadRes = function () {
        RES.getResAsync(this.resName + "_ske_json", this.onResLoaded, this);
        RES.getResAsync(this.resName + "_tex_json", this.onResLoaded, this);
        RES.getResAsync(this.resName + "_tex_png", this.onResLoaded, this);
    };
    Role.prototype.onResLoaded = function () {
        this._num++;
        if (3 == this._num) {
            this.initRole();
        }
    };
    Role.prototype.initRole = function () {
        var factory = GameMaths.addArmatureToFactory(this.resName);
        this.armatureDisplay = factory.buildArmatureDisplay(this.resName);
        this._parent.addChild(this.armatureDisplay);
        this.armatureDisplay.x = this.posX;
        this.armatureDisplay.y = this.posY;
        this.armatureDisplay.scaleX = this.scaleX;
        this.armatureDisplay.scaleY = this.scaleY;
        this.armatureDisplay.animation.play(this.aniName, this.times);
        this.armatureDisplay.animation.timeScale = this.timeScale;
        if (null != this.callback) {
            this.callback(this);
        }
        if (0 != this.times) {
            this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
        }
    };
    //每次初始化课件时需要重播非"idle"动画
    Role.prototype.replay = function () {
        if (null != this.armatureDisplay) {
            this.armatureDisplay.animation.play(this.aniName, this.times);
            if (0 != this.times) {
                this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
            }
        }
    };
    Role.prototype.animationEventHandler = function (event) {
        //let eventObject = event.eventObject;
        //console.log(eventObject.animationState.name, event.type, eventObject.name ? eventObject.name : "");
        this.armatureDisplay.animation.play(this.secAniName, 0);
        this.armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
    };
    return Role;
}());
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map