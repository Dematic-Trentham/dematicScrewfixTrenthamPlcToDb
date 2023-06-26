//Service for Dematic Dashboard Screwfix trentham to collect data from plc's and push to DB
//Created by: JWL
//Date: 2023/02/02 02:51:41
//Last modified: 2023/06/26 22:00:33
//Version: 1.0.8

//import process tracker and start the process
import ProcessTracker from "./processTracker.js";
ProcessTracker.startProcess("plcToDb");

//import dematic master library
//@ts-ignore
import dematic from "dematic-master-lib";

//imports
import cron from "node-cron";

//import plc service
import plc31 from "./plcs/plc31.js";
import plcShuttles from "./plcs/plcShuttles.js";
import plcScanners from "./plcs/plcScanners.js";

//startup text
dematic.log("Dematic Dashboard Micro Service - PLC To DB");
dematic.log("Using Dematic Master Library Version: " + dematic.version);
dematic.log("Starting PLC To DB Service ....");

dematic.log("Starting PLC To DB Service v0.0.11 ....");

//run every 10 seconds
cron.schedule("*/10 * * * * *", async () => {
  // console.log("Running 10s cron job");
  plc31.readDataFromPLC31TenSeconds();
});
//plcShuttles.readShuttlesToDB();
//run every 1minute
cron.schedule("* * * * *", async () => {
  console.log("Running 1m cron job");
  //plcShuttles.readShuttlesToDB();
});

//run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running 5m cron job");
  plcShuttles.readShuttlesToDB();
});

setInterval(() => {
  //plcShuttles.readShuttlesToDB();
  // plcScanners.readScannerStatsToDB();
}, 1000);
