import React from "react";
import '../styles/ipc.scss'
import CurrentTrip from "./CurrentTrip";
import TopBar from "./TopBar";
import SpeedAndGear from "./SpeedAndGear";

const IPCScreen = () => {
  return(
    <div className="ipc_container">
      <TopBar mode={"turn_right"} beam={'high'} />
      <CurrentTrip/>
      <SpeedAndGear speed={60} gear={"N"}/>
    </div>
  )
}

export default IPCScreen;