import mysql = require('mysql');
import { isDebug } from '..';

class SQLConnection {
	currentConnection: mysql.Connection;


	/**
	 * @summary This function connects to the database and uses the 'callback_on_connection' variable to run code on connection, that may need the database.
	 * @param callback_on_connection 
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
				on_error(error);
				return;
			}
			callback_on_connection(this.currentConnection, () => this.closeConnection(this.currentConnection, on_error));
		});

	}

	private closeConnection(connection_object : mysql.Connection, on_error? : (err : mysql.MysqlError) => void) {
		connection_object.end(on_error);
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