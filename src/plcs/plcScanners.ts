//Service for Dematic Dashboard Screwfix trentham to read data about the scanners
//Created by: JWL
//Date: 2023/03/063 20:00:00
//Last modified: 2023/09/05 18:35:13
//Version: 0.0.1

import plc from "./../misc/plc/plc.js";
//import types
import snap7Types from "../misc/plc/types.js";

//import all the scanner connections from "../connections/plcConnections.js";
import { scannerObjType, scannerReturnDataType } from "../connections/scanners/types.js";
import * as plcScanners from "../connections/scanners/PLC.js";

//import db
import mysql from "./../db/mysqlConnection.js";

let allScannerStats: scannerStatRunning[] = [];

interface Map {
  [key: string]: string | undefined;
}

//scanner stat type
type scannerStatRunning = {
  scanner: scannerObjType;
  totalScans: number;
  noReads: number;
  noData: number;
  goodReads: number;
  previousTotalScans: number;
  previousNoReads: number;
  previousNoData: number;
};

async function readScannerStatsToDB() {
  console.log("Reading scanner stats to DB");

  try {
    //loop through the scanners on plc 33 by key
    for (const key in plcScanners.plc33Scanners) {
      //get the scanner object
      let scannerObj = plcScanners.plc33Scanners[key];

      //read the data from the plc
      let scannerData = await readScanner(scannerObj);

      //if not already in the array, add it
      if (allScannerStats.find((x) => x.scanner.scannerName == scannerObj.scannerName) == undefined) {
        allScannerStats.push({
          scanner: scannerObj,
          totalScans: 0,
          noReads: 0,
          noData: 0,
          goodReads: 0,
          previousTotalScans: scannerData.totalScans,
          previousNoReads: scannerData.noReads,
          previousNoData: scannerData.noData,
        });
      } else {
        //not first time, so update the values

        //get the index of the scanner in the array
        let index = allScannerStats.findIndex((x) => x.scanner.scannerName == scannerObj.scannerName);

        //use the previous values to calculate the current values
        let totalScans = scannerData.totalScans - allScannerStats[index].previousTotalScans;
        let noReads = scannerData.noReads - allScannerStats[index].previousNoReads;
        let noData = scannerData.noData - allScannerStats[index].previousNoData;

        //update the previous values
        allScannerStats[index].previousTotalScans = scannerData.totalScans;
        allScannerStats[index].previousNoReads = scannerData.noReads;
        allScannerStats[index].previousNoData = scannerData.noData;

        //update the current values
        allScannerStats[index].totalScans += totalScans;
        allScannerStats[index].noReads += noReads;
        allScannerStats[index].noData += noData;

        //work out the good reads
        allScannerStats[index].goodReads = allScannerStats[index].totalScans - allScannerStats[index].noReads - allScannerStats[index].noData;

        //work out the current time string "17-May-2023 09:00:00 .. 17-May-2023 10:00:00"
        //current time rounded down to the nearest hour
        let currentTime = new Date();
        currentTime.setMinutes(0);
        currentTime.setSeconds(0);
        currentTime.setMilliseconds(0);
        currentTime.setHours(currentTime.getHours());

        //make another date object and add an hour to it
        let nextTime = new Date(currentTime);
        nextTime.setHours(nextTime.getHours() + 1);

        //change to local time

        //format the date objects to strings with local time
        let currentTimeString = currentTime.toLocaleString("en-GB", { timeZone: "Europe/London" });
        let nextTimeString = nextTime.toLocaleString("en-GB", { timeZone: "Europe/London" });

        //change the format to dd-mm-yyyy hh:mm:ss by replacing the / and , with -
        currentTimeString = currentTimeString.replace(/\//g, "-");
        nextTimeString = nextTimeString.replace(/\//g, "-");

        const monthMapping: Map = {
          "01": "Jan",
          "02": "Feb",
          "03": "Mar",
          "04": "Apr",
          "05": "May",
          "06": "Jun",
          "07": "Jul",
          "08": "Aug",
          "09": "Sep",
          "10": "Oct",
          "11": "Nov",
          "12": "Dec",
        };

        //change the month from 01 to Jan etc
        currentTimeString = currentTimeString.replace(
          currentTimeString.substring(3, 5),
          monthMapping[currentTimeString.substring(3, 5)]?.toString() ?? "error"
        );
        nextTimeString = nextTimeString.replace(nextTimeString.substring(3, 5), monthMapping[nextTimeString.substring(3, 5)]?.toString() ?? "error");

        //make time string dd-mm-yyyy hh:mm:ss .. dd-mm-yyyy hh:mm:ss
        let timeString = currentTimeString + " .. " + nextTimeString;

        //sql query to get the index for the location , if it doesnt exist, add it
        let sql = `SELECT * FROM scannerStats WHERE scannerName = '${scannerObj.scannerName}' AND time = '${timeString}'`;

        //run the query
        let result = await mysql.query(sql);

        console.log(result);
      }
    }

    console.log(allScannerStats);
  } catch (error) {
    console.log(error);
  }
}

async function readScanner(scannerObj: scannerObjType) {
  //data to be returned
  let data: scannerReturnDataType = {
    scannerName: scannerObj.scannerName,
    totalScans: 0,
    noReads: 0,
    noData: 0,
  };

  //read the data from the plc
  data.totalScans = await plc.readFromS7DBToInt(scannerObj.plc.ip, scannerObj.plc.rack, scannerObj.plc.slot, scannerObj.db, 46, plc.DataType.DWord);
  data.noReads = await plc.readFromS7DBToInt(scannerObj.plc.ip, scannerObj.plc.rack, scannerObj.plc.slot, scannerObj.db, 50, plc.DataType.Word);
  data.noData = await plc.readFromS7DBToInt(scannerObj.plc.ip, scannerObj.plc.rack, scannerObj.plc.slot, scannerObj.db, 52, plc.DataType.Word);

  return data;
}

export default { readScannerStatsToDB };
