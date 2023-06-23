import { Connection } from "mysql"
import { isDebug } from "../..";

interface BlogSQL {
	id: number,
	title: string,
	image: string,
	content: string,
	created: number,
	updated: number,
}

async function GrabBlog(sql_connection : Connection, blog_id : number, callback_function : (blog_json : BlogSQL) => void) {
	sql_connection.query(`SELECT * FROM blog WHERE id = ${blog_id}`, (err, result : BlogSQL[]) => {
		if(err) {
			if(isDebug)
				console.log("❌ [MYSQL] Error occured while grabbing all blog: " + err.message);
		} else {
			callback_function(result[0]);
		}
	});
}

export default GrabBlog;