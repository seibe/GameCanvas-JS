
export default class LocationEventManager {
    _supported = false;
    _frameCount = 0;
    _last = undefined;
    _lastUpdateFrame = -1;
    _watchId = undefined;
    _status = undefined;

    onEnterFrame(frameCount) {
        this._frameCount = frameCount;
    }
    onLeaveFrame() {
        this._frameCount++;
    }

    get supported() { return this._supported; }
    get status() { return this._status; }
    get hasNewValue() { return (this._lastUpdateFrame === this._frameCount); }
    get lastLatitude() { return this._last ? this._last.coords.latitude : null; }
    get lastLongitude() { return this._last ? this._last.coords.longitude : null; }
    get lastAltitude() { return this._last ? this._last.coords.altitude : null; }
    get lastTime() { return this._last ? this._last.timestamp : -1; }
    get lastFrame() { return this._lastUpdateFrame; }

    async getCurrent(enableHighAccuracy = false, timeout = 0) {
        return new Promise((success, failure) => {
            navigator.geolocation.getCurrentPosition(pos => {
                this._last = pos;
                this._lastUpdateFrame = this._frameCount;
                success(pos);
            }, err => {
                failure(err);
            }, { enableHighAccuracy, timeout });
        });
    }

    endWatching() {
        if (this._watchId) {
            navigator.geolocation.clearWatch(this._watchId);
            this._watchId = undefined;
            this._status = "stopped";
        }
    }

    startWatching(enableHighAccuracy = false) {
        this._watchId = navigator.geolocation.watchPosition(pos => {
            this._last = pos;
            this._lastUpdateFrame = this._frameCount;
            this._status = "running";
        }, err => {
            console.error(err);
            this._status = "failed";
        }, { enableHighAccuracy });
        this._status = "running";
    }

    constructor() {
        this._supported = ("geolocation" in navigator);
        this._status = "stopped";
    }

    trace() {
        if (this._supported) {
            if (this._last) {
                return `Geo: ${this._last.coords.latitude}, ${this._last.coords.longitude} (${this._status})`;
            }
            return `Geo: none (${this._status})`;
        }
        return "Geo: not supported";
    }
}
