import express from 'express';
import {getUsers,createUser,getUserByID,deleteUserById,updateUserById} from '../controller/users.js'

const router=express.Router();

router.get("/",getUsers)
router.get("/:id",getUserByID)
router.post("/",createUser)
router.delete("/:id",deleteUserById)
router.patch("/:id",updateUserById)

// router.put("/id",updateUser)

// localhost:8080/user?name=naren&age=20
export default router 
