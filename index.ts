//setup .env file
import {config} from 'dotenv';
import express from 'express';
import minimist from "minimist";
import SQLConnection from './db/sqlconnection';
import { DatabaseError } from './db/dberror';
import DirectoryConstructor from './db/dirconstruct/dirconstructor';
import dir_router from './router/routes/dir.routes';

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

function debugSQLTestConnection() {
	const sql_test_connection = SQLConnection.getInstance();
	
	sql_test_connection.connect((sql_object, sql_next) => {
		console.log("✅ [MYSQL] Connection established!");
		sql_next(() => {
			if(isDebug)
				console.log("✅ [MYSQL] Connection closing!");
			});
		}, (db_error_object : DatabaseError) => {
		if(isDebug){
			if(db_error_object == DatabaseError.OPEN_ERROR)
				console.log("❌ [MYSQL] OPEN ERROR OCCURED");
			if(db_error_object == DatabaseError.CLOSE_ERROR)
				console.log("❌ [MYSQL] CLOSE ERROR OCCURED");
		}
	});
}

app.disable("x-powered-by"); //idky you need this but you do
//this must be turned on to allow the backend to work with JSON bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', dir_router);

// debugSQLTestConnection();
app.listen(PORT, () => {
	console.log("✅ [EXPRESS] SERVER STARTED, LISTENING ON PORT:%s",PORT);
});
