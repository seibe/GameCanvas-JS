
export default class MotionEventManager {
    _eventQueue = [new Array(), new Array()];
    _enqueueIdx = 0;
    _currentQueue = undefined;
    _supported = false;
    _rejected = false;
    _last = { x: 0, y: 0, z: 0 };

    onEnterFrame() {
        this._enqueueIdx = 1 - this._enqueueIdx; // swap
        this._currentQueue = this._eventQueue[1 - this._enqueueIdx];
        if (this._currentQueue.length > 0) {
            const last = this._currentQueue[this._currentQueue.length - 1].acceleration;
            if (typeof last.x === "number" && typeof last.y === "number" && typeof last.z === "number") {
                this._last = last;
            }
        }
    }
    onLeaveFrame() {
        this._currentQueue.length = 0;
    }

    get supported() { return this._supported; }
    get rejected() { return this._rejected; }
    get accelerationEventCount() { return this._currentQueue.length; }
    get accelerationLastX() { return this._last.x; }
    get accelerationLastY() { return this._last.y; }
    get accelerationLastZ() { return this._last.z; }

    getAcceleration(index, includeGravity = false) {
        if (this._currentQueue.length >= index) return null;
        if (includeGravity) {
            return this._currentQueue[index].accelerationIncludingGravity;
        }
        return this._currentQueue[index].acceleration;
    }

    constructor() {
        if (window.DeviceMotionEvent) {
            this._supported = true;

            if (typeof DeviceMotionEvent.requestPermission === "function") {
                this._rejected = true;
                if (window.confirm("GameCanvas requires access to your sensors. Press continue to allow.")) {
                    DeviceMotionEvent.requestPermission().then(res => {
                        if (res === "granted") {
                            this._rejected = false;
                            window.addEventListener("devicemotion", e => { this._eventQueue[this._enqueueIdx].push(e); }, false);
                        }
                    });
                }
            } else {
                window.addEventListener("devicemotion", e => { this._eventQueue[this._enqueueIdx].push(e); }, false);
            }
        } else {
            this._supported = false;
            console.log("devicemotion is not supported.");
        }
    }

    trace() {
        if (this._supported) {
            if (this._rejected) {
                return "Acce: denied";
            }
            const x = (~~(this._last.x * 100)) * 0.01;
            const y = (~~(this._last.y * 100)) * 0.01;
            const z = (~~(this._last.z * 100)) * 0.01;
            return `Acce: ${x}, ${y}, ${z}`
        }
        return "Acce: not supported";
    }
}
