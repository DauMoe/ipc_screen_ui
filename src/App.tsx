import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.scss'
import IPCScreen from './components/IPCScreen'
import ControlPanel from './components/ControlPanel'
import { initialIPCState, type IPCState } from './ipcState'

const IPC_WIDTH = 1600
const IPC_HEIGHT = 600

function App() {
  const [state, setState] = useState<IPCState>(initialIPCState)
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const onChange = <K extends keyof IPCState>(key: K, value: IPCState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }))

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const update = () => setScale(stage.clientWidth / IPC_WIDTH)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () =>
      stageRef.current && setScale(stageRef.current.clientWidth / IPC_WIDTH)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="app">
      <div
        className="ipc_stage"
        ref={stageRef}
        style={{ height: IPC_HEIGHT * scale }}
      >
        <div className="ipc_scaler" style={{ transform: `scale(${scale})` }}>
          <IPCScreen state={state} />
        </div>
      </div>
      <ControlPanel state={state} onChange={onChange} />
    </div>
  )
}

export default App
