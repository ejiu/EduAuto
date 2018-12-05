//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.UILayer {
    private pgBar: egret.Bitmap;
    private textField: egret.TextField;
    private bg: egret.Bitmap;
    private w: number = 0;
    private h: number = 0;

    public constructor(){
        super();
        this.createGameScene();
    }

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        let colorLabel = new egret.TextField();
        colorLabel.size = 24;
        colorLabel.fontFamily ="Muli";
        colorLabel.text = "fonts";
        this.addChild(colorLabel);

        this.bg = new egret.Bitmap;
        this.bg.texture = RES.getRes("PreLoadingBg_png");
        this.bg.width = 1024;
        this.bg.height = 768;
        this.addChild(this.bg);

        this.pgBar = new egret.Bitmap;
        this.pgBar.texture = RES.getRes("PreLoadingBar_png");
        this.pgBar.x = this.w / 2 - this.pgBar.width/2;
        this.pgBar.y = this.h - 93.5;
        this.addChild(this.pgBar);

        this.textField = new egret.TextField();
        this.textField.size = 28;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w / 2 - this.textField.width / 2;
        this.textField.y = this.pgBar.y-60;
        this.textField.textAlign = "center";
        this.textField.text = "0%";

        this.pgBar.width = 0;
    }

    /**
     * 进度条
     */
    public setProgress(current:number, total:number):void {
        var rate: number = Math.round((current / total) * 100);
        this.textField.text = rate + "%";
        this.pgBar.width = 815 * (current / total);
    }
}
