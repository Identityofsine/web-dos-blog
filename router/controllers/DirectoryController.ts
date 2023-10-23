import {Request, Response} from 'express';
import DirectoryConstructor, { FileTree } from '../../db/dirconstruct/dirconstructor';
import SQLConnection from '../../db/sqlconnection';
import { isDebug } from '../..';


export async function GetFileStructure(req : Request, res : Response) {
	const sql_connection = SQLConnection.getInstance();
	sql_connection.connect((sql_connection_object, on_next) => {
		const dr_constructor = new DirectoryConstructor(sql_connection_object, (dc_err) => {
			if(isDebug) {
				console.log('❌ [MYSQL] Error occured while grabbing all directories: ' + dc_err);
			}
			on_next();
			res.status(500).send("Error occured while grabbing all directories: " + dc_err);
			
			return;
		});

		dr_constructor.grabFileStructure((file_tree) => {
			on_next();
			res.status(200).json(file_tree);
		});
	}, (sql_error) => {
		if(isDebug) {
			console.log('❌ [MYSQL] Error occured while connecting to the database: ' + sql_error);
		}
		res.status(500).json({message:'Something went wrong in the backend...'});
	});
}