import express from 'express';
import { addUser, getUserById, getUsers, updateUser } from './controller.js';
const router  =  express.Router(); 

router.get("/users",getUsers);

router.get("/user/:id",getUserById);

router.post("/user/add",addUser);

router.put("/user/:id",updateUser);
export default router;