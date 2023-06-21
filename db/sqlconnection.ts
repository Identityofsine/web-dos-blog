import mysql = require('mysql');
import { isDebug } from '..';
import { DatabaseError } from './dberror';

class SQLConnection {
	private currentConnection: mysql.Connection;

	private static _instance : SQLConnection = undefined;


	private constructor() {

	}

	/**
	 * 
	 * @returns SQLConnection Instance 
	 */
	public static getInstance(): SQLConnection {
		if(SQLConnection._instance === undefined) {
			SQLConnection._instance = new SQLConnection();
			if(isDebug)
				console.log('ℹ️ [SQLCONNECTION]: SQLConnection Created!');
		}

		return SQLConnection._instance;
	}

	/**
	 * @summary This function connects to the database and uses the 'callback_on_connection' variable to run code on connection, that may need the database.
	 * @param callback_on_connection This function will be called with two parameters, a {mysql.Connection} connection_object, a {() => void} callback that needs to be executed after connection_object is used and done.
	 */
	connect(callback_on_connection: (connection_object : mysql.Connection, sql_next : () => void) => void, on_error?: (err: any) => void): void{
		if(!this.currentConnection) {
			this.currentConnection = this.createConnection();
			if(isDebug)
				console.log('ℹ️ [SQLCONNECTION]: Connection Object Created!');
		}
		this.currentConnection.connect((error : Error) => {
			if(error) {
				if(isDebug)
					console.log('❌ [SQLCONNECTION]: Connection to server failed: ' + error.message);
				on_error(DatabaseError.OPEN_ERROR);
				return;
			}
			callback_on_connection(this.currentConnection, () => this.closeConnection(this.currentConnection, on_error));
		});

	}

	/**
	 * @summary This function is only called on callback_on_connection;
	 */
	private closeConnection(connection_object : mysql.Connection, on_error? : (err : DatabaseError) => void) {
		connection_object.end((err) => {
			if(err){
				if(isDebug)
					console.log("❌ [SQLCONNECTION]: Closing connection to server failed: " + err);
				on_error(DatabaseError.CLOSE_ERROR)
			}
		});
	}

	/**
	 * @summary Create Connection using env variables
	 * @returns {mysql.Connection} Connection Object
	 */
	private createConnection(): mysql.Connection {
		const mysql_connection = mysql.createConnection({
			host: 'localhost',
			user: process.env.sqlUSR,
			password: process.env.sqlPWD,
		});

	

		return mysql_connection;
	}

}

export default SQLConnection;