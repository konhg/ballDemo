var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    /**
     * 获取角度
     */
    Util.getDeg = function (x, y, normalized) {
        if (normalized === void 0) { normalized = false; }
        var deg = Util.radToDeg(Math.atan2(y, x));
        if (normalized) {
            deg = Util.normalizeDeg(deg);
        }
        return deg;
    };
    /**
     * 角度转弧度
     */
    Util.degToRad = function (deg) {
        return deg * Util.Deg2Rad;
    };
    /**
     * 获取弧度
     */
    Util.getRad2 = function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    };
    /**
     * 规范化角度
     */
    Util.normalizeDeg = function (deg) {
        if (deg >= 0 && deg < 360) {
            return deg;
        }
        deg %= 360;
        if (deg < 0) {
            deg += 360;
        }
        return deg;
    };
    /**
     * 弧度转角度
     */
    Util.radToDeg = function (rad) {
        return rad * Util.Rad2Deg;
    };
    /**
     * 获取角度
     */
    Util.getDeg2 = function (x1, y1, x2, y2, normalized) {
        if (normalized === void 0) { normalized = false; }
        return Util.getDeg(x2 - x1, y2 - y1, normalized);
    };
    Util.randomRange = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Util.getDistance2 = function (x1, y1, x2, y2) {
        return Util.getDistance(x2 - x1, y2 - y1);
    };
    Util.getDistance = function (x, y) {
        return Math.sqrt(x * x + y * y);
    };
    /**
 * 获取直角边长
 */
    Util.getRightSide = function (x1, y1, x2, y2, length, point) {
        if (point == null) {
            point = new egret.Point();
        }
        var rad = Util.getRad2(x1, y1, x2, y2);
        var x = length * Math.cos(rad);
        var y = length * Math.sin(rad);
        point.setTo(x, y);
        return point;
    };
    /**
     * 线性插值获取线段(x1, y1) (x2, y2)上距离点(x1, y1)位移为length的点
     */
    Util.getLinePoint = function (x1, y1, x2, y2, length, point) {
        if (point == null) {
            point = new egret.Point();
        }
        var dist = Util.getDistance2(x1, y1, x2, y2);
        var rate = length / dist;
        point.setTo(x1 + rate * (x2 - x1), y1 + rate * (y2 - y1));
        return point;
    };
    /**
     * 根据弧度获取距离点(x, y)length长度的点
     */
    Util.getLinePoint2 = function (x, y, length, rad, point) {
        if (point == null) {
            point = new egret.Point();
        }
        point.setTo(x + length * Math.cos(rad), y + length * Math.sin(rad));
        return point;
    };
    //获取两条直线（两线段的无限延申）的交点坐标
    Util.crossPoint = function (line1, line2) {
        //line1, line2 结构相同
        // let line1 = {
        // 	pStart: { x: 0, y: 0 },
        // 	pEnd: { x: 2, y: 2 },
        // }
        var pt = new egret.Point(0, 0);
        // line1's cpmponent  
        var X1 = line1.pEnd.x - line1.pStart.x; //b1  
        var Y1 = line1.pEnd.y - line1.pStart.y; //a1  
        // line2's cpmponent  
        var X2 = line2.pEnd.x - line2.pStart.x; //b2  
        var Y2 = line2.pEnd.y - line2.pStart.y; //a2  
        // distance of 1,2  
        var X21 = line2.pStart.x - line1.pStart.x;
        var Y21 = line2.pStart.y - line1.pStart.y;
        // determinant  
        var D = Y1 * X2 - Y2 * X1; // a1b2-a2b1  
        //   
        if (D == 0)
            return pt;
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
    };
    Util.Deg2Rad = 0.0174532924;
    Util.Rad2Deg = 57.29578;
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map