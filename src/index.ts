//Service for Dematic Dashboard Screwfix trentham to collect data from WMS and push to DB
//Created by: JWL
//Date: 2023/02/02 02:51:41
//Last modified: 2023/03/22 06:09:14
//Version: 0.0.1

//import dematic master library
//@ts-ignore
import dematic from "dematic-master-lib";

//imports
import cron from "node-cron";

//import plc service
import plc31 from "./plcs/plc31.js";
import plcShuttles from "./plcs/plcShuttles.js";

//startup text
dematic.log("Dematic Dashboard Micro Service - PLC To DB");
dematic.log("Using Dematic Master Library Version: " + dematic.version);
dematic.log("Starting PLC To DB Service ....");

dematic.log("Starting PLC To DB Service v0.0.1 ....");

//run every 10 seconds
cron.schedule("*/10 * * * * *", async () => {
  console.log("Running 10s cron job");

  plc31.readDataFromPLC31TenSeconds();
});
plcShuttles.readShuttlesToDB();
//run every 1minute
cron.schedule("* * * * *", async () => {
  console.log("Running 10m cron job");
  plcShuttles.readShuttlesToDB();
});
