export class API {

	private static _API_INSTANCE : API;

	private constructor() {

	}

	public static getInstance() : API {
		if(!API._API_INSTANCE) {
			API._API_INSTANCE = new API();
		}
		return API._API_INSTANCE;
	}

	private async request(url: string, request_type : APIType , callback_function : (data : any) => void) {
		await fetch(url, request_type.defaultOpts)
		.then(resp => {
			resp.json().then((json_data) => callback_function(json_data))
			console.log(resp.body);
		}).catch((error) => console.log(error));
	}

	public async grabFileSystem(onFinish : (tree : APIDirectoryResponse) => void) {
		const API_GET : APIType = {
			method: 'GET',
			defaultOpts: {
				method: 'GET',
			}
		}
		await this.request('/api/getfilestructure', API_GET, (data) => { onFinish(data); });
	}

}


interface APIType{
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	defaultOpts: RequestInit,
}

interface APIRequest { 
	type: '',
}

export interface APIDirectoryResponse {
	id: number,
	name: string,
	files: APIFileResponse[],
	directories: APIDirectoryResponse[],
	parent_id: number | null,
}

export interface APIFileResponse {
	id:number,
	name:string,
	blog_id:number,
	parent_id:number,
}