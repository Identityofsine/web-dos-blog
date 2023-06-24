import mysql = require('mysql');
import { isDebug } from '..';
import { DatabaseError } from './dberror';

class SQLConnection {
	private currentConnection: mysql.Connection;

	private static _instance : SQLConnection = undefined;
	private is_already_connected : boolean = false;

	private constructor() {
		this.currentConnection = undefined;
		this.is_already_connected = false;
	}

	/**
	 * getInstance method returns the instance of SQLConnection
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
	async connect(callback_on_connection: (connection_object : mysql.Connection, sql_next : (close_callback? : () => void) => void) => void, on_error?: (err: any) => void, hold_me? : {time:number}): Promise<void>{
		if(this.is_already_connected && isDebug) {
			console.log('⚠️ [SQLCONNECTION]: Connection already in progress, waiting for it to finish...');
			return;
		}

		if(!this.currentConnection) {
			this.currentConnection = this.createConnection();
			if(isDebug)
				console.log('ℹ️ [SQLCONNECTION]: Connection Object Created!');
		}
		this.is_already_connected = true;
		this.currentConnection.connect((error : mysql.MysqlError) => {
			if(error) {
				if(isDebug)
					console.log('❌ [SQLCONNECTION]: Connection to server failed: ' + error.message);
				on_error(error.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE' ? DatabaseError.ALREADY_OPEN : DatabaseError.OPEN_ERROR);
				this.closeConnection(this.currentConnection, on_error, () => {}); // Close connection if error.
				this.is_already_connected = false;

				return;
			}
			callback_on_connection(this.currentConnection, async (passed_callback) => {
				this.is_already_connected = true;
				if(hold_me) {
					await new Promise(resolve => setTimeout(resolve, hold_me.time));
				}
				this.closeConnection(this.currentConnection, on_error, passed_callback);
			})
		});

	}

	/**
	 * @summary This function is only called on callback_on_connection;
	 */
	private closeConnection(connection_object : mysql.Connection, on_error? : (err : DatabaseError) => void, close_callback? : () => void) {

		this.currentConnection = undefined;
		connection_object.end((err) => {
			this.is_already_connected = false;
			if(err){
				if(isDebug)
					console.log("❌ [SQLCONNECTION]: Closing connection to server failed: " + err);
				on_error(DatabaseError.CLOSE_ERROR)
			}
			if(isDebug)
				console.log("✅ [SQLCONNECTION]: Connection closed!");
			if(close_callback) {
				close_callback();
			}
		});
	}

	/**
	 * @summary Create Connection using env variables
	 * @returns {mysql.Connection} Connection Object
	 */
	private createConnection(): mysql.Connection {
		const mysql_connection = mysql.createConnection({
			host: process.env.sqlHOST,
			user: process.env.sqlUSR,
			password: process.env.sqlPWD,
			database: 'wdb_fs',
			multipleStatements: true,
		});

	

		return mysql_connection;
	}

}

export default SQLConnection;