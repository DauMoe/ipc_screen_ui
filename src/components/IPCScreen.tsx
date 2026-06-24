import React from "react";
import '../styles/ipc.scss'
import CurrentTrip from "./CurrentTrip";
import TopBar from "./TopBar";
import SpeedAndGear from "./SpeedAndGear";
import Car from "./Car";
import BatteryGauge from "./BatteryGauge";
import StatusOverlay from "./StatusOverlay";

const IPCScreen = () => {
  return(
    <div className="ipc_container">
      <StatusOverlay time="08:30" date="T2, 24/06" outsideTemp={25} />
      <TopBar mode={"turn_right"} beam={'high'} />
      <CurrentTrip/>
      <div className="gauge_area">
        <BatteryGauge rangeKm={301} batteryPercent={80} odoKm={12345} isCharging={true} />
      </div>
      <div className="speed_gear">
        <SpeedAndGear
          speed={60}
          gear={"N"}
          isSeatbeltOpen={true}
          isParking={false}
        />
      </div>
      <div className="car_area">
        <Car
          doors={{ fl: true, fr: true, rl: false, rr: false }}
          tires={{ fl: 2.4, fr: 2.5, rl: 2.3, rr: 2.4 }}
        />
      </div>
    </div>
  )
}

export default IPCScreen;