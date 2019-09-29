function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export default class LocationEventManager {
  onEnterFrame(frameCount) {
    this._frameCount = frameCount;
  }

  onLeaveFrame() {
    this._frameCount++;
  }

  get supported() {
    return this._supported;
  }

  get status() {
    return this._status;
  }

  get hasNewValue() {
    return this._lastUpdateFrame === this._frameCount;
  }

  get lastLatitude() {
    return this._last ? this._last.coords.latitude : null;
  }

  get lastLongitude() {
    return this._last ? this._last.coords.longitude : null;
  }

  get lastAltitude() {
    return this._last ? this._last.coords.altitude : null;
  }

  get lastTime() {
    return this._last ? this._last.timestamp : -1;
  }

  get lastFrame() {
    return this._lastUpdateFrame;
  }

  getCurrent() {
    var _this = this,
        _arguments = arguments;

    return _asyncToGenerator(function* () {
      var enableHighAccuracy = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
      var timeout = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : 0;
      return new Promise((success, failure) => {
        navigator.geolocation.getCurrentPosition(pos => {
          _this._last = pos;
          _this._lastUpdateFrame = _this._frameCount;
          success(pos);
        }, err => {
          failure(err);
        }, {
          enableHighAccuracy,
          timeout
        });
      });
    })();
  }

  endWatching() {
    if (this._watchId) {
      navigator.geolocation.clearWatch(this._watchId);
      this._watchId = undefined;
      this._status = "stopped";
    }
  }

  startWatching() {
    var enableHighAccuracy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this._watchId = navigator.geolocation.watchPosition(pos => {
      this._last = pos;
      this._lastUpdateFrame = this._frameCount;
      this._status = "running";
    }, err => {
      console.error(err);
      this._status = "failed";
    }, {
      enableHighAccuracy
    });
    this._status = "running";
  }

  constructor() {
    this._supported = false;
    this._frameCount = 0;
    this._last = undefined;
    this._lastUpdateFrame = -1;
    this._watchId = undefined;
    this._status = undefined;
    this._supported = "geolocation" in navigator;
    this._status = "stopped";
  }

  trace() {
    if (this._supported) {
      if (this._last) {
        return "Geo: ".concat(this._last.coords.latitude, ", ").concat(this._last.coords.longitude, " (").concat(this._status, ")");
      }

      return "Geo: none (".concat(this._status, ")");
    }

    return "Geo: not supported";
  }

}