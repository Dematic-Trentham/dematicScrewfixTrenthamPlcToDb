//import plc type
import { plcType } from "../plcConnections.js";
import * as plcConnections from "../plcConnections.js";

import { scannerObjType } from "./types.js";

//make array of scanners with the key being the scanner name
let plc33Scanners: { [key: string]: scannerObjType } = {
  scanner33EA2_1: {
    scannerName: "33EA2_1",
    plc: plcConnections.plc33,
    db: 1005,
  },
  scanner33EA2_2: {
    scannerName: "33EA2_2",
    plc: plcConnections.plc33,
    db: 1006,
  },
};

//export scanner object
export { plc33Scanners };
