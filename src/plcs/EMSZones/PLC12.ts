//Service for Dematic Dashboard Screwfix trentham to read date from PLC 31 - Order Start
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2023/10/01 05:14:42
//Version: 0.0.1
import plc from "../../misc/plc/plc.js";
import plcToDB from "../../misc/plcToDB.js";

import snap7 from "node-snap7";

//import types
import snap7Types from "../../misc/plc/types.js";

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function read12EMSToDB() {
  let ip = "10.4.2.30"; //IP address of the PLC
  let rack = 0; //Rack number of the PLC
  let slot = 3; //Slot number of the PLC.

  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 1, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC12-Zone-12.1");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 2, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC12-Zone-12.2");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 3, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC12-Zone-12.3");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 4, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC12-Zone-12.4");
  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 70, 0, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC12-Zone-4");
}

//export the function
export default { read12EMSToDB };
