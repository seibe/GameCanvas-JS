
import GameCanvasBase from "./types/GameCanvasBase.js";
import GameBase from "./types/GameBase.js";

class GameCanvas extends GameCanvasBase {
    _canvas = undefined;
    _ctx = undefined;
    _imgMap = new Map();

    constructor() {
        super();
    }

    clearScreen() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    setColor(r, g, b) {
        this._ctx.fillStyle = `rgb(${r},${g},${b})`;
    }
    setFont(fontName, fontStyle, fontSize) {
        this._fontFamily = fontName;
        this._fontSize = fontSize;
    }
    setFont(fontSize) {
        this._fontSize = fontSize;
    }
    getStringWidth(str) {
        return this._ctx.measureText(str);
    }
    drawString(str, x, y) {
        this._ctx.font = `${this._fontSize}px ${this._fontFamily}`;
        this._ctx.fillText(str, x, y);
    }
    drawCenterString(str, x, y) {
        this.drawString(str, x - this.getStringWidth(str) / 2, y);
    }
    drawRightString(str, x, y) {
        this.drawString(str, x - this.getStringWidth(str), y);
    }
    drawLine(sx, sy, ex, ey) {
        // todo
    }
    drawRect(x, y, w, h) {
        // todo
    }
    fillRect(x, y, w, h) {
        this._ctx.fillRect(x, y, w, h);
    }
    drawCircle(x, y, r) {
        // todo
    }
    fillCircle(x, y, r) {
        // todo
    }
    getImageWidth(filename) {
        // todo
    }
    getImageHeight(filename) {
        // todo
    }
    drawImage(filename, x, y) {
        let img = this._imgMap.get(filename);
        if (!img) {
            img = new Image();
            img.src = `./res/${filename}`;
            this._imgMap.set(filename, img);
        }
        this._ctx.drawImage(img, x, y);
    }
    drawClipImage(filename, x, y, u, v, w, h) {
        // todo
    }
    drawScaledRotateImage(filename, x, y, xsize, ysize, rotate) {
        // todo
    }
    drawScaledRotateImage(filename, x, y, xsize, ysize, rotate, px, py) {
        // todo
    }

    _onLoad() {
        this._canvas = document.createElement("canvas");
        this._canvas.setAttribute("id", "gamecanvas");
        document.getElementsByTagName("body").item(0).appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        super._onLoad();
    }
    _onResize() {
        this._width = this._canvas.clientWidth;
        this._height = this._canvas.clientHeight;
        this._canvas.setAttribute("width", this._width);
        this._canvas.setAttribute("height", this._height);
    }
}

const gc = new GameCanvas();

class Game extends GameBase {
    constructor() {
        super(gc);
    }
}

export { gc, Game as GameBase };
