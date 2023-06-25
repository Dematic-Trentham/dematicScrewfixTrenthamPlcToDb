interface plcType {
  ip: string;
  rack: number;
  slot: number;
  name: string;
}

//make plc object
let plc33: plcType = {
  ip: "10.4.2.32",
  rack: 0,
  slot: 2,
  name: "PLC33",
};

//export plc object
export type { plcType };

export { plc33 };
