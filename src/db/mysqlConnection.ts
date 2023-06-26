//Service for Dematic Dashboard Screwfix trentham to collect data
//Created by: JWL
//Date: 2022-12-30
//Last modified: 2023/06/26 22:10:31
//Version: 0.0.1

import * as mysql from "mysql";
//var mysql = require("mysql");

const requiredEnvVariables = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_DATABASE"];

//get the env variables
for (const envVar of requiredEnvVariables) {
  if (!process.env[envVar]) {
    console.log(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debug: false,
});

//function to query the DB
export function query(sql: any, args?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(sql, args, (err: any, rows: any) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

//export the functions
export default {
  query,
};
