//setup .env file
import {config} from 'dotenv';
import express from 'express';
import minimist from "minimist";
import { connectDatabase } from './db/connecttodb';

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



if(isDebug){
	connectDatabase(() => {
		console.log("✅ [MYSQL] Connection successfully established!");
	});
}

app.listen(() => {
	console.log("✅ [EXPRESS] SERVER STARTED, LISTENING ON PORT:%s",PORT);
});