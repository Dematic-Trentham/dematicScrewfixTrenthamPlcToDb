//Service for Dematic Dashboard Screwfix trentham to read date from Carton closing lines 1-4
//Created by: JWL
//Date: 2023/03/063 20:00:00
//Last modified: 2024/01/03 19:53:48
//Version: 0.0.1

import plcToDB from "../../misc/plcToDB.js";

//import types
import snap7Types from "../../misc/plc/types.js";

import newIpackv1 from "./newIpackv1.js";
import oldIpack from "./oldIpack.js";
import oldLidder from "./oldLidder.js";
import oldLine1Lidder from "./line1Lidder.js";

import oldCC from "./cartonClosingOld/machines.js";

//import tryCatchSimple
import * as tryCatchSimple from "./../../misc/tryCatchSimple.js";

//array to store the last known data from each plc
let data: any[] = [];

//function to be run from the main program every 10 seconds
//this function will read the data from the PLC and store it in the database
async function getAndInsertFaultsForCartonClosing() {
  await getIpacks();
  await getLidders();
}

async function getIpacks() {
  try {
    //only used for faults now
    //await oldCC.getBPlusMachine("10.4.2.150", "Line1iPack", "iPack", 1);
    //await oldCC.getBPlusMachine("10.4.2.152", "Line2iPack", "iPack", 2);
    //await oldCC.getBPlusMachine("10.4.2.154", "Line3iPack", "iPack", 3);
    //await oldCC.getBPlusMachine("10.4.2.156", "Line4iPack", "iPack", 4);
  } catch (error) {
    console.log(error);
  }

  // await tryCatchSimple.Promise(() => oldIpack.getAndInsertFaults("10.4.2.150", "iPack", 1));
  //await tryCatchSimple.Promise(() => oldIpack.getAndInsertFaults("10.4.2.152", "iPack", 2));
  //await tryCatchSimple.Promise(() => oldIpack.getAndInsertFaults("10.4.2.154", "iPack", 3));
  //await tryCatchSimple.Promise(() => oldIpack.getAndInsertFaults("10.4.2.156", "iPack", 4));

  // getIpack("10.4.2.150", 1, "Line1iPack");
  // getIpack("10.4.2.152", 2, "Line2iPack");
  //  getIpack("10.4.2.154", 3, "Line3iPack");
  //  getIpack("10.4.2.156", 4, "Line4iPack");

  await tryCatchSimple.Promise(() => newIpackv1.getAndInsertFaults("10.4.2.158", "iPack", 5));
  await tryCatchSimple.Promise(() => newIpackv1.getAndInsertFaults("10.4.2.159", "iPack", 6));
}
async function getLidders() {
  // getLidder("10.4.2.151", 1, "Line1Lidder");
  // getLidder("10.4.2.153", 2, "Line2Lidder");
  //  getLidder("10.4.2.155", 3, "Line3Lidder");
  //  getLidder("10.4.2.157", 4, "Line4Lidder");
  // await oldCC.getBPlusMachine("10.4.2.151", "Line1Lidder", "Lidder", 1);
  // await oldCC.getBPlusMachine("10.4.2.153", "Line2Lidder", "Lidder", 2);
  // await oldCC.getBPlusMachine("10.4.2.155", "Line3Lidder", "Lidder", 3);
  // await oldCC.getBPlusMachine("10.4.2.157", "Line4Lidder", "Lidder", 4);
  //await tryCatchSimple.Promise(() => oldLine1Lidder.getAndInsertFaults("10.4.2.151", "Lidder", 1));
  // await tryCatchSimple.Promise(() => oldLidder.getAndInsertFaults("10.4.2.153", "Lidder", 2));
  //await tryCatchSimple.Promise(() => oldLidder.getAndInsertFaults("10.4.2.155", "Lidder", 3));
  //await tryCatchSimple.Promise(() => oldLidder.getAndInsertFaults("10.4.2.157", "Lidder", 4));
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
export default { getAndInsertFaultsForCartonClosing };
