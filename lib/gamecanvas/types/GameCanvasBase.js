function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import Random from "./Random.js";
import PointerEventManager from "./PointerEventManager.js";
import KeyEventManager from "./KeyEventManager.js";
import MotionEventManager from "./MotionEventManager.js";
import FrameProfile from "./FrameProfile.js";
import LocationEventManager from "./LocationEventManager.js";
export default class GameCanvasBase {
  constructor() {
    this._rand = new Random(6);
    this._pointer = undefined;
    this._key = undefined;
    this._motion = undefined;
    this._location = undefined;
    this._width = 640;
    this._height = 480;
    this._scale = 1;
    this._color = {
      r: 0,
      g: 0,
      b: 0
    };
    this._lineWidth = 1;
    this._fontSize = 25;
    this._fontFamily = "Arial";
    this._frameCount = 0;
    this._beginTime = 0;
    this._deltaTime = 0;
    this._elapsedTime = 0;
    this._body = undefined;
    this._title = undefined;
    this._deg2rad = Math.PI / 180;
    this._rad2deg = 180 / Math.PI;
    this._storageEnabled = undefined;
    this._profilerEnabled = false;
    this._imageMap = new Map();
    this._soundMap = new Map();
    this._styleStack = new Array();
    this._profileList = new Array();
    var storage;

    try {
      storage = window["localStorage"];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      this._storageEnabled = true;
    } catch (e) {
      this._storageEnabled = e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0;
    }
  }

  get KEY_UP() {
    return "ArrowUp";
  }

  get KEY_DOWN() {
    return "ArrowDown";
  }

  get KEY_LEFT() {
    return "ArrowLeft";
  }

  get KEY_RIGHT() {
    return "ArrowRight";
  }

  get KEY_Z() {
    return "KeyZ";
  }

  get KEY_X() {
    return "KeyX";
  }

  get KEY_C() {
    return "KeyC";
  }

  get KEY_V() {
    return "KeyV";
  }

  get KEY_ENTER() {
    return "Enter";
  }

  get KEY_SPACE() {
    return "Space";
  }

  get COLOR_WHITE() {
    return 0xFFFFFF;
  }

  get COLOR_BLACK() {
    return 0x000000;
  }

  get COLOR_GRAY() {
    return 0x808080;
  }

  get COLOR_RED() {
    return 0xFF0000;
  }

  get COLOR_BLUE() {
    return 0x0000FF;
  }

  get COLOR_GREEN() {
    return 0x00FF00;
  }

  get COLOR_YELLOW() {
    return 0xFFFF00;
  }

  get COLOR_PURPLE() {
    return 0xFF00FF;
  }

  get COLOR_CYAN() {
    return 0x00FFFF;
  }

  get COLOR_AQUA() {
    return 0x7F7FFF;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get beginTime() {
    return this._beginTime;
  }

  get deltaTime() {
    return this._deltaTime;
  }

  get elapsedTime() {
    return this._elapsedTime;
  }

  get frameCount() {
    return this._frameCount;
  }

  get profilerEnabled() {
    return this._profilerEnabled;
  }

  set profilerEnabled(value) {
    if (this._profilerEnabled !== value) {
      this._profilerEnabled = value;

      this._onResizeWindow();
    }
  }

  setColor(r, g, b) {
    this._color.r = r;
    this._color.g = g;
    this._color.b = b;
  }

  setLineWidth(width) {
    this._lineWidth = width;
  }

  setFont(fontName, fontStyle, fontSize) {
    this._fontFamily = fontName;
    this._fontSize = fontSize;
  }

  setWindowTitle(title) {
    if (this._title) this._title.innerText = title;
  }

  setSeed(seed) {
    this._rand = new Random(seed);
  }

  rand(min, max) {
    return this._rand.nextInt(max, min);
  }

  resetGame() {// todo
  }

  exitApp() {} // todo

  /*
  showYesNoDialog(message) {
      // todo
  }
  showInputDialog(message, defaultInput) {
      // todo
  }
  */


  playBGM() {}

  changeBGMVolume() {}

  stopBGM() {}

  pauseBGM() {}

  playSE() {}

  changeSEVolume() {}

  stopSE() {}

  pauseSE() {}

  getKeyPressLength(keyCode) {
    return this._key.getKeyPressLength(keyCode);
  }

  isKeyPress(keyCode) {
    return this._key.isKeyPress(keyCode);
  }

  isKeyPushed(keyCode) {
    return this._key.isKeyPushed(keyCode);
  }

  isKeyReleased(keyCode) {
    return this._key.isKeyReleased(keyCode);
  }

  getMouseX() {
    return this._pointer.mouseX;
  }

  getMouseY() {
    return this._pointer.mouseY;
  }

  getMouseClickLength() {
    return this._pointer.getMouseClickLength;
  }

  isMousePushed() {
    return this._pointer.isMousePushed;
  }

  isMouseReleased() {
    return this._pointer.isMouseReleased;
  }

  isMousePress() {
    return this._pointer.isMousePress;
  }

  load(key) {
    if (this._storageEnabled && key) {
      return window.localStorage.getItem("gamecanvas-".concat(key));
    }

    return undefined;
  }

  save(key, value) {
    if (this._storageEnabled && key) {
      if (value) {
        window.localStorage.setItem("gamecanvas-".concat(key), value);
      } else {
        window.localStorage.removeItem("gamecanvas-".concat(key));
      }
    }
  }
  /*
  checkHitRect(x1, y1, w1, h1, x2, y2, w2, h2) {
      // todo
  }
  checkHitImage(filename1, x1, y1, filename2, x2, y2) {
      // todo
  }
  checkHitCircle(x1, y1, r1, x2, y2, r2) {
      // todo
  }
  */


  checkHitPointer(x, y, w, h) {
    return this._pointer.checkHitRect(x, y, w, h);
  }

  checkHitPointerDown(x, y, w, h) {
    return this._pointer.checkHitRect(x, y, w, h, "pointerdown");
  }

  checkHitPointerUp(x, y, w, h) {
    return this._pointer.checkHitRect(x, y, w, h, "pointerup");
  }

  sqrt(value) {
    return Math.sqrt(value);
  }

  cos(degree) {
    return Math.cos(degree * this._deg2rad) * this._rad2deg;
  }

  sin(degree) {
    return Math.sin(degree * this._deg2rad) * this._rad2deg;
  }

  atan2(x, y) {
    return Math.atan2(y, x) * this._rad2deg;
  }

  pushStyle() {
    this._styleStack.push({
      color: this._color,
      lineWidth: this._lineWidth,
      fontFamily: this._fontFamily,
      fontSize: this._fontSize
    });
  }

  popStyle() {
    if (this._styleStack.length === 0) return;

    var style = this._styleStack.pop();

    this.setColor(style.color.r, style.color.g, style.color.b);
    this.setLineWidth(style.lineWidth);
    this.setFont(style.fontFamily, null, style.fontSize);
  }

  get geolocationSupported() {
    return this._location.supported;
  }

  get geolocationStatus() {
    return this._location.status;
  }

  get geolocationLastLatitude() {
    return this._location.lastLatitude;
  }

  get geolocationLastLongitude() {
    return this._location.lastLongitude;
  }

  get geolocationLastAltitude() {
    return this._location.lastAltitude;
  }

  get geolocationLastTime() {
    return this._location.lastTime;
  }

  get geolocationLastFrame() {
    return this._location.lastFrame;
  }

  startGeolocationService() {
    var enableHighAccuracy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this._location.startWatching(enableHighAccuracy, timeout);
  }

  stopGeolocationService() {
    this._location.endWatching();
  }

  _fetchUntilSuccessOrAllFailed(urlArray) {
    return _asyncToGenerator(function* () {
      if (urlArray && urlArray.length !== 0) {
        var reqArray = urlArray.map(url => fetch(url));
        var resArray = yield Promise.all(reqArray);

        for (var res of resArray) {
          if (res.ok) return res;
        }

        throw new Error("all fetch are failed");
      }

      throw new Error("parameter error");
    })();
  }

  _preloadResourceImage() {
    var _this = this;

    return _asyncToGenerator(function* () {
      for (var i = 0;; i++) {
        try {
          var req = yield _this._fetchUntilSuccessOrAllFailed(["./res/img".concat(i, ".gif"), "./res/img".concat(i, ".png"), "./res/img".concat(i, ".jpg"), "./res/img".concat(i, ".webp")]);
          var img = new Image();
          img.src = URL.createObjectURL((yield req.blob()));

          _this._imageMap.set(i, img);
        } catch (e) {
          break;
        }
      }
    })();
  }

  _preloadResourceSound() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      for (var i = 0;; i++) {
        try {
          var req = yield _this2._fetchUntilSuccessOrAllFailed(["./res/snd".concat(i, ".wav"), "./res/snd".concat(i, ".mp3"), "./res/snd".concat(i, ".ogg"), "./res/snd".concat(i, ".aac"), "./res/snd".concat(i, ".flac")]);
          var snd = new Audio();
          snd.src = URL.createObjectURL((yield req.blob()));

          _this2._soundMap.set(i, snd);
        } catch (e) {
          break;
        }
      }
    })();
  }

  _preloadResource() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this3._preloadResourceImage(), _this3._preloadResourceSound()]); //console.clear();
    })();
  }

  _onLoad(surface) {
    this._body = document.body;
    this._title = document.getElementsByTagName("title").item(0);
    this._beginTime = window.performance.now();
    this._pointer = new PointerEventManager(surface);
    this._key = new KeyEventManager();
    this._motion = new MotionEventManager();
    this._location = new LocationEventManager();

    this._onResizeWindow();

    this._preloadResource();

    this.setColor(0, 0, 0);
    this.setLineWidth(1);
    this.setFont("Arial", null, 25);
  }

  _onEnterFrame(deltaTime) {
    this._frameCount++;
    this._deltaTime = deltaTime;
    this._elapsedTime = window.performance.now() - this._beginTime;

    this._pointer.onEnterFrame(this._frameCount, this._elapsedTime);

    this._key.onEnterFrame(this._frameCount, this._elapsedTime);

    this._motion.onEnterFrame();

    this._location.onEnterFrame(this._frameCount);
  }

  _onLeaveFrame() {
    this._pointer.onLeaveFrame();

    this._key.onLeaveFrame();

    this._motion.onLeaveFrame();

    this._location.onLeaveFrame();
  }

  _onResizeWindow() {}

  _drawProfiler(updateTime, drawTime) {
    this._profileList.push(new FrameProfile(this._frameCount, this._deltaTime, updateTime, drawTime));
  }

}