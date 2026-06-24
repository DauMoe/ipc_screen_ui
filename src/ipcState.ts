export type GearType = "N" | "R" | "P" | "D";
export type TurnSignalMode = "turn_left" | "turn_right" | "hazard" | null;
export type BeamMode = "low" | "high" | null;

export type IPCState = {
  speed: number;
  gear: GearType;

  batteryPercent: number;
  odoKm: number;
  isCharging: boolean;

  doors: { fl: boolean; fr: boolean; rl: boolean; rr: boolean };
  tires: { fl: number; fr: number; rl: number; rr: number };

  turnSignal: TurnSignalMode;
  beam: BeamMode;
  isSeatbeltOpen: boolean;
  isParking: boolean;

  time: string;
  date: string;
  outsideTemp: number;
  tripRange: number;
  tripDuration: number;
};

export const FULL_RANGE_KM = 500;

export const initialIPCState: IPCState = {
  speed: 60,
  gear: "N",

  batteryPercent: 80,
  odoKm: 12345,
  isCharging: true,

  doors: { fl: true, fr: true, rl: false, rr: false },
  tires: { fl: 2.4, fr: 2.5, rl: 2.3, rr: 2.4 },

  turnSignal: "turn_right",
  beam: "high",
  isSeatbeltOpen: true,
  isParking: false,

  time: "08:30",
  date: "T2, 24/06",
  outsideTemp: 25,
  tripRange: 20.3,
  tripDuration: 1.23,
};
