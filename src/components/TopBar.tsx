import React from "react";
import "../styles/ipc.scss"
import Icon from "./Icon";



type TurnSignalMode = "turn_left" | "turn_right" | "hazard" | null;
type BeamMode = "low" | "high" | null;

const blinkVars = (active: string, inactive: string): React.CSSProperties =>
  ({
    "--blink-active": active,
    "--blink-inactive": inactive,
  } as React.CSSProperties);

const TurnSignal = ({
  mode = null,
  beam = null,
}: {
  mode?: TurnSignalMode;
  beam?: BeamMode;
}) => {
  const isTurnLeftActive = mode === "turn_left" || mode === "hazard";
  const isTurnRightActive = mode === "turn_right" || mode === "hazard";
  const isHazardActive = mode === "hazard";

  const isLowBeamActive = beam === "low";
  const isHighBeamActive = beam === "high";

  return (
    <div className="turn_signal_container">
      <Icon
        name="arrow_left"
        size={50}
        className={isTurnLeftActive ? "blink" : undefined}
        color={isTurnLeftActive ? undefined : "var(--turn-signal-inactive)"}
        style={
          isTurnLeftActive
            ? blinkVars("var(--turn-signal-active)", "var(--turn-signal-inactive)")
            : undefined
        }
      />

      <div className="lights_status">
        <Icon
          name="high_beam"
          size={30}
          color={
            isHighBeamActive ? "var(--high-beam-active)" : "var(--high-beam-inactive)"
          }
        />

        <Icon
          name="hazard"
          size={30}
          className={isHazardActive ? "blink" : undefined}
          color={isHazardActive ? undefined : "var(--hazard-inactive)"}
          style={
            isHazardActive
              ? blinkVars("var(--hazard-active)", "var(--hazard-inactive)")
              : undefined
          }
        />

        <Icon
          name="low_beam"
          size={30}
          color={
            isLowBeamActive ? "var(--low-beam-active)" : "var(--low-beam-inactive)"
          }
        />
      </div>

      <Icon
        name="arrow_right"
        size={50}
        className={isTurnRightActive ? "blink" : undefined}
        color={isTurnRightActive ? undefined : "var(--turn-signal-inactive)"}
        style={
          isTurnRightActive
            ? blinkVars("var(--turn-signal-active)", "var(--turn-signal-inactive)")
            : undefined
        }
      />
    </div>
  );
};

const TopBar = ({
  mode = null,
  beam = null,
}: {
  mode?: TurnSignalMode;
  beam?: BeamMode;
}) => {
  return(
    <>
      <TurnSignal mode={mode} beam={beam} />
    </>
  )
}

export default TopBar;