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

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
        this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
        // this.stage.orientation = egret.OrientationMode.PORTRAIT;
    }
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    // private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    private shapeArr: ball[];
    private uilayer: eui.UILayer;
    // public static wid = document.documentElement.clientWidth;
    // public static hei = document.documentElement.clientHeight;
    private topMask: egret.Shape;
    private text: egret.TextField;

    protected createGameScene(): void {
        this.uilayer = new eui.UILayer();
        this.addChild(this.uilayer);
        this.shapeArr = [];
        for (var i = 0; i < 1; i++) {
            var b: ball = new ball();
            b.createBall(this.uilayer);
            this.shapeArr.push(b);
        }
        this.topMask = new egret.Shape();
        this.topMask.graphics.beginFill(0x26d022, 0.5);
        this.topMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.topMask.graphics.endFill();
        this.uilayer.addChild(this.topMask);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        this.text = new egret.TextField();
        this.text.width = this.stage.stageWidth;
        this.text.height = this.stage.stageHeight;
        this.text.lineSpacing = 10;
        this.text.size = 50;
        this.text.text = "当前小球数量" + this.shapeArr.length + "\n小球每10秒删除一个\n轻触屏幕增加小球";
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.text);
        // egret.Tween.get(this, { loop: true }).wait(10000).call(this.removeball, this);
    }
    private removeball(): void {
        if (this.shapeArr.length > 0) {
            this.shapeArr[0].removeball();
            this.shapeArr.shift();
        }
        this.text.text = "当前小球数量" + this.shapeArr.length + "\n小球每10秒删除一个\n轻触屏幕增加小球";
    }
    private onclick(): void {
        this.text.text = "当前小球数量" + this.shapeArr.length + "\n小球每10秒删除一个\n轻触屏幕增加小球";
        this.topMask.graphics.clear();
        this.topMask.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 0.5);
        this.topMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.topMask.graphics.endFill();
        if (this.shapeArr.length < 30) {
            var b: ball = new ball();
            b.createBall(this);
            this.shapeArr.push(b);
        } else {
            console.log("%c舞台上的球已到达30个", "color:red,font-size:50px")
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        // let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            // textfield.textFlow = textFlow;
            // let tw = egret.Tween.get(textfield);
            // tw.to({ "alpha": 1 }, 200);
            // tw.wait(2000);
            // tw.to({ "alpha": 0 }, 200);
            // tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
