import React from "react";
import "../styles/ipc.scss";
import Text from "./Text";

export type DoorState = {
  fl?: boolean;
  fr?: boolean;
  rl?: boolean;
  rr?: boolean;
};

export type TirePressure = {
  fl?: number;
  fr?: number;
  rl?: number;
  rr?: number;
};

type CarPropsType = {
  doors?: DoorState;
  tires?: TirePressure;
};

const CAR_WIDTH = 320;
const CAR_HEIGHT = 321;

const ACTIVE = "var(--car-door-active)";
const INACTIVE = "var(--car-door-inactive)";

const DOOR_OPEN_ANGLE = 40;

type DoorGeom = {
  x1: number; y1: number;
  x2: number; y2: number;
  width: number;
  openAngle: number;
};

const DOORS: Record<keyof DoorState, DoorGeom> = {
  fl: { x1: 109.63, y1: 132.374, x2: 109.63, y2: 174.97, width: 8, openAngle: DOOR_OPEN_ANGLE },
  rl: { x1: 106, y1: 198, x2: 106, y2: 240, width: 7, openAngle: DOOR_OPEN_ANGLE },
  fr: { x1: 215.36, y1: 132, x2: 215.36, y2: 174, width: 7, openAngle: -DOOR_OPEN_ANGLE },
  rr: { x1: 215.36, y1: 198, x2: 215.36, y2: 240, width: 7, openAngle: -DOOR_OPEN_ANGLE },
};

const Car: React.FC<CarPropsType> = ({ doors = {}, tires = {} }) => {
  const renderDoor = (key: keyof DoorState) => {
    const open = !!doors[key];
    const g = DOORS[key];
    return (
      <line
        id={`door-${key}`}
        key={key}
        className={open ? "door-blink" : undefined}
        x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}
        stroke={open ? ACTIVE : INACTIVE}
        strokeWidth={g.width}
        strokeLinecap="round"
        transform={open ? `rotate(${g.openAngle} ${g.x1} ${g.y1})` : undefined}
      />
    );
  };

  return (
    <div
      className="car"
      style={{ width: CAR_WIDTH, height: CAR_HEIGHT }}
    >
      <svg
        className="car_icon"
        width={CAR_WIDTH}
        height={CAR_HEIGHT}
        viewBox="0 0 320 321"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {(["fl", "rl", "fr", "rr"] as (keyof DoorState)[]).map(renderDoor)}

        <g id="body">
          <line x1="7.5" y1="-7.5" x2="28.0882" y2="-7.5" transform="matrix(0 -1 0.997154 -0.0753836 234 117.588)" stroke="white" strokeWidth="15" strokeLinecap="round" />
          <line x1="7.5" y1="-7.5" x2="28.0882" y2="-7.5" transform="matrix(0 -1 0.997154 -0.0753836 102.302 118.177)" stroke="white" strokeWidth="15" strokeLinecap="round" />
          <line x1="7.5" y1="-7.5" x2="28.0882" y2="-7.5" transform="matrix(0 -1 0.997154 -0.0753836 102.302 269.782)" stroke="white" strokeWidth="15" strokeLinecap="round" />
          <line x1="7.5" y1="-7.5" x2="28.0882" y2="-7.5" transform="matrix(0 -1 0.997154 -0.0753836 234 269.588)" stroke="white" strokeWidth="15" strokeLinecap="round" />
          <path d="M106.172 77C106.172 60.4315 119.604 47 136.172 47H185.363C201.932 47 215.363 60.4315 215.363 77V271C215.363 280.941 207.304 289 197.363 289H124.172C114.231 289 106.172 280.941 106.172 271V77Z" fill="white" />
          <path d="M116.918 113.265C116.918 102.219 125.872 93.2646 136.918 93.2646H184.311C195.356 93.2646 204.311 102.219 204.311 113.265V135.814H116.918V113.265Z" fill="#A1E1FF" />
          <path d="M116.571 249.64C116.571 260.685 125.526 269.64 136.571 269.64H184.964C196.01 269.64 204.964 260.685 204.964 249.64V235.76H116.571V249.64Z" fill="#A1E1FF" />
          <line x1="135.67" y1="58.876" x2="185.865" y2="58.876" stroke="#91CFFF" strokeWidth="5" strokeLinecap="round" />
          <rect x="124.226" y="145.936" width="73.0827" height="76.8706" rx="2" fill="#B9F4FF" />
        </g>
      </svg>

      {(["fl", "fr", "rl", "rr"] as (keyof TirePressure)[]).map((key) =>
        tires[key] !== undefined ? (
          <span key={key} className={`tire tire--${key}`}>
            <Text content={tires[key]!.toFixed(1)} fontSize={30} fontWeight="bold" />
            <Text className="tire_unit" content="bar" fontSize={16} fontWeight="bold" />
          </span>
        ) : null
      )}
    </div>
  );
};

export default Car;
