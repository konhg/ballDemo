class ball {
	private speed: number = 2;
	private shape: egret.Shape;
	// private p=[[]]
	private scene: eui.UILayer;
	private index: number = 1;
	private index2: number = 1;
	private p0: egret.Point = new egret.Point();
	private radius: number = 30;
	public createBall(scene: eui.UILayer): void {
		this.scene = scene;
		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
		this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
		this.shape.graphics.drawCircle(0, 0, this.radius);
		this.shape.graphics.endFill();
		this.scene.addChild(this.shape);
		this.shape.x = this.scene.stage.stageWidth * 0.5;
		this.shape.y = this.radius//this.scene.stage.stageHeight - 50;
		this.p0.x = this.shape.x;
		this.p0.y = this.shape.y;
		egret.Tween.get(this.shape).to({ x: this.radius, y: Util.randomRange(50, this.scene.stage.stageHeight - 300) }, 500).call(this.timerComFunc, this);
		// this.timerComFunc();

	}
	public removeball(): void {
		egret.Tween.removeTweens(this.shape);
		this.shape.graphics.clear();
		this.scene.removeChild(this.shape);
		this.shape = null;
	}
	private run(eg: egret.Point): void {
		let sp = Util.getDistance2(this.shape.x, this.shape.y, eg.x, eg.y);
		egret.Tween.get(this.shape).to({ x: eg.x, y: eg.y }, sp * this.speed).call(this.timerComFunc, this);

	}
	private timerComFunc(): void {
		this.speed = Util.randomRange(1, 3);
		this.shape.graphics.clear();
		this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
		this.shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
		this.shape.graphics.drawCircle(0, 0, this.radius);
		this.shape.graphics.endFill();


		var x, y, deg, rad, po//, sp: number;
		x = this.shape.x;
		y = this.shape.y;
		rad = Util.getRad2(this.p0.x, this.p0.y, x, y);
		var ddd = Util.degToRad(360 - Util.radToDeg(rad))
		po = Util.getLinePoint2(x, y, 1000, ddd);
		let n1: egret.Point = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint2.x, y: this.cornersPoint2.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
		let n2: egret.Point = Util.crossPoint({ pStart: { x: this.cornersPoint2.x, y: this.cornersPoint2.y }, pEnd: { x: this.cornersPoint3.x, y: this.cornersPoint3.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
		let n3: egret.Point = Util.crossPoint({ pStart: { x: this.cornersPoint3.x, y: this.cornersPoint3.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
		let n4: egret.Point = Util.crossPoint({ pStart: { x: this.cornersPoint1.x, y: this.cornersPoint1.y }, pEnd: { x: this.cornersPoint4.x, y: this.cornersPoint4.y } }, { pStart: { x: x, y: y }, pEnd: { x: po.x, y: po.y } });
		this.p0.x = x;
		this.p0.y = y;
		if ((n1.x >= this.radius - 1 && n1.x <= this.cornersPoint3.x + 1) && (n1.y >= this.radius - 1 && n1.y <= this.cornersPoint3.y + 1)) {
			if (this.index != 1) {
				console.log("n1", n1)
				this.run(n1);
				this.index = 1;
				return;
			}
		}
		if ((n2.x >= this.radius - 1 && n2.x <= this.cornersPoint3.x + 1) && (n2.y >= this.radius - 1 && n2.y <= this.cornersPoint3.y + 1)) {
			if (this.index != 2) {
				console.log("n2", n2)
				this.run(n2);
				this.index = 2;
				return;
			}
		}
		if ((n3.x >= this.radius - 1 && n3.x <= this.cornersPoint3.x + 1) && (n3.y >= this.radius - 1 && n3.y <= this.cornersPoint3.y + 1)) {
			if (this.index != 3) {
				console.log("n3", n3)
				this.run(n3);
				this.index = 3;
				return;
			}
		}
		if ((n4.x >= this.radius - 1 && n4.x <= this.cornersPoint3.x + 1) && (n4.y >= this.radius - 1 && n4.y <= this.cornersPoint3.y + 1)) {
			if (this.index != 4) {
				console.log("n4", n4)
				this.run(n4);
				this.index = 4;
				return;
			}
		}
		console.log("参数出错了")
		return;

	}
	private get cornersPoint1(): egret.Point {
		//左上
		return new egret.Point(this.radius, this.radius);
	}
	private get cornersPoint2(): egret.Point {
		//左下
		return new egret.Point(this.radius, this.scene.stage.stageHeight - this.radius);
	}
	private get cornersPoint3(): egret.Point {
		//右下
		return new egret.Point(this.scene.stage.stageWidth - this.radius, this.scene.stage.stageHeight - this.radius);
	}
	private get cornersPoint4(): egret.Point {
		//右上
		return new egret.Point(this.scene.stage.stageWidth - this.radius, this.radius);
	}
}