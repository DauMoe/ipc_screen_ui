import React from "react";
import "../styles/ipc.scss";
import Text from "./Text";
import logo from "../assets/logo.png";

type StatusOverlayPropsType = {
  time: string;
  date: string;
  outsideTemp: number;
};

const StatusOverlay: React.FC<StatusOverlayPropsType> = ({
  time,
  date,
  outsideTemp,
}) => {
  return (
    <>
      <img src={logo} className="brand_logo" alt="Setcar" />

      <div className="datetime">
        <Text content={time} fontSize={26} fontWeight="bold" textColor="var(--status-fg)" />
        <Text content={date} fontSize={20} fontWeight="normal" textColor="var(--status-fg-muted)" />
      </div>

      <div className="outside_temp">
        <Text content={`${outsideTemp}°C`} fontSize={26} fontWeight="bold" textColor="var(--status-fg)" />
      </div>
    </>
  );
};

export default StatusOverlay;
