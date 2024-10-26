//Service for Dematic Dashboard Screwfix trentham to collect data from plc's and push to DB
//Created by: JWL
//Date: 2023/02/02 02:51:41
//Last modified: 2024/10/26 10:28:56
const version = "1.0.1";

//import process tracker and start the process
//import ProcessTracker from "./processTracker.js";
//ProcessTracker.startProcess("screwfix-trentham-plc-to-db");

//imports
import cron from "node-cron";

//import plc service
import plc31 from "./plcs/plc31.js";
import plcShuttles from "./plcs/DMS/plcShuttles.js";
import plcScanners from "./plcs/plcScanners.js";

//import ems zones service
import emsZones from "./plcs/EMSZones/masterEMS.js";

//import carton erectors service
import cartonErectors from "./plcs/cartonErectors/cartonErectors.js";

//import carton closing service
import cartonClosing from "./plcs/cartonClosing/cartonClosing.js";

//import tryCatchSimple
import * as tryCatchSimple from "./misc/tryCatchSimple.js";
import plc from "./misc/plc/plc.js";

//startup text
console.log("Dematic Dashboard Micro Service - PLC To DB");
console.log("Starting PLC To DB Service ....");

console.log("Starting PLC To DB Service v" + version + " ....");

//run every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
	console.log();
	console.log("Running 5s cron job");

	//start timer for this function
	const start = Date.now();
	const tasks = [
		{
			name: "readDataFromPLC31TenSeconds",
			task: plc31.readDataFromPLC31TenSeconds(),
		},

		//{ name: "getAndInsertFaultsForCartonClosing", task: cartonClosing.getAndInsertFaultsForCartonClosing() },
		//{ name: "getAndInsertFaultsForErectors", task: cartonErectors.getAndInsertFaultsForErectors() },
		{ name: "readShuttlesFaults", task: plcShuttles.readShuttlesFaults() },
	];

	// await Promise.all(
	//   tasks.map(({ name, task }) =>
	//     task.catch((error) => {
	//       console.error(`Error in function ${name}:`, error);
	//     })
	//   )
	// );

	//how long did this function take to run?
	const end = Date.now();

	//log the time taken
	console.log("Time taken for 5 second : " + (end - start) + "ms");

	//make a nice percentage  - (end - start) / 10000) * 100 + "%"
	let percent = ((end - start) / 5000) * 100;
	percent = Math.round(percent * 100) / 100;

	//how much percent of the 3 seconds did this function take?

	console.log("Percent of 5 seconds : " + percent + "%");
});

//run every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
	//start timer for this function
	const start = Date.now();

	await emsZones.checkAllEMS();

	//how long did this function take to run?
	const end = Date.now();

	//log the time taken
	console.log("Time taken for 30 second task: " + (end - start) + "ms");

	//make a nice percentage
	let percent = ((end - start) / 30000) * 100;
	percent = Math.round(percent * 100) / 100;

	//how much percent of the 30 seconds did this function take?
	console.log("Percent of 30 seconds: " + percent + "%");
	//console.log("Running 30s cron job");
});

//run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
	//console.log("Running 5m cron job");
	//start timer for this function
	const start = Date.now();

	await plcShuttles.readShuttlesLocations();

	//how long did this function take to run?
	const end = Date.now();

	//log the time taken
	console.log("Time taken for 5 minute task: " + (end - start) + "ms");

	//make a nice percentage
	let percent = ((end - start) / 300000) * 100;
	percent = Math.round(percent * 100) / 100;

	//how much percent of the 5 minutes did this function take?
	console.log("Percent of 5 minutes: " + percent + "%");
});
