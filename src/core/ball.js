import { checkHasCollision } from '../utils'
import { ballKickTimeout, ballRadius, ballColor } from '../constants'

export class Ball {
  type = 'circle'
  lastKickTime = 0
  velocity = [0, 0]
  constructor({ radius = ballRadius, color = ballColor }) {
    const mass = (4 / 3) * Math.PI * Math.pow(radius, 3)
    Object.assign(this, { radius, color, mass })
  }
  draw(ctx) {
    const {
      position: [x, y],
      radius,
      color,
    } = this
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }
  accept(shape) {
    return checkHasCollision(this, shape)
  }
  kick([x, y]) {
    this.lastKickTime = Date.now()
    const [thisX, thisY] = this.position
    this.velocity = [(thisX - x) / 10, (thisY - y) / 10]
  }
  handleMouseMove(position) {
    if (this.accept({ position, radius: 1 })) {
      const currentTime = Date.now()
      if (currentTime - this.lastKickTime >= ballKickTimeout) {
        this.kick(position)
      }
    }
  }
  handleClick(position) {
    if (this.accept({ position, radius: 1 })) {
      console.log('position')
    }
  }
  changeColor(color) {
    this.color = color
  }
  updatePosition(balls, ...borders) {
    this.position[0] += this.velocity[0]
    this.position[1] += this.velocity[1]

    this.position.forEach((_, i) => {
      if (
        this.position[i] - this.radius < 0 ||
        this.position[i] + this.radius > borders[i]
      ) {
        this.velocity[i] = -this.velocity[i]
      }
    })

    const ball1 = this
    balls.forEach(ball2 => {
      if (ball2 !== this) {
        if (ball1.accept(ball2)) {
          const power =
            (Math.abs(ball1.velocity[0]) +
              Math.abs(ball1.velocity[1]) +
              Math.abs(ball2.velocity[0]) +
              Math.abs(ball2.velocity[1])) *
            0.00482

          const dx = ball1.position[0] - ball2.position[0]
          const dy = ball1.position[1] - ball2.position[1]
          const rotation = Math.atan2(dy, dx)

          ball2.velocity = [
            ball2.velocity[0] + 90 * Math.cos(rotation + Math.PI) * power,
            ball2.velocity[1] + 90 * Math.sin(rotation + Math.PI) * power,
          ]

          ball1.velocity = [
            ball1.velocity[0] + 90 * Math.cos(rotation) * power,
            ball1.velocity[1] + 90 * Math.sin(rotation) * power,
          ]
        }
      }
    })

    this.velocity[0] = this.velocity[0] * 0.995
    this.velocity[1] = this.velocity[1] * 0.995
  }
}
