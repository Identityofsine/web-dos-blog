import {Router} from 'express';
import { GetFileStructure } from '../controllers/DirectoryController';

const dir_router = Router();

dir_router.get("/getfilestructure", GetFileStructure);


export default dir_router;