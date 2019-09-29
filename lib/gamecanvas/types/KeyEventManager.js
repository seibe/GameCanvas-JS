import Key from "./Key.js";
export default class KeyEventManager {
  constructor() {
    this._eventQueue = undefined;
    this._keyMap1 = undefined;
    this._keyMap2 = undefined;
    this._frameCount = 0;
    this._eventQueue = new Array();
    this._keyMap1 = new Map();
    this._keyMap2 = new Map();

    var callback = e => {
      this._eventQueue.push(e);
    };

    window.addEventListener("keydown", callback, false);
    window.addEventListener("keyup", callback, false);
  }

  onEnterFrame(frameCount, elapsedTime) {
    this._frameCount = frameCount;

    while (this._eventQueue.length > 0) {
      var e = this._eventQueue.shift();

      var key = this._keyMap1.get(e.code);

      switch (e.type) {
        case "keydown":
          if (!key) {
            key = new Key(e.code, e.key, elapsedTime, frameCount, "keydown");

            this._keyMap1.set(e.code, key);

            this._keyMap2.set(e.key, key);
          }

          break;

        case "keyup":
          if (key) key.state = "keyup";
          break;
      }
    }
  }

  onLeaveFrame() {
    if (this._keyMap1.size > 0) {
      for (var key of this._keyMap1.values()) {
        if (key.state === "keyup") {
          this._keyMap1.delete(key.code);

          this._keyMap2.delete(key.key);
        }
      }
    }
  }

  _getFromCodeOrKey(codeOrKey) {
    return this._keyMap1.get(codeOrKey) || this._keyMap2.get(codeOrKey);
  }

  getKeyPressLength(code) {
    var key = this._getFromCodeOrKey(code);

    if (!key) return 0;
    if (key.state === "keyup") return -1;
    return this._frameCount - key.beginFrame + 1;
  }

  isKeyPress(code) {
    var key = this._getFromCodeOrKey(code);

    return key && key.state !== "keyup";
  }

  isKeyPushed(code) {
    var key = this._getFromCodeOrKey(code);

    return key && key.beginFrame === this._frameCount;
  }

  isKeyReleased(code) {
    var key = this._getFromCodeOrKey(code);

    return key && key.state === "keyup";
  }

  trace() {
    if (this._keyMap1.size > 0) {
      return "Key: " + Array.from(this._keyMap1.keys()).join(", ");
    }

    return "Key: none";
  }

}