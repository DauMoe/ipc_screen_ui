import '../styles/ipc.scss'
import CurrentTrip from "./CurrentTrip";
import TopBar from "./TopBar";
import SpeedAndGear from "./SpeedAndGear";
import Car from "./Car";
import BatteryGauge from "./BatteryGauge";
import StatusOverlay from "./StatusOverlay";
import { FULL_RANGE_KM, type IPCState } from "../ipcState";

const IPCScreen = ({ state }: { state: IPCState }) => {
  const rangeKm = Math.round((state.batteryPercent / 100) * FULL_RANGE_KM);
  return(
    <div className="ipc_container">
      <StatusOverlay time={state.time} date={state.date} outsideTemp={state.outsideTemp} />
      <TopBar mode={state.turnSignal} beam={state.beam} />
      <CurrentTrip tripRange={state.tripRange} tripDuration={state.tripDuration} />
      <div className="gauge_area">
        <BatteryGauge
          rangeKm={rangeKm}
          batteryPercent={state.batteryPercent}
          odoKm={state.odoKm}
          isCharging={state.isCharging}
        />
      </div>
      <div className="speed_gear">
        <SpeedAndGear
          speed={state.speed}
          gear={state.gear}
          isSeatbeltOpen={state.isSeatbeltOpen}
          isParking={state.isParking}
        />
      </div>
      <div className="car_area">
        <Car doors={state.doors} tires={state.tires} />
      </div>
    </div>
  )
}

export default IPCScreen;
