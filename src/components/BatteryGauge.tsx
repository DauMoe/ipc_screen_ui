import React from "react";
import "../styles/ipc.scss";
import Text from "./Text";
import Icon from "./Icon";

type BatteryGaugePropsType = {
  rangeKm: number;
  batteryPercent: number;
  odoKm: number;
  isCharging?: boolean;
};

const GAUGE_SIZE = 400;
const CENTER = GAUGE_SIZE / 2;
const RADIUS_OUTER = 190;
const RADIUS_MINOR = 176;
const RADIUS_MAJOR = 166;
const SWEEP_DEG = 270;
const START_DEG = 135;
const TICK_COUNT = 41;
const MAJOR_EVERY = 5;
const TICK_WIDTH = 4;
const MAJOR_WIDTH = 6;

const NEEDLE_TIP = 162;
const NEEDLE_BASE = 138;
const NEEDLE_WIDTH = 5;

const polar = (radius: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
};

const BatteryGauge: React.FC<BatteryGaugePropsType> = ({
  rangeKm,
  batteryPercent,
  odoKm,
  isCharging = false,
}) => {
  const pct = Math.max(0, Math.min(100, batteryPercent)) / 100;
  const passedCount = Math.round(pct * (TICK_COUNT - 1));
  const needleColor = isCharging ? "var(--gauge-charging)" : "var(--gauge-needle)";

  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
    const deg = START_DEG + (i / (TICK_COUNT - 1)) * SWEEP_DEG;
    const major = i % MAJOR_EVERY === 0;
    const passed = i <= passedCount;
    const outer = polar(RADIUS_OUTER, deg);
    const inner = polar(major ? RADIUS_MAJOR : RADIUS_MINOR, deg);
    return (
      <line
        key={i}
        className="gauge_tick"
        x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
        stroke={passed ? "var(--gauge-tick-passed)" : "var(--gauge-tick-remain)"}
        strokeWidth={major ? MAJOR_WIDTH : TICK_WIDTH}
        strokeLinecap="butt"
      />
    );
  });

  const needleDeg = START_DEG + pct * SWEEP_DEG;
  const tip = polar(NEEDLE_TIP, 0);
  const base = polar(NEEDLE_BASE, 0);

  return (
    <div className="gauge" style={{ width: GAUGE_SIZE, height: GAUGE_SIZE }}>
      <svg
        className="gauge_arc"
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {ticks}
        <line
          className="gauge_needle"
          x1={base.x} y1={base.y} x2={tip.x} y2={tip.y}
          stroke={needleColor}
          strokeWidth={NEEDLE_WIDTH}
          strokeLinecap="round"
          transform={`rotate(${needleDeg} ${CENTER} ${CENTER})`}
        />
      </svg>

      <div className="gauge_center">
        <span className="gauge_range">
          <Text content={rangeKm} fontSize={72} fontWeight="bold" />
          <Text className="gauge_range_unit" content="km" fontSize={26} fontWeight="normal" />
        </span>
        <span className="gauge_battery">
          <Icon
            name={isCharging ? "battery_charging" : "battery"}
            size={32}
            color={isCharging ? "var(--gauge-charging)" : "var(--gauge-fill)"}
          />
          <Text content={batteryPercent} fontSize={28} fontWeight="bold" />
          <Text className="gauge_battery_unit" content="%" fontSize={18} fontWeight="normal" />
        </span>
      </div>

      <span className="gauge_odo">
        <Text content="ODO" fontSize={15} fontWeight="normal" textColor="var(--gauge-muted)" />
        <Text content={odoKm} fontSize={18} fontWeight="bold" />
        <Text content="km" fontSize={15} fontWeight="normal" textColor="var(--gauge-muted)" />
      </span>
    </div>
  );
};

export default BatteryGauge;
