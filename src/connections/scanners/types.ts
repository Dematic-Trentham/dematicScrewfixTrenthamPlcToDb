import { plcType } from "../plcConnections.js";

type scannerObjType = {
  scannerName: string;
  plc: plcType;
  db: number;
};

type scannerReturnDataType = {
  scannerName: string;
  totalScans: number;
  noReads: number;
  noData: number;
};

export type { scannerObjType, scannerReturnDataType };
