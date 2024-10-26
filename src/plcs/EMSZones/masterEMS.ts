//Service for Dematic Dashboard Screwfix trentham to read ems Data
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2024/10/26 09:47:48
//Version: 0.0.1
//import plc33

import PLC11 from "./PLCS/PLC11.js";
import plc13 from "./PLCS/PLC13.js";
import plc33 from "./PLCS/PLC33.js";

async function checkAllEMS() {
	console.log("Checking all EMS data");

	await PLC11.readEMSDataFromPLC11();
	await plc13.readEMSDataFromPLC13();
	await plc33.readEMSDataFromPLC33();
}

export default { checkAllEMS };
