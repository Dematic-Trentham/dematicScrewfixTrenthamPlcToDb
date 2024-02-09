//Service for Dematic Dashboard Screwfix trentham to read date from PLC 31 - Order Start
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2023/10/01 05:34:16
//Version: 0.0.1
import plc from "../../misc/plc/plc.js";
import plcToDB from "../../misc/plcToDB.js";

import snap7 from "node-snap7";

//import types
import snap7Types from "../../misc/plc/types.js";

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function read1EMSToDB() {
  let ip = "10.4.2.20"; //IP address of the PLC
  let rack = 0; //Rack number of the PLC
  let slot = 3; //Slot number of the PLC.

  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 5, 0, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC1-Zone-2");
}

//export the function
export default { read1EMSToDB };
