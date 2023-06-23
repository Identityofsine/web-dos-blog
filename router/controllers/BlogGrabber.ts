import { Request, Response } from "express";
import GrabBlog from "../../db/grabblog/grabblog";
import SQLConnection from "../../db/sqlconnection";
import { isDebug } from "../..";

async function GetBlog(req : Request, res : Response) {

	const methodSignature = 'getblog';

	let blog_id = parseInt(req.query.blog_id as string);
	if(!blog_id) return res.status(400).json({message: "No blog id provided."});


	const sql_connection = SQLConnection.getInstance();
	sql_connection.connect((sql_connection_object, on_next) => {
		GrabBlog(sql_connection_object, blog_id, (blog_json) => {
			if(isDebug)
				console.log('✅ [MYSQL:%s] Grabbed blog with id %d', methodSignature, blog_id);
			res.status(200).json(blog_json);
			on_next();
		});
	}, (sql_error) => {
		if(isDebug)
			console.log('❌ [MYSQL:%s] Error occured while connecting to the database: ' + sql_error, methodSignature);
		res.status(500).json({message:'Something went wrong in the backend...'});
	});

	return;
}