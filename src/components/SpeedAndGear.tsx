import React from "react";
import "../styles/ipc.scss";
import Text from "./Text";
import GearCarousel from "./GearCarousel";
import Sidebar from "./Sidebar";

type SpeedAndGearPropsType = {
  speed?: number;
  gear: "N" | "R" | "D" | "P";
  isSeatbeltOpen?: boolean;
  isParking?: boolean;
};

const SpeedAndGear: React.FC<SpeedAndGearPropsType> = ({
  speed,
  gear = "N",
  isSeatbeltOpen = false,
  isParking = false,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="speed_anchor">
        <Text
          className="speed"
          content={speed}
          fontWeight={"bold"}
          fontSize={250}
        />
        <Sidebar isSeatbeltOpen={isSeatbeltOpen} isParking={isParking} />
      </div>
      <GearCarousel gear={gear} style={{ marginTop: "-60px" }} />
    </div>
  );
};

export default SpeedAndGear;
