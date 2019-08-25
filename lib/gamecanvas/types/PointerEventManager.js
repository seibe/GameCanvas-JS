
import Pointer from "./Pointer.js";

export default class PointerEventManager {
    _eventQueue = undefined;
    _pointerMap = undefined;
    _scale = 1;
    _frameCount = 0;
    _mouseX = 0;
    _mouseY = 0;
    _mouseDownFrame = 0;

    constructor(surface) {
        this._eventQueue = new Array();
        this._pointerMap = new Map();

        const callback = e => { this._eventQueue.push(e); };
        surface.addEventListener("pointerover", callback, false);
        surface.addEventListener("pointerdown", callback, false);
        surface.addEventListener("pointermove", callback, false);
        surface.addEventListener("pointerup", callback, false);
        surface.addEventListener("pointercancel", callback, false);
        surface.addEventListener("pointerleave", callback, false);
    }

    _updateMouse(e, p) {
        this._mouseX = e.offsetX * this._scale;
        this._mouseY = e.offsetY * this._scale;

        switch (e.type) {
            case "pointerdown":
                this._mouseDownFrame = this._frameCount;
                p.state = "mousedown";
                break;

            case "pointerup":
                this._mouseDownFrame = -1;
                p.state = "mouseup";
                break;

            case "pointermove":
                p.state = "mousemove";
                break;
        }
    }

    onEnterFrame(frameCount, elapsedTime) {
        this._frameCount = frameCount;

        while (this._eventQueue.length > 0) {
            const e = this._eventQueue.shift();
            switch (e.type) {
                case "pointerover":
                    this._pointerMap.set(e.pointerId, new Pointer(e.pointerId, e.pointerType, elapsedTime, frameCount, e.offsetX * this._scale, e.offsetY * this._scale));
                    break;

                case "pointerleave":
                    this._pointerMap.get(e.pointerId).leaveFlag = true;
                    break;

                default:
                    const p = this._pointerMap.get(e.pointerId);
                    p.updatePosition(e.offsetX * this._scale, e.offsetY * this._scale, e.type);
                    if (e.pointerType === "mouse") this._updateMouse(e, p);
                    break;
            }
        }
    }
    onLeaveFrame() {
        if (this._pointerMap.size > 0) {
            for (const p of this._pointerMap.values()) {
                if (p.leaveFlag) this._pointerMap.delete(p.id);
            }
        }
        if (this._mouseDownFrame === -1) {
            this._mouseDownFrame = 0;
        }
    }

    get mouseX() { return this._mouseX; }
    get mouseY() { return this._mouseY; }
    get mouseClickLength() { return (this._mouseDownFrame > 0) ? (this._frameCount - this._mouseDownFrame + 1) : this._mouseDownFrame; }
    get isMousePushed() { return (this._mouseDownFrame === this._frameCount); }
    get isMouseReleased() { return (this._mouseDownFrame === -1); }
    get isMousePress() { return (this._mouseDownFrame > 0); }

    set scale(val) {
        this._scale = val;
    }

    trace() {
        if (this._pointerMap.size > 0) {
            return "Pointer: " + Array.from(this._pointerMap.values()).map(p => `${p.id} => ${p.state} { ${p.x}, ${p.y} }`).join(", ");
        }
        return "Pointer: none";
    }
}
