import { useRef, useEffect, useState } from 'react'
import Menu from '../Menu/Menu'
import styles from './Canvas.module.css'

const getEventCoordinate = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  return [mouseX, mouseY]
}

const Canvas = ({ children: balls, ...restProps }) => {
  const canvasRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuBall, setMenuBall] = useState(null)

  const updateBalls = () => {
    let canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      balls.forEach(ball => {
        ball.updatePosition(balls, canvas.width, canvas.height)
      })

      balls.forEach(ball => {
        ball.draw(ctx)
      })
    }

    requestAnimationFrame(updateBalls)
  }

  useEffect(() => {
    let canvas = canvasRef.current

    if (canvas) {
      requestAnimationFrame(updateBalls)

      return () => {
        cancelAnimationFrame(updateBalls)
      }
    }
  }, [balls])


  const handleMouseMove = event => {
    balls.forEach(ball => {
      if (event.ctrlKey && ball.handleMouseMove) {
        ball.handleMouseMove(getEventCoordinate(canvasRef.current, event))
      }
    })
  }

  const handleClick = event => {
    balls.forEach(ball => {
      const position = getEventCoordinate(canvasRef.current, event)
      if (ball.accept({ position, radius: 1 })) {
        setMenuBall(ball)
        setIsMenuOpen(true)
      }
    })
  }


  return (
    <>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        {...restProps}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      <Menu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        ball={menuBall}
      />
    </>
  )
}

export default Canvas
