// TypeScript file

class SoundManager {
    private static _instance: SoundManager;
    public static sound(): SoundManager {
        if(null == SoundManager._instance)
            SoundManager._instance = new SoundManager();
        return SoundManager._instance;
    }
    private _click: egret.Sound;//点击声音
    private _popups: egret.Sound;//弹框声音
    private _drag: egret.Sound;//点击拖拽
    private _wechat: egret.Sound;//微信
    private _wrong: egret.Sound;//如果错误
    private _bgm: egret.Sound;//背景音乐
    private _bgm_channel: egret.SoundChannel;//保存用来静音用
    public constructor() {
        this._click = RES.getRes("click_mp3");
        if(null == this._click)
        {
            RES.getResAsync("click_mp3", this.onResSoundClickLoaded, this );
        }
        this._popups = RES.getRes("popups_mp3");
        if(null == this._popups)
        {
            RES.getResAsync("popups_mp3", this.onResSoundPopupLoaded, this );
        }
        this._wechat = RES.getRes("wechat_mp3");
        if(null == this._wechat)
        {
            RES.getResAsync("wechat_mp3", this.onResSoundWeLoaded, this );
        }
        this._drag =  RES.getRes("drag_mp3"); 
        if(null == this._drag)
        {
            RES.getResAsync("drag_mp3", this.onResSoundDragLoaded, this );
        }

        this._wrong = new egret.Sound();
        this._bgm = new egret.Sound();
    }

    private onResSoundClickLoaded():void
    {
        this._click = RES.getRes("click_mp3"); 
    }

    private onResSoundWeLoaded():void
    {
        this._wechat = RES.getRes("wechat_mp3"); 
    }

    private onResSoundPopupLoaded():void
    {
        this._popups = RES.getRes("popups_mp3"); 
    }

    private onResSoundDragLoaded():void
    {
        this._drag = RES.getRes("drag_mp3"); 
    }

    public PlayBGM() {
        if(this.IsMusic) {
            this._bgm_channel = this._bgm.play(0,0);
        }

    }
    public StopBGM() {
        if(this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    }
    public PlayClick() {
        if(this.IsSound) {
            if(null != this._click)
            {
                this._click.play(0,1);
            }
        }
    }
    public PlayPopups() {
        if(this.IsSound) {
            if(null != this._popups)
            {
                this._popups.play(0,1);
            }
        }
    }
    public PlayWechat() {
        if(this.IsSound) {
            if(null != this._wechat)
            {
                this._wechat.play(0,1);
            }
        }
    }
    public PlayDrag() {
        if(this.IsSound) {
            if(null != this._drag)
            {
                this._drag.play(0,1);
            }
        }
    }

    public PlayWrong() {
        if(this.IsSound) {
            this._wrong.play(0,1);
        }
    }
    //音乐是否播放，保存设置
    public set IsMusic(value) {
        if(!value) {
            egret.localStorage.setItem("ismusic","0");
            this.StopBGM();
        } else {
            egret.localStorage.setItem("ismusic","1");
            this.PlayBGM();
        }
    }
    public get IsMusic(): boolean {
        var b = egret.localStorage.getItem("ismusic");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
    //声效是否播放，保存设置
    public set IsSound(value) {
        if(value) {
            egret.localStorage.setItem("isSound","1");
        } else {
            egret.localStorage.setItem("isSound","0");
        }
    }
    public get IsSound(): boolean {
        var b = egret.localStorage.getItem("isSound");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
}