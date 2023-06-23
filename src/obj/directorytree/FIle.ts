import { API, APIBlog } from "../../api/API";

/**
 * File class for the FileStructure System
 */
export class File {
    private _name: string;
    protected _onRun: () => string; //this function returns a string for printing

    /** 
     * @summary Constructor for the File structure
     */
    constructor(name: string, onRun: () => string) {
        this._name = name;
        this._onRun = onRun;
    }

    /**
     * @summary calls the private onRun Function
     * @returns {string} returns the string for printing purposes.
     */
    public call() : string {
        return this._onRun();
    }

    /**
     * @summary Returns the name of the file
     * @returns {string} Returns the name of the file
     */
    public getName() : string { 
        return this._name; 
    }
}

export class BlogFile extends File {

	private _blog_id : number;

	constructor(name: string, blog_id : number) {
		super(name, () => "");
		this._blog_id = blog_id;
		this._onRun = this.constructBlogPost;
	}

	private constructBlogPost() : string { 
		let blog_post : string = "";
		API.getInstance().grabBlogPost(this._blog_id, (blog_json : APIBlog) => {
			blog_post += "# " + blog_json.title + "\n";
			blog_post += `[${blog_json.image}]\n\n`;
			blog_post += blog_json.content;
		});
		return blog_post;
	}
}