
import Pointer from "./Pointer.js";

export default class PointerEventManager {
    _eventQueue = undefined;
    _pointerMap = undefined;
    _scale = 1;
    _frameCount = 0;
    _mouseX = 0;
    _mouseY = 0;
    _mouseDownFrame = 0;

    _updateMouse(e) {
        this._mouseX = e.offsetX * this._scale;
        this._mouseY = e.offsetY * this._scale;

        switch (e.type) {
            case "pointerdown":
                this._mouseDownFrame = this._frameCount;
                break;

            case "pointerup":
                this._mouseDownFrame = -1;
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
                    this._pointerMap.get(e.pointerId).updatePosition(e.offsetX * this._scale, e.offsetY * this._scale, e.type);
                    if (e.pointerType === "mouse") this._updateMouse(e);
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
        this._frameCount++;
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

    checkHitRect(x, y, w, h, stateFilter = null) {
        const r = x + w;
        const b = y + h;
        for (const p of this._pointerMap.values()) {
            if (stateFilter === null || p.state === stateFilter) {
                if (x <= p.x && y <= p.y && p.x <= r && p.y <= b) return true;
            }
        }
        return false;
    }

    checkHitCircle(x, y, radius, stateFilter = null) {
        const sqrRad = radius * radius;
        for (const p of this._pointerMap.values()) {
            if (stateFilter === null || p.state === stateFilter) {
                const sqrMag = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
                if ((sqrMag - sqrRad) >= 0) return true;
            }
        }
        return false;
    }

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

    trace() {
        if (this._pointerMap.size > 0) {
            return "Pointer: " + Array.from(this._pointerMap.values()).map(p => `${p.id} => ${p.state} { ${p.x}, ${p.y} }`).join(", ");
        }
        return "Pointer: none";
    }
}
