import { Ball } from '../core/ball'
import { getRandomInt } from '../utils'

export const useBalls = ({ count, size, color }) => {
  const set = []

  for (let i = 0; i < count; i++) {
    const radius = Array.isArray(size)
      ? getRandomInt(size[0], size[1])
      : Math.floor(size / 2)
    const ballColor = Array.isArray(color)
      ? color.at(getRandomInt(0, color.length))
      : color
      
    set.push(new Ball({ radius, color: ballColor }))
  }

  return set
}
