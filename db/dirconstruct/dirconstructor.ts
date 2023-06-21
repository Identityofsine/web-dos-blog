import { isDebug } from "../..";
import { DatabaseError } from "../dberror";
import SQLConnection from "../sqlconnection";
import mysql = require('mysql');

interface File {
	id : number,
	name : string,
	blog_id: number,
}

interface Directory {
	id : number,
	name : string,
	files : File[],
	directories : Directory[],
	parent_directory : Directory | FileTree, 
}

//acts as the root
interface FileTree {
	directories : Directory[];
}


class DirectoryConstructor {
	
	current_sql_connection : mysql.Connection;
	on_error_callback : (err: DatabaseError) => void;

	constructor(sql_connection : mysql.Connection, on_error_callback : (err: DatabaseError) => void) {
		this.current_sql_connection = sql_connection;
		this.on_error_callback = on_error_callback;
	}

	async grabAllDirectories(setter_function : (passed_in_value : any[]) => void) {
		let query_result : [];
		this.current_sql_connection.query("SELECT * FROM directory", (err, result) => {
			if(err) {
				if(isDebug) {
					console.log("❌ [MYSQL] Error occured while grabbing all directories: " + err.message);
				}
				this.on_error_callback(DatabaseError.ALREADY_OPEN); //change
			} else {
				setter_function(result);
				return;
			}
		});
	}

	grabFileStructure() {
		let root_directory : FileTree = {
			directories : []
		}
		this.grabAllDirectories((result) => {
			for(let item in result) {
				
			}
		});
	}

}

export default DirectoryConstructor;