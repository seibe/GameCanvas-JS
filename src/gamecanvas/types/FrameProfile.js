
export default class FrameProfile {
    frameCount = undefined;
    deltaTime = undefined;
    updateTime = undefined;
    drawTime = undefined;

    constructor(frameCount, deltaTime, updateTime, drawTime) {
        this.frameCount = frameCount;
        this.deltaTime = deltaTime;
        this.updateTime = updateTime;
        this.drawTime = drawTime;
    }
}
