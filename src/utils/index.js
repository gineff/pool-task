export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const checkHasCollision = (ball1, ball2) => {
  if (ball1?.position && ball2.position) {
    const dx = ball1.position[0] - ball2.position[0]
    const dy = ball1.position[1] - ball2.position[1]
    const distance = Math.hypot(dx, dy)
    return distance < ball1.radius + ball2.radius
  }
  return false
}
