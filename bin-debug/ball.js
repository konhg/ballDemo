var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ball = (function () {
    function ball() {
        this.speed = 2;
        this.index = 1;
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
        this.shape.y = 50;
        this.timerComFunc();
    };
    ball.prototype.removeball = function () {
        egret.Tween.removeTweens(this.shape);
        this.shape.graphics.clear();
        this.scene.removeChild(this.shape);
        this.shape = null;
    };
    ball.prototype.timerComFunc = function () {
        this.speed = Main.randomRange(1, 3);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawCircle(0, 0, 50);
        this.shape.graphics.endFill();
        switch (this.index) {
            case 1:
                this.index = 2;
                var y1 = Main.randomRange(50, this.scene.stage.stageHeight - 50);
                var sp1 = Main.getDistance2(this.shape.x, this.shape.y, 50, y1);
                egret.Tween.get(this.shape).to({ x: 50, y: y1 }, sp1 * this.speed).call(this.timerComFunc, this);
                break;
            case 2:
                this.index = 3;
                var x2 = Main.randomRange(50, this.scene.stage.stageWidth - 50);
                var sp2 = Main.getDistance2(this.shape.x, this.shape.y, x2, this.scene.stage.stageHeight - 50);
                egret.Tween.get(this.shape).to({ x: x2, y: this.scene.stage.stageHeight - 50 }, sp2 * this.speed).call(this.timerComFunc, this);
                break;
            case 3:
                this.index = 4;
                var y3 = Main.randomRange(50, this.scene.stage.stageHeight - 50);
                var sp3 = Main.getDistance2(this.shape.x, this.shape.y, this.scene.stage.stageWidth - 50, y3);
                egret.Tween.get(this.shape).to({ x: this.scene.stage.stageWidth - 50, y: y3 }, sp3 * this.speed).call(this.timerComFunc, this);
                break;
            case 4:
                this.index = 1;
                var x4 = Main.randomRange(50, this.scene.stage.stageWidth - 50);
                var sp4 = Main.getDistance2(this.shape.x, this.shape.y, x4, 50);
                egret.Tween.get(this.shape).to({ x: x4, y: 50 }, sp4 * this.speed).call(this.timerComFunc, this);
                break;
        }
    };
    return ball;
}());
__reflect(ball.prototype, "ball");
//# sourceMappingURL=ball.js.map