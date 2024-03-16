//Carton Erectors OLD
//Created by: JWL
//Date: 2023/09/02 12:51:41
//Last modified: 2024/03/16 07:46:59
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
  { fault: "[072] - Default - Jam In Cavity", location: "40.0", current: false },
  { fault: "[073] - Default - Store Empty", location: "40.1", current: false },
  { fault: "[074] - Impossible Cycle - Test Mode In Progress", location: "40.2", current: false },
  { fault: "[075] - Default Movimot - Carton Conveyor", location: "40.3", current: false },
  { fault: "[076] - ", location: "40.5", current: false }, // Empty line
  { fault: "[077] - Default Transfer - Excessive Thickness", location: "40.5", current: false },
  { fault: "[078] - Default - Air Pressure", location: "40.6", current: false },
  { fault: "[079] - Default  - Transfer Variator", location: "40.7", current: false },
];

//import old B plus
import oldBPlusDB from "./../oldB+DB.js";

async function getAndInsertFaultsForOldErector(ip: string, machineType: string, line: number) {
  await oldBPlusDB.getAndInsertFaultsDB(ip, machineType, line, faults, 9, 6, 2);
}

//export the function
export default { getAndInsertFaultsForOldErector };
