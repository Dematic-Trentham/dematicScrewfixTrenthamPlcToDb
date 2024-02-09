//Service for Dematic Dashboard Screwfix trentham to read date from PLC 31 - Order Start
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2023/10/16 01:48:28
//Version: 0.0.1
import plc from "../../misc/plc/plc.js";
import plcToDB from "../../misc/plcToDB.js";

import snap7 from "node-snap7";

//import types
import snap7Types from "../../misc/plc/types.js";

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function read35EMSToDB() {
  let ip = "10.4.2.35"; //IP address of the PLC
  let rack = 0; //Rack number of the PLC
  let slot = 2; //Slot number of the PLC.

  console.log("reading 35 EMS");

  await plcToDB.plcToDB(ip, rack, slot, snap7Types.Area.S7AreaMK, 1, 0, plcToDB.DataType.Bit, "dematic_dashboard_EMS_PLC35-Zone-1");

  await plcToDB.plcToDB(
    ip,
    rack,
    slot,
    snap7Types.Area.S7AreaDB,
    1765,
    16.1,
    plcToDB.DataType.Bit,
    "dematic_dashboard_EMS_PLC33-Safety-Link-To-PLC-36"
  );

  console.log("read 35 EMS");
}

//export the function
export default { read35EMSToDB };
