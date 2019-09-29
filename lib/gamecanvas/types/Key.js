export default class Key {
  constructor(code, key, time, frame, state) {
    this._code = undefined;
    this._key = undefined;
    this.state = undefined;
    this.leaveFlag = false;
    this._beginTime = 0;
    this._beginFrame = 0;
    this._code = code;
    this._key = key;
    this._beginTime = time || window.performance.now();
    this._beginFrame = frame;
    this.state = state || "keydown";
  }

  get code() {
    return this._code;
  }

  get key() {
    return this._key;
  }

  get beginTime() {
    return this._beginTime;
  }

  get beginFrame() {
    return this._beginFrame;
  }

}