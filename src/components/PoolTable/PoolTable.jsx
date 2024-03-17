import { checkHasCollision, getRandomInt } from '../../utils'
import Canvas from '../Canvas/Canvas'

const generateBallPosition = (radius, [width, height]) => {
  return [
    getRandomInt(radius, width - radius),
    getRandomInt(radius, height - radius),
  ]
}

const placeBallsOnTable = (balls, table) => {
  balls.forEach(ball => {
    let hasCollision = true
    let i = 15
    do {
      const newPosition = generateBallPosition(ball.radius, table)
      hasCollision = balls.some(
        neighbor =>
          ball !== neighbor &&
          neighbor?.position &&
          checkHasCollision(neighbor, { ...ball, position: newPosition }),
      )
      if (!hasCollision) {
        ball.position = newPosition
      }
      if (!i--) {
        alert('не удалось разместить шары без пересечения шаров')
        break
      }
    } while (hasCollision)
  })
}

function PoolDesk({ balls, set, width, height }) {
  const table = [width, height]

  placeBallsOnTable(balls, table, set)

  return (
    <div id="table" style={{ position: 'relative' }}>
      <Canvas width={width} height={height}>
        {balls}
      </Canvas>
    </div>
  )
}

export default PoolDesk
