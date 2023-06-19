import mysql = require('mysql');
import { isDebug } from '..';



export function connectDatabase(callback : () => void, on_error?: (err: Error) => void) {
	const mysql_connection = mysql.createConnection({
		host: 'localhost',
		user: process.env.sqlUSR,
		password: process.env.sqlPWD,
	});

	mysql_connection.connect((err : Error) => {
		if(err) {
			if(isDebug)
				console.log('❌ [MYSQL]: Error connecting to the server: ' + err.message);
			on_error(err)
		};

		callback();
	})
}
