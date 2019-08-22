
export default class GameBase {
    _isFocused = false;
    _prevTimestamp = 0;
    _gc = undefined;
    __onEnterFrame = undefined;

    initGame() { }
    enterGame() { }
    updateGame() { }
    resizeGame() { }
    drawGame() { }
    leaveGame() { }
    finalGame() { }

    _log(str) {
        console.log(str);
    }

    _onEnterFrame(timestamp) {
        window.requestAnimationFrame(this.__onEnterFrame);
        if (this._isFocused) {
            this._gc.deltaTime = timestamp - this._prevTimestamp;
            this.updateGame();
            this.drawGame();
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
            const isFocused = (document.visibilityState !== "hidden");
            this._log(`onVisibilitychange ${isFocused}`);
            if (isFocused && !this._isFocused) this.enterGame();
            if (!isFocused && this._isFocused) this.leaveGame();
            this._isFocused = isFocused;
        }, false);
        window.addEventListener("resize", () => {
            this._log("onResize");
            this._gc._onResize();
            this.resizeGame();
        }, false);
        window.addEventListener("close", () => {
            this._log("onClose");
            this.finalGame();
        }, false);
        this.__onEnterFrame = this._onEnterFrame.bind(this);
        window.requestAnimationFrame(this.__onEnterFrame);
    }

    constructor(gc) {
        this._gc = gc;
        document.addEventListener("DOMContentLoaded", () => { this._onLoad(); }, false);
    }
}
