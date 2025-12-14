class BSpline {
    constructor(controlPoints, lines) {
        this.controlPoints = controlPoints;
        this.lines = lines;
        this.splineSegments = [];
        this.nodes = [];
    }

    drawBSpline(bSplineGroup, nodeGroup, bezierUIGroup, stroke = "#000000") {

        if (this.controlPoints.length < 4) {
            return null; // Not enough points to draw a B-spline
        }

        let startPoint = Point.middlePoint(this.lines[0].thirdPoint_b, this.lines[1].thirdPoint_a);
        startPoint.drawPoint(nodeGroup, 4, "green");
        this.nodes.push(startPoint);

        for (let i = 1; i <= this.lines.length - 2; i++) {
            let c0 = this.lines[i].thirdPoint_a;
            let c1 = this.lines[i].thirdPoint_b;
            let endPoint = Point.middlePoint(this.lines[i].thirdPoint_b, this.lines[i + 1].thirdPoint_a);
            endPoint.drawPoint(nodeGroup, 4, "green");
            this.nodes.push(endPoint);


            let segment = new BezierSegment(startPoint, c0, c1, endPoint);
            this.splineSegments.push(segment);
            startPoint = endPoint;
        }

        // Draw all segments
        for (let i = 0; i < this.splineSegments.length; i++) {
            console.log("Drawing segment " + i);
            this.splineSegments[i].drawBezier(bSplineGroup, bezierUIGroup, stroke);
        }

        // draw nodes
        return this.splineSegments;
    }

    updateBSpline() {
        if (this.controlPoints.length < 4) {
            return;
        }

        let startPoint = Point.middlePoint(this.lines[0].thirdPoint_b, this.lines[1].thirdPoint_a);
        this.nodes[0].updatePosition(startPoint.x, startPoint.y);

        this.splineSegments.forEach((segment, i) => {
            let lineIndex = i + 1;

            // Guard against array bounds if lines were removed
            if (lineIndex > this.lines.length - 2) return;

            let c0 = this.lines[lineIndex].thirdPoint_a;
            let c1 = this.lines[lineIndex].thirdPoint_b;
            let endPoint = Point.middlePoint(this.lines[lineIndex].thirdPoint_b, this.lines[lineIndex + 1].thirdPoint_a);
            this.nodes[i + 1].updatePosition(endPoint.x, endPoint.y);
            segment.updateBezier(startPoint, c0, c1, endPoint);
            startPoint = endPoint;
        });
    }

    deleteSpline() {
        this.splineSegments.forEach(segment => {
            segment.deleteBezier();
        });
        this.splineSegments = [];

        this.nodes.forEach(node => {
            node.deletePoint();
        });
        this.nodes = [];
    }
}