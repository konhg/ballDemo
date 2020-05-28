var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ball = (function () {
    function ball() {
        this.speed = 2;
        this.index = 1;
        this.index2 = 1;
        this.p0 = new egret.Point();
        this.d = 0;
    }
    ball.prototype.createBall = function (scene) {
        this.scene = scene;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawCircle(0, 0, 50);
        this.shape.graphics.endFill();
        this.scene.addChild(this.shape);
        this.shape.x = this.scene.stage.stageWidth * 0.5;
        this.shape.y = 50; //this.scene.stage.stageHeight - 50;
        this.p0.x = this.shape.x;
        this.p0.y = this.shape.y;
        egret.Tween.get(this.shape).to({ x: 50, y: Util.randomRange(50, this.scene.stage.stageHeight - 300) }, 500).call(this.timerComFunc, this);
        // this.timerComFunc();
    };
    ball.prototype.removeball = function () {
        egret.Tween.removeTweens(this.shape);
        this.shape.graphics.clear();
        this.scene.removeChild(this.shape);
        this.shape = null;
    };
    ball.prototype.run = function (eg) {
        var sp = Util.getDistance2(this.shape.x, this.shape.y, eg.x, eg.y);
        egret.Tween.get(this.shape).to({ x: eg.x, y: eg.y }, sp * this.speed).call(this.timerComFunc, this);
    };
    ball.prototype.timerComFunc = function () {
        this.speed = Util.randomRange(1, 3);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawCircle(0, 0, 50);
        this.shape.graphics.endFill();
        // let y1 = this.scene.stage.stageHeight * 0.5//Util.randomRange(50, this.scene.stage.stageHeight * 0.5);
        // let sp1 = Util.getDistance2(this.shape.x, this.shape.y, 50, y1);
        var x, y, deg, rad, po, sp;
        x = this.shape.x;
        y = this.shape.y;
        rad = Util.getRad2(this.p0.x, this.p0.y, x, y);
        // console.log(Util.radToDeg(rad))
        //(this.index % 2 == 0 ? 180 : 360) 
        var ddd = Util.degToRad(360 - Util.radToDeg(rad));
        // console.log()
        po = Util.getLinePoint2(x, y, 1000, ddd);
        var n1 = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint2.x, y: this.cornersPoint2.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n2 = Util.crossPoint({ pStart: { x: this.cornersPoint2.x, y: this.cornersPoint2.y }, pEnd: { x: this.cornersPoint3.x, y: this.cornersPoint3.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n3 = Util.crossPoint({ pStart: { x: this.cornersPoint3.x, y: this.cornersPoint3.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        var n4 = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
        // console.log(this.scene.stage.stageWidth - 50, this.scene.stage.stageHeight - 50);
        // console.log("n1", n1)
        // console.log("n2", n2)
        // console.log("n3", n3)
        // console.log("n4", n4)
        this.p0.x = x;
        this.p0.y = y;
        console.log(this.d++);
        if ((n1.x >= 49 && n1.x <= this.cornersPoint3.x + 1) && (n1.y >= 49 && n1.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 1) {
                console.log("n1", n1);
                this.run(n1);
                this.index = 1;
                return;
            }
        }
        if ((n2.x >= 49 && n2.x <= this.cornersPoint3.x + 1) && (n2.y >= 49 && n2.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 2) {
                console.log("n2", n2);
                this.run(n2);
                this.index = 2;
                return;
            }
        }
        if ((n3.x >= 49 && n3.x <= this.cornersPoint3.x + 1) && (n3.y >= 49 && n3.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 3) {
                console.log("n3", n3);
                this.run(n3);
                this.index = 3;
                return;
            }
        }
        if ((n4.x >= 49 && n4.x <= this.cornersPoint3.x + 1) && (n4.y >= 49 && n4.y <= this.cornersPoint3.y + 1)) {
            if (this.index != 4) {
                console.log("n4", n4);
                this.run(n4);
                this.index = 4;
                return;
            }
        }
        console.log("是不是参数错了");
        return;
        if (this.index == 1) {
            if ((Math.abs(n2.x) > this.scene.stage.stageWidth - 50)) {
                this.run(n3);
                this.index2 = 4;
            }
            else {
                this.run(n2);
                this.index2 = 3;
            }
            this.index = 2;
            // this.index2 = 2;
        }
        else if (this.index == 2) {
            if ((Math.abs(n1.x) > this.scene.stage.stageWidth - 50)) {
                sp = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(n3.x), Math.abs(n3.y));
                egret.Tween.get(this.shape).to({ x: Math.abs(n3.x), y: Math.abs(n3.y) }, sp * this.speed).call(this.timerComFunc, this);
            }
            else {
                sp = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(n2.x), Math.abs(n2.y));
                egret.Tween.get(this.shape).to({ x: Math.abs(n2.x), y: Math.abs(n2.y) }, sp * this.speed).call(this.timerComFunc, this);
            }
        }
        else if (this.index == 3) {
        }
        this.p0.x = x;
        this.p0.x = y;
        // switch (this.index) {
        // 	case 1:
        // 		if ((Math.abs(n2.x) > this.scene.stage.stageWidth - 50)) {
        // 			sp = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(n3.x), Math.abs(n3.y));
        // 			egret.Tween.get(this.shape).to({ x: Math.abs(n3.x), y: Math.abs(n3.y) }, sp * this.speed).call(this.timerComFunc, this);
        // 		} else {
        // 			sp = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(n2.x), Math.abs(n2.y));
        // 			egret.Tween.get(this.shape).to({ x: Math.abs(n2.x), y: Math.abs(n2.y) }, sp * this.speed).call(this.timerComFunc, this);
        // 		}
        // 		this.index = 2;
        // 		return;
        // 	case 2:
        // 		return;
        // 	case 3:
        // 		sp = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(n1.x), Math.abs(n1.y));
        // 		egret.Tween.get(this.shape).to({ x: Math.abs(n1.x), y: Math.abs(n1.y) }, sp * this.speed).call(this.timerComFunc, this);
        // 		return;
        // 	case 4:
        // 		return;
        // }
        return;
        switch (this.index) {
            case 1:
                x = this.shape.x;
                y = this.shape.y;
                rad = Util.getRad2(this.p0.x, this.p0.y, x, y);
                po = Util.getLinePoint2(x, y, 1000, rad);
                var n1_1 = Util.crossPoint({ pStart: { x: this.cornersPoint2.x, y: this.cornersPoint2.y }, pEnd: { x: this.cornersPoint3.x, y: this.cornersPoint3.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
                var n2_1 = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
                // console.log(sp)
                if (this.index == 4) {
                }
                // if ((Math.abs(sp.x) > this.scene.stage.stageWidth - 50)) {
                // 	sp = Util.crossPoint({ pStart: { x: this.cornersPoint4.x, y: this.cornersPoint4.y }, pEnd: { x: this.cornersPoint3.x, y: this.cornersPoint3.y } }, { pStart: { x: x, y: y }, pEnd: { x: Math.abs(sp.x), y: sp.y } });
                // 	this.index = 2;
                // } else {
                // 	this.index = 3;
                // }
                this.p0.x = x;
                this.p0.x = y;
                // let sp1 = Util.getDistance2(this.shape.x, this.shape.y, Math.abs(sp.x), Math.abs(sp.y));
                // egret.Tween.get(this.shape).to({ x: Math.abs(sp.x), y: Math.abs(sp.y) }, sp1 * this.speed)//.call(this.timerComFunc, this);
                return;
            case 2:
                this.index = 3;
                var x2 = Util.randomRange(50, this.scene.stage.stageWidth - 50);
                var sp2 = Util.getDistance2(this.shape.x, this.shape.y, x2, this.scene.stage.stageHeight - 50);
                egret.Tween.get(this.shape).to({ x: x2, y: this.scene.stage.stageHeight - 50 }, sp2 * this.speed).call(this.timerComFunc, this);
                break;
            case 3:
                this.index = 4;
                var y3 = Util.randomRange(50, this.scene.stage.stageHeight - 50);
                var sp3 = Util.getDistance2(this.shape.x, this.shape.y, this.scene.stage.stageWidth - 50, y3);
                egret.Tween.get(this.shape).to({ x: this.scene.stage.stageWidth - 50, y: y3 }, sp3 * this.speed).call(this.timerComFunc, this);
                break;
            case 4:
                this.index = 1;
                var x4 = Util.randomRange(50, this.scene.stage.stageWidth - 50);
                var sp4 = Util.getDistance2(this.shape.x, this.shape.y, x4, 50);
                egret.Tween.get(this.shape).to({ x: x4, y: 50 }, sp4 * this.speed).call(this.timerComFunc, this);
                break;
        }
    };
    Object.defineProperty(ball.prototype, "cornersPoint1", {
        get: function () {
            //左上
            return new egret.Point(50, 50);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint2", {
        get: function () {
            //左下
            return new egret.Point(50, this.scene.stage.stageHeight - 50);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint3", {
        get: function () {
            //右下
            return new egret.Point(this.scene.stage.stageWidth - 50, this.scene.stage.stageHeight - 50);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ball.prototype, "cornersPoint4", {
        get: function () {
            //右上
            return new egret.Point(this.scene.stage.stageWidth - 50, 50);
        },
        enumerable: true,
        configurable: true
    });
    return ball;
}());
__reflect(ball.prototype, "ball");
//# sourceMappingURL=ball.js.map