import express from 'express';
import { authJwt } from '../middleware/authJwt.js';
import {getAllTutorialsByTitle,createTutorial,deletetutorialsbyId,Updatetutorialsbyid,deletetutorials} from '../controller/tutorial.js'

const router=express.Router();

router.get("/",getAllTutorialsByTitle)
router.post('/',[authJwt.verifyToken, authJwt.isadmin],createTutorial)
router.delete('/',[authJwt.verifyToken, authJwt.isModerator],deletetutorials)
router.delete("/:id", [authJwt.verifyToken],deletetutorialsbyId)
router.put("/:id",[authJwt.verifyToken, authJwt.isModerator],Updatetutorialsbyid)
export default router 



