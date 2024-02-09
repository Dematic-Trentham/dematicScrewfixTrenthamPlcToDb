//Service for Dematic Dashboard Screwfix trentham to collect data
//Created by: JWL
//Date: 2022-12-30
//Last modified: 2023/12/09 17:26:56
//Version: 0.0.1

import * as mysql from "mysql";
import fs from "fs";

//import dematic master library
//@ts-ignore
import dematic from "dematic-master-lib";

const requiredEnvVariables = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_DATABASE"];

// Validate environment variables
const missingEnvVariables = requiredEnvVariables.filter((variable) => !process.env[variable]);

//is docker
if (isDocker()) {
  if (missingEnvVariables.length > 0) {
    throw new Error(`The following required environment variables are missing: ${missingEnvVariables.join(", ")}`);
  }
} else {
  dematic.log("Not Docker - using local config for db");
}

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.DB_HOST || "10.4.5.227",
  user: process.env.DB_USER || "nodeUser",
  password: process.env.DB_PASSWORD || "nodeuser",
  database: process.env.DB_DATABASE || "dematic_dashboard",
  debug: false,
});

dematic.log("DB Connection Pool Created");

try {
  query("SELECT 1 + 1 AS solution").then((rows) => {
    dematic.log("DB Connection Test Successful");
  });
} catch (err) {
  dematic.log("DB Connection Test Failed");
  dematic.log(err);
}

//function to query the DB
export function query(sql: string, args?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (false) {
      console.log("DB Query: " + sql);
    }

    pool.query(sql, args, (err: any, rows: any) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function isDocker() {
  try {
    return fs.existsSync("/proc/self/cgroup");
  } catch (err) {
    return false;
  }
}

//export the functions
export default {
  query,
};
