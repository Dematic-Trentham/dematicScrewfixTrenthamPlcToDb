//Service for Dematic Dashboard Screwfix trentham to read date from Carton closing lines 1-4
//Created by: JWL
//Date: 2023/03/063 20:00:00
//Last modified: 2023/03/06 20:25:19
//Version: 0.0.1

import plcToDB from "./../../misc/plcToDB.js";

//import types
import snap7Types from "./../../misc/plc/types.js";

//array to store the last known data from each plc
let data: any[] = [];

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function readDataFromCartonClosing1To4() {
  getIpacks();
  getLidders();
}

async function getIpacks() {
  getIpack("10.4.2.150", 1, "Line1iPack");
  getIpack("10.4.2.152", 2, "Line2iPack");
  getIpack("10.4.2.154", 3, "Line3iPack");
  getIpack("10.4.2.156", 4, "Line4iPack");
}
async function getLidders() {
  getLidder("10.4.2.151", 1, "Line1Lidder");
  getLidder("10.4.2.153", 2, "Line2Lidder");
  getLidder("10.4.2.155", 3, "Line3Lidder");
  getLidder("10.4.2.157", 4, "Line4Lidder");
}

async function getIpack(ip: string, line: number, name: string) {
  if (data[name] == null) {
    data[name] = {};
  }

  if (data[name].sqlBoxes == undefined) {
    data[name].sqlBoxes = 0;
  }
}

async function getLidder(ip: string, line: number, name: string) {}

//export the function
export default { readDataFromCartonClosing1To4 };
