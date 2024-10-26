//Service for Dematic Dashboard Screwfix trentham to read ems Data
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2024/10/26 10:09:24
//Version: 0.0.1
//import plc33

import plc from "src/misc/plc/plc.js";
import PLC11 from "./PLCS/PLC11.js";
import PLC12 from "./PLCS/PLC12.js";
import PLC13 from "./PLCS/PLC13.js";
import PLC21 from "./PLCS/PLC21.js";
import PLC22 from "./PLCS/PLC22.js";
import PLC23 from "./PLCS/PLC23.js";
import PLC24 from "./PLCS/PLC24.js";
import PLC31 from "./PLCS/PLC31.js";
import PLC33 from "./PLCS/PLC33.js";

async function checkAllEMS() {
	console.log("Checking all EMS data");

	await PLC11.readEMSDataFromPLC11();
	await PLC12.readEMSDataFromPLC12();
	await PLC13.readEMSDataFromPLC13();
	await PLC21.readEMSDataFromPLC21();
	await PLC22.readEMSDataFromPLC22();
	await PLC23.readEMSDataFromPLC23();
	await PLC24.readEMSDataFromPLC24();
	await PLC31.readEMSDataFromPLC31();
	await PLC33.readEMSDataFromPLC33();
}

export default { checkAllEMS };
