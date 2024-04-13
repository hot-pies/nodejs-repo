const express = require('express');

const router=express.Router();
const {check}=require('express-validator');

const userController=require('../controllers/user-controllers');
router.get('/',userController.getUsers);
router.post('/login',userController.login);

module.exports=router;