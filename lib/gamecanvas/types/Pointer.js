export default class Pointer {
  constructor(id, type, time, frame, x, y, state) {
    this.x = 0;
    this.y = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.state = undefined;
    this.leaveFlag = false;
    this._id = undefined;
    this._type = undefined;
    this._beginTime = 0;
    this._beginFrame = 0;
    this._id = id;
    this._type = type;
    this._beginTime = time || window.performance.now();
    this._beginFrame = frame;
    this.x = ~~x;
    this.y = ~~y;
    this.state = state || "pointerover";
  }

  get id() {
    return this._id;
  }

  get beginTime() {
    return this._beginTime;
  }

  get beginFrame() {
    return this._beginFrame;
  }

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