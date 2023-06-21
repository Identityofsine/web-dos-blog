import { isDebug } from "../..";
import { DatabaseError } from "../dberror";
import SQLConnection from "../sqlconnection";
import mysql = require('mysql');

class DirectoryConstructor {
	
	current_sql_connection : mysql.Connection;
	on_error_callback : (err: DatabaseError) => void;

	constructor(sql_connection : mysql.Connection, on_error_callback : (err: DatabaseError) => void) {
		this.current_sql_connection = sql_connection;
		this.on_error_callback = on_error_callback;
	}

	grabAllDirectories() : any[] {
		let query_result : [];
		this.current_sql_connection.query("SELECT * FROM directories", (err, result) => {
			if(err) {
				if(isDebug) {
					console.log("❌ [MYSQL] Error occured while grabbing all directories: " + err.message);
				}
				this.on_error_callback(DatabaseError.ALREADY_OPEN); //change
			} else {
				query_result = result;
				return;
			}
		});
		return query_result;
	}

}

export default DirectoryConstructor;