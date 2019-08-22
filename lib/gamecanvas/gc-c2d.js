
import GameCanvasBase from "./types/GameCanvasBase.js";
import GameBase from "./types/GameBase.js";

class GameCanvas extends GameCanvasBase {
    _canvas = undefined;
    _ctx = undefined;
    _imgMap = new Map();

    constructor() {
        super();
    }

    setColor(r, g, b) {
        this._ctx.fillStyle = `rgb(${r},${g},${b})`;
    }
    fillRect(x, y, w, h) {
        this._ctx.fillRect(x, y, w, h);
    }
    clearScreen() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
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
    drawString(str, x, y) {
        this._ctx.font = `${this._fontSize}px ${this._fontFamily}`;
        this._ctx.fillText(str, x, y);
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
