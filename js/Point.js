class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = -1;
        this.pointObj = null;
    }

    distance(other) {
        return Math.hypot(this.x - other.x, this.y - other.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    drawPoint(svgGroup, radius = 5, color = "red", id = null) {
        const circle = svgGroup.append("circle")
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", radius)
            .attr("fill", color);
        if (id !== null) {
            circle.attr("id", `p${id}`);
            this.id = id;
        }
        this.pointObj = circle;
        return circle;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        if (this.pointObj) {
            this.pointObj
                .attr("cx", this.x)
                .attr("cy", this.y);
        }
    }

    updateId(newId) {
        this.id = newId;
        if (this.pointObj) {
            this.pointObj.attr("id", `p${newId}`);
        }
    }

    deletePoint() {
        if (this.pointObj) {
            this.pointObj.remove();
            this.pointObj = null;
        }
    }

    static middlePoint(p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }
}