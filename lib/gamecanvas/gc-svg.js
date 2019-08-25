
import GameCanvasBase from "./types/GameCanvasBase.js";
import GameBase from "./types/GameBase.js";
import SVG from "../svg.js/svg.js";

class GameCanvas extends GameCanvasBase {
    _color = new SVG.Color("#000");
    _draw = undefined;

    constructor() {
        super();
    }

    setColor(r, g, b) {
        this._color = new SVG.Color({ r, g, b }).toHex();
    }
    fillRect(x, y, w, h) {
        this._draw.rect(w, h).fill(this._color).move(x, y);
    }
    clearScreen() {
        this._draw.clear();
    }
    drawImage(key, x, y) {
        const img = this._imageMap.get(key);
        if (img && img.complete) this._draw.image(img.src).move(x, y);
    }
    drawString(str, x, y) {
        this._draw.plain(str).move(x, y).font({ fill: this._color, size: this._fontSize, family: this._fontFamily });
    }

    _onLoad() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "gamecanvas");
        document.getElementsByTagName("body").item(0).appendChild(svg);
        this._draw = SVG.SVG(svg);
        super._onLoad(svg);
    }
    _onResizeWindow() {
        // this._width = this._draw.node.clientWidth;
        // this._height = this._draw.node.clientHeight;
    }
}

const gc = new GameCanvas();

class Game extends GameBase {
    constructor() {
        super(gc);
    }
}

export { gc, Game as GameBase };
