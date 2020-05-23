class ball {
	private speed: number = 2;
	private shape: egret.Shape;

	private scene: eui.UILayer;
	public createBall(scene: eui.UILayer): void {
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

	}
	private index: number = 1;
	private timerComFunc(): void {
		this.speed = Main.randomRange(1, 3);
		switch (this.index) {
			case 1:
				this.index = 2;
				let y1 = Main.randomRange(50, this.scene.stage.stageHeight - 50);
				let sp1 = Main.getDistance2(this.shape.x, this.shape.y, 50, y1);
				egret.Tween.get(this.shape).to({ x: 50, y: y1 }, sp1 * this.speed).call(this.timerComFunc, this);
				break;
			case 2:
				this.index = 3;
				let x2 = Main.randomRange(50, this.scene.stage.stageWidth - 50)
				let sp2 = Main.getDistance2(this.shape.x, this.shape.y, x2, this.scene.stage.stageHeight - 50);
				egret.Tween.get(this.shape).to({ x: x2, y: this.scene.stage.stageHeight - 50 }, sp2 * this.speed).call(this.timerComFunc, this);
				break;
			case 3:
				this.index = 4;
				let y3 = Main.randomRange(50, this.scene.stage.stageHeight - 50)
				let sp3 = Main.getDistance2(this.shape.x, this.shape.y, this.scene.stage.stageWidth - 50, y3);
				egret.Tween.get(this.shape).to({ x: this.scene.stage.stageWidth - 50, y: y3 }, sp3 * this.speed).call(this.timerComFunc, this);
				break;
			case 4:
				this.index = 1;
				let x4 = Main.randomRange(50, this.scene.stage.stageWidth - 50)
				let sp4 = Main.getDistance2(this.shape.x, this.shape.y, x4, 50);
				egret.Tween.get(this.shape).to({ x: x4, y: 50 }, sp4 * this.speed).call(this.timerComFunc, this);
				break;
		}

	}
}