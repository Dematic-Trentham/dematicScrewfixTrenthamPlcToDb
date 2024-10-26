//Service for Dematic Dashboard Screwfix trentham to read ems Data from PLC 31
//Created by: JWL
//Date: 2023/02/03 03:38:36
//Last modified: 2024/10/26 10:09:09
//Version: 0.0.1
import snap7Types from "../../../misc/plc/types.js";
import {
	readAndInsertMultiple,
	readAndInsertSingle,
} from "../functions/updateDB.js";

const plcConfig = {
	ip: "10.4.2.27",
	rack: 0,
	slot: 2,
	name: "PLC31",
};

export async function readEMSDataFromPLC31() {
	const items = [
		{
			name: "PLC31_EEStopZone_Zone1",
			location: "PLC31",
			subLocation: "PLC31",
			description: "EStop Monitoring Zone 1)",
			area: snap7Types.Area.S7AreaMK,
			db: 0,
			start: 70,
			bit: 0,
		},
		{
			name: "PLC31_EEStopZone_Zone2",
			location: "PLC31",
			subLocation: "PLC31",
			description: "EStop Monitoring Zone 2)",
			area: snap7Types.Area.S7AreaMK,
			db: 0,
			start: 70,
			bit: 1,
		},
		{
			name: "PLC31_EEStopZone_Zone3",
			location: "PLC31",
			subLocation: "PLC31",
			description: "EStop Monitoring Zone 3)",
			area: snap7Types.Area.S7AreaMK,
			db: 0,
			start: 70,
			bit: 2,
		},
		{
			name: "PLC31_EEStopZone_Zone4",
			location: "PLC31",
			subLocation: "PLC31",
			description: "EStop Monitoring Zone 4)",
			area: snap7Types.Area.S7AreaMK,
			db: 0,
			start: 70,
			bit: 3,
		},
		{
			name: "PLC31_EEStopZone_Zone5",
			location: "PLC31",
			subLocation: "PLC31",
			description: "EStop Monitoring Zone 5)",
			area: snap7Types.Area.S7AreaMK,
			db: 0,
			start: 70,
			bit: 4,
		},
	];

	await readAndInsertMultiple(plcConfig, items);
}

export default { readEMSDataFromPLC31 };
