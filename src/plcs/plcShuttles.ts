//Service for Dematic Dashboard Screwfix trentham to read date from Multishuttle aisles
//Created by: JWL
//Date: 2023/02/03 05:21:36
//Last modified: 2023/02/03 05:23:10
//Version: 0.0.1

import plcToDB from "./../misc/plcToDB.js";

//import types
import snap7Types from "./../misc/plc/types.js";

//function to be called by the main program every 10 minutes
async function readShuttlesToDB() {
  //for each aisle
  for (let aisle = 1; aisle < 4; aisle++) {
    //loop through each level
    for (let level = 1; level < 26; level++) {}
  }
}

export default { readShuttlesToDB };
