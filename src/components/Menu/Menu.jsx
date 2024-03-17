import { colors } from '../../constants'

const Menu = ({ isMenuOpen, setIsMenuOpen, ball }) => {
  const [left, top] = ball?.position || [0, 0]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClickMenuItem = color => {
    ball.changeColor(color)
    toggleMenu()
  }

  return (
    <>
      {isMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: top,
            left: left,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '10px',
          }}>
          <ul style={{ padding: 0 }}>
            {colors.map(color => (
              <li
                onClick={() => handleClickMenuItem(color)}
                key={color}
                style={{ listStyle: 'none', color, cursor: 'pointer' }}>
                {color}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Menu
