import { isDebug } from "../..";
import { DatabaseError } from "../dberror";
import SQLConnection from "../sqlconnection";
import mysql = require('mysql');

interface File {
	id : number,
	name : string,
	blog_id: number,
	parent_id? : number | null,
}

interface Directory {
	id : number,
	name : string,
	files : File[],
	directories : Directory[],
	parent_directory : Directory | FileTree, 
	parent_id? : number | null,
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
		this.all_files = [];
	}

	async grabAllFilesAndDirectories(setter_function : (dir_result : Directory[], files_result : File[]) => void) {
		let query_result : [];
		this.current_sql_connection.query("SELECT * FROM directory; SELECT * FROM files", [1, 2], (err, result: [Directory[], File[]]) => {
			if(err) {
				if(isDebug) {
					console.log("❌ [MYSQL] Error occured while grabbing all directories: " + err.message);
				}
				this.on_error_callback(DatabaseError.ALREADY_OPEN); //change
			} else {
				setter_function(result[0], result[1]);
				return;
			}
		});
	}


	grabFileStructure(setter_function? : (file_tree : FileTree) => void) {

		let root_directory : FileTree = {
			directories : []
		}

		function sort_directory_into_tree(directories : Directory[]) {
			for(let i = 0; i < directories.length; i++) {
				const current_directory = directories[i];

				//initialize the files and directories array
				current_directory.files = [];
				current_directory.directories = [];
				
				if(current_directory.parent_id == null) {
					root_directory.directories.push(current_directory);
				} else {
					const found_directory = directories.find((directory) => directory.id == current_directory.parent_id);
					if(found_directory) {
						found_directory.directories.push(current_directory);
					}
				}
			}
		}

		function sort_file_into_directory(files : File[], directories : Directory[]) {
			for(let i = 0; i < files.length; i++) {
				const current_file = files[i];
				const found_directory = directories.find((directory) => directory.id === current_file.parent_id);
				if(found_directory != undefined) {
					found_directory?.files?.push(current_file);
				}
			}
		}

		this.grabAllFilesAndDirectories((directories, files) => {
			sort_directory_into_tree(directories);
			sort_file_into_directory(files, directories);
			if(setter_function)
				setter_function(root_directory);
		});


	}

}

export default DirectoryConstructor;