//Service for Dematic Dashboard Screwfix trentham to collect data from plc's and push to DB
//Created by: JWL
//Date: 2023/02/02 02:51:41
//Last modified: 2024/09/05 18:12:03
const version = "2.0.1";

//import process tracker and start the process
import ProcessTracker from "./processTracker.js";
ProcessTracker.startProcess("screwfix-trentham-plc-to-db");

//imports
import cron from "node-cron";

//import plc service
import plc31 from "./plcs/plc31.js";
import plcShuttles from "./plcs/plcShuttles.js";
import plcScanners from "./plcs/plcScanners.js";

//import ems zones service
import emsZones from "./plcs/EMSZones/masterEMS.js";

//import carton erectors service
import cartonErectors from "./plcs/cartonErectors/cartonErectors.js";

//import carton closing service
import cartonClosing from "./plcs/cartonClosing/cartonClosing.js";

//import tryCatchSimple
import * as tryCatchSimple from "./misc/tryCatchSimple.js";

//startup text
console.log("Dematic Dashboard Micro Service - PLC To DB");
console.log("Starting PLC To DB Service ....");

console.log("Starting PLC To DB Service v" + version + " ....");

//run every 3 seconds
cron.schedule("*/3 * * * * *", async () => {
  console.log();
  console.log("Running 3s cron job");

  //start timer for this function
  const start = Date.now();

  plc31.readDataFromPLC31TenSeconds();
  ////check all EMS zones
  emsZones.checkAllEMS();

  await cartonClosing.getAndInsertFaultsForCartonClosing();
  await cartonErectors.getAndInsertFaultsForErectors();

  //how long did this function take to run?
  const end = Date.now();

  //log the time taken
  console.log("Time taken for 3 second : " + (end - start) + "ms");

  //make a nice percentage  - (end - start) / 10000) * 100 + "%"
  let percent = ((end - start) / 3000) * 100;
  percent = Math.round(percent * 100) / 100;

  //how much percent of the 3 seconds did this function take?

  console.log("Percent of 3 seconds : " + percent + "%");
});

//run every 1minute
cron.schedule("* * * * *", async () => {
  //console.log("Running 1m cron job");
});

//run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  //console.log("Running 5m cron job");
  plcShuttles.readShuttlesToDB();
});
plcShuttles.readShuttlesToDB();
