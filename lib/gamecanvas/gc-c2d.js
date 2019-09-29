import GameCanvasBase from "./types/GameCanvasBase.js";
import GameBase from "./types/GameBase.js";

class GameCanvas extends GameCanvasBase {
  constructor() {
    super();
    this._canvas = undefined;
    this._ctx = undefined;
  }

  clearScreen() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  setColor(r, g, b) {
    super.setColor(r, g, b);
    this._ctx.fillStyle = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
    this._ctx.strokeStyle = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
  }

  setLineWidth(width) {
    super.setLineWidth(width);
    this._ctx.lineWidth = width;
    this._ctx.lineCap = "butt";
    this._ctx.lineJoin = "miter";
  }

  setFont(fontName, fontStyle, fontSize) {
    super.setFont(fontName, fontStyle, fontSize);
    this._ctx.font = "".concat(fontSize, "px ").concat(fontName);
    this._ctx.textBaseline = "top";
  }

  getStringWidth(str) {
    return this._ctx.measureText(str).width;
  }

  drawString(str, x, y) {
    this._ctx.fillText(str, x, y);
  }

  drawCenterString(str, x, y) {
    this.drawString(str, x - this.getStringWidth(str) / 2, y);
  }

  drawRightString(str, x, y) {
    this.drawString(str, x - this.getStringWidth(str), y);
  }

  drawLine(sx, sy, ex, ey) {
    this._ctx.beginPath();

    if (this._lineWidth === 1) {
      this._ctx.moveTo(sx + 0.5, sy + 0.5);

      this._ctx.lineTo(ex + 0.5, ey + 0.5);
    } else {
      this._ctx.moveTo(sx, sy);

      this._ctx.lineTo(ex, ey);
    }

    this._ctx.stroke();
  }

  drawRect(x, y, w, h) {
    if (this._lineWidth === 1) {
      this._ctx.strokeRect(x + 0.5, y + 0.5, w, h);
    } else {
      this._ctx.strokeRect(x, y, w, h);
    }
  }

  fillRect(x, y, w, h) {
    this._ctx.fillRect(x, y, w, h);
  }

  drawCircle(x, y, r) {
    this._ctx.beginPath();

    this._ctx.arc(x, y, r, 0, Math.PI * 2);

    this._ctx.stroke();
  }

  fillCircle(x, y, r) {
    this._ctx.beginPath();

    this._ctx.arc(x, y, r, 0, Math.PI * 2);

    this._ctx.fill();
  }

  getImageWidth(key) {
    var img = this._imageMap.get(key);

    if (img) return img.width;
    return 0;
  }

  getImageHeight(key) {
    var img = this._imageMap.get(key);

    if (img) return img.height;
    return 0;
  }

  drawImage(key, x, y) {
    var img = this._imageMap.get(key);

    if (img && img.complete) this._ctx.drawImage(img, x, y);
  }

  drawClipImage(key, x, y, u, v, w, h) {
    var img = this._imageMap.get(key);

    if (img && img.complete) this._ctx.drawImage(img, x, y, u, v, w, h);
  } // drawScaledRotateImage(key, x, y, xsize, ysize, rotate, px, py) {
  //     // todo
  // }


  checkHitImage(key1, x1, y1, key2, x2, y2) {
    var img1 = this._imgMap.get(key1);

    var img2 = this._imgMap.get(key2);

    if (!img1 || !img1.complete || !img2 || !img2.complete) return false;
    return this.checkHitRect(x1, y1, img1.width, img1.height, x2, y2, img2.width, img2.height);
  }

  _onLoad() {
    this._canvas = document.createElement("canvas");

    this._canvas.setAttribute("id", "gamecanvas");

    document.body.appendChild(this._canvas);
    this._ctx = this._canvas.getContext("2d");

    super._onLoad(this._canvas);
  }

  _onResizeWindow() {
    var bodyW = this._body.clientWidth;
    var bodyH = this._body.clientHeight;
    var canvasW = this._width;
    var canvasH = this._profilerEnabled ? this._height + 120 : this._height;
    this._scale = Math.min(1, bodyW / canvasW, bodyH / canvasH);
    var displayW = ~~(canvasW * this._scale);
    var displayH = ~~(canvasH * this._scale);

    this._canvas.setAttribute("width", canvasW);

    this._canvas.setAttribute("height", canvasH);

    this._canvas.setAttribute("style", "width: ".concat(displayW, "px; height ").concat(displayH, "px"));

    this._pointer.scale = 1.0 / this._scale;
  }

  _drawProfiler(updateTime, drawTime) {
    this.pushStyle();
    {
      super._drawProfiler(updateTime, drawTime);

      var profilerX = 0;
      var profilerY = this._height;
      var profilerW = this._width;
      var profilerH = 120;
      var frameW = 2;
      var maxFrameCount = profilerW / frameW;

      while (this._profileList.length > maxFrameCount) {
        this._profileList.shift();
      }

      this.setColor(255, 255, 255);
      this.fillRect(profilerX, profilerY, profilerW, profilerH);
      var fpsAve = 0;

      for (var i = 0, size = this._profileList.length; i < size; i++) {
        var frame = this._profileList[i];
        fpsAve += 1000 / frame.deltaTime;
        var renderV = frame.deltaTime * 0.001 * 60;
        var renderH = ~~(Math.min(2, renderV) * profilerH * 0.5);
        this.setColor(222, 222, 222);
        this.fillRect(profilerX + i * frameW, profilerY + profilerH - renderH, frameW, renderH);
        var scriptingV = (frame.updateTime + frame.drawTime) * 0.001 * 60;
        var scriptingH = ~~(Math.min(2, scriptingV) * profilerH * 0.5);

        if (scriptingV < 1) {
          this.setColor(0, 154, 102);
        } else if (scriptingV < 2) {
          this.setColor(238, 102, 0);
        } else {
          this.setColor(255, 0, 0);
        }

        this.fillRect(profilerX + i * frameW, profilerY + profilerH - scriptingH, frameW, scriptingH);
      }

      fpsAve /= this._profileList.length;
      this.setColor(0, 0, 0);
      this.setFont("Arial", null, 12);
      this.setLineWidth(1);
      {
        var str = "".concat(~~this.deltaTime, "ms ( ").concat(~~fpsAve, "fps )");

        var textW = this._ctx.measureText(str).width;

        this.drawString(str, profilerX + profilerW - 10 - textW, profilerY + 10);
      }
      {
        this.drawString(this._pointer.trace(), profilerX + 10, profilerY + 10);
        this.drawString(this._key.trace(), profilerX + 10, profilerY + 28);
        this.drawString(this._motion.trace(), profilerX + 10, profilerY + 46);
        this.drawString(this._location.trace(), profilerX + 10, profilerY + 64);
      }

      if (this.geolocationStatus === "stopped") {
        if (!this.checkHitPointer(profilerX + 128, profilerY + 60, 80, 16)) {
          this.drawRect(profilerX + 128, profilerY + 61, 80, 15);
          this.drawCenterString("Request", profilerX + 168, profilerY + 64);
        } else {
          this.fillRect(profilerX + 128, profilerY + 60, 80, 16);
          this.setColor(255, 255, 255);
          this.drawCenterString("Request", profilerX + 168, profilerY + 64);
        }

        if (this.checkHitPointerUp(profilerX + 128, profilerY + 60, 80, 16)) {
          this.startGeolocationService();
        }
      }
    }
    this.popStyle();
  }

}

var gc = new GameCanvas();

class Game extends GameBase {
  constructor() {
    super(gc);
  }

}

export { gc, Game as GameBase };