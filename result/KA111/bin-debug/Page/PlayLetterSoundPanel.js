var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PlayLetterSoundPanel = (function (_super) {
    __extends(PlayLetterSoundPanel, _super);
    function PlayLetterSoundPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayLetterSoundSkin";
        _this.itemCount = 2;
        _this.sound_0 = RES.getRes("d_big_mp3");
        if (null == _this.sound_0) {
            RES.getResAsync("d_big_mp3", _this.onResSound_0Loaded, _this);
        }
        _this.sound_1 = RES.getRes("d_small_mp3");
        if (null == _this.sound_1) {
            RES.getResAsync("d_small_mp3", _this.onResSound_1Loaded, _this);
        }
        _this.timer = new egret.Timer(5000, 1);
        return _this;
    }
    PlayLetterSoundPanel.prototype.onResSound_0Loaded = function () {
        this.sound_0 = RES.getRes("d_big_mp3");
    };
    PlayLetterSoundPanel.prototype.onResSound_1Loaded = function () {
        this.sound_1 = RES.getRes("d_small_mp3");
    };
    PlayLetterSoundPanel.prototype.initUI = function () {
        this.item_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCom, this);
        this.timer.start();
        this.item_0.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_0.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.item_1.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_1.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.animGroup0.addEventListener('complete', this.onAnimGroupComplete, this);
        this.animGroup1.addEventListener('complete', this.onAnimGroupComplete, this);
        this.finger_0.visible = false;
        this.finger_0.touchEnabled = false;
        this.finger_1.visible = false;
        this.finger_1.touchEnabled = false;
        this.Refresh();
        _super.prototype.initUI.call(this);
    };
    PlayLetterSoundPanel.prototype.onMouseOver = function (e) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        this.floatNumber = parseInt(e.target.name);
        this.getFinger(this.floatNumber).visible = true;
        this.getAnimGroup(this.floatNumber).play();
    };
    PlayLetterSoundPanel.prototype.onMouseOut = function (e) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        this.getAnimGroup(this.floatNumber).stop();
        this.getFinger(this.floatNumber).visible = false;
    };
    PlayLetterSoundPanel.prototype.onAnimGroupComplete = function () {
        this.getAnimGroup(this.floatNumber).stop();
        this.getAnimGroup(this.floatNumber).play();
    };
    PlayLetterSoundPanel.prototype.onClick = function (evt) {
        if (!GlobalData.isTeacher() && !GlobalData.bAuthority) {
            return;
        }
        var msg = JSON.stringify({ pageIndex: PageMgr.pageMgr().curPage.pageId,
            cmd: "1402", type: "4", name: evt.target.name });
        PageMgr.sendMsg(msg);
    };
    PlayLetterSoundPanel.prototype.receiveMsg = function (msg) {
        var data = JSON.parse(msg);
        switch (data['cmd']) {
            case "1402":
                {
                    switch (data['name']) {
                        case "0":
                        case "1":
                            // case "2":
                            // case "3":
                            // case "4":
                            // case "5":
                            // case "6":
                            // case "7":
                            this.dealPlaySound(parseInt(data['name']));
                            break;
                    }
                }
                break;
        }
    };
    PlayLetterSoundPanel.prototype.dealPlaySound = function (index) {
        this.choosedNumber = index;
        this.isSounding = true;
        this.setAllImgTouchable(false);
        this.hideAllFinger();
        var tImage = this.getInteractImg(index);
        egret.Tween.get(tImage).to({ scaleX: 1.4, scaleY: 1.4 }, 300);
        this.soundChannel = this.getSound(index).play(0, 1);
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    PlayLetterSoundPanel.prototype.onSoundComplete = function () {
        this.isSounding = false;
        var tImage = this.getInteractImg(this.choosedNumber);
        egret.Tween.get(tImage).to({ scaleX: 1, scaleY: 1 }, 300);
        this.setAllImgTouchable(true);
    };
    PlayLetterSoundPanel.prototype.destroy = function () {
        if (null != this.soundChannel) {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCom, this);
        this.item_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.item_0.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_0.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.item_1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.item_1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.animGroup0.removeEventListener('complete', this.onAnimGroupComplete, this);
        this.animGroup1.removeEventListener('complete', this.onAnimGroupComplete, this);
        _super.prototype.destroy.call(this);
    };
    PlayLetterSoundPanel.prototype.Refresh = function () {
        for (var i = 0; i < this.itemCount; i++) {
            this.getInteractImg(i).scaleX = 1;
            this.getInteractImg(i).scaleY = 1;
            this.getInteractImg(i).rotation = 0;
        }
        this.setAllImgTouchable(true);
        egret.Tween.removeAllTweens();
        this.isSounding = false;
    };
    PlayLetterSoundPanel.prototype.timerCom = function () {
        this.timer.reset();
        this.timer.start();
        if (false == this.isSounding) {
            for (var i = 0; i < this.itemCount; ++i) {
                EffectUtils.rockObj(this.getInteractImg(i), 200, 10);
            }
        }
    };
    PlayLetterSoundPanel.prototype.getInteractImg = function (index) {
        switch (index) {
            case 0:
                return this.item_0;
            case 1:
                return this.item_1;
            // case 2:
            //     return this.item_2;
            // case 3:
            //     return this.item_3;
            // case 4:
            //     return this.item_4;
            // case 5:
            //     return this.item_5;
            // case 6:
            //     return this.item_6;
            // case 7:
            //     return this.item_7;
            default:
                return this.item_0;
        }
    };
    PlayLetterSoundPanel.prototype.getSound = function (index) {
        switch (index) {
            case 0:
                return this.sound_0;
            case 1:
                return this.sound_1;
            // case 2:
            //     return this.sound_2;
            // case 3:
            //     return this.sound_3;
            // case 4:
            //     return this.sound_4;
            // case 5:
            //     return this.sound_5;
            // case 6:
            //     return this.sound_6;
            // case 7:
            //     return this.sound_7;
            default:
                return this.sound_0;
        }
    };
    PlayLetterSoundPanel.prototype.getFinger = function (index) {
        switch (index) {
            case 0:
                return this.finger_0;
            case 1:
                return this.finger_1;
            // case 2:
            //     return this.finger_2;
            // case 3:
            //     return this.finger_3;
            // case 4:
            //     return this.finger_4;
            // case 5:
            //     return this.finger_5;
            // case 6:
            //     return this.finger_6;
            // case 7:
            //     return this.finger_7;
            default:
                return this.finger_0;
        }
    };
    PlayLetterSoundPanel.prototype.getAnimGroup = function (index) {
        switch (index) {
            case 0:
                return this.animGroup0;
            case 1:
                return this.animGroup1;
            // case 2:
            //     return this.animGroup2;
            // case 3:
            //     return this.animGroup3;
            // case 4:
            //     return this.animGroup4;
            // case 5:
            //     return this.animGroup5;
            // case 6:
            //     return this.animGroup6;
            // case 7:
            //     return this.animGroup7;
            default:
                return this.animGroup0;
        }
    };
    PlayLetterSoundPanel.prototype.setAllImgTouchable = function (status) {
        for (var i = 0; i < this.itemCount; i++) {
            this.getInteractImg(i).touchEnabled = status;
        }
    };
    PlayLetterSoundPanel.prototype.hideAllFinger = function () {
        for (var i = 0; i < this.itemCount; ++i) {
            this.getAnimGroup(i).stop();
            this.getFinger(i).visible = false;
        }
    };
    return PlayLetterSoundPanel;
}(PageBase));
__reflect(PlayLetterSoundPanel.prototype, "PlayLetterSoundPanel");
//# sourceMappingURL=PlayLetterSoundPanel.js.map