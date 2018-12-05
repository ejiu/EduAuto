// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this._click = RES.getRes("click_mp3");
        if (null == this._click) {
            RES.getResAsync("click_mp3", this.onResSoundClickLoaded, this);
        }
        this._popups = RES.getRes("popups_mp3");
        if (null == this._popups) {
            RES.getResAsync("popups_mp3", this.onResSoundPopupLoaded, this);
        }
        this._wechat = RES.getRes("wechat_mp3");
        if (null == this._wechat) {
            RES.getResAsync("wechat_mp3", this.onResSoundWeLoaded, this);
        }
        this._drag = RES.getRes("drag_mp3");
        if (null == this._drag) {
            RES.getResAsync("drag_mp3", this.onResSoundDragLoaded, this);
        }
        this._wrong = new egret.Sound();
        this._bgm = new egret.Sound();
    }
    SoundManager.sound = function () {
        if (null == SoundManager._instance)
            SoundManager._instance = new SoundManager();
        return SoundManager._instance;
    };
    SoundManager.prototype.onResSoundClickLoaded = function () {
        this._click = RES.getRes("click_mp3");
    };
    SoundManager.prototype.onResSoundWeLoaded = function () {
        this._wechat = RES.getRes("wechat_mp3");
    };
    SoundManager.prototype.onResSoundPopupLoaded = function () {
        this._popups = RES.getRes("popups_mp3");
    };
    SoundManager.prototype.onResSoundDragLoaded = function () {
        this._drag = RES.getRes("drag_mp3");
    };
    SoundManager.prototype.PlayBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    SoundManager.prototype.StopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    SoundManager.prototype.PlayClick = function () {
        if (this.IsSound) {
            if (null != this._click) {
                this._click.play(0, 1);
            }
        }
    };
    SoundManager.prototype.PlayPopups = function () {
        if (this.IsSound) {
            if (null != this._popups) {
                this._popups.play(0, 1);
            }
        }
    };
    SoundManager.prototype.PlayWechat = function () {
        if (this.IsSound) {
            if (null != this._wechat) {
                this._wechat.play(0, 1);
            }
        }
    };
    SoundManager.prototype.PlayDrag = function () {
        if (this.IsSound) {
            if (null != this._drag) {
                this._drag.play(0, 1);
            }
        }
    };
    SoundManager.prototype.PlayWrong = function () {
        if (this.IsSound) {
            this._wrong.play(0, 1);
        }
    };
    Object.defineProperty(SoundManager.prototype, "IsMusic", {
        get: function () {
            var b = egret.localStorage.getItem("ismusic");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //音乐是否播放，保存设置
        set: function (value) {
            if (!value) {
                egret.localStorage.setItem("ismusic", "0");
                this.StopBGM();
            }
            else {
                egret.localStorage.setItem("ismusic", "1");
                this.PlayBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "IsSound", {
        get: function () {
            var b = egret.localStorage.getItem("isSound");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //声效是否播放，保存设置
        set: function (value) {
            if (value) {
                egret.localStorage.setItem("isSound", "1");
            }
            else {
                egret.localStorage.setItem("isSound", "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map