//Carton Erectors OLD
//Created by: JWL
//Date: 2023/09/02 12:51:41
//Last modified: 2024/02/09 07:29:08
//Version: 1.0.0
//todo remove when checked
//import plc
//import plc from "../../misc/plc/plc.js";

//import snap7Types from "../../misc/plc/types.js";

//import db
//import mysql from "../../db/mysqlConnection.js";

//list of faults and there locations
let faults = [
  { fault: "[064] - Emergency Stop", location: "41.0", current: false },
  { fault: "[065] - Circuit-Breaker - Motors Default", location: "41.1", current: false },
  { fault: "[066] - Default - Limiter Transfer", location: "41.2", current: false },
  { fault: "[067] - Door Opened", location: "41.3", current: false },
  { fault: "[068] - Nordson Default", location: "41.4", current: false },
  { fault: "[069] - Nordson Default - Low Glue Level", location: "41.5", current: false },
  { fault: "[070] - Nordson Not Ready", location: "41.6", current: false },
  { fault: "[071] - Default - Jam Under Cavity", location: "41.7", current: false },
  { fault: "[072] - Default - Jam In Cavity", location: "41.8", current: false },
  { fault: "[073] - Default - Store Empty", location: "41.9", current: false },
  { fault: "[074] - Impossible Cycle - Test Mode In Progress", location: "41.10", current: false },
  { fault: "[075] - Default Movimot - Carton Conveyor", location: "41.11", current: false },
  { fault: "[076]", location: "41.12", current: false }, // Empty line
  { fault: "[077] - Default Transfer - Excessive Thickness", location: "41.13", current: false },
  { fault: "[078] - Default - Air Pressure", location: "41.14", current: false },
  { fault: "[079] - Default  - Transfer Variator", location: "41.15", current: false },
];

//import old B plus
import oldBPlusDB from "./../oldB+DB.js";

async function getAndInsertFaultsForOldErector(ip: string, machineType: string, line: number) {
  await oldBPlusDB.getAndInsertFaultsDB(ip, machineType, line, faults, 9, 6, 2);
}

//export the function
export default { getAndInsertFaultsForOldErector };
