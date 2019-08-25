
export default class Pointer {
    x = 0;
    y = 0;
    deltaX = 0;
    deltaY = 0;
    state = undefined;
    leaveFlag = false;
    _id = undefined;
    _type = undefined;
    _beginTime = 0;
    _beginFrame = 0;

    constructor(id, type, time, frame, x, y, state) {
        this._id = id;
        this._type = type;
        this._beginTime = time || window.performance.now();
        this._beginFrame = frame;
        this.x = ~~x;
        this.y = ~~y;
        this.state = state || "pointerover";
    }

    get id() { return this._id; }
    get beginTime() { return this._beginTime; }
    get beginFrame() { return this._beginFrame; }

    updatePosition(x, y, state) {
        x = ~~x;
        y = ~~y;
        this.deltaX = x - this.x;
        this.deltaY = y - this.y;
        this.x = x;
        this.y = y;
        this.state = state;
    }
}
