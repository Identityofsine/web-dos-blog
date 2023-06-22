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
	all_directories : Directory[];
	all_files : File[];

	constructor(sql_connection : mysql.Connection, on_error_callback : (err: DatabaseError) => void) {
		this.current_sql_connection = sql_connection;
		this.on_error_callback = on_error_callback;
		this.all_directories = [];
	}

	async grabAllDirectories(setter_function : (passed_in_value : Directory[]) => void) {
		let query_result : [];
		this.current_sql_connection.query("SELECT * FROM directory", (err, result: Directory[]) => {
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
				this.all_directories.push(item);
			}
		});
	}

}

export default DirectoryConstructor;