export default class FrameProfile {
  constructor(frameCount, deltaTime, updateTime, drawTime) {
    this.frameCount = undefined;
    this.deltaTime = undefined;
    this.updateTime = undefined;
    this.drawTime = undefined;
    this.frameCount = frameCount;
    this.deltaTime = deltaTime;
    this.updateTime = updateTime;
    this.drawTime = drawTime;
  }

}