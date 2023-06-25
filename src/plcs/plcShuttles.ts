//Service for Dematic Dashboard Screwfix trentham to read date from Multishuttle aisles
//Created by: JWL
//Date: 2023/02/03 05:21:36
//Last modified: 2023/06/09 22:50:39
//Version: 0.0.1

import plcToDB from "./../misc/plcToDB.js";

import moment from "moment";

import snap7 from "node-snap7";
var s7client = new snap7.S7Client();

//import db
import mysql from "./../db/mysqlConnection.js";

//import types
import snap7Types from "./../misc/plc/types.js";

//function to be called by the main program every 10 minutes
async function readShuttlesToDB() {
  console.log("Reading Shuttles to DB");

  for (var aisle = 1; aisle < 4; aisle++) {
    //console.log(aisle);
    //Loop through the 3 aisles
    await GetAisle(aisle);
  }

  console.log("Finished reading shuttles");
  return true;
}

async function GetAisle(aisle: number) {
  for (var level = 1; level < 26; level++) {
    try {
      let dataMac = await getShuttleData(aisle, level);

      console.log("Aisle: " + dataMac.aisle + " Level: " + dataMac.level + " Mac: " + dataMac.mac);

      let timeStamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      //before we update the database, check if that location is in use
      let locationInUse = await mysql.query(
        //@ts-ignore
        "SELECT * FROM shuttles WHERE Location = '" + `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01` + "'"
      );

      //console.log(" ");
      //console.log("Checking aisle " + aisle + " level " + level + " location " + `MSAI${paddy(dataMac.aisle, 2)}LV${paddy(dataMac.level, 2)}SH01`);
      // console.log(locationInUse.length);

      //loop through the results
      for (var i = 0; i < locationInUse.length; i++) {
        //@ts-ignore
        //console.log("Checking         :" + dataMac.mac);
        //console.log("Checking against :" + locationInUse[i].MacAddress);

        //if the location is in use, check if the mac address is the same
        //@ts-ignore
        if (locationInUse[i].MacAddress != dataMac.mac) {
          //if the mac address is different, then remove the location from the other shuttle
          //@ts-ignore
          let currentId = await mysql.query("SELECT ID FROM shuttles WHERE MacAddress = '" + dataMac.mac + "'");
          //@ts-ignore
          console.log("Location in use by " + locationInUse[i].MacAddress + " updating to " + dataMac.mac);

          await mysql.query("UPDATE shuttles SET Location = NULL WHERE MacAddress = '" + locationInUse[i].MacAddress + "'");
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

      //   let offset = 38659;

      //   s7client.ReadArea(0x84, 2013, offset, 1, snap7Types.WordLen.S7WLByte, async function (err, data) {
      //     if (err) reject(s7client.ErrorText(err));
      //     console.log(data);

      //     //set bit 2 to 1
      //     data[0] = data[0] | 0b00000100;

      //     console.log(data);

      //     s7client.WriteArea(0x84, 2013, offset, 1, snap7Types.WordLen.S7WLByte, data, async function (err) {
      //       if (err) reject(s7client.ErrorText(err));
      //     });

      //     //wait 1 second
      //     await sleep(1000);

      //     s7client.ReadArea(0x84, 2013, offset, 1, snap7Types.WordLen.S7WLByte, async function (err, data) {
      //       if (err) reject(s7client.ErrorText(err));
      //       console.log(data);

      //       //set bit 2 to 0
      //       data[0] = data[0] & 0b11111011;

      //       console.log(data);

      //       s7client.WriteArea(0x84, 2013, offset, 1, snap7Types.WordLen.S7WLByte, data, function (err) {
      //         if (err) reject(s7client.ErrorText(err));
      //       });
      //     });
      //   });
      // });

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
