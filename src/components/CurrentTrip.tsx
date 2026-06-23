import React from "react";
import "../styles/ipc.scss";
import divImg from "../assets/top_left_div.png"
import bottomDivImg from "../assets/bottom_div.png"
import Icon from "./Icon";
import Text from "./Text";

const CurrentTrip = ({
  tripRange = 20.3,
  tripDuration = 1.23
}) => {
  return (
    <div className="trip_container">
      <div className="top_div">
        <img src={divImg} className="left" />
        <img src={divImg} className="right" />
      </div>
      <div className="top_under_div">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="trip_info">
            <div className="info_container">
              <Icon name="road" color="#D80B0B" size={30} />
              <Text content={tripRange + " km"} fontWeight={"bold"} />
            </div>
            <div className="info_container">
              <Icon name="clock_outline" color="#D80B0B" size={30} />
              <Text content={tripDuration + " h"} fontWeight={"bold"} />
            </div>
          </div>
          <img src={bottomDivImg} className="bottom" />
        </div>
      </div>
    </div>
  )
}

export default CurrentTrip;