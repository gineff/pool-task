export class Shape {
  constructor(options) {
    Object.assign(this, options)
  }

  changeColor(color) {
    this.color = color
  }
}
