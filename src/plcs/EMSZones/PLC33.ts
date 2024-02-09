//Service for Dematic Dashboard Screwfix trentham to read date from PLC 31 - Order Start
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2023/10/16 02:10:36
//Version: 0.0.1
import plc from "./../../misc/plc/plc.js";
import plcToDB from "./../../misc/plcToDB.js";

import snap7 from "node-snap7";

//import types
import snap7Types from "./../../misc/plc/types.js";

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function read33EMSToDB() {
  let ip = "10.4.2.32"; //IP address of the PLC
  let rack = 0; //Rack number of the PLC
  let slot = 2; //Slot number of the PLC.

  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 3, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC33-Zone-4-Floor-1");
  await plcToDB.plcToDB(
    ip,
    rack,
    slot,
    snap7Types.Area.S7AreaMK,
    70,
    7,
    plcToDB.DataType.Bit,
    "dematic_dashboard_EMS_PLC33-Zone-4.1-Mezzanine-Above-33"
  );
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 4, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC33-Zone-5");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 5, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC33-Zone-6-Ground-Floor");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 6, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC33-Zone-7-Mezzanine");

  //get coms between 13 and 33
  await plcToDB.plcToDB(
    ip,
    rack,
    slot,
    snap7Types.Area.S7AreaDB,
    383,
    16.1,
    plcToDB.DataType.Bit,
    "dematic_dashboard_EMS_PLC33-Safety-Link-From-PLC-13"
  );
  //get coms between 36 and 33
  await plcToDB.plcToDB(
    ip,
    rack,
    slot,
    snap7Types.Area.S7AreaDB,
    385,
    16.1,
    plcToDB.DataType.Bit,
    "dematic_dashboard_EMS_PLC33-Safety-Link-From-PLC-36"
  );
}

//export the function
export default { read33EMSToDB };
