
import GameCanvasBase from "./types/GameCanvasBase.js";
import GameBase from "./types/GameBase.js";

class GameCanvas extends GameCanvasBase {
    _canvas = undefined;
    _ctx = undefined;

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
        return this._ctx.measureText(str).width;
    }
    drawString(str, x, y) {
        this._ctx.font = `${this._fontSize}px ${this._fontFamily}`;
        this._ctx.textBaseline = "top";
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
    drawImage(key, x, y) {
        const img = this._imageMap.get(key);
        if (img && img.complete) this._ctx.drawImage(img, x, y);
    }
    drawClipImage(key, x, y, u, v, w, h) {
        // todo
    }
    drawScaledRotateImage(key, x, y, xsize, ysize, rotate) {
        // todo
    }
    drawScaledRotateImage(key, x, y, xsize, ysize, rotate, px, py) {
        // todo
    }
    checkHitImage(key1, x1, y1, key2, x2, y2) {
        const img1 = this._imgMap.get(key1);
        const img2 = this._imgMap.get(key2);
        if (!img || !img.complete || !img2 || !img2.complete) return false;
        return this.checkHitRect(x1, y1, img1.width, img1.height, x2, y2, img2.width, img2.height);
    }

    _onLoad() {
        this._canvas = document.createElement("canvas");
        this._canvas.setAttribute("id", "gamecanvas");
        document.getElementsByTagName("body").item(0).appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        super._onLoad(this._canvas);
    }
    _onResizeWindow() {
        const bodyW = this._body.clientWidth;
        const bodyH = this._body.clientHeight;
        const canvasW = this._width;
        const canvasH = this._profilerEnabled ? this._height + 120 : this._height;
        this._scale = Math.min(1, bodyW / canvasW, bodyH / canvasH);
        const displayW = ~~(canvasW * this._scale);
        const displayH = ~~(canvasH * this._scale);

        this._canvas.setAttribute("width", canvasW);
        this._canvas.setAttribute("height", canvasH);
        this._canvas.setAttribute("style", `width: ${displayW}px; height ${displayH}px`);

        this._pointer.scale = 1.0 / this._scale;
    }
    _drawProfiler(updateTime, drawTime) {
        const backupFillStyle = this._ctx.fillStyle;
        {
            super._drawProfiler(updateTime, drawTime);

            const profilerX = 0;
            const profilerY = this._height;
            const profilerW = this._width;
            const profilerH = 120;

            const frameW = 2;
            const maxFrameCount = profilerW / frameW;
            while (this._profileList.length > maxFrameCount) this._profileList.shift();

            this._ctx.fillStyle = "#fff";
            this._ctx.fillRect(profilerX, profilerY, profilerW, profilerH);

            let fpsAve = 0;
            for (let i = 0, size = this._profileList.length; i < size; i++) {
                const frame = this._profileList[i];
                fpsAve += 1000 / frame.deltaTime;

                const renderV = frame.deltaTime * 0.001 * 60;
                const renderH = ~~(Math.min(2, renderV) * profilerH * 0.5);
                this._ctx.fillStyle = `#ddd`;
                this._ctx.fillRect(profilerX + i * frameW, profilerY + profilerH - renderH, frameW, renderH);

                const scriptingV = (frame.updateTime + frame.drawTime) * 0.001 * 60;
                const scriptingH = ~~(Math.min(2, scriptingV) * profilerH * 0.5);
                this._ctx.fillStyle = (scriptingV < 1) ? "#009966" : (scriptingV < 2) ? "#ee6600" : "#ff0000";
                this._ctx.fillRect(profilerX + i * frameW, profilerY + profilerH - scriptingH, frameW, scriptingH);
            }
            fpsAve /= this._profileList.length;

            this._ctx.fillStyle = "#000";
            this._ctx.font = "12px Arial";
            {
                const str = `${~~this.deltaTime}ms ( ${~~fpsAve}fps )`;
                const textW = this._ctx.measureText(str).width;
                this._ctx.fillText(str, profilerX + profilerW - 10 - textW, profilerY + 10);
            }
            {
                this._ctx.fillText(this._pointer.trace(), 10, profilerY + 10);
                this._ctx.fillText(this._key.trace(), 10, profilerY + 28);
            }
        }
        this._ctx.fillStyle = backupFillStyle;
    }
}

const gc = new GameCanvas();

class Game extends GameBase {
    constructor() {
        super(gc);
    }
}

export { gc, Game as GameBase };
