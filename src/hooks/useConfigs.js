import {
  ballsCount,
  ballColor as color,
  ballRadius,
  tableWidth,
  tableHeight,
} from '../constants'
import { getRandomInt, checkHasCollision } from '../utils'

const makeConfig = () => {
  const radius = getRandomInt(ballRadius, 5 * ballRadius)
  const x = getRandomInt(radius, tableWidth - radius)
  const y = getRandomInt(radius, tableHeight - radius)
  return { x, y, radius, color, position: [x, y] }
}

const generateBallPosition(ballRadius) => {
  return [
    getRandomInt(ballRadius, tableWidth - ballRadius), 
    getRandomInt(radius, tableHeight - ballRadius)
  ]
}

export const useConfigs = () => {
  /** добавление фигуры и проверка отсутствия пересечения с ранее созданными  */
  return [...Array(ballsCount)].reduce(acc => {
    let hasCollision
    let newConfig
    let i = 15
    do {
      newConfig = makeConfig()
      hasCollision = acc.some(config => checkHasCollision(config, newConfig))
      if (!i--) {
        alert('не удается разместить фигуру без пересечения с другими фигурами')
        break
      }
    } while (hasCollision)
    return [...acc, newConfig]
  }, [])
}
