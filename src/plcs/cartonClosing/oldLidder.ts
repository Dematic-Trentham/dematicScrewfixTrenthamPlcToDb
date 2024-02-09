//Carton Erectors New - Erector 5
//Created by: JWL
//Date: 2023/09/02 12:51:41
//Last modified: 2023/12/28 07:41:18
//Version: 1.0.0

//import plc
import plc from "../../misc/plc/plc.js";
import snap7Types from "../../misc/plc/types.js";

//import db
import mysql from "../../db/mysqlConnection.js";

//list of faults and there locations
let faults = [{ fault: "D10 Empty Pallet Defect", location: "84.1", current: false }];

//import newb+
import newBPlus from "../newB+.js";

async function getAndInsertFaults(ip: string, machineType: string, line: number) {
  await newBPlus.getAndInsertFaults(ip, machineType, line, faults, 11, 6);
}

export default { getAndInsertFaults };
