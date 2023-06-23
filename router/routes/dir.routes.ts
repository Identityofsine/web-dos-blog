import {Router} from 'express';
import { GetFileStructure } from '../controllers/DirectoryController';
import { GetBlog } from '../controllers/BlogGrabber';

const dir_router = Router();

dir_router.get("/getfilestructure", GetFileStructure);
dir_router.get("/getblog", GetBlog);


export default dir_router;