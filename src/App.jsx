import './App.css'
import PoolTable from './components/PoolTable/PoolTable'
import { useBalls } from './hooks'
import { tableWidth, tableHeight, sets, colors } from './constants'

function App() {
  /** ballsCount,  */

  let balls = useBalls({ count: 10, size: [10, 50], color: colors })

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <>
      <div className="panel" style={{ paddingBottom: 20 }}>
        <h2>Для удара по шару, зажмите Ctrl</h2>
        <button onClick={handleRefresh}>Обновить</button>
      </div>
      <PoolTable
        balls={balls}
        set={sets.random}
        width={tableWidth}
        height={tableHeight}
      />
    </>
  )
}

export default App
