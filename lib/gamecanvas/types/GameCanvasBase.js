
export default class GameCanvasBase {
    _width = 640;
    _height = 480;
    _fontSize = 25;
    _fontFamily = "Arial";
    _frameCount = 0;
    _beginTime = 0;
    _deltaTime = 0;
    _title = undefined;
    _deg2rad = Math.PI / 180;
    _rad2deg = 180 / Math.PI;

    constructor() { }

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
    get frameCount() {
        return this._frameCount;
    }

    setWindowTitle(title) {
        if (this._title) this._title.innerText = title;
    }
    setSeed(seed) {
        // todo
    }
    rand(min, max) {
        // todo
    }
    resetGame() {
        // todo
    }
    exitApp() {
        // todo
    }

    showYesNoDialog(message) {
        // todo
    }
    showInputDialog(message, defaultInput) {
        // todo
    }

    playBGM() { }
    changeBGMVolume() { }
    stopBGM() { }
    pauseBGM() { }
    playSE() { }
    changeSEVolume() { }
    stopSE() { }
    pauseSE() { }

    getKeyPressLength(keyCode) {
        // todo
    }
    isKeyPress(keyCode) {
        // todo
    }
    isKeyPushed(keyCode) {
        // todo
    }
    isKeyReleased(keyCode) {
        // todo
    }

    getMouseX() { }
    getMouseY() { }
    getMouseClickLength() { }
    isMousePushed() { }
    isMouseReleased() { }
    isMOusePress() { }

    load() { }
    save() { }

    checkHitRect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // todo
    }
    checkHitImage(filename1, x1, y1, filename2, x2, y2) {
        // todo
    }
    checkHitCircle(x1, y1, r1, x2, y2, r2) {
        // todo
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

    _onLoad() {
        this._title = document.getElementsByTagName("title").item(0);
        this._beginTime = window.performance.now();
        this._onResize();
    }
    _onEnterFrame(deltaTime) {
        this._frameCount++;
        this._deltaTime = deltaTime;
    }
    _onResize() { }
}
