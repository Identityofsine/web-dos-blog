//setup .env file
import {config} from 'dotenv';
import express from 'express';
import minimist from "minimist";
import { connectDatabase } from './db/connecttodb';
import SQLConnection from './db/sqlconnection';
import { DatabaseError } from './db/dberror';

config();

const PORT = process.env.PORT;
const app = express();

//detect if debug mode;

let isDebug = false;
let args = minimist(process.argv.slice(2));
if(args.d)
    isDebug = true;

export {isDebug};


//Express Router Setup

//...

app.disable("x-powered-by");


const sql_test_connection = SQLConnection.getInstance();

sql_test_connection.connect((sql_object, sql_next) => {
	if(isDebug) {
		console.log("✅ [MYSQL] Connection established... closing!");
		sql_next();
	}
}, (db_error_object : DatabaseError) => {
	if(isDebug){
		if(db_error_object == DatabaseError.OPEN_ERROR)
			console.log("❌ [MYSQL] OPEN ERROR OCCURED");
		if(db_error_object == DatabaseError.CLOSE_ERROR)
			console.log("❌ [MYSQL] CLOSE ERROR OCCURED");
	}
});


app.listen(() => {
	console.log("✅ [EXPRESS] SERVER STARTED, LISTENING ON PORT:%s",PORT);
});