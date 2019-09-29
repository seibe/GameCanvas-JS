export default class Random {
  constructor(seed) {
    this._seed = 0;
    this._s = 0;
    this._seed = ~~seed;
    this._s = this._seed;
  }

  get seed() {
    return this._seed;
  }

  next(max, min) {
    max = max || 1;
    min = min || 0;
    this._s = (this._s * 9301 + 49297) % 233280;
    var rnd = this._s / 233280;
    return min + rnd * (max - min);
  }

  nextInt(max, min) {
    return ~~this.next(max, min);
  }

}