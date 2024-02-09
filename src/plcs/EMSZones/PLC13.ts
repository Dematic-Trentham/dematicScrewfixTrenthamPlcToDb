//Service for Dematic Dashboard Screwfix trentham to read date from PLC 31 - Order Start
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2023/10/16 02:10:27
//Version: 0.0.1
import plc from "./../../misc/plc/plc.js";
import plcToDB from "./../../misc/plcToDB.js";

import snap7 from "node-snap7";

//import types
import snap7Types from "./../../misc/plc/types.js";

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function read13EMSToDB() {
  let ip = "10.4.2.31"; //IP address of the PLC
  let rack = 0; //Rack number of the PLC
  let slot = 2; //Slot number of the PLC.

  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 0, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-13.1");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 1, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-13.2");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 2, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-13.3");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 3, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-13.4");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 4, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-4");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 5, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC13-Zone-5");

  //get coms between 33 and 13
  await plcToDB.plcToDB(
    ip,
    rack,
    slot,
    snap7Types.Area.S7AreaDB,
    388,
    16.1,
    plcToDB.DataType.Bit,
    "dematic_dashboard_EMS_PLC13-Safety-Link-From-PLC-33"
  );
}

//export the function
export default { read13EMSToDB };
