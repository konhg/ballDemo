var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ball = (function () {
    function ball() {
        this.speed = 2;
        this.index = 1;
        this.index2 = 1;
        this.p0 = new egret.Point();
        this.radius = 30;
    }
    ball.prototype.createBall = function (scene) {
        this.scene = scene;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        this.scene.addChild(this.shape);
        this.shape.x = this.scene.stage.stageWidth * 0.5;
        this.shape.y = this.radius; //this.scene.stage.stageHeight - 50;
        this.p0.x = this.shape.x;
        this.p0.y = this.shape.y;
        egret.Tween.get(this.shape).to({ x: this.radius, y: Util.randomRange(50, this.scene.stage.stageHeight - 300) }, 500).call(this.timerComFunc, this);
        // this.timerComFunc();
    };
    ball.prototype.removeball = function () {
        egret.Tween.removeTweens(this.shape);
        this.shape.graphics.clear();
        this.scene.removeChild(this.shape);
        this.shape = null;
    };
    ball.prototype.run = function (eg) {
        if (eg.x < this.radius) {
            eg.x = this.radius;
        }
        if (eg.y < this.radius) {
            eg.y = this.radius;
        }
        var sp = Util.getDistance2(this.shape.x, this.shape.y, eg.x, eg.y);
        egret.Tween.get(this.shape).to({ x: Math.round(eg.x), y: Math.round(eg.y) }, sp * this.speed).call(this.timerComFunc, this);
    };
    ball.prototype.timerComFunc = function () {
        this.speed = Util.randomRange(1, 3);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        var x, y, deg, rad, po; //, sp: number;
        x = this.shape.x;
        y = this.shape.y;
        rad = Util.getRad2(this.p0.x, this.p0.y, x, y);
        var ddd = Util.degToRad(360 - Util.radToDeg(rad));
        po = Util.getLinePoint2(x, y, 1000, ddd);
        var n1 = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint2.x, y: this.cornersPoint2.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n2 = Util.crossPoint({ pStart: { x: this.cornersPoint2.x, y: this.cornersPoint2.y }, pEnd: { x: this.cornersPoint3.x, y: this.cornersPoint3.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n3 = Util.crossPoint({ pStart: { x: this.cornersPoint3.x, y: this.cornersPoint3.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n4 = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        this.p0.x = x;
        this.p0.y = y;
        if ((n1.x >= this.radius - 1 && n1.x <= this.cornersPoint3.x + 1) && (n1.y >= this.radius - 1 && n1.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 1) {
                console.log("n1", n1);
                this.run(n1);
                this.index = 1;
                return;
            }
        }
        if ((n2.x >= this.radius - 1 && n2.x <= this.cornersPoint3.x + 1) && (n2.y >= this.radius - 1 && n2.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 2) {
                console.log("n2", n2);
                this.run(n2);
                this.index = 2;
                return;
            }
        }
        if ((n3.x >= this.radius - 1 && n3.x <= this.cornersPoint3.x + 1) && (n3.y >= this.radius - 1 && n3.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 3) {
                console.log("n3", n3);
                this.run(n3);
                this.index = 3;
                return;
            }
        }
        if ((n4.x >= this.radius - 1 && n4.x <= this.cornersPoint3.x + 1) && (n4.y >= this.radius - 1 && n4.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 4) {
                console.log("n4", n4);
                this.run(n4);
                this.index = 4;
                return;
            }
        }
        console.log("参数出错了");
        return;
    };
    Object.defineProperty(ball.prototype, "cornersPoint1", {
        get: function () {
            //左上
            return new egret.Point(this.radius, this.radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint2", {
        get: function () {
            //左下
            return new egret.Point(this.radius, this.scene.stage.stageHeight - this.radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint3", {
        get: function () {
            //右下
            return new egret.Point(this.scene.stage.stageWidth - this.radius, this.scene.stage.stageHeight - this.radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint4", {
        get: function () {
            //右上
            return new egret.Point(this.scene.stage.stageWidth - this.radius, this.radius);
        },
        enumerable: true,
        configurable: true
    });
    return ball;
}());
__reflect(ball.prototype, "ball");
//# sourceMappingURL=ball.js.map