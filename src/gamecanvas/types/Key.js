
export default class Key {
    _code = undefined;
    _key = undefined;
    state = undefined;
    leaveFlag = false;
    _beginTime = 0;
    _beginFrame = 0;

    constructor(code, key, time, frame, state) {
        this._code = code;
        this._key = key;
        this._beginTime = time || window.performance.now();
        this._beginFrame = frame;
        this.state = state || "keydown";
    }

    get code() { return this._code; }
    get key() { return this._key; }
    get beginTime() { return this._beginTime; }
    get beginFrame() { return this._beginFrame; }
}
