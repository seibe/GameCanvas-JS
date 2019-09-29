export default class GameBase {
  initGame() {}

  enterGame() {}

  updateGame() {}

  resizeGame() {}

  drawGame() {}

  leaveGame() {}

  finalGame() {}

  _log(str) {
    console.log(str);
  }

  _update(timestamp) {
    window.requestAnimationFrame(this.__update);

    if (this._isFocused) {
      var deltaTime = timestamp - this._prevTimestamp;

      this._gc._onEnterFrame(deltaTime);

      var updateBefore = window.performance.now();
      this.updateGame();
      var drawBefore = window.performance.now();
      this.drawGame();
      var updateTime = drawBefore - updateBefore;
      var drawTime = window.performance.now() - drawBefore;

      this._gc._drawProfiler(updateTime, drawTime);

      this._gc._onLeaveFrame();

      this._prevTimestamp = timestamp;
    }
  }

  _onLoad() {
    this._log("onInit");

    this._gc._onLoad();

    this.initGame();

    if (document.visibilityState !== "hidden") {
      this._isFocused = true;
      this.enterGame();
    }

    window.addEventListener("visibilitychange", () => {
      var isFocused = document.visibilityState !== "hidden";

      this._log("onVisibilitychange ".concat(isFocused));

      if (isFocused && !this._isFocused) this.enterGame();
      if (!isFocused && this._isFocused) this.leaveGame();
      this._isFocused = isFocused;
    }, false);
    window.addEventListener("resize", () => {
      this._log("onResizeWindow");

      this._gc._onResizeWindow();
    }, false);
    window.addEventListener("close", () => {
      this._log("onClose");

      this.finalGame();
    }, false);
    this.__update = this._update.bind(this);
    window.requestAnimationFrame(this.__update);
  }

  constructor(gc) {
    this._isFocused = false;
    this._prevTimestamp = 0;
    this._gc = undefined;
    this.__update = undefined;
    this._gc = gc;
    document.addEventListener("DOMContentLoaded", () => {
      this._onLoad();
    }, false);
  }

}