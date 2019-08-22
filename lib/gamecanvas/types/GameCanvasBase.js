
export default class GameCanvasBase {
    _width = 640;
    _height = 480;
    _fontSize = 25;
    _fontFamily = "Arial";
    _beginTime = 0;
    _deltaTime = 0;

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

    set deltaTime(value) {
        this._deltaTime = value;
    }
    
    setColor(r, g, b) { }
    fillRect(x, y, w, h) { }
    clearScreen() { }
    drawImage(filename, x, y) { }
    drawString(str, x, y) { }

    _onLoad() {
        this._beginTime = window.performance.now();
        this._onResize();
    }
    _onResize() { }
}
