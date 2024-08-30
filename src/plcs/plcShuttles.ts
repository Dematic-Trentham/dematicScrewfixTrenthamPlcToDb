//Service for Dematic Dashboard Screwfix trentham to read date from Multishuttle aisles
//Created by: JWL
//Date: 2023/02/03 05:21:36
//Last modified: 2024/08/30 05:03:30
//Version: 0.0.1

import plcToDB from "./../misc/plcToDB.js";

import moment from "moment";

import snap7 from "node-snap7";
var s7client = new snap7.S7Client();

//import db
import mysql from "./../db/mysqlConnection.js";

//variables
let amountOfAisles = 3;
const amountOfLevels = 25;

//import types
import snap7Types from "./../misc/plc/types.js";
import db from "./../db/db.js";

//function to be called by the main program every 10 minutes
async function readShuttlesToDB() {
  console.log("Reading Shuttles to DB");

  for (var aisle = 1; aisle < amountOfAisles + 1; aisle++) {
    //console.log(aisle);
    //Loop through the 3 aisles
    await GetAisle(aisle);
  }

  console.log("Finished reading shuttles");
  return true;
}

async function GetAisle(aisle: number) {
  for (var level = 1; level < amountOfLevels + 1; level++) {
    try {
      let dataMac = await getShuttleData(aisle, level);

      console.log("Aisle: " + dataMac.aisle + " Level: " + dataMac.level + " Mac: " + dataMac.mac);

      let timeStamp = new Date().toISOString();

      //before we update the database, check if that location is in use
      //let locationInUse = await mysql.query(
      //@ts-ignore
      //  "SELECT * FROM shuttles WHERE Location = '" + `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01` + "'"
      //);

      //update the shuttle locations table NEW
      let locationInUse = await db.dmsShuttleLocations.findMany({
        where: {
          currentLocation: `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01`,
        },
      });

      //loop through the results
      for (var i = 0; i < locationInUse.length; i++) {
        //if the location is in use, check if the mac address is the same
        //@ts-ignore
        if (locationInUse[i].MacAddress != dataMac.mac) {
          //if the mac address is different, then remove the location from the other shuttle
          //@ts-ignore
          let currentId = await mysql.query("SELECT ID FROM shuttles WHERE MacAddress = '" + dataMac.mac + "'");
          //@ts-ignore
          console.log("Location in use by " + locationInUse[i].MacAddress + " updating to " + dataMac.mac);

          await mysql.query("UPDATE shuttles SET Location = NULL WHERE MacAddress = '" + locationInUse[i].macAddress + "'");

          //update the shuttle locations table NEW
          await db.dmsShuttleLocations.update({
            where: {
              macAddress: locationInUse[i].macAddress,
            },
            data: {
              currentLocation: "",
            },
          });

          //add this data to the shuttle Swap log - timestamp, aisle, level, old mac, new mac
          //@ts-ignore
          await mysql.query(
            "INSERT INTO shuttleSwapLog (timeStamp, aisle, level, oldMac, oldId, newMac, newId) VALUES ('" +
              timeStamp +
              "', '" +
              dataMac.aisle +
              "', '" +
              dataMac.level +
              "', '" +
              locationInUse[i].macAddress +
              "', '" +
              locationInUse[i].shuttleID +
              "', '" +
              dataMac.mac +
              "', '" +
              currentId[0].ID +
              "')"
          );

          //update the shuttle locations table NEW
          await db.dmsShuttleSwapLogs.create({
            data: {
              timestamp: timeStamp,
              aisle: aisle,
              level: level,
              oldMacAddress: locationInUse[i].macAddress,
              oldShuttleID: locationInUse[i].shuttleID,
              newMacAddress: dataMac.mac,
              newShuttleID: currentId[0].ID,
            },
          });
        }
      }

      //update the database with the new data
      await mysql.query(
        "INSERT INTO shuttles (MacAddress, Location, LastLocationUpdate) VALUES ('" +
          //@ts-ignore
          dataMac.mac +
          "', '" +
          //@ts-ignore
          `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01` +
          "', '" +
          timeStamp +
          "') ON DUPLICATE KEY UPDATE Location = '" +
          //@ts-ignore
          `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01` +
          "', LastLocationUpdate = '" +
          timeStamp +
          "'"
      );

      //update the shuttle locations table NEW
      await db.dmsShuttleLocations.upsert({
        where: {
          macAddress: dataMac.mac,
        },
        update: {
          currentLocation: `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01`,
          locationLastUpdated: timeStamp,
        },
        create: {
          macAddress: dataMac.mac,
          currentLocation: `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01`,
          locationLastUpdated: timeStamp,
          shuttleID: "", // Provide a value for shuttleID
        },
      });
    } catch (err) {
      console.log("Error reading shuttle data");
      console.log("Aisle: " + aisle + " Level: " + level);
      console.log(err);
    }
  }
}

function getShuttleData(aisle: number, level: number) {
  return new Promise<any>(function (resolve, reject) {
    s7client.ConnectTo("10.4.2." + (100 + aisle), 0, 1, async function (err) {
      if (err) reject(s7client.ErrorText(err));

      //Loop through the levels

      s7client.ReadArea(0x84, 2850 + level, 1528, 8, 0x02, function (err, data) {
        if (err) reject(s7client.ErrorText(err));

        let tempArray = {
          aisle: aisle,
          level: level,
          mac: stringToCapital(toHexString(data)),
        };
        resolve(tempArray);
      });
    });

    //return promise;
  });
}

function stringToCapital(string: string) {
  return string.toUpperCase();
}

function toHexString(byteArray: Buffer) {
  if (byteArray == null || byteArray.length == 0) return "";
  if (byteArray.length == 0) return "";
  var result = "";

  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join(" ");
}
function paddy(n: string, p: number, c?: undefined) {
  var pad_char = typeof c !== "undefined" ? c : "0";
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default { readShuttlesToDB };
