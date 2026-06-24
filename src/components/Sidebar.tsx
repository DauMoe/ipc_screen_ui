import React from "react";
import "../styles/ipc.scss";
import Icon from "./Icon";

type SidebarPropsType = {
  isSeatbeltOpen?: boolean;
  isParking?: boolean;
};

const blinkVars = (active: string, inactive: string): React.CSSProperties =>
  ({
    "--blink-active": active,
    "--blink-inactive": inactive,
  } as React.CSSProperties);

const Sidebar: React.FC<SidebarPropsType> = ({
  isSeatbeltOpen = false,
  isParking = false,
}) => {
  return (
    <div className="sidebar">
      <Icon
        name="seatbelt"
        size={40}
        className={isSeatbeltOpen ? "blink" : undefined}
        color={isSeatbeltOpen ? undefined : "var(--sidebar-inactive)"}
        style={
          isSeatbeltOpen
            ? blinkVars("var(--sidebar-active)", "var(--sidebar-inactive)")
            : undefined
        }
      />

      <Icon
        name="parking"
        size={40}
        color={isParking ? "var(--parking-active)" : "var(--parking-inactive)"}
      />
    </div>
  );
};

export default Sidebar;
