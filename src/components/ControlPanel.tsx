import React from "react";
import "../styles/control-panel.scss";
import type { IPCState, GearType, TurnSignalMode, BeamMode } from "../ipcState";

type ControlPanelProps = {
  state: IPCState;
  onChange: <K extends keyof IPCState>(key: K, value: IPCState[K]) => void;
};

const GEARS: GearType[] = ["N", "R", "P", "D"];
const TURN_MODES: { label: string; value: TurnSignalMode }[] = [
  { label: "Off", value: null },
  { label: "Left", value: "turn_left" },
  { label: "Right", value: "turn_right" },
  { label: "Hazard", value: "hazard" },
];
const BEAMS: { label: string; value: BeamMode }[] = [
  { label: "Off", value: null },
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
];

const ControlPanel: React.FC<ControlPanelProps> = ({ state, onChange }) => {
  const setDoor = (k: keyof IPCState["doors"], v: boolean) =>
    onChange("doors", { ...state.doors, [k]: v });
  const setTire = (k: keyof IPCState["tires"], v: number) =>
    onChange("tires", { ...state.tires, [k]: v });

  return (
    <div className="control_panel">
      <div className="cp_cell">
        <span className="cp_title">Tốc độ</span>
        <div className="cp_row">
          <input
            type="range" min={0} max={200} value={state.speed}
            onChange={(e) => onChange("speed", Number(e.target.value))}
          />
          <span className="cp_value">{state.speed}</span>
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Cần số</span>
        <div className="cp_grid">
          {GEARS.map((g) => (
            <button
              key={g}
              className={state.gear === g ? "active" : ""}
              onClick={() => onChange("gear", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Pin %</span>
        <div className="cp_row">
          <input
            type="range" min={0} max={100} value={state.batteryPercent}
            onChange={(e) => onChange("batteryPercent", Number(e.target.value))}
          />
          <span className="cp_value">{state.batteryPercent}</span>
        </div>
        <label className="cp_check">
          <input
            type="checkbox" checked={state.isCharging}
            onChange={(e) => onChange("isCharging", e.target.checked)}
          />
          Charging
        </label>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Cửa</span>
        <div className="cp_toggles">
          {(["fl", "fr", "rl", "rr"] as const).map((d) => (
            <button
              key={d}
              className={state.doors[d] ? "active" : ""}
              onClick={() => setDoor(d, !state.doors[d])}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Áp suất lốp (bar)</span>
        <div className="cp_tires">
          {(["fl", "fr", "rl", "rr"] as const).map((t) => (
            <label key={t}>
              {t.toUpperCase()}
              <input
                type="number" step={0.1} value={state.tires[t]}
                onChange={(e) => setTire(t, Number(e.target.value))}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Xi nhan</span>
        <div className="cp_grid">
          {TURN_MODES.map((m) => (
            <button
              key={m.label}
              className={state.turnSignal === m.value ? "active" : ""}
              onClick={() => onChange("turnSignal", m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Đèn pha</span>
        <div className="cp_grid">
          {BEAMS.map((b) => (
            <button
              key={b.label}
              className={state.beam === b.value ? "active" : ""}
              onClick={() => onChange("beam", b.value)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Cảnh báo</span>
        <label className="cp_check">
          <input
            type="checkbox" checked={state.isSeatbeltOpen}
            onChange={(e) => onChange("isSeatbeltOpen", e.target.checked)}
          />
          Seatbelt
        </label>
        <label className="cp_check">
          <input
            type="checkbox" checked={state.isParking}
            onChange={(e) => onChange("isParking", e.target.checked)}
          />
          Parking
        </label>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Ngày / Giờ / Nhiệt độ</span>
        <div className="cp_row">
          <input
            type="text" value={state.time}
            onChange={(e) => onChange("time", e.target.value)}
          />
          <input
            type="text" value={state.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </div>
        <div className="cp_row">
          <input
            type="number" value={state.outsideTemp}
            onChange={(e) => onChange("outsideTemp", Number(e.target.value))}
          />
          <span className="cp_value">°C</span>
        </div>
      </div>

      <div className="cp_cell">
        <span className="cp_title">Hành trình</span>
        <div className="cp_row">
          <input
            type="number" step={0.1} value={state.tripRange}
            onChange={(e) => onChange("tripRange", Number(e.target.value))}
          />
          <input
            type="number" step={0.01} value={state.tripDuration}
            onChange={(e) => onChange("tripDuration", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
