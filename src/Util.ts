class Util {
	public static readonly Deg2Rad: number = 0.0174532924;
	public static readonly Rad2Deg: number = 57.29578;
	/**
	 * 获取角度
	 */
	public static getDeg(x: number, y: number, normalized: boolean = false): number {
		var deg: number = Util.radToDeg(Math.atan2(y, x));
		if (normalized) {
			deg = Util.normalizeDeg(deg);
		}
		return deg;
	}
	/**
	 * 角度转弧度
	 */
	public static degToRad(deg: number): number {
		return deg * Util.Deg2Rad;
	}
	/**
	 * 获取弧度
	 */
	public static getRad2(x1: number, y1: number, x2: number, y2: number): number {
		return Math.atan2(y2 - y1, x2 - x1);
	}

	/**
	 * 规范化角度
	 */
	public static normalizeDeg(deg: number): number {
		if (deg >= 0 && deg < 360) {
			return deg;
		}
		deg %= 360;
		if (deg < 0) {
			deg += 360;
		}
		return deg;
	}
	/**
	 * 弧度转角度
	 */
	public static radToDeg(rad: number): number {
		return rad * Util.Rad2Deg;
	}
	/**
	 * 获取角度
	 */
	public static getDeg2(x1: number, y1: number, x2: number, y2: number, normalized: boolean = false): number {
		return Util.getDeg(x2 - x1, y2 - y1, normalized);
	}
	public static randomRange(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
	public static getDistance2(x1: number, y1: number, x2: number, y2: number): number {
		return Util.getDistance(x2 - x1, y2 - y1);
	}
	public static getDistance(x: number, y: number): number {
		return Math.sqrt(x * x + y * y);
	}
	/**
 * 获取直角边长
 */
	public static getRightSide(x1: number, y1: number, x2: number, y2: number, length: number, point?: egret.Point): egret.Point {
		if (point == null) {
			point = new egret.Point();
		}
		var rad: number = Util.getRad2(x1, y1, x2, y2);
		var x: number = length * Math.cos(rad);
		var y: number = length * Math.sin(rad);
		point.setTo(x, y);
		return point;
	}
	/**
	 * 线性插值获取线段(x1, y1) (x2, y2)上距离点(x1, y1)位移为length的点
	 */
	public static getLinePoint(x1: number, y1: number, x2: number, y2: number, length: number, point?: egret.Point): egret.Point {
		if (point == null) {
			point = new egret.Point();
		}
		var dist: number = Util.getDistance2(x1, y1, x2, y2);
		var rate = length / dist;
		point.setTo(x1 + rate * (x2 - x1), y1 + rate * (y2 - y1));
		return point;
	}
	/**
	 * 根据弧度获取距离点(x, y)length长度的点
	 */
	public static getLinePoint2(x: number, y: number, length: number, rad: number, point?: egret.Point): egret.Point {
		if (point == null) {
			point = new egret.Point();
		}
		point.setTo(x + length * Math.cos(rad), y + length * Math.sin(rad));
		return point;
	}
	/**获取两直线交点 */
	// public static segmentsIntr(a: { x: number, y: number }, b: { x: number, y: number }, c: { x: number, y: number }, d: { x: number, y: number }): { x: number, y: number } {
	// 	var k0 = (b.y - a.y) / (b.x - a.x)
	// 	//  console.log(k0)
	// 	var e = (b.y - k0 * b.x)
	// 	//  console.log(e)
	// 	var k1 = (d.y - c.y) / (d.x - c.x)
	// 	//  console.log(k1)
	// 	var e1 = (d.y - k1 * d.x)
	// 	//  console.log(e1)
	// 	var x = (e1 - e) / (k0 - k1)
	// 	var y = k0 * x + e

	// 	//  console.log('交点横坐标'+x)
	// 	//  console.log('交点纵坐标'+y)

	// 	return { x: (e1 - e) / (k0 - k1), y: k0 * x + e }
	// }
	public static segmentsIntr(a: { x: number, y: number }, b: { x: number, y: number }, c: { x: number, y: number }, d: { x: number, y: number }): { x: number, y: number } {

		// 三角形abc 面积的2倍 
		var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

		// 三角形abd 面积的2倍 
		var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

		// 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理); 
		if (area_abc * area_abd >= 0) {
			return null;
		}

		// 三角形cda 面积的2倍 
		var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
		// 三角形cdb 面积的2倍 
		// 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出. 
		var area_cdb = area_cda + area_abc - area_abd;
		if (area_cda * area_cdb >= 0) {
			return null;
		}

		//计算交点坐标 
		var t = area_cda / (area_abd - area_abc);
		var dx = t * (b.x - a.x),
			dy = t * (b.y - a.y);
		return { x: a.x + dx, y: a.y + dy };

	}



	public static crossPoint(line1: { pStart: { x: number, y: number }, pEnd: { x: number, y: number }, }, line2: { pStart: { x: number, y: number }, pEnd: { x: number, y: number }, }): egret.Point {
		//line1, line2 结构相同
		// let line1 = {
		// 	pStart: { x: 0, y: 0 },
		// 	pEnd: { x: 2, y: 2 },
		// }
		let pt = new egret.Point(0, 0);
		// line1's cpmponent  
		let X1 = line1.pEnd.x - line1.pStart.x;//b1  
		let Y1 = line1.pEnd.y - line1.pStart.y;//a1  
		// line2's cpmponent  
		let X2 = line2.pEnd.x - line2.pStart.x;//b2  
		let Y2 = line2.pEnd.y - line2.pStart.y;//a2  
		// distance of 1,2  
		let X21 = line2.pStart.x - line1.pStart.x;
		let Y21 = line2.pStart.y - line1.pStart.y;
		// determinant  
		let D = Y1 * X2 - Y2 * X1;// a1b2-a2b1  
		//   
		if (D == 0) return pt;
		// cross point  
		pt.x = (X1 * X2 * Y21 + Y1 * X2 * line1.pStart.x - Y2 * X1 * line2.pStart.x) / D;
		// on screen y is down increased !   
		pt.y = -(Y1 * Y2 * X21 + X1 * Y2 * line1.pStart.y - X2 * Y1 * line2.pStart.y) / D;
		// segments intersect.  
		if ((Math.abs(pt.x - line1.pStart.x - X1 / 2) <= Math.abs(X1 / 2)) &&
			(Math.abs(pt.y - line1.pStart.y - Y1 / 2) <= Math.abs(Y1 / 2)) &&
			(Math.abs(pt.x - line2.pStart.x - X2 / 2) <= Math.abs(X2 / 2)) &&
			(Math.abs(pt.y - line2.pStart.y - Y2 / 2) <= Math.abs(Y2 / 2))) {
			return pt;
		}
		return pt;
	}
}